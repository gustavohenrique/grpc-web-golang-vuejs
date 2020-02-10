package remoteprocedurecall

import (
	"context"
	"log"
	"strings"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

type RpcServer struct {
	Grpc        *grpc.Server
	WrappedGrpc *grpcweb.WrappedGrpcServer
}

func NewServer() *RpcServer {
	return newServer()
}

func newServer() *RpcServer {
	var opts []grpc.ServerOption
	opts = append(opts, ServerInterceptor())

	// It's increase to 5MB the maximum size allowed for requests and responses
	opts = append(opts, grpc.MaxSendMsgSize(5*1024*1024*1024*1024))
	opts = append(opts, grpc.MaxRecvMsgSize(5*1024*1024*1024*1024))
	gs := grpc.NewServer(opts...)
	return &RpcServer{
		Grpc:        gs,
		WrappedGrpc: grpcweb.WrapServer(gs),
	}
}

// The skipped router are defined in a variable (for non authenticated users)
func shouldSkip(method string) bool {
	skipRouters := []string{"/Create", "/AuthenticateByEmailAndPassword"}
	for _, i := range skipRouters {
		if strings.HasSuffix(method, i) {
			return true
		}
	}
	return false
}

// It's like a middleware for gRPC.
func ServerInterceptor() grpc.ServerOption {
	return grpc.UnaryInterceptor(
		func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
			resp, err := handler(ctx, req)
			if req != nil && shouldSkip(info.FullMethod) {
				return resp, err
			}
			token, err := getTokenFromMetadata(ctx)
			if err != nil {
				log.Println(err, info.FullMethod, "token=", token)
				return nil, err
			}
			return resp, err
		},
	)
}

// Metadata in gRPC is like an HTTP Header in REST
func getTokenFromMetadata(ctx context.Context) (string, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return "", status.Error(codes.Unauthenticated, "No token in metadata.")
	}
	value := md.Get("X-CSRF-Token")
	if len(value) > 0 && value[0] == "my-secret-token" {
		return value[0], nil
	}
	return "", status.Error(codes.Unauthenticated, "Token is empty.")
}
