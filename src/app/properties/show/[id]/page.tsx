"use client";

import React from 'react';
import {
  Show,
  TextField,
} from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Row, Col, Tag } from "antd";

const { Title } = Typography;

interface PropertyData {
  _id?: string;
  title?: string;
  description?: string;
  propertyType?: string;
  price?: number;
  surface?: number;
  bedrooms?: number;
  bathrooms?: number;
  livingrooms?: number;
  address?: {
    street?: string;
    city?: string;
    zipCode?: string;
    country?: string;
  };
  status?: string;
  creator?: {
    _id?: string;
  };
  photos?: {
    url: string;
  }[];
}

export default function PropertyShow() {
  const { queryResult } = useShow<PropertyData>({});
  const propertyData = queryResult?.data?.data;

  return (
    <Show isLoading={queryResult.isLoading}>
      <Row gutter={[16, 24]}>
        <Col span={12}>
          <Title level={5}>{"ID"}</Title>
          <TextField value={propertyData?._id ?? ""} />
          <Title level={5}>{"Title"}</Title>
          <TextField value={propertyData?.title} />
          <Title level={5}>{"Description"}</Title>
          <TextField value={propertyData?.description} />
          <Title level={5}>{"Property Type"}</Title>
          <TextField value={propertyData?.propertyType} />
          <Title level={5}>{"Price"}</Title>
          <TextField value={`$${propertyData?.price}`} />
          <Title level={5}>{"Surface"}</Title>
          <TextField value={propertyData?.surface} />
          <Title level={5}>{"Bedrooms"}</Title>
          <TextField value={propertyData?.bedrooms} />
          <Title level={5}>{"Bathrooms"}</Title>
          <TextField value={propertyData?.bathrooms} />
          <Title level={5}>{"Living Rooms"}</Title>
          <TextField value={propertyData?.livingrooms} />
          <Title level={5}>{"Address"}</Title>
          <TextField value={`${propertyData?.address?.street}, ${propertyData?.address?.city}, ${propertyData?.address?.zipCode}, ${propertyData?.address?.country}`} />
          <Title level={5}>{"Status"}</Title>
          <Tag color={propertyData?.status === "for-sale" ? "green" : "blue"}>{propertyData?.status === "for-sale" ? "For Sale" : "For Rent"}</Tag>
          <Title level={5}>{"Creator"}</Title>
          <TextField value={propertyData?.creator?._id} />
        </Col>
        <Col span={12}>
          <Title level={5}>{"Photos"}</Title>
          {propertyData?.photos?.map((photo, index) => (
            <img key={index} src={photo.url} alt={`Photo ${index + 1}`} style={{ maxWidth: "50%", marginBottom: 12 }} />
          ))}
        </Col>
      </Row>
    </Show>
  );
}