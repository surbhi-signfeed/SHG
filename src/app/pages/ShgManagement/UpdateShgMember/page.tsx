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

const UpdateShgMember: React.FC = () => {
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
      const response = await axios.get("http://localhost:4000/ujs/ListShgMember", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const apiData = response.data;
      const shgData = apiData.shgMember.find((item: any) => item.id === parseInt(id));


      if (shgData) {
        setshg(shgData);

        // Populate form with fetched data
        form.setFieldsValue({

          id: shgData.id, // from DTO
          row_arrangement: shgData.row_arrangement, // from DTO
          member_name: shgData.member_name, // from DTO
          member_name_eng: shgData.member_name_eng, // from DTO
          group_name: shgData.group_name, // retained
          animator_id: shgData.animator_id, // from DTO
          animator_name: shgData.animator_name, // from DTO
          leader_name: shgData.leader_name, // from DTO
          HusbandFather_Name: shgData.HusbandFather_Name, // from DTO
          village: shgData.village, // retained
          mobile: shgData.mobile, // from DTO
          whatsapp_number: shgData.whatsapp_number, // from DTO
          email: shgData.email, // from DTO
          adhaar_number: shgData.adhaar_number, // from DTO
          gender: shgData.gender, // from DTO
          dob: shgData.dob, // from DTO
          education: shgData.education, // from DTO
          primary_occu: shgData.primary_occu, // from DTO
          religion: shgData.religion, // from DTO
          house_num: shgData.house_num, // from DTO
          block_taluk: shgData.block_taluk, // retained
          gram_punchayat: shgData.gram_punchayat, // from DTO
          state: shgData.state, // retained
          district: shgData.district, // retained
          pincode: shgData.pincode, // retained
          bank_name: shgData.bank_name, // retained
          branch_name: shgData.branch_name, // from DTO
          bank_ac: shgData.bank_ac, // retained
          bank_ifsc: shgData.bank_ifsc, // from DTO
          aadhar_seeding_status: shgData.aadhar_seeding_status, // from DTO
          voter_num: shgData.voter_num, // from DTO
          mngrega_num: shgData.mngrega_num, // from DTO
          sub_cat: shgData.sub_cat, // from DTO
          loan_taken: shgData.loan_taken, // from DTO
          mfi_bank_loan: shgData.mfi_bank_loan, // from DTO
          annual_income: shgData.annual_income, // from DTO
          diff_abled: shgData.diff_abled, // from DTO
          total_household_member: shgData.total_household_member, // from DTO
          member_status: shgData.member_status, // from DTO
          social_strata: shgData.social_strata, // from DTO
          house_hold_above: shgData.house_hold_above, // from DTO
          monthlySaving: shgData.monthlySaving, // from DTO
          fedrationSaving: shgData.fedrationSaving, // from DTO
          openingBal: shgData.openingBal, // from DTO
          fix_loan: shgData.fix_loan, // from DTO
          updated_at: shgData.updated_at, // from DTO
          status: shgData.status === 1 ? "Active" : "Inactive",



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
        row_arrangement: values.row_arrangement, // from DTO
        member_name: values.member_name, // from DTO
        member_name_eng: values.member_name_eng, // from DTO
        group_name: values.group_name, // retained
        animator_id: values.animator_id, // from DTO
        animator_name: values.animator_name, // from DTO
        leader_name: values.leader_name, // from DTO
        HusbandFather_Name: values.HusbandFather_Name, // from DTO
        village: values.village, // retained
        mobile: values.mobile, // from DTO
        whatsapp_number: values.whatsapp_number, // from DTO
        email: values.email, // from DTO
        adhaar_number: values.adhaar_number, // from DTO
        gender: values.gender, // from DTO
        dob: values.dob, // from DTO
        education: values.education, // from DTO
        primary_occu: values.primary_occu, // from DTO
        religion: values.religion, // from DTO
        house_num: values.house_num, // from DTO
        block_taluk: values.block_taluk, // retained
        gram_punchayat: values.gram_punchayat, // from DTO
        state: values.state, // retained
        district: values.district, // retained
        pincode: values.pincode, // retained
        bank_name: values.bank_name, // retained
        branch_name: values.branch_name, // from DTO
        bank_ac: values.bank_ac, // retained
        bank_ifsc: values.bank_ifsc, // from DTO
        aadhar_seeding_status: values.aadhar_seeding_status, // from DTO
        voter_num: values.voter_num, // from DTO
        mngrega_num: values.mngrega_num, // from DTO
        sub_cat: values.sub_cat, // from DTO
        loan_taken: values.loan_taken, // from DTO
        mfi_bank_loan: values.mfi_bank_loan, // from DTO
        annual_income: values.annual_income, // from DTO
        diff_abled: values.diff_abled, // from DTO
        total_household_member: values.total_household_member, // from DTO
        member_status: values.member_status, // from DTO
        social_strata: values.social_strata, // from DTO
        house_hold_above: values.house_hold_above, // from DTO
        status: status, // retained, as it's a mandatory field
        monthlySaving: values.monthlySaving, // from DTO
        fedrationSaving: values.fedrationSaving, // from DTO
        openingBal: values.openingBal, // from DTO
        fix_loan: values.fix_loan, // from DTO
        updated_at: values.updated_at, // from DTO

      };
      

      const response = await axios.post('http://localhost:4000/ujs/UpdateShgMember', updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });


      if (response.data.status === 200) {
        toast.success('Form submitted successfully!');
        form.resetFields(); // Optionally reset the form fields
        router.push("/pages/ShgManagement/ShgMemberList")
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
            <h2 className="text-xl font-semibold mb-4 lg:ml-[0px]">Update SHG Member</h2>
            <Form form={form} name="create-shg-group" onFinish={onFinish} layout="vertical" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Existing fields */}
                <Form.Item name="group_name" label="Group Name" >
                  <Input type="text" placeholder="Group Name" />
                </Form.Item>

                <Form.Item name="leader_name" label="Group Leader">
                  <Input type="text" placeholder="Group Leader" />
                </Form.Item>

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

              

                <Form.Item name="village" label="Village Name">
                  <Input type="text" placeholder="Village Name" />
                </Form.Item>

                <Form.Item name="block_taluk" label="Taluka Name">
                  <Input type="text" placeholder="Taluka Name" />
                </Form.Item>

                <Form.Item name="bank_name" label="Bank Name">
                  <Input type="text" placeholder="Bank Name" />
                </Form.Item>

                <Form.Item name="branch_name" label="Bank Branch">
                  <Input type="text" placeholder="Bank Branch" />
                </Form.Item>

                <Form.Item name="bank_ac" label="Bank Account">
                  <Input type="number" placeholder="Bank Account" />
                </Form.Item>


               

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

                <Form.Item name="animator_name" label="Animator Name">
                  <Input type="text" placeholder="Animator Name" />
                </Form.Item>

                <Form.Item name="pincode" label="Pincode">
                  <Input type="number" placeholder="Pincode" />
                </Form.Item>

                <Form.Item name="whatsapp_number" label="WhatsApp Number">
                  <Input type="text" placeholder="WhatsApp Number" />
                </Form.Item>

                <Form.Item name="email" label="Email">
                  <Input type="" placeholder="Email" />
                </Form.Item>

                <Form.Item name="adhaar_number" label="Aadhaar Number">
                  <Input type="text" placeholder="Aadhaar Number" />
                </Form.Item>

                <Form.Item name="voter_num" label="Voter ID Number">
                  <Input type="text" placeholder="Voter ID Number" />
                </Form.Item>

                <Form.Item name="mngrega_num" label="MGNREGA Number">
                  <Input type="text" placeholder="MGNREGA Number" />
                </Form.Item>

                <Form.Item name="sub_cat" label="Sub Category">
                  <Input type="text" placeholder="Sub Category" />
                </Form.Item>

                <Form.Item name="loan_taken" label="Loan Taken">
                  <Input type="text" placeholder="Loan Taken" />
                </Form.Item>

                <Form.Item name="mfi_bank_loan" label="MFI Bank Loan">
                  <Input type="text" placeholder="MFI Bank Loan" />
                </Form.Item>

                <Form.Item name="annual_income" label="Annual Income">
                  <Input type="text" placeholder="Annual Income" />
                </Form.Item>

                <Form.Item name="diff_abled" label="Differently Abled">
                  <Input type="text" placeholder="Differently Abled" />
                </Form.Item>

                <Form.Item name="total_household_member" label="Total Household Members">
                  <Input type="number" placeholder="Total Household Members" />
                </Form.Item>

                <Form.Item name="member_status" label="Member Status">
                  <Input type="text" placeholder="Member Status" />
                </Form.Item>

                <Form.Item name="social_strata" label="Social Strata">
                  <Input type="text" placeholder="Social Strata" />
                </Form.Item>

                <Form.Item name="house_hold_above" label="Household Above Poverty Line">
                  <Input type="text" placeholder="Household Above Poverty Line" />
                </Form.Item>

                <Form.Item name="monthlySaving" label="Monthly Saving">
                  <Input type="number" placeholder="Monthly Saving" />
                </Form.Item>


                <Form.Item name="openingBal" label="Opening Balance" >
                  <Input type="number" placeholder="Opening Balance" />
                </Form.Item>

                <Form.Item name="fix_loan" label="Fixed Loan" >
                  <Input type="number" placeholder="Fixed Loan" />
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

export default UpdateShgMember;
