"use client";

import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox, Select } from "antd";
import TopNavbar from "@/app/Component/Topnavbar/page";
import Sidebar from "@/app/Component/Sidebar/page";
import SecureStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
const { Option } = Select;

const Edit: React.FC = () => {
  const [form] = Form.useForm();
  const router=useRouter();
  useEffect(() => {
    // Check if the token exists in SecureStorage
    const token = SecureStorage.getItem('accessToken');
    if (!token) {
      router.push("/"); // Redirect to login page if token is not present
    } else {
    
    }
  }, []); 
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
              Update Departments
            </h2>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="bg-white p-6  rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item name="DepartmentName" className="text-gray-600">
                  {" "}
                  <h4 className="font-semibold mb-2 text-[14px] text-gray-600">
                   Department Name
                  </h4>
                  <Input placeholder="Enter Department Name" />
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
              </div>

              

              <div className="flex justify-between mt-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-gray-900 text-white"
                >
                Update
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

export default Edit;
