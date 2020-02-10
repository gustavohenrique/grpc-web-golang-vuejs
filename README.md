# grpc-web-golang-vuejs

> An example using gRPC-Web with Go and VueJS (Quasar Framework)

The post about this code can be found in my personal blog [gustavohenrique.net](https://gustavohenrique.net).

## Setup

1. Install the latest release of Protocol Buffers from [here](https://github.com/protocolbuffers/protobuf/releases/latest).
2. Install the Go protocol buffers plugin running `go get -u github.com/golang/protobuf/protoc-gen-go`.
3. Install the *protoc-gen-grpc-web* protoc plugin from [here](https://github.com/grpc/grpc-web/releases).

## Running

### Compile the protobuf definitions

```sh
protoc -I proto proto/*.proto --proto_path=./proto --go_out=plugins=grpc:./backend/proto
protoc -I proto proto/*.proto --js_out=import_style=commonjs:./frontend/proto --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./frontend/proto
```

### Backend

Open a terminal session and run:

```sh
cd backend
go run main.go
```

The backend server will create an in memory SQLite database.

### Frontend

Open another terminal session:

```sh
cd frontend
npm i -g @quasar/cli
npm i
quasar dev
```

## License

MIT
