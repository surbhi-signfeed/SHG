"use client";

import React from "react";
import { Form, Input, Button, Checkbox, Select } from "antd";
import TopNavbar from "@/app/Component/Topnavbar/page";
import Sidebar from "@/app/Component/Sidebar/page";

const { Option } = Select;

const UpdateUser: React.FC = () => {
  const [form] = Form.useForm();

  // Function to handle form submission
  const onFinish = (values: any) => {
    console.log("Form Submitted:", values);
  };

  // Function to handle form reset
  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <TopNavbar />

      <div className="flex bg-gray-100">
        {/* Sidebar - fixed width */}
        <div className="lg:w-1/4 h-screen">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4 mt-[100px] xl:ml-[-50px] bg-white">
          <div className="container mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4 lg:ml-[20px]">
              Update User
            </h2>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="bg-white p-2  rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Form.Item name="UserName" className="text-gray-600">
                  {" "}
                  <h4 className="font-semibold mb-2 text-[14px] text-gray-600">
                   User Name
                  </h4>
                  <Input placeholder="Enter User Name" />
                </Form.Item>
                <Form.Item name="Phone Number" className="text-gray-600">
                  {" "}
                  <h4 className="font-semibold mb-2 text-[14px] text-gray-600">
                   Phone Number
                  </h4>
                  <Input placeholder="Enter Number" />
                </Form.Item> 
                <Form.Item name="Email" className="text-gray-600">
                  {" "}
                  <h4 className="font-semibold mb-2 text-[14px] text-gray-600">
                Email
                  </h4>
                  <Input placeholder="Enter Email" />
                </Form.Item>
                <Form.Item name="status">
                  <h4 className="font-semibold mb-2 text-[14px] text-gray-600">
                    Status
                  </h4>
                  <Select defaultValue="Active">
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="EmployeeCode" className="text-gray-600">
                  {" "}
                  <h4 className="font-semibold mb-2 text-[14px] text-gray-600">
               Employee Code
                  </h4>
                  <Input placeholder="Enter Code" />
                </Form.Item> 
                <Form.Item name="Password" className="text-gray-600">
                  {" "}
                  <h4 className="font-semibold mb-2 text-[14px] text-gray-600">
            Password
                  </h4>
                  <Input placeholder="Input Password" />
                </Form.Item>
                <Form.Item name="Role">
                  <h4 className="font-semibold mb-2 text-[14px] text-gray-600">
                Role
                  </h4>
                  <Select defaultValue="Active">
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="SHG Groups">
                  <h4 className="font-semibold mb-2 text-[14px] text-gray-600">
                SHG Groups
                  </h4>
                  <Select defaultValue="Active">
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                  </Select>
                </Form.Item>
                <div>
            <h4 className="font-semibold mb-2 text-[14px] text-gray-600">App Permission</h4>
            <div className="flex flex-wrap gap-4">
              <Form.Item name="roleCreate" valuePropName="checked">
                <Checkbox>Admin App</Checkbox>
              </Form.Item>
             
            </div>
            
          </div>
              </div>

              

              <div className="flex justify-between mt-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-gray-900 text-white"
                >
                  Save
                </Button>
                <Button
                  type="default"
                  onClick={onReset}
                  className="bg-gray-900 text-white"
                >
                  Clear
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
