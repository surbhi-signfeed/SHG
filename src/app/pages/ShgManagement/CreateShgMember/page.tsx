'use client'

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Select, DatePicker } from 'antd';
import TopNavbar from '@/app/Component/Topnavbar/page';
import Sidebar from '@/app/Component/Sidebar/page';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import SecureStorage from 'react-secure-storage';
import { useRouter } from 'next/navigation';
const { Option } = Select;
interface SHGData {
  key: string;
  group_name: string;
  Status: string;
  group_leader: string;
  totalMember: string;
  state: any;

}
const CreateShgMember: React.FC = () => {
  const [form] = Form.useForm();
  const router=useRouter();
  const [hasCreatePermission, setHasCreatePermission] = useState<boolean | null>(null); // Set initial value to null
  const [data, setData] = useState<SHGData[]>([]);
  const [stateData, setStateData] = useState<any[]>([]);
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
  //  list of shg group
  useEffect(() => {
    const fetchData = async () => {
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
        setData(formattedData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  //  list of state

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
  console.log("State", stateData)
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
        id: parseInt(values.shgId, 10), // Assuming this is an ID field and not optional
        row_arrangement: values.rowArrangement, // Assuming it's provided in the form
        shg_id: values.shgId || '', // SHG ID
        member_name: values.memberName || '', // Member Name
        member_name_eng: values.memberNameEng || '', // Member Name (English)
        group_name: values.groupName || '', // Group Name
        animator_id: values.animatorId || null, // Animator ID
        animator_name: values.animatorName || '', // Animator Name
        leader_name: values.leaderName || '', // Leader Name
        HusbandFather_Name: values.husbandFatherName || '', // Husband/Father Name
        village: values.villageName || '', // Village Name
        mobile: values.mobile || '', // Mobile Number
        whatsapp_number: values.whatsapp || '', // WhatsApp Number
        email: values.email || '', // Email Address
        adhaar_number: values.aadharNo || '', // Aadhar Number
        gender: values.gender || '', // Gender
        dob: values.dob ? moment(values.dob).format('YYYY-MM-DD') : '', // Date of Birth
        education: values.education || '', // Education Level
        primary_occu: values.primaryOccupation || '', // Primary Occupation
        religion: values.religion || '', // Religion
        house_num: values.houseNo || '', // House Number
        block_taluk: values.blockTaluka || '', // Block/Taluka
        gram_punchayat: values.grampanchayat || '', // Gram Panchayat
        state: values.stateName || '', // State Name
        district: values.districtName || '', // District Name
        pincode: values.pinCode || '', // Pin Code
        bank_name: values.bankName || '', // Bank Name
        branch_name: values.bankBranch || '', // Bank Branch
        bank_ac: values.bankAC || '', // Bank Account
        bank_ifsc: values.bankIFSC || '', // Bank IFSC Code
        aadhar_seeding_status: values.aadharSeedingStatus || '', // Aadhar Seeding Status
        voter_num: values.voterNum || '', // Voter Number
        mngrega_num: values.mnregaNum || '', // MNREGA Number
        sub_cat: values.category || '', // Category (Social Strata)
        loan_taken: values.loanTaken || '', // Loan Taken
        mfi_bank_loan: values.mfiBankLoan || '', // MFI Bank Loan
        annual_income: values.annualIncome ? parseInt(values.annualIncome, 10) : 0, // Annual Income
        diff_abled: values.differentlyAbled || '', // Differently Abled Status
        total_household_member: values.totalHouseholdMember ? parseInt(values.totalHouseholdMember, 10) : 0, // Total Household Members
        member_status: values.status === 'active' ? 1 : 0, // Status (mapped to numeric 1 or 0)
        social_strata: values.socialStrata || '', // Social Strata
        house_hold_above: values.houseHoldAbove || '', // House Hold Above
        status: values.status === 'active' ? 1 : 0, // Status (Active = 1, Inactive = 0)
        monthlySaving: values.totalMonthlySaving ? parseInt(values.totalMonthlySaving, 10) : 0, // Total Monthly Saving
        fedrationSaving: values.totalFederationSaving ? parseInt(values.totalFederationSaving, 10) : 0, // Total Federation Saving
        openingBal: values.openingBal ? parseInt(values.openingBal, 10) : 0, // Opening Balance
        fix_loan: values.fixLoan ? parseInt(values.fixLoan, 10) : 0, // Fixed Loan
      };
      


      // Log request data
      console.log("Request Data:", requestData);

      // Make POST request to API
      const response = await axios.post('http://localhost:4000/ujs/AddShgMember', requestData, {
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

      <div className="flex bg-gray-100">
        {/* Sidebar - fixed width */}
        <div className="lg:w-1/4 h-screen">
          <Sidebar />
        </div>
        {hasCreatePermission !== null && hasCreatePermission ? (<>
          {/* Main Content */}
          <div className="w-full lg:w-3/4 mt-[100px] xl:ml-[-50px] bg-white">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
              <h2 className="text-xl font-semibold mb-4 lg:ml-[0px]">Create SHG Member</h2>
              <Form form={form} name="create-shg-group" onFinish={onFinish} layout="vertical" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
                  {/* Each of these is a Form.Item with an Input or other component */}
                  {/* Row 1 */}
                  <Form.Item name="shgId" label="Shg id">
                    <Input placeholder="Shg Id" />
                  </Form.Item>
                  <Form.Item name="groupName" label="Group Name">
                    <Select placeholder="Select Group">
                      {data.map((item: any) => (
                        <Option key={item.id} value={item.group_name}>
                          {item.group_name}
                        </Option>
                      ))}
                    </Select>
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
                    <Select placeholder="Select state">
                      {stateData.map((item: any) => (
                        <Option key={item.id} value={item.state}>
                          {item.state}
                        </Option>
                      ))}
                    </Select>
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
                    <Select placeholder="Select status">
                      <Option value="Female">Female</Option>
                      <Option value="Male">Male</Option>
                    </Select>
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
                    <Select placeholder="Differently Abled">
                      <Option value="yes">Yes</Option>
                      <Option value="no">No</Option>
                    </Select>
                  </Form.Item>

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
        </>) : " You Don't have access to create department"}
      </div>
    </>
  );
};

export default CreateShgMember;
