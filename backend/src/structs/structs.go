package structs

type User struct {
	Email    string `db:"email" json:"email"`
	Password string `db:"password" json:"password"`
}
