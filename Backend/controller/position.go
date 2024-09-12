package controller

import (
   "net/http"
   "github.com/A12ise/SA67_Project_Order/config"
   "github.com/A12ise/SA67_Project_Order/entity"
   "github.com/gin-gonic/gin"
)

func GetPositions(c *gin.Context) {
   var positions []entity.Position
   
   db := config.DB()
   db.Find(&positions)
   c.JSON(http.StatusOK, &positions)
}