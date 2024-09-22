package controller

import (
   "net/http"
   "github.com/A12ise/SA67_Project_Order/config"
   "github.com/A12ise/SA67_Project_Order/entity"
   "github.com/gin-gonic/gin"
   "strconv"
)

func GetBookingl(c *gin.Context) {
   var bookings []entity.Booking
   db := config.DB()

   if db == nil {
       c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection failed"})
       return
   }

   if err := db.Preload("Package").Preload("Table").Preload("Employee").Preload("Soups").Find(&bookings).Error; err != nil {
       c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
       return
   }

   c.JSON(http.StatusOK, bookings)
}

func GetByID(c *gin.Context) {
   ID := c.Param("id")
   var booking entity.Booking

   db := config.DB()
   if db == nil {
       c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection failed"})
       return
   }

   // ตรวจสอบให้แน่ใจว่า ID เป็นตัวเลข
   if _, err := strconv.Atoi(ID); err != nil {
       c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid booking ID"})
       return
   }

   // Preload related data including Soups
   if err := db.Preload("Package").
       Preload("Table").
       Preload("Employee").
       Preload("Soups"). 
       First(&booking, ID).Error; err != nil {
       c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
       return
   }

   if booking.ID == 0 {
       c.JSON(http.StatusNoContent, gin.H{})
       return
   }
   c.JSON(http.StatusOK, booking)
}