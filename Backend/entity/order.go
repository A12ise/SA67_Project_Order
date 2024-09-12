package entity

import "gorm.io/gorm"


type Order struct {
	gorm.Model	

	BookingID 		uint `json:"booking_id"`
	Booking Booking `gorm:"foreignKey:BookingID"`

	EmployeeID 	uint `json:"employee_id"`
	Employee Employee `gorm:"foreignKey:employee_id"`

	Status_OrderID 		uint `json:"status_order_id"`
	Status_Order Status_Order `gorm:"foreignKey:Status_OrderID"`


	Order_Product []Order_Product `gorm:"foreignKey:OrderID"`
}