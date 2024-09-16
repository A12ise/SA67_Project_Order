package controller

import (
    "net/http"
    "github.com/A12ise/SA67_Project_Order/config"
    "github.com/A12ise/SA67_Project_Order/entity"
    "github.com/gin-gonic/gin"
)

// GetOrders retrieves all orders with related data
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

// UpdateOrder updates the EmployeeID and Status_OrderID for an order
func UpdateOrder(c *gin.Context) {
    var order entity.Order
    orderID := c.Param("id")

    db := config.DB()

    // Fetch the order from the database
    result := db.First(&order, orderID)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Order ID not found"})
        return
    }

    var input struct {
        EmployeeID uint `json:"employee_id"`  // EmployeeID is now a pointer
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error":   "Bad request, unable to map payload",
            "details": err.Error(),
        })
        return
    }

	var employee entity.Employee
	result = db.First(&employee, input.EmployeeID)
	if employee.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "employee not found"})
		return
	}

    // Update the EmployeeID field
    if err := db.Model(&order).Update("EmployeeID", result).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update EmployeeID"})
        return
    }

    // Update the Status_OrderID field
    if err := db.Model(&order).Update("Status_OrderID", 1).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update order status"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Order updated successfully"})
}
