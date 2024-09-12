package controller

import (
   "net/http"
   "github.com/A12ise/SA67_Project_Order/config"
   "github.com/A12ise/SA67_Project_Order/entity"
   "github.com/gin-gonic/gin"
)

func GetRanks(c *gin.Context) {
   var ranks []entity.Rank

   db := config.DB()
   db.Find(&ranks)
   c.JSON(http.StatusOK, &ranks)
}