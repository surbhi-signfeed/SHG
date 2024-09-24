'use client'

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Select, DatePicker } from 'antd';
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
  const router = useRouter();
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
    console.log("ol", permissions)
    const modifyPermission = permissions.some((p: any) => p.permission_name === 'create_department' && p.active === 1);

    setHasCreatePermission(modifyPermission);



  }, [hasCreatePermission]);
  //  list of state
  const [stateData, setStateData] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = SecureStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:4000/ujs/ListState', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const apiData = response.data;
        // Filter out duplicate states by using a Set
        const uniqueStates = Array.from(
          new Set(apiData.state.map((item: any) => item.state))
        ).map(state => ({
          state
        }));

        setStateData(uniqueStates);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

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

        // Optional fields
        // shg_id: values.shg_id || null,
        group_name: values.group_name || null,
        group_leader: values.group_leader || null,
        state: values.state_name || null, // Map to 'state' in the DTO
        district: values.district_name || null, // Map to 'district' in the DTO
        location: values.location_name || null, // Map to 'location' in the DTO
        village: values.village_name || null, // Map to 'village' in the DTO
        block_taluk: values.taluka_name || null, // Map to 'block_taluk' in the DTO
        pincode: values.pincode || null, // Add pincode if available

        animator_id: values.animator_id || null,
        animator: values.animator || null,
        bank_name: values.bank_name || null,
        bank_branch: values.bank_branch || null,
        bank_ac: values.bank_account || null, // Map to 'bank_ac' in the DTO

        // Date fields - properly formatted
        formationDate: values.formation_date ? moment(values.formation_date).format('YYYY-MM-DD') : null,
        monthlymeeting: values.last_meeting_date ? moment(values.last_meeting_date).format('YYYY-MM-DD') : null,

        // Amount fields
        fed_amt: values.federation_amount || null, // Map to 'fed_amt' in the DTO
        cashatbank: values.cash_at_bank || null, // Map to 'cashatbank' in the DTO
        amount: values.cash_in_hand || null, // Map to 'amount' in the DTO

        // Total members
        totalMember: values.total_member ? values.total_member.toString() : null, // Map to 'totalMember' (as string in DTO)

        // Status field - convert to numeric
        status: values.status === 'active' ? 1 : 0, // Convert 'active' to 1 and anything else to 0

        // Optional financial details (as numbers or null)
        TotalmonthlySaving: values.total_monthly_saving || null,
        totalMeeting: values.total_meeting || null,
        savingAmt: values.saving_amt || null,
        totalInternalLoan: values.total_internal_loan || null,
        totalInternalLoanRecover: values.total_internal_loan_recover || null,
        totalInternalLoanInterest: values.total_internal_loan_interest || null,
        totalExpanses: values.total_expanses || null,
        TotalBankLoan: values.total_bank_loan || null,
        totalbankloanrecover: values.total_bank_loan_recover || null,
        TotalBankLoanInterest: values.total_bank_loan_interest || null,

        // Transaction status and month
        transactionstatus: values.transaction_status || null,
        month: values.month || null,
      };


      // Log request data
      console.log("Request Data:", requestData);

      // Make POST request to API
      const response = await axios.post('http://localhost:4000/ujs/AddShgGroup', requestData, {
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
          {hasCreatePermission !== null && hasCreatePermission ? (<>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
              <h2 className="text-xl font-semibold mb-4 lg:ml-[0px]">Create SHG Group</h2>
              <Form form={form} name="create-shg-group" onFinish={onFinish} layout="vertical" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Existing fields */}
                  <Form.Item name="group_id" label="Group ID" >
                    <Input type="text" placeholder="Group ID" />
                  </Form.Item>
                  <Form.Item name="group_name" label="Group Name" rules={[{ required: true, message: 'Please input the group name!' }]}>
                    <Input type="text" placeholder="Group Name" />
                  </Form.Item>
                  <Form.Item name="group_leader" label="Group Leader">
                    <Input type="text" placeholder="Group Leader" />
                  </Form.Item>
                  <Form.Item name="formation_date" label="Formation Date">
                    <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                  </Form.Item>
                  <Form.Item name="state_name" label="State Name" >
                    <Select placeholder="Select state">
                      {stateData.map((item: any) => (
                        <Option key={item.id} value={item.state}>
                          {item.state}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item name="district_name" label="District Name">
                    <Input type="text" placeholder="District Name" />
                  </Form.Item>
                  <Form.Item name="location_name" label="Location Name">
                    <Input type="text" placeholder="Location Name" />
                  </Form.Item>
                  <Form.Item name="village_name" label="Village Name">
                    <Input type="text" placeholder="Village Name" />
                  </Form.Item>
                  <Form.Item name="taluka_name" label="Taluka Name">
                    <Input type="text" placeholder="Taluka Name" />
                  </Form.Item>
                  <Form.Item name="bank_name" label="Bank Name">
                    <Input type="text" placeholder="Bank Name" />
                  </Form.Item>
                  <Form.Item name="bank_branch" label="Bank Branch">
                    <Input type="text" placeholder="Bank Branch" />
                  </Form.Item>
                  <Form.Item name="bank_account" label="Bank Account">
                    <Input type="number" placeholder="Bank Account" />
                  </Form.Item>
                  <Form.Item name="total_member" label="Total Member">
                    <Input type="number" placeholder="Total Member" />
                  </Form.Item>
                  <Form.Item name="cash_in_hand" label="Cash In Hand">
                    <Input type="number" placeholder="Cash In Hand" />
                  </Form.Item>
                  <Form.Item name="federation_amount" label="Federation Amount">
                    <Input type="number" placeholder="Federation Amount" />
                  </Form.Item>
                  <Form.Item name="cash_at_bank" label="Cash At Bank">
                    <Input type="number" placeholder="Cash At Bank" />
                  </Form.Item>
                  <Form.Item name="last_meeting_date" label="Last Meeting Date">
                    <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                  </Form.Item>
                  <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please Select Status!' }]}>
                    <Select placeholder="Select status">
                      <Option value="active">Active</Option>
                      <Option value="inactive">Inactive</Option>
                    </Select>
                  </Form.Item>

                  {/* New fields with appropriate types */}
                  <Form.Item name="animator_id" label="Animator ID">
                    <Input type="number" placeholder="Animator ID" />
                  </Form.Item>
                  <Form.Item name="animator" label="Animator">
                    <Input type="text" placeholder="Animator Name" />
                  </Form.Item>
                  <Form.Item name="pincode" label="Pincode">
                    <Input type="number" placeholder="Pincode" />
                  </Form.Item>

                  <Form.Item name="transaction_status" label="Transaction Status">
                    <Input type="number" placeholder="Transaction Status" />
                  </Form.Item>
                  <Form.Item name="month" label="Month">
                    <Input type="number" placeholder="Month" />
                  </Form.Item>
                  <Form.Item name="total_monthly_saving" label="Total Monthly Saving">
                    <Input type="number" placeholder="Total Monthly Saving" />
                  </Form.Item>
                  <Form.Item name="total_meeting" label="Total Meeting">
                    <Input type="number" placeholder="Total Meeting" />
                  </Form.Item>
                  <Form.Item name="saving_amt" label="Saving Amount">
                    <Input type="number" placeholder="Saving Amount" />
                  </Form.Item>
                  <Form.Item name="total_internal_loan" label="Total Internal Loan">
                    <Input type="number" placeholder="Total Internal Loan" />
                  </Form.Item>
                  <Form.Item name="total_internal_loan_recover" label="Total Internal Loan Recovery">
                    <Input type="number" placeholder="Total Internal Loan Recovery" />
                  </Form.Item>
                  <Form.Item name="total_internal_loan_interest" label="Total Internal Loan Interest">
                    <Input type="number" placeholder="Total Internal Loan Interest" />
                  </Form.Item>
                  <Form.Item name="total_expanses" label="Total Expenses">
                    <Input type="number" placeholder="Total Expenses" />
                  </Form.Item>
                  <Form.Item name="total_bank_loan" label="Total Bank Loan">
                    <Input type="number" placeholder="Total Bank Loan" />
                  </Form.Item>
                  <Form.Item name="total_bank_loan_recover" label="Total Bank Loan Recovery">
                    <Input type="number" placeholder="Total Bank Loan Recovery" />
                  </Form.Item>
                  <Form.Item name="total_bank_loan_interest" label="Total Bank Loan Interest">
                    <Input type="number" placeholder="Total Bank Loan Interest" />
                  </Form.Item>
                </div>

                <div className="flex justify-between mt-6">
                  <Button type="primary" htmlType="submit" className="bg-gray-900 text-white">
                    Save
                  </Button>
                  <Button type="default" onClick={onReset} className="bg-gray-900 text-white">
                    Clear
                  </Button>
                </div>
              </Form>

            </div>
          </>) : " You Don't have access to create department"}

        </div>
      </div>
    </>
  );
};

export default CreateShgGroup;
