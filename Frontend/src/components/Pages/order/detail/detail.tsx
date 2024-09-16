import React, { useState, useEffect } from "react";
import { Table, Button, Col, Row, Modal, message, Form } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
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

  const getOrders = async () => {
    try {
      const res = await GetOrders(); // ดึงข้อมูลจาก API
      if (res.status === 200) {
        setOrders(res.data); // เซ็ตข้อมูลที่ได้จาก API
      } else {
        setOrders([]);
        message.error(res.data.error || "ไม่สามารถดึงข้อมูลได้");
      }
    } catch (error) {
      setOrders([]);
      message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };
  console.log("EmployeeID =",employeeID);
  
  const onFinish = async ( values: OrderInterface) => {
    values.EmployeeID = Number(employeeID)
    try {
      const res = await UpdateOrder(id, values);
      if (res && res.status === 200) {
        message.open({
          type: "success",
          content: res.data.message || "อัปเดตออเดอร์สำเร็จ",
        });
        setTimeout(() => {
          navigate("/order");  // กลับไปยัง path "/order"
        }, 2000);
      } else {
        message.open({
          type: "error",
          content: res.data?.error || "เกิดข้อผิดพลาดในการอัปเดตออเดอร์",
        });
      }
    } catch (error) {
      message.open({
        type: "error",
        content: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
      });
    }
  };


  const getProductByID = async (id: string) => {
    let res = await GetProductsByID(id);
    if (res.status === 200) {
      // Setting the fields of the form with the fetched data
      form.setFieldsValue({
        ProductName: res.data.ProductName,
        CategoryID: res.data.CategoryID,
      });
      // Update the state with the fetched order product details
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
      // Setting the fields of the form with the fetched data
      form.setFieldsValue({
        Quantity: res.data.Quantity,
      });
      // Update the state with the fetched order product details
      setOrderProductByOrderID(res.data);
    } else {
      message.error("ไม่พบข้อมูล");
      setTimeout(() => {
        navigate("/order");
      }, 2000);
    }
  };

  // You might need to call this function in useEffect to fetch the product details when the component mounts
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
    }
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
              borderColor: '#4CAF50'
            }}
            onClick={showModal}
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
              onClick={() => form.submit()}  // เรียก form.submit เพื่อเรียก onFinish
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
