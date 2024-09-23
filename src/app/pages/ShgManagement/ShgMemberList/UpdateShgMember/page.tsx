'use client'

import React from 'react';
import { Form, Input, Button, Checkbox, Select,DatePicker} from 'antd';
import TopNavbar from '@/app/Component/Topnavbar/page';
import Sidebar from '@/app/Component/Sidebar/page';
import moment from 'moment';
import SecureStorage from 'react-secure-storage'
import { useRouter } from 'next/navigation';
const { Option } = Select;

const UpdateShgMember: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
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
      <h2 className="text-xl font-semibold mb-4 lg:ml-[0px]">Update SHG Member</h2>
      <Form form={form} name="create-shg-group" onFinish={onFinish} layout="vertical" className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
          {/* Each of these is a Form.Item with an Input or other component */}
            {/* Row 1 */}
            <Form.Item name="groupId" label="Group Id">
            <Input placeholder="Input name" />
          </Form.Item>
          <Form.Item name="groupName" label="Group Name">
            <Input placeholder="Group Name" />
          </Form.Item>
          <Form.Item name="memberName" label="Member Name">
            <Input placeholder="Member Name" />
          </Form.Item>
          <Form.Item name="leaderName" label="Leader Name">
            <Input placeholder="Leader Name" />
          </Form.Item>

          {/* Row 2 */}
          <Form.Item name="husbandFatherName" label="Husband/Father Name">
            <Input placeholder="Husband/Father Name" />
          </Form.Item>
          <Form.Item name="stateName" label="State Name">
            <Input placeholder="State Name" />
          </Form.Item>
          <Form.Item name="districtName" label="District Name">
            <Input placeholder="District Name" />
          </Form.Item>
          <Form.Item name="villageName" label="Village Name">
            <Input placeholder="Village Name" />
          </Form.Item>
          <Form.Item name="blockTaluka" label="Block Taluka">
            <Input placeholder="Block Taluka" />
          </Form.Item>
          <Form.Item name="grampanchayat" label="Gram Panchayat">
            <Input placeholder="Gram Panchayat" />
          </Form.Item>
          <Form.Item name="pinCode" label="Pin Code">
            <Input placeholder="Pin Code" />
          </Form.Item>
          <Form.Item name="gender" label="Gender">
            <Input placeholder="Gender" />
          </Form.Item>

          {/* Row 3 */}
        
          <Form.Item name="mobile" label="Mobile">
            <Input placeholder="Mobile" />
          </Form.Item>
          <Form.Item name="whatsapp" label="What's App">
            <Input placeholder="What's App" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="dob" label="DOB">
            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="aadharNo" label="Aadhar No">
            <Input placeholder="Aadhar No" />
          </Form.Item>
          <Form.Item name="education" label="Education">
            <Input placeholder="Education" />
          </Form.Item>
          <Form.Item name="primaryOccupation" label="Primary Occupation">
            <Input placeholder="Primary Occupation" />
          </Form.Item>   
        
          <Form.Item name="religion" label="Religion">
            <Input placeholder="Religion" />
          </Form.Item>

          {/* Row 4 */}
          <Form.Item name="houseNo" label="House No">
            <Input placeholder="House No" />
          </Form.Item>
          <Form.Item name="bankName" label="Bank Name">
            <Input placeholder="Bank Name" />
          </Form.Item>
          <Form.Item name="bankBranch" label="Bank Branch">
            <Input placeholder="Bank Branch" />
          </Form.Item>
          <Form.Item name="bankAC" label="Bank AC">
            <Input placeholder="Bank AC" />
          </Form.Item>
          <Form.Item name="bankIFSC" label="Bank IFSC">
            <Input placeholder="Bank IFSC" />
          </Form.Item>
          <Form.Item name="aadharSeedingStatus" label="Aadhar Seeding Status">
            <Input placeholder="Aadhar Seeding Status" />
          </Form.Item>
          <Form.Item name="voterNum" label="Voter Num">
            <Input placeholder="Voter Num" />
          </Form.Item>
          <Form.Item name="mnregaNum" label="MNREGA Num">
            <Input placeholder="MNREGA Num" />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Input placeholder="Category" />
          </Form.Item>
          <Form.Item name="loanTaken" label="Loan Taken">
            <Input placeholder="Loan Taken" />
          </Form.Item>
          <Form.Item name="mfiBankLoan" label="MFI Bank Loan">
            <Input placeholder="MFI Bank Loan" />
          </Form.Item>
         
          <Form.Item name="annualIncome" label="Annual Income">
            <Input placeholder="Annual Income" />
          </Form.Item>
          <Form.Item name="differentlyAbled" label="Differently Abled">
            <Input placeholder="Differently Abled" />
          </Form.Item>
          {/* Row 5 */}
         
         
         
         

          {/* Row 7 */}
        
        

          {/* Row 8 */}
        
         
          <Form.Item name="totalHouseholdMember" label="Total Household Member">
            <Input placeholder="Total Household Member" />
          </Form.Item>
          <Form.Item name="totalMonthlySaving" label="Total Monthly Saving">
            <Input placeholder="Total Monthly Saving" />
          </Form.Item>

          {/* Row 9 */}
       
        
          <Form.Item name="totalFederationSaving" label="Total Federation Saving">
            <Input placeholder="Total Federation Saving" />
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

export default UpdateShgMember;
