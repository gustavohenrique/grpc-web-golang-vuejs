package repositories

import (
	"testing"

	"backend/libs/databases"
	"backend/src/structs"

	_ "github.com/mattn/go-sqlite3"
)

var schema = `
    CREATE TABLE IF NOT EXISTS accounts (
        email    VARCHAR NOT NULL PRIMARY KEY,
        password VARCHAR NOT NULL
    );
`

var fixture = `
    INSERT INTO accounts (email, password) VALUES ('admin@localhost', '123456');
`

func getDBWithInitialData() databases.SqliteDatabase {
	db := databases.NewSqlite(":memory:")
	conn := db.GetConnection()
	conn.Exec(schema)
	conn.Exec(fixture)
	return db
}

func TestAuthenticateByEmailAndPassword(t *testing.T) {
	db := getDBWithInitialData()
	accountRepository := NewAccountRepository(db)
	user := structs.User{
		Email:    "admin@localhost",
		Password: "123456",
	}
	_, err := accountRepository.AuthenticateByEmailAndPassword(user)
	if err != nil {
		t.Errorf("User not found. %s", err)
	}
}

func TestCreate(t *testing.T) {
	db := getDBWithInitialData()
	accountRepository := NewAccountRepository(db)
	user := structs.User{
		Email:    "someone@mail.com",
		Password: "password",
	}
	_, err := accountRepository.Upsert(user)
	if err != nil {
		t.Errorf("Failed to create: %s", err)
	}
	var email string
	err = db.GetConnection().Get(&email, "SELECT email FROM accounts WHERE email = ?", user.Email)
	if err != nil || email != user.Email {
		t.Errorf("Expected create an user with email %s but got. %s", user.Email, err)
	}
}

func TestUpdatePassword(t *testing.T) {
	db := getDBWithInitialData()
	accountRepository := NewAccountRepository(db)
	user := structs.User{
		Email:    "admin@localhost",
		Password: "strongpassword",
	}
	_, err := accountRepository.Upsert(user)
	if err != nil {
		t.Errorf("Failed to update: %s", err)
	}
	var password string
	err = db.GetConnection().Get(&password, "SELECT password FROM accounts WHERE email = ?", user.Email)
	if err != nil || password == "123456" {
		t.Errorf("Expected to update password %s but got %s: %s", user.Password, password, err)
	}
}
