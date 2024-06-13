"use client";

import React from 'react';
import {
  Show,
  TextField,
} from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Row, Col } from "antd";

const { Title } = Typography;

export default function UserShow() {
  const { queryResult } = useShow({});
  const usersData = queryResult?.data?.data;

  return (
    <Show isLoading={queryResult.isLoading}>
      <Row gutter={[16, 24]}>
        <Col span={12}>
          <Title level={5}>{"ID"}</Title>
          <TextField value={usersData?._id ?? ""} />
          <Title level={5}>{"Name"}</Title>
          <TextField value={usersData?.name} />
          <Title level={5}>{"Email"}</Title>
          <TextField value={usersData?.email} />
          <Title level={5}>{"Phones"}</Title>
          {usersData?.phone?.map((phone: Phone, index: number) => (
            <div key={index} style={{ display: 'flex', alignItems: 'baseline', marginBottom: 12 }}>
              <TextField value={phone?.countryCode} style={{ marginRight: 5, flexBasis: '5%' }} />
              <TextField value={phone?.phoneNumber} style={{ flex: 1 }} />
            </div>
          ))}
          <Title level={5}>{"Address"}</Title>
          <TextField value={`${usersData?.address?.street}, ${usersData?.address?.city}, ${usersData?.address?.zipCode}, ${usersData?.address?.country}`} />
          <Title level={5}>{"Status"}</Title>
          <TextField value={usersData?.status} />
          <Title level={5}>{"Role"}</Title>
          <TextField value={usersData?.roles} />
        </Col>
        <Col span={12}>
          <Title level={5}>{"Avatar"}</Title>
          {usersData?.avatar?.map((image: Image, index: number) => (
            <img key={index} src={image?.url} alt={`Avatar ${index + 1}`} style={{ maxWidth: "50%", marginBottom: 12 }} />
          ))}
        </Col>
      </Row>
    </Show>
  );
}

interface Phone {
  countryCode: string;
  phoneNumber: string;
  // Add other fields if necessary
}

interface Image {
  uid: string;
  name: string;
  url: string;
  type: string;
  size: number;
  percent: number;
  status: string;
}