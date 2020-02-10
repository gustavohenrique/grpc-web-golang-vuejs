package main

import (
	"backend/libs/databases"
	"backend/libs/remoteprocedurecall"
	"backend/src/repositories"
	"backend/src/rpc"
	"backend/src/web"
)

var schema = `
CREATE TABLE IF NOT EXISTS accounts (
    email    VARCHAR NOT NULL PRIMARY KEY,
    password VARCHAR NOT NULL
);`

var fixture = "INSERT INTO accounts (email, password) VALUES ('demo@localhost', 'password');"

func getDBWithInitialData() databases.SqliteDatabase {
	db := databases.NewSqlite(":memory:")
	conn := db.GetConnection()
	conn.Exec(schema)
	conn.Exec(fixture)
	return db
}

func main() {
	// Connect to a SQLite3 in memory database
	db := getDBWithInitialData()

	// Inject the database connection into repository layer
	accountRepository := repositories.NewAccountRepository(db)

	// It creates a new gRPC server instance
	rpcServer := remoteprocedurecall.NewServer()
	rpc.NewAccountServer(rpcServer.Grpc, accountRepository)

	// Starts the HTTP server
	web.Start(":9000", rpcServer)
}
