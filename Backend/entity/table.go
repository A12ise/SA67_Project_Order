package entity

import (

	"gorm.io/gorm"

)

type Table struct {

	gorm.Model
    TableType       string          `json:"table_type"`
    Price           int             `json:"price"`

}