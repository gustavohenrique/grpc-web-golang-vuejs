package databases

import (
	"log"

	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

type Sqlite struct {
	connection *sqlx.DB
	connStr    string
}

func NewSqlite(connStr string) SqliteDatabase {
	db := &Sqlite{}
	db.connStr = connStr
	return db
}

func (db *Sqlite) Connect() (*sqlx.DB, error) {
	var err error
	if db.connection == nil {
		db.connection, err = db.getConnection()
	}
	return db.connection, err
}

func (db *Sqlite) GetConnection() *sqlx.DB {
	conn, err := db.Connect()
	if err != nil {
		log.Println(err)
	}
	return conn
}

func (db *Sqlite) getConnection() (*sqlx.DB, error) {
	conn, err := sqlx.Connect("sqlite3", db.connStr)
	if err != nil {
		log.Println(err, db.connStr)
		return conn, err
	}
	return conn, err
}
