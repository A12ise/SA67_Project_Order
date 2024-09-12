package entity

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Product_code_id   string `json:"product_code_id"`

	Product_name string	`json:"product_name"`

	Category_id  string	`json:"category_id"`

	EmployeeID  uint	`json:"employee_id"`
	Employee Employee `gorm:"foreignKey:EmployeeID"`

	Order_Product []Order_Product `gorm:"foreignKey:ProductID"`

}
