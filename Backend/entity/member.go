package entity

import(
	"gorm.io/gorm"
) 

type Member struct{
	gorm.Model
	FirstName		string			
	LastName		string			
	PhoneNumber		string						

	// FK from Rank
	RankID			uint
	Rank			Rank		`gorm:"foreignKey: RankID"`
	// FK from Employee
	EmployeeID		uint		
	Employee		Employee	`gorm:"foreignKey: EmployeeID"`
}