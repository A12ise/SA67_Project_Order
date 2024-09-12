package entity

import(
	"gorm.io/gorm"
) 

type Position struct{
	gorm.Model
	Name 	string
			
	Employees 	[]Employee 		`gorm:"foreignKey:PositionID"`
}