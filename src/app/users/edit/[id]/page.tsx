"use client";

import React, { useState, useEffect } from 'react';
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Upload, Row, Col, Space, Button } from "antd";
import { UserOutlined, MailOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import dotenv from 'dotenv';

export default function UserEdit() {
  const { formProps, saveButtonProps, queryResult } = useForm({});
  dotenv.config();

  const cloudName = process.env.CLOUD_NAME;
  const presetKey = process.env.PRESET_KEY;

  const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const usersData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Name"
              name={["name"]}
              initialValue={usersData?.name}
              rules={[
                {
                  required: true,
                  message: "Please enter the user's name",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email"
              name={["email"]}
              initialValue={usersData?.email}
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input prefix={<MailOutlined />} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Phone">
              <Form.List name="phone">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'countryCode']}
                          fieldKey={[fieldKey ?? 0, 'countryCode']}
                          initialValue={usersData?.phone[key]?.countryCode}
                          rules={[{ required: true, message: 'Missing country code' }]}
                        >
                          <Input placeholder="Country Code" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'phoneNumber']}
                          fieldKey={[fieldKey ?? 0, 'phoneNumber']}
                          initialValue={usersData?.phone[key]?.phoneNumber}
                          rules={[{ required: true, message: 'Missing phone number' }]}
                        >
                          <Input placeholder="Phone Number" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                        Add Phone
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Address">
              <Input.Group compact>
                <Form.Item
                  name={['address', 'street']}
                  noStyle
                  initialValue={usersData?.address?.street}
                  rules={[{ required: true, message: 'Street is required' }]}
                >
                  <Input placeholder="Street" />
                </Form.Item>
                <Form.Item
                  name={['address', 'city']}
                  noStyle
                  initialValue={usersData?.address?.city}
                  rules={[{ required: true, message: 'City is required' }]}
                >
                  <Input placeholder="City" />
                </Form.Item>
                <Form.Item
                  name={['address', 'zipCode']}
                  noStyle
                  initialValue={usersData?.address?.zipCode}
                  rules={[{ required: true, message: 'Zip Code is required' }]}
                >
                  <Input placeholder="Zip Code" />
                </Form.Item>
                <Form.Item
                  name={['address', 'country']}
                  noStyle
                  initialValue={usersData?.address?.country}
                  rules={[{ required: true, message: 'Country is required' }]}
                >
                  <Input placeholder="Country" />
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Avatar">
          <Form.Item
            name="avatar"
            valuePropName="fileList"
            getValueFromEvent={(info) => {
              if (Array.isArray(info)) {
                return info.map((file) => ({
                  uid: file.uid,
                  name: file.name,
                  url: file.response?.secure_url || file.url,
                  status: file.status,
                }));
              } else {
                const file = info.file;
                return [
                  {
                    uid: file.uid,
                    name: file.name,
                    url: file.response?.secure_url || file.url,
                    status: file.status,
                  },
                ];
              }
            }}
            noStyle
          >
            <Upload.Dragger
              name="file"
              action={`${apiUrl}?upload_preset=${presetKey}`}
              listType="picture"
              maxCount={1}
            /* multiple */
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Status"
              name={["status"]}
              initialValue={usersData?.status}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                defaultValue={usersData?.status}
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ]}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Role"
              name={["roles"]}
              initialValue={usersData?.role}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                defaultValue={usersData?.role}
                options={[
                  { value: "user", label: "User" },
                  { value: "admin", label: "Admin" },
                ]}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Edit>
  );
}