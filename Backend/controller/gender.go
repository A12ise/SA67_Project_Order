package controller

import (
   "net/http"
   "github.com/A12ise/SA67_Project_Order/config"
   "github.com/A12ise/SA67_Project_Order/entity"
   "github.com/gin-gonic/gin"
)

func GetGenders(c *gin.Context) {
   var genders []entity.Gender

   db := config.DB()
   db.Find(&genders)
   c.JSON(http.StatusOK, &genders)
}