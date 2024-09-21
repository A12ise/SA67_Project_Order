import React, { useState } from "react";
import { Layout, Menu, Button, message } from "antd";
import {
    HomeOutlined,
    ShoppingCartOutlined,
    InfoCircleOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import Customer from "../Pages/customer/customer"; // Import your desired component

const { Sider, Content, Header } = Layout;

function SiderCustomer() {
    const page = localStorage.getItem("page");
    const [messageApi, contextHolder] = message.useMessage();
    const [collapsed, setCollapsed] = useState(true);

    const toggleSider = () => {
        setCollapsed(!collapsed);
    };

    const setCurrentPage = (val: string) => {
        localStorage.setItem("page", val);
    };

    return (
        <>
            {contextHolder}
            <Layout style={{ minHeight: "100vh" }}>
                {/* Conditionally render Sider based on collapsed state */}
                {!collapsed && (
                    <Sider style={{ backgroundColor: '#FF7D29' , zIndex: 1 }}>
                        <Menu
                            style={{ backgroundColor: "#FF7D29" }}
                            defaultSelectedKeys={[page ? page : "customer"]}
                            mode="inline"
                        >
                            <Menu.Item key="customer" onClick={() => setCurrentPage("customer")}>
                                <Link to="/customer">
                                    <HomeOutlined />
                                    <span>หน้าแรก</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="allorder" onClick={() => setCurrentPage("allorder")}>
                                <Link to="/login">
                                    <ShoppingCartOutlined />
                                    <span>หน้าแรก</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<InfoCircleOutlined />}>
                                ติดตามสถานะ
                            </Menu.Item>
                        </Menu>
                    </Sider>
                )}

                <Layout>
                <Header style={{ backgroundColor: '#FF7D29', padding: 0, zIndex: 1,alignContent:'center' }}>
                        <Button
                            type="primary"
                            onClick={toggleSider}
                            style={{ marginLeft: '16px', backgroundColor: '#FF7D29', borderColor: '#FF7D29' }}
                        >
                            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        </Button>
                        <span style={{ color: 'white', marginLeft: '16px' }}>สั่งอาหารโต๊ะ 0</span>
                    </Header>

                    <Content style={{maxHeight: '70vh', zIndex: 0 }}>
                        <Customer />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

export default SiderCustomer;
