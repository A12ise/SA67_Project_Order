package entity

import "gorm.io/gorm"

type Order_Product struct {
	gorm.Model
	Quantity    uint `json:"quantity"`

	OrderID    uint `json:"order_id"`
	Orders       Order   `gorm:"foreignKey:OrderID"`

	ProductID  uint `json:"product_id"`
	Products     Product `gorm:"foreignKey:ProductID"`

	
	
}
