import React, { useState, useEffect } from "react";
import { Table, Row, Col, Spin, Button, message, Card } from "antd";
import { CheckCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import Background from "../../../assets/background_customer.webp"
import "./customer.css"

function Customer() {
    const navigate = useNavigate();

    return (
        <div className="card-container"> {/* Container for centering */}
            <img className="img-background" src={Background} alt="Background" />
            <Row>
                <Card className="card-customer">
                    <Row>
                        <Card>
                            <h3>เนื้อสัตว์</h3>
                        </Card>
                    </Row>
                    <Row>
                        <Card>
                            <h3>ผัก</h3>
                        </Card>
                    </Row>
                    <Row>
                        <Card>
                            <h3>อาหารทะเล</h3>
                        </Card>
                    </Row>
                    <Row>
                        <Card>
                            <h3>ขนมหวาน</h3>
                        </Card>
                    </Row>
                    
                </Card>
            </Row>
        </div>
    );
}

export default Customer;