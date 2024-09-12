package controller

import (
   "net/http"
   "github.com/A12ise/SA67_Project_Order/config"
   "github.com/A12ise/SA67_Project_Order/entity"
   "github.com/gin-gonic/gin"
)

func GetStatusOrders(c *gin.Context) {
   var statusorders []entity.Status_Order

   db := config.DB()
   db.Model(&entity.Status_Order{}).Select("status_order_name").Find(&statusorders)
   c.JSON(http.StatusOK, statusorders)
}