import React, { useState, useEffect } from "react";
import { Table, Button, Col, Row, Modal, message, Form } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { OrderProductInterface } from "../../../../interfaces/OrderProduct";
import { GetOrderProductsByOrderID } from "../../../../services/https";
import { OrderInterface } from "../../../../interfaces/Order";
import { ProductInterface } from "../../../../interfaces/Product";
import { GetOrders, GetProductsByID, UpdateOrder } from "../../../../services/https";

function OrderDetail() {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderproduct, setOrderProductByOrderID] = useState<OrderProductInterface[]>([]);
  const [product, setProductsByID] = useState<ProductInterface[]>([]);
  const [order, setOrders] = useState<OrderInterface[]>([]);
  const [form] = Form.useForm(); // Ant Design form
  const { id } = useParams<{ id: string }>();
  const employeeID = localStorage.getItem("id");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track button state

  const getOrders = async () => {
    try {
      const res = await GetOrders(); // ดึงข้อมูลจาก API
      if (res.status === 200) {
        setOrders(res.data.StatusOrderID); // เซ็ตข้อมูลที่ได้จาก API
      } else {
        setOrders([]);
        message.error(res.data.error || "ไม่สามารถดึงข้อมูลได้");
      }
    } catch (error) {
      setOrders([]);
      message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };

  console.log("EmployeeID =", employeeID);

  const onFinish = async (values: OrderInterface) => {
    values.EmployeeID = Number(employeeID); // Ensure EmployeeID is a valid number
    console.log("Values being sent to UpdateOrder:", values, "ID:", id); // Log values and id

    setIsSubmitting(true); // Disable the button after the first click

    try {
      const res = await UpdateOrder(id, values);
      if (res && res.status === 200) {
        message.open({
          type: "success",
          content: res.data.message || "Order updated successfully",
        });
        setTimeout(() => {
          navigate("/order"); // Navigate to order list
        }, 2000);
      } else {
        message.open({
          type: "error",
          content: res.data?.error || "Error updating the order",
        });
        setIsSubmitting(false); // Re-enable the button in case of error
      }
    } catch (error) {
      message.open({
        type: "error",
        content: "Cannot connect to the server",
      });
      setIsSubmitting(false); // Re-enable the button in case of error
    }
  };

  const getProductByID = async (id: string) => {
    let res = await GetProductsByID(id);
    if (res.status === 200) {
      form.setFieldsValue({
        ProductName: res.data.ProductName,
        CategoryID: res.data.CategoryID,
      });
      setProductsByID(res.data);
    } else {
      message.error("ไม่พบข้อมูล");
      setTimeout(() => {
        navigate("/order");
      }, 2000);
    }
  };

  const getOrderProductByOrderID = async (id: string) => {
    let res = await GetOrderProductsByOrderID(id);
    if (res.status === 200) {
      form.setFieldsValue({
        Quantity: res.data.Quantity,
      });
      setOrderProductByOrderID(res.data);
    } else {
      message.error("ไม่พบข้อมูล");
      setTimeout(() => {
        navigate("/order");
      }, 2000);
    }
  };

  useEffect(() => {
    if (id) {
      getOrderProductByOrderID(id);
      getProductByID(id);
    }
    getOrders();
  }, [id]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsSubmitting(false); // Reset submit state in case of cancel
  };

  const column = [
    {
      title: "ลำดับ",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "ประเภทสินค้า",
      key: "category_id",
      align: "center",
      render: (record: any) => <>{record.Products?.category_id || "N/A"}</>,
    },
    {
      title: "ชื่ออาหาร",
      key: "product_name",
      align: "center",
      render: (record: any) => <>{record.Products?.product_name || "N/A"}</>,
    },
    {
      title: "จำนวน",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
  ];

  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Row>
          <Col style={{ marginTop: "-20px" }}>
            <h2>รายละเอียดออเดอร์</h2>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table dataSource={orderproduct} columns={column} pagination={{ pageSize: 10 }} />
          </Col>
        </Row>

        <div style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            size="large"
            style={{
              marginTop: "25px",
              backgroundColor: '#4CAF50',
              borderColor: '#4CAF50',
            }}
            onClick={showModal}
            disabled={isSubmitting} // Disable button if it's submitting
          >
            ยืนยันการเสิร์ฟอาหาร
          </Button>
        </div>

        <Modal
          title="ยืนยันการเสิร์ฟ"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="back" size="small" onClick={handleCancel} style={{ height: '40px', width: '80px', margin: '15px' }}>
              ยกเลิก
            </Button>,
            <Button
              key="submit"
              type="primary"
              size="small"
              style={{ height: '40px', width: '80px' }}
              onClick={() => form.submit()}  // Submit the form
              disabled={isSubmitting}  // Disable if it's submitting
            >
              ยืนยัน
            </Button>,
          ]}
        >
          <p>คุณต้องการยืนยันการเสิร์ฟอาหารหรือไม่?</p>
        </Modal>
      </Form>
    </>
  );
}

export default OrderDetail;
