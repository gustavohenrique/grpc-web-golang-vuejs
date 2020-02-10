package rpc

import (
	"context"
	"fmt"

	"google.golang.org/grpc"

	pb "backend/proto"
	"backend/src/repositories"
	"backend/src/structs"
)

type AccountServer struct {
	repository repositories.AccountRepository
}

func NewAccountServer(s *grpc.Server, repository repositories.AccountRepository) *AccountServer {
	server := &AccountServer{repository}
	if s != nil {
		pb.RegisterAccountServiceServer(s, server)
	}
	return server
}

func (instance *AccountServer) AuthenticateByEmailAndPassword(ctx context.Context, req *pb.User) (*pb.Account, error) {
	user := structs.User{
		Email:    req.Email,
		Password: req.Password,
	}
	_, err := instance.repository.AuthenticateByEmailAndPassword(user)
	if err == nil {
		resp := &pb.Account{Token: "my-secret-token"}
		return resp, nil
	}
	return nil, fmt.Errorf("Invalid credentials. %s", err)
}

func (instance *AccountServer) Create(ctx context.Context, req *pb.User) (*pb.User, error) {
	return instance.upsert(ctx, req)
}

func (instance *AccountServer) ChangePassword(ctx context.Context, req *pb.User) (*pb.Nothing, error) {
	_, err := instance.upsert(ctx, req)
	return &pb.Nothing{}, err
}

func (instance *AccountServer) upsert(ctx context.Context, req *pb.User) (*pb.User, error) {
	user := structs.User{
		Email:    req.Email,
		Password: req.Password,
	}
	_, err := instance.repository.Upsert(user)
	return &pb.User{Email: user.Email}, err
}
