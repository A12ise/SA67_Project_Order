package controller

import (
   "net/http"
   "github.com/A12ise/SA67_Project_Order/config"
   "github.com/A12ise/SA67_Project_Order/entity"
   "github.com/gin-gonic/gin"
)

func GetOrders(c *gin.Context) {
   var orders []entity.Order

   db := config.DB()
   results := db.Preload("Employee").
   Preload("Booking").
   Preload("Status_Order").
   Preload("Booking.Table").
   Find(&orders)
    if results.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, orders)
}

func UpdateOrder(c *gin.Context) {
    var order entity.Order
	orderID := c.Param("id")

	db := config.DB()
	result := db.First(&order, orderID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&order)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ยืนยันการเสิร์ฟสำเร็จ"})
}