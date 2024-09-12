package entity

import(
	"gorm.io/gorm"
) 

type Employee struct{
	gorm.Model
	FirstName		string		
	LastName		string	
	Email			string	
	Password		string		
	Profile   		string 		`gorm:"type:longtext"`

	// FK from Gender
	GenderID		uint
	Gender			Gender 		`gorm:"foreignKey: GenderID"`
	// FK from Position
	PositionID		uint
	Position		Position 	`gorm:"foreignKey: PositionID"`

	Members			[]Member	`gorm:"foreignKey:EmployeeID"`
	Booking 		[]Booking	`gorm:"foreignKey:EmployeeID"`
	Orders 			[]Order 	`gorm:"foreignKey:EmployeeID"`
	Product 		[]Product 	`gorm:"foreignKey:EmployeeID"`
}