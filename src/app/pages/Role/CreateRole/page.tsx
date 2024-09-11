'use client'

import React from 'react';
import { Form, Input, Button, Checkbox, Select } from 'antd';
import TopNavbar from '@/app/Component/Topnavbar/page';
import Sidebar from '@/app/Component/Sidebar/page';

const { Option } = Select;

const CreateRole: React.FC = () => {
  const [form] = Form.useForm();

  // Function to handle form submission
  const onFinish = (values: any) => {
    console.log('Form Submitted:', values);
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
      <h2 className="text-xl font-semibold mb-4 lg:ml-[20px]">Create Role</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="bg-white p-6  rounded-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
          <Form.Item
           
            name="roleName"
           className='text-gray-600'
          > <h4 className="font-semibold mb-2 text-[14px] text-gray-600">Role Name</h4>
            <Input placeholder="Enter Role Name" />
          </Form.Item>

          <Form.Item  name="status">
          <h4 className="font-semibold mb-2 text-[14px] text-gray-600">Status</h4>
            <Select defaultValue="Active">
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </div>

        <h3 className="text-lg font-semibold mt-3 mb-2">Permissions</h3>
<br/>
        <div className="grid grid-cols-1 gap-1">
          {/* Role Management */}
          <div>
            <h4 className="font-semibold mb-2 text-[14px] text-gray-600">Role Management</h4>
            <div className="flex flex-wrap gap-4">
              <Form.Item name="roleCreate" valuePropName="checked">
                <Checkbox>Create</Checkbox>
              </Form.Item>
              <Form.Item name="roleModify" valuePropName="checked">
                <Checkbox>Modify</Checkbox>
              </Form.Item>
              <Form.Item name="roleView" valuePropName="checked">
                <Checkbox>View</Checkbox>
              </Form.Item>
            </div>
            
          </div>

          {/* Department Management */}
          <div>
            <h4 className="font-semibold mb-2 text-[14px] text-gray-600">Department Management</h4>
            <div className="flex flex-wrap gap-4">
            <Form.Item name="roleCreate" valuePropName="checked">
                <Checkbox>Create</Checkbox>
              </Form.Item>
              <Form.Item name="roleModify" valuePropName="checked">
                <Checkbox>Modify</Checkbox>
              </Form.Item>
              <Form.Item name="roleView" valuePropName="checked">
                <Checkbox>View</Checkbox>
              </Form.Item>
            </div>
          </div>

          {/* User Management */}
          <div>
            <h4 className="font-semibold mb-2 text-[14px] text-gray-600">User Management</h4>
            <div className="flex flex-wrap gap-4">
            <Form.Item name="roleCreate" valuePropName="checked">
                <Checkbox>Create</Checkbox>
              </Form.Item>
              <Form.Item name="roleModify" valuePropName="checked">
                <Checkbox>Modify</Checkbox>
              </Form.Item>
              <Form.Item name="roleView" valuePropName="checked">
                <Checkbox>View</Checkbox>
              </Form.Item>
            </div>
          </div>

          {/* Loan Management */}
          <div>
            <h4 className="font-semibold mb-2 text-[14px] text-gray-600">Loan Management</h4>
            <div className="flex flex-wrap gap-4">
            <Form.Item name="roleCreate" valuePropName="checked">
                <Checkbox>Create</Checkbox>
              </Form.Item>
              <Form.Item name="roleModify" valuePropName="checked">
                <Checkbox>Modify</Checkbox>
              </Form.Item>
              <Form.Item name="roleView" valuePropName="checked">
                <Checkbox>View</Checkbox>
              </Form.Item>
            </div>
          </div>

          {/* SHG Data Management */}
          <div>
            <h4 className="font-semibold mb-2 text-[14px] text-gray-600">SHG Data Management</h4>
            <div className="flex flex-wrap gap-4">
            <Form.Item name="roleCreate" valuePropName="checked">
                <Checkbox>Create</Checkbox>
              </Form.Item>
              <Form.Item name="roleModify" valuePropName="checked">
                <Checkbox>Modify</Checkbox>
              </Form.Item>
              <Form.Item name="roleView" valuePropName="checked">
                <Checkbox>View</Checkbox>
              </Form.Item>
            </div>
          </div>

          {/* SHG Reports Management */}
          <div>
            <h4 className="font-semibold mb-2 text-[14px] text-gray-600">SHG Reports Management</h4>
            <div className="flex flex-wrap gap-4">
            <Form.Item name="roleCreate" valuePropName="checked">
                <Checkbox>Create</Checkbox>
              </Form.Item>
              <Form.Item name="roleModify" valuePropName="checked">
                <Checkbox>Modify</Checkbox>
              </Form.Item>
              <Form.Item name="roleView" valuePropName="checked">
                <Checkbox>View</Checkbox>
              </Form.Item>
            </div>
          </div>
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
       
      </div>
    </div>
   </>
  );
};

export default CreateRole;
