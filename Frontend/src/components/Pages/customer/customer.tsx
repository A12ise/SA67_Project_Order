import React, { useState, useEffect } from "react";
import { Table, Row, Col, Spin, Button, message } from "antd";
import { CheckCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";

function Customer() {
    const navigate = useNavigate();

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <h2>แดชบอร์ด</h2>
            </Col>
        </Row>
    );
}

export default Customer;