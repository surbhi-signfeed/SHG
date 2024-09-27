'use client'

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Select, DatePicker, message } from 'antd';
import TopNavbar from '@/app/Component/Topnavbar/page';
import Sidebar from '@/app/Component/Sidebar/page';
import moment from 'moment';
import SecureStorage from 'react-secure-storage'
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const { Option } = Select;

const UpdateShgGroup: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  // State to store shg data
  const [shg, setshg] = useState<any>(null);

  // Extract ID from URL
  const shgId = searchParams.get("id");
  useEffect(() => {
    // Check if the token exists in SecureStorage
    const token = SecureStorage.getItem("accessToken");
    if (!token) {
      router.push("/"); // Redirect to login page if token is not present
    } else {
      // Fetch shg data
      fetchshgdata(shgId, token);
      fetchData();

    }
  }, [shgId]);

  const fetchshgdata = async (id: string | null, token: any) => {
    if (!id) {
      return;
    }

    try {
      const response = await axios.get("http://localhost:4000/ujs/ListShgGroup", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const apiData = response.data;
      const shgData = apiData.shgGroup.find((item: any) => item.id === parseInt(id));


      if (shgData) {
        setshg(shgData);

        // Populate form with fetched data
        form.setFieldsValue({

          shg_id: shgData.shg_id,
          group_name: shgData.group_name,
          group_leader: shgData.group_leader,
          state: shgData.state,
          district: shgData.district,
          location: shgData.location,
          village: shgData.village,
          block_taluk: shgData.block_taluk,
          pincode: shgData.pincode,
          animator_id: shgData.animator_id,
          animator: shgData.animator,
          bank_name: shgData.bank_name,
          bank_branch: shgData.bank_branch,
          bank_ac: shgData.bank_ac,
          formationDate: shgData.formationDate,
          fed_amt: shgData.fed_amt,
          cashatbank: shgData.cashatbank,
          amount: shgData.amount,
          totalMember: shgData.totalMember,
          transactionstatus: shgData.transactionstatus,
          month: shgData.month,
          monthlymeeting: shgData.monthlymeeting,
          status: shgData.status === 1 ? "Active" : "Inactive",
          TotalmonthlySaving: shgData.TotalmonthlySaving,
          totalMeeting: shgData.totalMeeting,
          savingAmt: shgData.savingAmt,
          totalInternalLoan: shgData.totalInternalLoan,
          totalInternalLoanRecover: shgData.totalInternalLoanRecover,
          totalInternalLoanInterest: shgData.totalInternalLoanInterest,
          totalExpanses: shgData.totalExpanses,
          TotalBankLoan: shgData.TotalBankLoan,
          totalbankloanrecover: shgData.totalbankloanrecover,
          updatedAt: shgData.updatedAt,
          TotalBankLoanInterest: shgData.TotalBankLoanInterest


        });
      } else {
        message.error("shg not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch shg data");
    }
  };

  //  list of state
  const [stateData, setStateData] = useState<any[]>([]);
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
  // Function to handle form submission (Update API call)
  const onFinish = async (values: any) => {
    try {

      const token = SecureStorage.getItem("accessToken");
      const status = values.status === "Active";
      const updateData = {
        id: shgId,
        shg_id: values.shg_id,
        group_name: values.group_name,
        group_leader: values.group_leader,
        state: values.state,
        district: values.district,
        location: values.location,
        village: values.village,
        block_taluk: values.block_taluk,
        pincode: values.pincode,
        animator_id: values.animator_id,
        animator: values.animator,
        bank_name: values.bank_name,
        bank_branch: values.bank_branch,
        bank_ac: values.bank_ac,
        formationDate: values.formationDate,
        fed_amt: values.fed_amt,
        cashatbank: values.cashatbank,
        amount: values.amount,
        totalMember: values.totalMember,
        transactionstatus: values.transactionstatus,
        month: values.month,
        monthlymeeting: values.monthlymeeting,
        status: status,
        TotalmonthlySaving: values.TotalmonthlySaving,
        totalMeeting: values.totalMeeting,
        savingAmt: values.savingAmt,
        totalInternalLoan: values.totalInternalLoan,
        totalInternalLoanRecover: values.totalInternalLoanRecover,
        totalInternalLoanInterest: values.totalInternalLoanInterest,
        totalExpanses: values.totalExpanses,
        TotalBankLoan: values.TotalBankLoan,
        totalbankloanrecover: values.totalbankloanrecover,
        updatedAt: values.updatedAt,
        TotalBankLoanInterest: values.TotalBankLoanInterest

      };
      

      const response = await axios.post('http://localhost:4000/ujs/UpdateShgGroup', updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });


      if (response.data.status === 200) {
        toast.success('Form submitted successfully!');
        form.resetFields(); // Optionally reset the form fields
        router.push("/pages/ShgManagement/ShgGroup")
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <h2 className="text-xl font-semibold mb-4 lg:ml-[0px]">Update SHG Group</h2>
            <Form form={form} name="create-shg-group" onFinish={onFinish} layout="vertical" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Existing fields */}
                <Form.Item name="group_name" label="Group Name" >
                  <Input type="text" placeholder="Group Name" />
                </Form.Item>
                <Form.Item name="group_leader" label="Group Leader">
                  <Input type="text" placeholder="Group Leader" />
                </Form.Item>
                {/* <Form.Item name="formationDate" label="Formation Date">
                  <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                </Form.Item> */}
                <Form.Item name="state" label="State Name">
                  <Select placeholder="Select state">
                    {stateData.map((item: any) => (
                      <Option key={item.id} value={item.state}>
                        {item.state}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="district" label="District Name">
                  <Input type="text" placeholder="District Name" />
                </Form.Item>
                <Form.Item name="location" label="Location Name">
                  <Input type="text" placeholder="Location Name" />
                </Form.Item>
                <Form.Item name="village" label="Village Name">
                  <Input type="text" placeholder="Village Name" />
                </Form.Item>
                <Form.Item name="block_taluk" label="Taluka Name">
                  <Input type="text" placeholder="Taluka Name" />
                </Form.Item>
                <Form.Item name="bank_name" label="Bank Name">
                  <Input type="text" placeholder="Bank Name" />
                </Form.Item>
                <Form.Item name="bank_branch" label="Bank Branch">
                  <Input type="text" placeholder="Bank Branch" />
                </Form.Item>
                <Form.Item name="bank_ac" label="Bank Account">
                  <Input type="number" placeholder="Bank Account" />
                </Form.Item>
                <Form.Item name="totalMember" label="Total Member">
                  <Input type="number" placeholder="Total Member" />
                </Form.Item>
                <Form.Item name="cashatbank" label="Cash At Bank">
                  <Input type="number" placeholder="Cash At Bank" />
                </Form.Item>
                {/* <Form.Item name="last_meeting_date" label="Last Meeting Date">
                  <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                </Form.Item> */}
                <Form.Item name="status" label="Status" >
                  <Select placeholder="Select status">
                    <Option value="active">Active</Option>
                    <Option value="inactive">Inactive</Option>
                  </Select>
                </Form.Item>

                {/* Missing fields from the DTO */}
                <Form.Item name="animator_id" label="Animator ID">
                  <Input type="number" placeholder="Animator ID" />
                </Form.Item>
                <Form.Item name="animator" label="Animator Name">
                  <Input type="text" placeholder="Animator Name" />
                </Form.Item>
                <Form.Item name="pincode" label="Pincode">
                  <Input type="number" placeholder="Pincode" />
                </Form.Item>
                <Form.Item name="transactionstatus" label="Transaction Status">
                  <Input type="number" placeholder="Transaction Status" />
                </Form.Item>
                <Form.Item name="month" label="Month">
                  <Input type="number" placeholder="Month" />
                </Form.Item>
                {/* <Form.Item name="monthlymeeting" label="Monthly Meeting Date">
                  <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                </Form.Item> */}
                <Form.Item name="TotalmonthlySaving" label="Total Monthly Saving">
                  <Input type="number" placeholder="Total Monthly Saving" />
                </Form.Item>
                <Form.Item name="totalMeeting" label="Total Meeting">
                  <Input type="number" placeholder="Total Meeting" />
                </Form.Item>
                <Form.Item name="savingAmt" label="Saving Amount">
                  <Input type="number" placeholder="Saving Amount" />
                </Form.Item>
                <Form.Item name="totalInternalLoan" label="Total Internal Loan">
                  <Input type="number" placeholder="Total Internal Loan" />
                </Form.Item>
                <Form.Item name="totalInternalLoanRecover" label="Total Internal Loan Recovery">
                  <Input type="number" placeholder="Total Internal Loan Recovery" />
                </Form.Item>
                <Form.Item name="totalInternalLoanInterest" label="Total Internal Loan Interest">
                  <Input type="number" placeholder="Total Internal Loan Interest" />
                </Form.Item>
                <Form.Item name="totalExpanses" label="Total Expenses">
                  <Input type="number" placeholder="Total Expenses" />
                </Form.Item>
                <Form.Item name="TotalBankLoan" label="Total Bank Loan">
                  <Input type="number" placeholder="Total Bank Loan" />
                </Form.Item>
                <Form.Item name="totalbankloanrecover" label="Total Bank Loan Recovery">
                  <Input type="number" placeholder="Total Bank Loan Recovery" />
                </Form.Item>
                <Form.Item name="TotalBankLoanInterest" label="Total Bank Loan Interest">
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

        </div>
      </div>
    </>
  );
};

export default UpdateShgGroup;
