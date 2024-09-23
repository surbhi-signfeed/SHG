'use client'

import React from 'react';
import { Form, Input, Button, Checkbox, Select,DatePicker} from 'antd';
import TopNavbar from '@/app/Component/Topnavbar/page';
import Sidebar from '@/app/Component/Sidebar/page';
import moment from 'moment';
import SecureStorage from 'react-secure-storage'
import { useRouter } from "next/navigation";
const { Option } = Select;

const UpdateShgGroup: React.FC = () => {
  const [form] = Form.useForm();
  const router =useRouter();
  React.useEffect(() => {
    // Check if the token exists in SecureStorage
    const token = SecureStorage.getItem('accessToken');
    if (!token) {
      router.push("/"); // Redirect to login page if token is not present
    } else {
    
    }
  }, []); 
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
       
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <h2 className="text-xl font-semibold mb-4 lg:ml-[0px]">Update SHG Group</h2>
      <Form form={form} name="create-shg-group" onFinish={onFinish} layout="vertical" className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Each of these is a Form.Item with an Input or other component */}
          <Form.Item name="groupId" label="Group ID">
            <Input placeholder="Input name" />
          </Form.Item>
          <Form.Item name="groupName" label="Group Name">
            <Input placeholder="Group Name" />
          </Form.Item>
          <Form.Item name="groupLeader" label="Group Leader">
            <Input placeholder="Group Name" />
          </Form.Item>
          <Form.Item name="formationDate" label="Formation Date">
            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="stateName" label="State Name">
            <Input placeholder="State Name" />
          </Form.Item>
          <Form.Item name="districtName" label="District Name">
            <Input placeholder="District Name" />
          </Form.Item>
          <Form.Item name="locationName" label="Location Name">
            <Input placeholder="Location Name" />
          </Form.Item>
          <Form.Item name="villageName" label="Village Name">
            <Input placeholder="Village Name" />
          </Form.Item>
          <Form.Item name="TalukaName" label="Taluka Name">
            <Input placeholder="Taluka Name" />
          </Form.Item>
          <Form.Item name="bankName" label="Bank Name">
            <Input placeholder="Bank Name" />
          </Form.Item>
          <Form.Item name="bankBranch" label="Bank Branch">
            <Input placeholder="Bank Branch" />
          </Form.Item>
          <Form.Item name="bankAccount" label="Bank Account">
            <Input placeholder="Bank Account" />
          </Form.Item>
          <Form.Item name="totalMember" label="Total Member">
            <Input placeholder="Total Member" />
          </Form.Item>
          <Form.Item name="cashInHand" label="Cash In Hand">
            <Input placeholder="Cash In Hand" />
          </Form.Item>
          <Form.Item name="federationAmount" label="Federation Amount">
            <Input placeholder="Federation Amount" />
          </Form.Item>
          <Form.Item name="cashAtBank" label="Cash At Bank">
            <Input placeholder="Cash At Bank" />
          </Form.Item>
          <Form.Item name="lastMeetingDate" label="Last Meeting Date">
            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select placeholder="Select status">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>
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

export default UpdateShgGroup;
