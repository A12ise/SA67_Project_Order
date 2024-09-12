package entity

import "gorm.io/gorm"

type Status_Order struct {
	gorm.Model

	Status_Order_name string `json:"status_order_name"`

	Orders []Order `gorm:"foreignKey:Status_OrderID"`
}
