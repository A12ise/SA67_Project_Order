package controller

import (
	"net/http"
	"github.com/A12ise/SA67_Project_Order/config"
	"github.com/A12ise/SA67_Project_Order/entity"
	"github.com/gin-gonic/gin"
)

func GetTablebyID(c *gin.Context){
	var Table []entity.Table
	db := config.DB()
	db.Find(&Table)
	if db.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": db.Error.Error()})
        return
    }
	c.JSON(http.StatusOK, &Table)
}