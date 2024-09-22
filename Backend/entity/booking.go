package entity

import (

    "gorm.io/gorm"

)

type Booking struct {

    gorm.Model
    NumberOfCustomer  uint      `json:"number_of_customers"`

    PackageID         uint        `json:"package_id"`
    Package           Package     `json:"package" gorm:"foreignKey:PackageID"`

    TableID           uint     `json:"table_id"`
    Table             Table     `gorm:"foreignKey:TableID"`

    MemberID          uint     `json:"member_id"`
    Member            Member    `gorm:"foreignKey:MemberID"`

    EmployeeID        uint     `json:"employee_id"`
    Employee          Employee  `gorm:"foreignKey:EmployeeID"`

    Order []Order `gorm:"foreignKey:BookingID"`
    
}