import React, { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Modal, message, Form, Layout } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { OrderProductInterface } from "../../../../interfaces/OrderProduct";
import { GetOrderProductsByOrderID } from "../../../../services/https";

function OrderDetail() {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [orderproduct, setOrderProductByOrderID] = useState<OrderProductInterface[]>([]);
    const [form] = Form.useForm(); // Ant Design form
    const { id } = useParams<{ id: string }>();

    const getOrderProductByOrderId = async (id: string) => {
      let res = await GetOrderProductsByOrderID(id);
      if (res.status === 200) {
        // Setting the fields of the form with the fetched data
        form.setFieldsValue({
          Quantity: res.data.Quantity,
          OrderID: res.data.OrderID,
          ProductID: res.data.ProductID,
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
        getOrderProductByOrderId(id);
      }
    }, [id]);

    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const columns = [
        {
            title: "ลำดับ",
            dataIndex: "ID",
            key: "id",
            align: "center",
        },
        {
            title: "ประเภทสินค้า",
            dataIndex: "ProductType",
            key: "category_id",
            align: "center",
        },
        {
            title: "ชื่ออาหาร",
            dataIndex: "ProductName",
            key: "product_name",
            align: "center",
        },
        {
            title: "จำนวน",
            key: "quantity",
            align: "center",
            render: (record: any) => <>{record.Order_Products?.quantity || "N/A"}</>,
        }
    ];

    return (
        <>
            <Row>
                <Col style={{ marginTop: "-20px" }}>
                    <h2>รายละเอียดออเดอร์</h2>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table dataSource={orderproduct} columns={columns} pagination={false}/>
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
                <Link to="/order" key="submit">
                  <Button type="primary" size="small" style={{ height: '40px', width: '80px' }}>
                    ยืนยัน
                  </Button>
                </Link>,
              ]}
            >
              <p>คุณต้องการยืนยันการเสิร์ฟอาหารหรือไม่?</p>
            </Modal>
        </>
    );
}

export default OrderDetail;
