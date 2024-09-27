"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message, Checkbox, DatePicker } from "antd";
import TopNavbar from "@/app/Component/Topnavbar/page";
import Sidebar from "@/app/Component/Sidebar/page";
import SecureStorage from "react-secure-storage";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";

const { Option } = Select;

const UpdateUser: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  // State to store user data
  const [user, setuser] = useState<any>(null);

  // Extract ID from URL
  const userId = searchParams.get("id");
  useEffect(() => {
    // Check if the token exists in SecureStorage
    const token = SecureStorage.getItem("accessToken");
    if (!token) {
      router.push("/"); // Redirect to login page if token is not present
    } else {
      // Fetch user data
      fetchUserdata(userId, token);
      fetchRoleData();
      fetchShgData();
    }
  }, [userId]);

  const fetchUserdata = async (id: string | null, token: any) => {
    if (!id) {
      return;
    }

    try {
      const response = await axios.get("http://localhost:4000/ujs/ListOfUserRole", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const apiData = response.data;
      const userData = apiData.user.find((item: any) => item.Id === parseInt(id));
      console.log(userData)
    

      if (userData) {
        setuser(userData);

        // Populate form with fetched data
        form.setFieldsValue({
         name: userData.name,
         email: userData.email,
         mobile:userData.mobile,
        //  role:userData.role_name,
         emp_code:userData.emp_code,
         password:userData.password,
         shgGroup:userData.shgGroup,

          status: userData.active === true ? "Active" : "Inactive",
        });
      } else {
        message.error("user not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch user data");
    }
  };
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
  // Function to handle form submission (Update API call)
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const token = SecureStorage.getItem("accessToken");
      const status = values.status === "Active";
      const updateData = {
        id: userId, 
        name: values.name, // User Name
        mobile: values.mobile, // Phone Number
        email: values.email, // Email
        password: values.password, // Password
        active: status, // Status (Active/Inactive)
        emp_code: values.emp_code, // Employee Code
        role: values.role, 
        shgGroup: values.shgGroup, // SHG Groups (Active/Inactive)
       
      };
      

      const response = await axios.post('http://localhost:4000/ujs/UpdateUser', updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });


      if (response.data.status === 200) {
        toast.success('Form submitted successfully!');
        form.resetFields(); // Optionally reset the form fields
        router.push("/pages/User/ListUser")
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
              Update Users
            </h2>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="bg-white p-6  rounded-lg"
              initialValues={user ? {
               name: user.name,
               email:user.email,
               mobile:user.mobile,
               role:"select Role",
               emp_code:user.emp_code,
               shgGroup:user.shgGroup,
               password:user.password,

                status: user.active === 1 ? "Active" : "Inactive",
              } : {}}
            >
               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Form.Item name="name" label="Name" className="text-gray-600" rules={[{ required: true, message: 'Please Enter Name!' }]}>

                  <Input placeholder="Enter User Name" type="text" />
                </Form.Item>
                <Form.Item name="mobile" label="Mobile Number" className="text-gray-600" rules={[{ required: true, message: 'Please Enter mobile Number' }]}>

                  <Input placeholder="Enter Number" type="number"/>
                </Form.Item>
                <Form.Item name="email" label="Email" className="text-gray-600" rules={[{ required: true, message: 'Please Enter Email!' }]}>

                  <Input placeholder="Enter Email" type="email"/>
                </Form.Item>
                <Form.Item name="active" label="Status" rules={[{ required: true, message: 'Please Select Status!' }]}>

                  <Select defaultValue="Status">
                    <Option value=''>Select Status</Option>
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="emp_code" label="Employee Code" className="text-gray-600" rules={[{ required: true, message: 'Please Enter Emp Code!' }]}>

                  <Input placeholder="Enter Code" type="text"/>
                </Form.Item>
               
                <Form.Item name="password" className="text-gray-600" label="password" rules={[{ required: true, message: 'Please Enter Password!' }]}>

                  <Input placeholder="Input Password" type="password" />
                </Form.Item>
                <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please Select Role!' }]}>
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

                

                </div>
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

export default UpdateUser;
