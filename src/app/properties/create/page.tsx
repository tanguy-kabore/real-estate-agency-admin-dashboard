"use client";

import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Upload, Row, Col, Select, InputNumber } from "antd";
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';

import Cookies from 'js-cookie';
import dotenv from 'dotenv';

// Define the PropertyCreate component
export default function PropertyCreate() {
  const { formProps, saveButtonProps } = useForm({});
  dotenv.config();

  // const cloudName = process.env.CLOUD_NAME;
  // const presetKey = process.env.PRESET_KEY;
  const cloudName = 'dfz33bzhu';
  const presetKey = 'xmzadk8w'

  const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  // Récupérez les informations de l'utilisateur à partir du cookie
  const authCookieValue = Cookies.get("auth");
  const userInSession = authCookieValue ? JSON.parse(authCookieValue) : null;
  const userId = userInSession ? userInSession._id : null;

  // Return the PropertyCreate component JSX
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            {/* Form item for title */}
            <Form.Item
              label="Title"
              name={["title"]}
              rules={[
                {
                  required: true,
                  message: "Please enter the property title",
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* Form item for description */}
            <Form.Item
              label="Description"
              name={["description"]}
              rules={[
                {
                  required: true,
                  message: "Please enter the property description",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            {/* Form item for property type */}
            <Form.Item
              label="Property Type"
              name={["propertyType"]}
              rules={[
                {
                  required: true,
                  message: "Please select the property type",
                },
              ]}
            >
              <Select>
                <Select.Option value="house">House</Select.Option>
                <Select.Option value="apartment">Apartment</Select.Option>
                {/* Add other property types as needed */}
              </Select>
            </Form.Item>

            {/* Form item for price */}
            <Form.Item
              label="Price"
              name={["price"]}
              rules={[
                {
                  required: true,
                  message: "Please enter the property price",
                },
              ]}
            >
              <Input prefix="$" />
            </Form.Item>

            {/* Form item for surface */}
            <Form.Item
              label="Surface"
              name={["surface"]}
              rules={[
                {
                  required: true,
                  message: "Please enter the property surface area",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            {/* Form item for address */}
            <Form.Item label="Address">
              <Input.Group compact>
                <Form.Item
                  name={['address', 'street']}
                  noStyle
                  rules={[{ required: true, message: 'Street is required' }]}
                >
                  <Input placeholder="Street" />
                </Form.Item>
                <Form.Item
                  name={['address', 'city']}
                  noStyle
                  rules={[{ required: true, message: 'City is required' }]}
                >
                  <Input placeholder="City" />
                </Form.Item>
                <Form.Item
                  name={['address', 'zipCode']}
                  noStyle
                  rules={[{ required: true, message: 'Zip Code is required' }]}
                >
                  <Input placeholder="Zip Code" />
                </Form.Item>
                <Form.Item
                  name={['address', 'country']}
                  noStyle
                  rules={[{ required: true, message: 'Country is required' }]}
                >
                  <Input placeholder="Country" />
                </Form.Item>
              </Input.Group>
            </Form.Item>
            {/* Form item for bedrooms */}
            <Form.Item
              label="Bedrooms"
              name={["bedrooms"]}
              rules={[
                {
                  required: true,
                  type: "number",
                  message: "Please enter the number of bedrooms",
                },
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            {/* Form item for bathrooms */}
            <Form.Item
              label="Bathrooms"
              name={["bathrooms"]}
              rules={[
                {
                  required: true,
                  type: "number",
                  message: "Please enter the number of bathrooms",
                },
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            {/* Form item for living rooms */}
            <Form.Item
              label="Living Rooms"
              name={["livingrooms"]}
              rules={[
                {
                  required: true,
                  type: "number",
                  message: "Please enter the number of living rooms",
                },
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="Status"
              name={["status"]}
              rules={[
                {
                  required: true,
                  message: "Please select the status (for sale or for rent)",
                },
              ]}
            >
              {/* Utilisez le composant Select pour le champ de statut */}
              <Select placeholder="Select status">
                <Select.Option value="for-sale">À vendre</Select.Option>
                <Select.Option value="for-rent">À louer</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Creator"
              name={["creator", "_id"]}
              initialValue={userId}  // Utilisez l'ID de l'utilisateur en session comme valeur initiale
              hidden  // Cachez le champ, car il sera automatiquement rempli
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Photos"
          name={["photos"]}
          valuePropName="fileList"
          getValueFromEvent={(info: UploadChangeParam<UploadFile>) => {
            if (Array.isArray(info.fileList)) {
              return info.fileList.map((file) => ({
                uid: file.uid,
                name: file.name,
                url: file.response?.secure_url || file.url,
                status: file.status,
              }));
            } else {
              return [];
            }
          }}
          noStyle
          rules={[
            {
              required: true,
              message: "Please upload property photos",
              type: 'array',
            },
          ]}
        >
          <Upload.Dragger
            name="file"
            action={`${apiUrl}?upload_preset=${presetKey}`}
            listType="picture"
            maxCount={5}
            multiple={true}
            style={{ padding: '10px', borderRadius: '8px' }}
          >
            <p className="ant-upload-text" style={{ marginBottom: '8px' }}>Drag & drop property photos here</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Create>
  );
}