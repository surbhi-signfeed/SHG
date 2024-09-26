"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import TopNavbar from "@/app/Component/Topnavbar/page";
import Sidebar from "@/app/Component/Sidebar/page";
import SecureStorage from "react-secure-storage";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const { Option } = Select;

const Edit: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  // State to store department data
  const [department, setDepartment] = useState<any>(null);

  // Extract ID from URL
  const departmentId = searchParams.get("id");
  console.log("i", departmentId)
  useEffect(() => {
    // Check if the token exists in SecureStorage
    const token = SecureStorage.getItem("accessToken");
    if (!token) {
      router.push("/"); // Redirect to login page if token is not present
    } else {
      // Fetch department data
      fetchDepartmentData(departmentId, token);
    }
  }, [departmentId]);

  const fetchDepartmentData = async (id: string | null, token: any) => {
    if (!id) {
      return;
    }

    try {
      const response = await axios.get("http://localhost:4000/ujs/ListDepartment", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const apiData = response.data;
      const departmentData = apiData.department.find((item: any) => item.ID === parseInt(id));
      console.log(departmentData.department_name)

      if (departmentData) {
        setDepartment(departmentData);

        // Populate form with fetched data
        form.setFieldsValue({
          DepartmentName: departmentData.department_name,

          status: departmentData.status === true ? "Active" : "Inactive",
        });
      } else {
        message.error("Department not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch department data");
    }
  };

  // Function to handle form submission (Update API call)
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const token = SecureStorage.getItem("accessToken");

      const updateData = {
        ID: departmentId,  // Include the ID in the request body
        department_name: values.DepartmentName,
        status: values.status === "Active" ? true : false,  // Assuming status expects a boolean value
      };
      console.log("k", updateData)

      const response = await axios.post('http://localhost:4000/ujs/UpdateDepartment', updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });


      if (response.data.status === 200) {
        toast.success('Form submitted successfully!');
        form.resetFields(); // Optionally reset the form fields
      } else {
        // If the response indicates failure, show the error message
        toast.error(`Error: ${response.data.message || 'Something went wrong!'}`);
      }
    } catch (error: any) {
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
              Update Bank Loan
            </h2>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="bg-white p-6  rounded-lg"
              initialValues={department ? {
                DepartmentName: department.department_name,
                status: department.status === "Active" ? "Active" : "Inactive",
              } : {}}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="DepartmentName"
                  className="text-gray-600"
                  label="Department Name"

                >

                  <Input placeholder="Enter Department Name" />
                </Form.Item>

                <Form.Item name="status" label="Status" >

                  <Select>
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
