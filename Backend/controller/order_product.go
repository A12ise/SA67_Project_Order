package controller

import (
	"github.com/A12ise/SA67_Project_Order/config"
   "github.com/A12ise/SA67_Project_Order/entity"
	"github.com/gin-gonic/gin"
	"net/http"
)

// func CreateOrderProducts(c *gin.Context) {
// 	var orderproducts entity.Order_Product

	
// 	if err := c.ShouldBindJSON(&orderproducts); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	db := config.DB()

// 	// ค้นหา product ด้วย id
// 	var product entity.Product
// 	db.First(&product, orderproducts.ProductID)
// 	if product.ID == 0 {
// 		c.JSON(http.StatusNotFound, gin.H{"error": "product not found"})
// 		return
// 	}

// 	// ค้นหา order ด้วย id
// 	var order entity.Order
// 	db.First(&order, orderproducts.OrderID)
// 	if order.ID == 0 {
// 		c.JSON(http.StatusNotFound, gin.H{"error": "order not found"})
// 		return
// 	}

// 	// สร้าง OrderProduct
// 	op := entity.Order_Product{
// 		OrderID:   orderproducts.OrderID,
// 		ProductID: orderproducts.ProductID,
// 		Quantity:  orderproducts.Quantity,
// 	}

// 	// บันทึก OrderProduct ลงในฐานข้อมูล
// 	if err := db.Create(&op).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusCreated, gin.H{"message": "order product created successfully"})
// }
func GetOrderProductsByOrderID(c *gin.Context) {
    // Get the order ID from the URL parameter
    ID := c.Param("id")

    // Define a slice to store the result
    var orderproduct []entity.Order_Product

    // Get a DB instance
    db := config.DB()

    // Use the order ID in the query to filter the records
    results := db.Preload("Order").Raw(`
        SELECT * FROM Order_Products
        INNER JOIN orders ON orders.id = order_products.order_id 
        WHERE Order_Products.order_id = ?`, ID).Scan(&orderproduct)

    // Check for errors in the query
    if results.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }

    // Respond with the result if successful
    c.JSON(http.StatusOK, orderproduct)
}


