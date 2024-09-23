'use client'

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Select,DatePicker} from 'antd';
import TopNavbar from '@/app/Component/Topnavbar/page';
import Sidebar from '@/app/Component/Sidebar/page';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import axios from 'axios';
import SecureStorage from 'react-secure-storage'; 
import { useRouter } from 'next/navigation';
const { Option } = Select;

const CreateShgGroup: React.FC = () => {
  const router =useRouter();
  const [form] = Form.useForm();
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
        group_id: values.group_id,
        group_name: values.group_name,
        group_leader: values.group_leader,
        formation_date: values.formation_date ? moment(values.formation_date).format('YYYY-MM-DD') : null,
        state_name: values.state_name,
        district_name: values.district_name,
        location_name: values.location_name,
        village_name: values.village_name,
        taluka_name: values.taluka_name,
        bank_name: values.bank_name,
        bank_branch: values.bank_branch,
        bank_account: values.bank_account,
        total_member: parseInt(values.total_member, 10),
        cash_in_hand: values.cash_in_hand,
        federation_amount: values.federation_amount,
        cash_at_bank: values.cash_at_bank,
        last_meeting_date: values.last_meeting_date ? moment(values.last_meeting_date).format('YYYY-MM-DD') : null,
        status: values.status === 'active' ? true : false, // Convert to boolean
      };
      

      // Log request data
      console.log("Request Data:", requestData);

      // Make POST request to API
      const response = await axios.post('http://localhost:4000/ujs/AddShgGroup', requestData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      // Handle successful response
      console.log("Form Submitted Successfully:", response.data);
      form.resetFields(); // Optionally reset the form fields
      toast.success('Form submitted successfully!');

    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error('Failed to submit the form. Please try again.');

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <h2 className="text-xl font-semibold mb-4 lg:ml-[0px]">Create SHG Group</h2>
      <Form form={form} name="create-shg-group" onFinish={onFinish} layout="vertical" className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Each of these is a Form.Item with an Input or other component */}
          <Form.Item name="group_id" label="Group ID">
            <Input placeholder="Input name" />
          </Form.Item>
          <Form.Item name="group_name" label="Group Name">
            <Input placeholder="Group Name" />
          </Form.Item>
          <Form.Item name="group_leader" label="Group Leader">
            <Input placeholder="Group Name" />
          </Form.Item>
          <Form.Item name="formation_date" label="Formation Date">
            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="state_name" label="State Name">
            <Input placeholder="State Name" />
          </Form.Item>
          <Form.Item name="district_name" label="District Name">
            <Input placeholder="District Name" />
          </Form.Item>
          <Form.Item name="location_name" label="Location Name">
            <Input placeholder="Location Name" />
          </Form.Item>
          <Form.Item name="village_name" label="Village Name">
            <Input placeholder="Village Name" />
          </Form.Item>
          <Form.Item name="taluka_name" label="Taluka Name">
            <Input placeholder="Taluka Name" />
          </Form.Item>
          <Form.Item name="bank_name" label="Bank Name">
            <Input placeholder="Bank Name" />
          </Form.Item>
          <Form.Item name="bank_branch" label="Bank Branch">
            <Input placeholder="Bank Branch" />
          </Form.Item>
          <Form.Item name="bank_account" label="Bank Account">
            <Input placeholder="Bank Account" />
          </Form.Item>
          <Form.Item name="total_member" label="Total Member">
            <Input placeholder="Total Member" />
          </Form.Item>
          <Form.Item name="cash_in_hand" label="Cash In Hand">
            <Input placeholder="Cash In Hand" />
          </Form.Item>
          <Form.Item name="federation_amount" label="Federation Amount">
            <Input placeholder="Federation Amount" />
          </Form.Item>
          <Form.Item name="cash_at_bank" label="Cash At Bank">
            <Input placeholder="Cash At Bank" />
          </Form.Item>
          <Form.Item name="last_meeting_date" label="Last Meeting Date">
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
    </>):" You Don't have access to create department"}
       
      </div>
    </div>
   </>
  );
};

export default CreateShgGroup;
