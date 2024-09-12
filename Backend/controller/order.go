package controller

import (
   "net/http"
   "github.com/A12ise/SA67_Project_Order/config"
   "github.com/A12ise/SA67_Project_Order/entity"
   "github.com/gin-gonic/gin"
)

// ฟังก์ชันสร้าง Order โดยใช้ gorm.Model ในการจัดการ ID
// func CreateOrder(c *gin.Context) {
//    var orders entity.Order

//    if err := c.ShouldBindJSON(&orders); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

//    db := config.DB()

//    var status entity.Status_Order
// 	db.First(&status, orders.Status_OrderID)
//    if status.ID == 0 {
// 		c.JSON(http.StatusNotFound, gin.H{"error": "status order not found"})
// 		return
// 	}

//    var employee entity.Employee
// 	db.First(&employee, orders.EmployeeID)
// 	if employee.ID == 0 {
// 		c.JSON(http.StatusNotFound, gin.H{"error": "employee not found"})
// 		return
// 	}

//    // บันทึกคำสั่งซื้อใหม่ลงฐานข้อมูล
//    if err := db.Create(&orders).Error; err != nil {
//        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
//        return
//    }

//    // ส่งคำสั่งซื้อใหม่กลับไปยัง client
//    c.JSON(http.StatusCreated, gin.H{"message": "order created successfully", "order": orders})
// }

// ฟังก์ชันอัปเดตสถานะของ Order
// func UpdateOrderStatus(c *gin.Context) {
//    db := c.MustGet("db").(*gorm.DB)
//    orderID := c.Param("orderID")  // รับค่า orderID จาก URL พารามิเตอร์
//    var requestBody struct {
//        Status string `json:"status"`
//    }

//    if err := c.ShouldBindJSON(&requestBody); err != nil {
//        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
//        return
//    }

//    var order Order

//    // ค้นหา Order จาก OrderID
//    if err := db.Where("order_id = ?", orderID).First(&order).Error; err != nil {
//        c.JSON(http.StatusNotFound, gin.H{"error": "order not found"})
//        return
//    }

//    // อัปเดตสถานะใหม่
//    order.Status = requestBody.Status
//    order.UpdatedAt = time.Now()

//    // บันทึกการเปลี่ยนแปลง
//    if err := db.Save(&order).Error; err != nil {
//        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
//        return
//    }

//    c.JSON(http.StatusOK, gin.H{"message": "order status updated successfully", "order": order})
// }

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