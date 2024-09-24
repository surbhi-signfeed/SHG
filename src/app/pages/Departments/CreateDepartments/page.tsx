"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import TopNavbar from "@/app/Component/Topnavbar/page";
import Sidebar from "@/app/Component/Sidebar/page";
import axios from 'axios'; // Import Axios
import SecureStorage from 'react-secure-storage'; // Import SecureStorage
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
const { Option } = Select;

const CreateDepartments: React.FC = () => {
  const [form] = Form.useForm();
  const router =useRouter();
  const [hasCreatePermission, setHasCreatePermission] = useState<boolean | null>(null); // Set initial value to null
  useEffect(() => {
    // Check if the token exists in SecureStorage
    const token = SecureStorage.getItem('accessToken');
    if (!token) {
      router.push("/"); // Redirect to login page if token is not present
    } else {
    
    }
  }, []); 
  useEffect(() => {
    const permissions = JSON.parse(localStorage.getItem('permission') || '[]');
    console.log("ol",permissions)
    const modifyPermission = permissions.some((p: any) => p.permission_name === 'create_department' && p.active === 1);
  
    setHasCreatePermission(modifyPermission);
  

  
  }, [hasCreatePermission]);
  // Function to handle form submission
  const onFinish = async (values: any) => {
    try {
      // Log form values
      console.log("Form Values:", values);

      // Convert 'Active' to true and 'Inactive' to false
      const status = values.status === "Active"; // Converts 'Active' to true, 'Inactive' to false

      // Retrieve the token from SecureStorage
      const token = SecureStorage.getItem('accessToken');
      if (!token) {
        console.error("No token found");
        return;
      }

      // Prepare the data to be sent
      const requestData = {
        department_name: values.department_name,
        status: status,
      };

      // Log request data
      console.log("Request Data:", requestData);

      // Make POST request to API
      const response = await axios.post('http://localhost:4000/ujs/AddDepartment', requestData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

    
    // Handle response
     
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


        {hasCreatePermission !== null && hasCreatePermission ?(<>
          <div className="container mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4 lg:ml-[20px]">
              Create New Departments
            </h2>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="bg-white p-6 rounded-lg"
              initialValues={{ status: "Active" }} // Set default value for status
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item name="department_name" className="text-gray-600" label="Department Name"  rules={[{ required: true, message: 'Please input the department name!' }]}>
                  <Input placeholder="Enter Department Name" />
                </Form.Item>

                <Form.Item name="status" label="Status"  rules={[{ required: true, message: 'Please select status!' }]}>
                
                <Select defaultValue="Status">
                  <Option value=""  >Status</Option>
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
        </>):" You Don't have access to create department"}
        
        </div>
      </div>
    </>
  );
};

export default CreateDepartments;
