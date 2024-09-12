package controller

import (
	"github.com/A12ise/SA67_Project_Order/config"
   "github.com/A12ise/SA67_Project_Order/entity"
	"github.com/gin-gonic/gin"
	"net/http"
)

func CreateOrderProducts(c *gin.Context) {
	var orderproducts entity.Order_Product

	
	if err := c.ShouldBindJSON(&orderproducts); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// ค้นหา product ด้วย id
	var product entity.Product
	db.First(&product, orderproducts.ProductID)
	if product.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "product not found"})
		return
	}

	// ค้นหา order ด้วย id
	var order entity.Order
	db.First(&order, orderproducts.OrderID)
	if order.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "order not found"})
		return
	}

	// สร้าง OrderProduct
	op := entity.Order_Product{
		OrderID:   orderproducts.OrderID,
		ProductID: orderproducts.ProductID,
		Quantity:  orderproducts.Quantity,
	}

	// บันทึก OrderProduct ลงในฐานข้อมูล
	if err := db.Create(&op).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "order product created successfully"})
}

func GetOrderProducts(c *gin.Context) {
	var orderproducts []entity.Order_Product

	db := config.DB()
	db.Find(&orderproducts)
	c.JSON(http.StatusOK, &orderproducts)
}

func GetOrderProductByID(c *gin.Context) {
	ID := c.Param("id")
	var order entity.Order
 
	db := config.DB()
	results := db.First(&order, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
 
	if order.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, order)
 }
