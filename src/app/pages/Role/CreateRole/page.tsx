
'use client'

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Select } from 'antd';
import TopNavbar from '@/app/Component/Topnavbar/page';
import Sidebar from '@/app/Component/Sidebar/page';
import axios from 'axios'; // Import Axios
import SecureStorage from 'react-secure-storage'; // Import SecureStorage
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
const { Option } = Select;

const CreateRole: React.FC = () => {
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
    const modifyPermission = permissions.some((p: any) => p.permission_name === 'create_role' && p.active === 1);
  
    setHasCreatePermission(modifyPermission);
  

  
  }, [hasCreatePermission]);
  // Function to handle form submission
  const onFinish = async (values: any) => {
    try {
      // Log form values
      console.log("Form Values:", values);
  
      // Convert 'Active' to true and 'Inactive' to false
      const status = values.status === "Active";
  
      // Retrieve the token from SecureStorage
      const token = SecureStorage.getItem('accessToken');
      if (!token) {
        console.error("No token found");
        toast.error('No token found! Please log in.');
        return;
      }
  
      // Prepare the permissions array from checkbox values
      const permissions = [];
      for (const key in values) {
        if (values[key] === true) {
          permissions.push({
            permission_name: key,
            active: true
          });
        }
      }
  
      // Prepare the data to be sent
      const requestData = {
        role_name: values.role_name,
        status: status,
        permissions: permissions,
      };
  
     
  
      // Make POST request to API
      const response = await axios.post('http://localhost:4000/ujs/AddRole', requestData, {
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
      <div className="flex bg-gray-100">
        {/* Sidebar - fixed width */}
        <div className="lg:w-1/4 h-screen">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4 mt-[100px] xl:ml-[-50px] bg-white">
        {hasCreatePermission !== null && hasCreatePermission ?(<>
          <div className="container mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4 lg:ml-[20px]">Create Role</h2>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="bg-white p-6  rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <Form.Item name="role_name" className='text-gray-600' label="Role Name"   rules={[{ required: true, message: 'Please input the role name!' }]}
                >
                  <Input placeholder="Enter Role Name" />
                </Form.Item>

                  
                <Form.Item name="status" label="Status"   rules={[{ required: true, message: 'Please Select the status!' }]}
                >
                  <Select defaultValue="Status">
                  <Option value="" >Status</Option>
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                  </Select>
                </Form.Item>
              </div>

              <h3 className="text-lg font-semibold mt-3 mb-2">Permissions</h3>
              <br />

              {/* Permissions Section */}
              <div className="grid grid-cols-1 gap-1">
                {/* Role Management */}
                <div>
                  <h4 className="font-semibold mb-2 text-[14px] text-gray-600">Role Management</h4>
                  <div className="flex flex-wrap gap-4">
                    <Form.Item name="create_role" valuePropName="checked">
                      <Checkbox>Create</Checkbox>
                    </Form.Item>
                    <Form.Item name="modify_role" valuePropName="checked">
                      <Checkbox>Modify</Checkbox>
                    </Form.Item>
                    <Form.Item name="view_role" valuePropName="checked">
                      <Checkbox>View</Checkbox>
                    </Form.Item>
                  </div>
                </div>

                {/* Department Management */}
                <div>
                  <h4 className="font-semibold mb-2 text-[14px] text-gray-600">Department Management</h4>
                  <div className="flex flex-wrap gap-4">
                    <Form.Item name="create_department" valuePropName="checked">
                      <Checkbox>Create</Checkbox>
                    </Form.Item>
                    <Form.Item name="modify_department" valuePropName="checked">
                      <Checkbox>Modify</Checkbox>
                    </Form.Item>
                    <Form.Item name="view_department" valuePropName="checked">
                      <Checkbox>View</Checkbox>
                    </Form.Item>
                  </div>
                </div>
 {/* User Management */}
           <div>
            <h4 className="font-semibold mb-2 text-[14px] text-gray-600">User Management</h4>
            <div className="flex flex-wrap gap-4">
            <Form.Item name="user_create" valuePropName="checked">
                <Checkbox>Create</Checkbox>
              </Form.Item>
             <Form.Item name="user_modify" valuePropName="checked">
                <Checkbox>Modify</Checkbox>
              </Form.Item>
              <Form.Item name="user_view" valuePropName="checked">
                <Checkbox>View</Checkbox>
              </Form.Item>
            </div>   
                    </div>
                     {/* Loan Management */}
          <div>
            <h4 className="font-semibold mb-2 text-[14px] text-gray-600">Loan Management</h4>
            <div className="flex flex-wrap gap-1">
            <Form.Item name="loans" valuePropName="checked">
                <Checkbox>Loans</Checkbox>
              </Form.Item>
              <Form.Item name="edit_bank_loan" valuePropName="checked">
                <Checkbox>Edit Bank Loan</Checkbox>
              </Form.Item>
              <Form.Item name="view_bank_loan" valuePropName="checked">
                <Checkbox>View Bank Loan</Checkbox>
              </Form.Item>
              <Form.Item name="edit_group_internal_loan" valuePropName="checked">
                <Checkbox>Edit Group Internal Loan</Checkbox>
              </Form.Item>
              <Form.Item name="view_group_internal_loan" valuePropName="checked">
                <Checkbox>View Group Internal Loan</Checkbox>
              </Form.Item>
              <Form.Item name="edit_member_internal_loan" valuePropName="checked">
                <Checkbox>Edit Member Internal Loan</Checkbox>
              </Form.Item>
              <Form.Item name="view_member_internal_loan" valuePropName="checked">
                <Checkbox>View Member Internal Loan</Checkbox>
              </Form.Item>
              
            </div>
          </div>

          {/* SHG Data Management */}
          <div>
            <h4 className="font-semibold mb-2 text-[14px] text-gray-600">SHG Data Management</h4>
            <div className="flex flex-wrap gap-4">
            <Form.Item name="data_view" valuePropName="checked">
                <Checkbox>Data View</Checkbox>
              </Form.Item>
              <Form.Item name="create_group" valuePropName="checked">
                <Checkbox>Create Group</Checkbox>
              </Form.Item>
              <Form.Item name="view_shg_group" valuePropName="checked">
                <Checkbox>View Shg Group</Checkbox>
              </Form.Item>
              <Form.Item name="edit_shg_group" valuePropName="checked">
                <Checkbox>Edit Shg Group</Checkbox>
              </Form.Item>
              <Form.Item name="create_member" valuePropName="checked">
                <Checkbox>Create Member</Checkbox>
              </Form.Item>
               <Form.Item name="view_member" valuePropName="checked">
                <Checkbox>View Member</Checkbox>
              </Form.Item>
              <Form.Item name="edit_member" valuePropName="checked">
                <Checkbox>Edit Member</Checkbox>
              </Form.Item>
            </div>
          </div>

          {/* SHG Reports Management */}
          <div>
            <h4 className="font-semibold mb-2 text-[14px] text-gray-600">SHG Reports Management</h4>
            <div className="flex flex-wrap gap-4">
           
              <Form.Item name="shg_group_report" valuePropName="checked">
                <Checkbox>SHG Group Report</Checkbox>
              </Form.Item>
              <Form.Item name="shg_member_report" valuePropName="checked">
                <Checkbox>SHG Member Report</Checkbox>
              </Form.Item>
            </div>
          </div>
                {/* Repeat similar blocks for other permissions like User Management, Loan Management, etc. */}
              </div>

              <div className="flex justify-between mt-6">
                <Button type="primary" htmlType="submit" className='bg-gray-900 text-white'>
                  Save
                </Button>
                <Button type="default" onClick={onReset} className='bg-gray-900 text-white'>
                  Clear
                </Button>
              </div>
            </Form>
          </div>
        </>):" You Don't have access to create role"}
         
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateRole;
