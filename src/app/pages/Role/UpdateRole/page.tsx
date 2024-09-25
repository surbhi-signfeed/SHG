"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message, Checkbox } from "antd";
import TopNavbar from "@/app/Component/Topnavbar/page";
import Sidebar from "@/app/Component/Sidebar/page";
import SecureStorage from "react-secure-storage";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const { Option } = Select;

const Edit: React.FC = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    // State to store role data
    const [Role, setRole] = useState<any>(null);
    const [permissions, setPermissions] = useState<string[]>([]);
    // Extract ID from URL
    const RoleId = searchParams.get("id");

    useEffect(() => {
        // Check if the token exists in SecureStorage
        const token = SecureStorage.getItem("accessToken");
        if (!token) {
            router.push("/"); // Redirect to login page if token is not present
        } else {
            // Fetch Role data
            fetchRoleData(RoleId, token);
        }
    }, [RoleId]);

    const fetchRoleData = async (id: string | null, token: any) => {
        if (!id) {
            return;
        }

        try {
            const response = await axios.get("http://localhost:4000/ujs/ListAllRolePermission", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const apiData = response.data;
            const RoleData = apiData.shgRole.find((item: any) => item.roll_id === parseInt(id));
            console.log("lR", RoleData.permissions)

            if (RoleData) {
                setRole(RoleData);

                // Populate form with fetched data
                form.setFieldsValue({
                    RoleName: RoleData.role_name,
                    status: RoleData.role_status === 1 ? "Active" : "Inactive",
                    //   Permission:RoleData.permisisons
                });
                setPermissions(RoleData.permissions || []);
            } else {
                message.error("Role not found");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            message.error("Failed to fetch Role data");
        }
    };
    console.log("k", permissions)

    // Handle checkbox change for permissions
    const handlePermissionChange = (checkedValue: string, checked: boolean) => {
        if (checked) {
            // Add the permission if checked
            setPermissions((prevPermissions) => [...prevPermissions, checkedValue]);
        } else {
            // Remove the permission if unchecked
            setPermissions((prevPermissions) => prevPermissions.filter((perm) => perm !== checkedValue));
        }
    };
console.log("jn",permissions)
    // Function to handle form submission (Update API call)
    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const token = SecureStorage.getItem("accessToken");
 // Transform permissions array to include "permission_name" and "active" properties
 const formattedPermissions = permissions.map(permission => ({
    permission_name: permission,
    active: true, // Assuming all permissions are active
}));
            const updateData = {
                roll_id: RoleId,  // Include the ID in the request body
                role_name: values.RoleName,
                permissions:formattedPermissions,
                status: values.status === "Active" ? true : false,  // Assuming status expects a boolean value
            };
            console.log("updated", updateData)

            const response = await axios.post('http://localhost:4000/ujs/UpdateRolePermsission', updateData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });


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
                    <div className="container mx-auto p-4">
                        <h2 className="text-xl font-semibold mb-4 lg:ml-[20px]">
                            Update Role
                        </h2>

                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            className="bg-white p-6  rounded-lg"
                            initialValues={Role ? {
                                RoleName: Role.role_name,
                                status: Role.role_status === true ? "Active" : "Inactive",
                            } : {}}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Form.Item
                                    name="RoleName"
                                    className="text-gray-600"
                                    label="Role Name"

                                >

                                    <Input placeholder="Enter Role Name" />
                                </Form.Item>

                                <Form.Item name="status" label="Status" >

                                    <Select>
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
                                        <Form.Item name="create_role">
                                            <Checkbox
                                                checked={permissions.includes('create_role')} onChange={(e) => handlePermissionChange('create_role', e.target.checked)}
                                            >
                                                Create
                                            </Checkbox>
                                        </Form.Item>




                                        <Form.Item name="modify_role" >
                                            <Checkbox checked={permissions.includes('modify_role')} onChange={(e) => handlePermissionChange('modify_role', e.target.checked)} >Modify</Checkbox>
                                        </Form.Item>
                                        <Form.Item name="view_role" >
                                            <Checkbox checked={permissions.includes('view_role')} onChange={(e) => handlePermissionChange('view_role', e.target.checked)}>View</Checkbox>
                                        </Form.Item>
                                    </div>
                                </div>

                                {/* Department Management */}
                                <div>
                                    <h4 className="font-semibold mb-2 text-[14px] text-gray-600">Department Management</h4>
                                    <div className="flex flex-wrap gap-4">
                                        <Form.Item name="create_department" >
                                            <Checkbox checked={permissions.includes('create_department')} onChange={(e) => handlePermissionChange('create_department', e.target.checked)}>Create</Checkbox>
                                        </Form.Item>
                                        <Form.Item name="modify_department" >
                                            <Checkbox checked={permissions.includes('modify_department')} onChange={(e) => handlePermissionChange('modify_department', e.target.checked)}>Modify</Checkbox>
                                        </Form.Item>
                                        <Form.Item name="view_department" >
                                            <Checkbox checked={permissions.includes('view_department')} onChange={(e) => handlePermissionChange('view_department', e.target.checked)}>View</Checkbox>
                                        </Form.Item>
                                    </div>
                                </div>
                                {/* User Management */}
                                <div>
                                    <h4 className="font-semibold mb-2 text-[14px] text-gray-600">User Management</h4>
                                    <div className="flex flex-wrap gap-4">
                                        <Form.Item name="user_create" >
                                            <Checkbox checked={permissions.includes('user_create')} onChange={(e) => handlePermissionChange('user_create', e.target.checked)}>Create</Checkbox>
                                        </Form.Item>
                                        <Form.Item name="user_modify" >
                                            <Checkbox checked={permissions.includes('user_modify')} onChange={(e) => handlePermissionChange('user_modify', e.target.checked)}>Modify</Checkbox>
                                        </Form.Item>
                                        <Form.Item name="user_view" >
                                            <Checkbox checked={permissions.includes('user_view')} onChange={(e) => handlePermissionChange('user_view', e.target.checked)}>View</Checkbox>
                                        </Form.Item>
                                    </div>
                                </div>
                                {/* Loan Management */}
                                <div>
                                    <h4 className="font-semibold mb-2 text-[14px] text-gray-600">Loan Management</h4>
                                    <div className="flex flex-wrap gap-1">
                                        <Form.Item name="loans" >
                                            <Checkbox checked={permissions.includes('loans')} onChange={(e) => handlePermissionChange('loans', e.target.checked)}>Loans</Checkbox>
                                        </Form.Item>
                                        <Form.Item name="edit_bank_loan" >
                                            <Checkbox checked={permissions.includes('edit_bank_loan')} onChange={(e) => handlePermissionChange('edit_bank_loan', e.target.checked)}>Edit Bank Loan</Checkbox>
                                        </Form.Item>
                                        <Form.Item name="view_bank_loan" >
                                            <Checkbox checked={permissions.includes('view_bank_loan')} onChange={(e) => handlePermissionChange('view_bank_loan', e.target.checked)}>View Bank Loan</Checkbox>
                                        </Form.Item>
                                        <Form.Item name="edit_group_internal_loan" >
                                            <Checkbox checked={permissions.includes('edit_group_internal_loan')} onChange={(e) => handlePermissionChange('edit_group_internal_loan', e.target.checked)}>Edit Group Internal Loan</Checkbox>
                                        </Form.Item>
                                        <Form.Item name="view_group_internal_loan" >
                                            <Checkbox checked={permissions.includes('view_group_internal_loan')} onChange={(e) => handlePermissionChange('view_group_internal_loan', e.target.checked)}>View Group Internal Loan</Checkbox>
                                        </Form.Item>
                                        <Form.Item name="edit_member_internal_loan" >
                                            <Checkbox checked={permissions.includes('edit_member_internal_loan')} onChange={(e) => handlePermissionChange('edit_member_internal_loan', e.target.checked)}>Edit Member Internal Loan</Checkbox>
                                        </Form.Item>
                                        <Form.Item name="view_member_internal_loan" >
                                            <Checkbox checked={permissions.includes('view_member_internal_loan')} onChange={(e) => handlePermissionChange('view_member_internal_loan', e.target.checked)}>View Member Internal Loan</Checkbox>
                                        </Form.Item>

                                    </div>
                                </div>

                                {/* SHG Data Management */}
                                <div>
                                    <h4 className="font-semibold mb-2 text-[14px] text-gray-600">SHG Data Management</h4>
                                    <div className="flex flex-wrap gap-4">
                                        <Form.Item name="data_view" >
                                            <Checkbox checked={permissions.includes('data_view')} onChange={(e) => handlePermissionChange('data_view', e.target.checked)}>Data View</Checkbox>
                                        </Form.Item>
                                        <Form.Item name="create_group" >
                                            <Checkbox checked={permissions.includes('create_group')} onChange={(e) => handlePermissionChange('create_group', e.target.checked)}>Create Group</Checkbox>
                                        </Form.Item>
                                        <Form.Item name="view_shg_group" >
                                            <Checkbox checked={permissions.includes('view_shg_group')} onChange={(e) => handlePermissionChange('view_shg_group', e.target.checked)}>View Shg Group</Checkbox>
                                        </Form.Item>
                                        <Form.Item name="edit_shg_group" >
                                            <Checkbox checked={permissions.includes('edit_shg_group')} onChange={(e) => handlePermissionChange('edit_shg_group', e.target.checked)}>Edit Shg Group</Checkbox>
                                        </Form.Item>
                                        <Form.Item name="create_member" >
                                            <Checkbox checked={permissions.includes('create_member')} onChange={(e) => handlePermissionChange('create_member', e.target.checked)}>Create Member</Checkbox>
                                        </Form.Item>
                                        <Form.Item name="view_member" >
                                            <Checkbox checked={permissions.includes('view_member')} onChange={(e) => handlePermissionChange('view_member', e.target.checked)}>View Member</Checkbox>
                                        </Form.Item>
                                        <Form.Item name="edit_member" >
                                            <Checkbox checked={permissions.includes('edit_member')} onChange={(e) => handlePermissionChange('edit_member', e.target.checked)}>Edit Member</Checkbox>
                                        </Form.Item>
                                    </div>
                                </div>

                                {/* SHG Reports Management */}
                                <div>
                                    <h4 className="font-semibold mb-2 text-[14px] text-gray-600">SHG Reports Management</h4>
                                    <div className="flex flex-wrap gap-4">

                                        <Form.Item name="shg_group_report" >
                                            <Checkbox checked={permissions.includes('shg_group_report')} onChange={(e) => handlePermissionChange('shg_group_report', e.target.checked)}>SHG Group Report</Checkbox>
                                        </Form.Item>
                                        <Form.Item name="shg_member_report" >
                                            <Checkbox checked={permissions.includes('shg_member_report')} onChange={(e) => handlePermissionChange('shg_member_report', e.target.checked)}>SHG Member Report</Checkbox>
                                        </Form.Item>
                                    </div>
                                </div>
                                {/* Repeat similar blocks for other permissions like User Management, Loan Management, etc. */}
                            </div>
                            <div className="flex justify-between mt-6">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="bg-gray-900 text-white"
                                    loading={loading}
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

export default Edit;
