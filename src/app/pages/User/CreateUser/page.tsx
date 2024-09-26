"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Select, DatePicker } from "antd";
import TopNavbar from "@/app/Component/Topnavbar/page";
import Sidebar from "@/app/Component/Sidebar/page";
import { useRouter } from "next/navigation";
import SecureStorage from 'react-secure-storage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import moment from "moment";
const { Option } = Select;

const CreateUser: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [hasCreatePermission, setHasCreatePermission] = useState<boolean | null>(null); // Set initial value to null
  useEffect(() => {
    // Check if the token exists in SecureStorage
    const token = SecureStorage.getItem('accessToken');
    if (!token) {
      router.push("/"); // Redirect to login page if token is not present
    } else {
      fetchShgData();
      fetchRoleData();
    }
  }, []);
  useEffect(() => {
    const permissions = JSON.parse(localStorage.getItem('permission') || '[]');

    const modifyPermission = permissions.some((p: any) => p.permission_name === 'user_create' && p.active === 1);

    setHasCreatePermission(modifyPermission);



  }, [hasCreatePermission]);
  // list of shg group
  const [originalData, setOriginalData] = useState<any[]>([]);
  const fetchShgData = async () => {
    try {
      const token = SecureStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:4000/ujs/ListShgGroup', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const apiData = response.data;
      const formattedData = apiData.shgGroup.map((item: any) => ({
        key: item.ID,
        group_name: item.group_name,
        group_leader: item.group_leader,
        totalMember: item.totalMember,
        Status: item.status,
      }));
      setOriginalData(formattedData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // list of role 
  const [originalRoleData, setOriginalRoleData] = useState<any[]>([]);
  const fetchRoleData = async () => {
    try {
      const token = SecureStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:4000/ujs/ListRole', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const apiData = response.data;
      const formattedData = apiData.shgRole.map((item: any) => ({
        key: item.roll_id,
        role_name: item.role_name,

      }));
      setOriginalRoleData(formattedData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // Function to handle form submission
  const onFinish = async (values: any) => {
    try {


      // Convert 'Active' to true and 'Inactive' to false
      const status = values.status === "Active"; // Converts 'Active' to true, 'Inactive' to false
      const app_permission = values.AdminApp ? 1 : 0;
      // Retrieve the token from SecureStorage
      const token = SecureStorage.getItem('accessToken');
      if (!token) {
        console.error("No token found");
        return;
      }

      // Prepare the data to be sent
      const requestData = {
        name: values.UserName, // User Name
        mobile: values.phone, // Phone Number
        email: values.Email, // Email
        password: values.Password, // Password
        active: status, // Status (Active/Inactive)
        emp_code: values.EmployeeCode, // Employee Code
        role: values.Role, // Role (Active/Inactive)
        shgGroup: values.shgGroup, // SHG Groups (Active/Inactive)
        admin_app: app_permission,
        created_by: values.created_by ? moment(values.created_by).format('YYYY-MM-DD') : '', // Date of Birth
      };

      // Log request data
      console.log("Request Data:", requestData);

      // Make POST request to API
      const response = await axios.post('http://localhost:4000/ujs/AddUsers', requestData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });


      // Handle response
      console.log("lk", response)
      if (response.data.status === 200) {
        toast.success('Form submitted successfully!');
        form.resetFields(); // Optionally reset the form fields
      } else {
        // If the response indicates failure, show the error message
        toast.error(`Error: ${response.data.message || 'Something went wrong!'}`);
      }
    }
    catch (error: any) {
      console.error("Error submitting form:", error);

      // Check if the error has a response (server error)
      if (error.response && error.response.data) {
        toast.error(`Error: ${error.response.data.message || 'Request failed!'}`);
      } else {
        // Handle other errors (e.g., network issues)
        toast.error('An error occurred while submitting the form.');
      }
    }
  };

  // Function to handle form reset
  const onReset = () => {
    form.resetFields();
  };


  return (
    <>
      <TopNavbar />
      <ToastContainer />
      <div className="flex bg-gray-100">
        {/* Sidebar - fixed width */}
        <div className="lg:w-1/4 h-screen">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4 mt-[100px] xl:ml-[-50px] bg-white">
          <div className="container mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4 lg:ml-[20px]">
              Create New User
            </h2>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="bg-white p-2  rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Form.Item name="UserName" label="Name" className="text-gray-600" rules={[{ required: true, message: 'Please Enter Name!' }]}>

                  <Input placeholder="Enter User Name" type="text" />
                </Form.Item>
                <Form.Item name="phone" label="Phone Number" className="text-gray-600" rules={[{ required: true, message: 'Please Enter Phone Number' }]}>

                  <Input placeholder="Enter Number" type="number"/>
                </Form.Item>
                <Form.Item name="Email" label="Email" className="text-gray-600" rules={[{ required: true, message: 'Please Enter Email!' }]}>

                  <Input placeholder="Enter Email" type="email"/>
                </Form.Item>
                <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please Select Status!' }]}>

                  <Select defaultValue="Active">
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="EmployeeCode" label="Employee Code" className="text-gray-600" rules={[{ required: true, message: 'Please Enter Emp Code!' }]}>

                  <Input placeholder="Enter Code" type="text"/>
                </Form.Item>
                <Form.Item name="create_by" label="Created BY" rules={[{ required: true, message: 'Please Enter Date!' }]}>
                  <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item name="Password" className="text-gray-600" label="password" rules={[{ required: true, message: 'Please Enter Password!' }]}>

                  <Input placeholder="Input Password" type="password" />
                </Form.Item>
                <Form.Item name="Role" label="Role" rules={[{ required: true, message: 'Please Select Role!' }]}>
                  <Select placeholder="Select Role">
                    {originalRoleData.map((item: any) => (
                      <Option key={item.key} value={item.roll_id}>
                        {item.role_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item name="shgGroup" label="Group Name" rules={[{ required: true, message: 'Please Select Group!' }]}>
                  <Select placeholder="Select Group">
                    {originalData.map((item: any) => (
                      <Option key={item.id} value={item.group_name}>
                        {item.group_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <div>

                  <div className="flex flex-wrap gap-4">
                    <Form.Item name="AdminApp" valuePropName="checked" label="Permission" rules={[{ required: true, message: 'Please Give Permission!' }]}>
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

export default CreateUser;
