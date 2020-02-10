package repositories

import (
	"backend/libs/databases"
	"backend/src/structs"
)

type AccountRepository struct {
	db databases.SqliteDatabase
}

func NewAccountRepository(db databases.SqliteDatabase) AccountRepository {
	return AccountRepository{db}
}

func (instance *AccountRepository) Upsert(item structs.User) (structs.User, error) {
	query := `INSERT INTO accounts (email, password)
              VALUES (:email, :password)
              ON CONFLICT (email) DO
              UPDATE SET
                email = :email,
                password = :password
              WHERE email = :email`

	conn := instance.db.GetConnection()
	_, err := conn.NamedExec(query, &item)
	if err != nil {
		return item, err
	}
	return item, nil
}

func (instance *AccountRepository) AuthenticateByEmailAndPassword(user structs.User) (structs.User, error) {
	query := "SELECT email FROM accounts WHERE email = ? AND password = ? LIMIT 1"
	var found structs.User
	err := instance.db.GetConnection().Get(&found, query, user.Email, user.Password)
	if err != nil {
		return found, err
	}
	return found, nil
}
