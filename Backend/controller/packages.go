package packages

import (
	"net/http"
	"github.com/A12ise/SA67_Project_Order/config"
	"github.com/A12ise/SA67_Project_Order/entity"
	"github.com/gin-gonic/gin"
)

// GET /packages
func GetPackages(c *gin.Context) {
	var packages []entity.Package
	db := config.DB()
	db.Find(&packages)
	c.JSON(http.StatusOK, &packages)

}