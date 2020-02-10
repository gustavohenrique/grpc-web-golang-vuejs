package databases

import (
	"github.com/jmoiron/sqlx"
)

type SqliteDatabase interface {
	Connect() (*sqlx.DB, error)
	GetConnection() *sqlx.DB
}
