package controller

import (
   "net/http"
   "github.com/A12ise/SA67_Project_Order/config"
   "github.com/A12ise/SA67_Project_Order/entity"
   "github.com/gin-gonic/gin"
)

func GetBookings(c *gin.Context) {
   var bookings []entity.Booking

   db := config.DB()
   db.Find(&bookings)
   c.JSON(http.StatusOK, &bookings)
}