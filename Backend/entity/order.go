package entity

import "gorm.io/gorm"


type Order struct {
	gorm.Model	
	Name		string

	BookingID 		*uint `json:"booking_id"`
	Booking Booking `gorm:"foreignKey:booking_id"`

	EmployeeID 	*uint `json:"employee_id"`
	Employee Employee `gorm:"foreignKey:employee_id"`

	Status_OrderID 		*uint `json:"status_order_id"`
	Status_Order Status_Order `gorm:"foreignKey:status_order_id"`


	Order_Product []Order_Product `gorm:"foreignKey:order_id"`
}