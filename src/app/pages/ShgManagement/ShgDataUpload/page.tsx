"use client";
import React, { useState } from "react";
import {
    Table,
    Button,
    Select,
    Input,
    Space,
    Row,
    Col,
    Dropdown,
    Menu,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { IoMdSearch } from "react-icons/io";
import { ColumnsType } from "antd/es/table";
import Sidebar from "@/app/Component/Sidebar/page";
import { MdKeyboardArrowDown } from "react-icons/md";
import TopNavbar from "@/app/Component/Topnavbar/page";
import { ConfigProvider, theme } from "antd";
import HorizontalBar from "@/app/Component/HorizontalBar/page";
import SecureStorage from 'react-secure-storage'
import { useRouter } from "next/navigation";
const { Option } = Select;

interface SHGData {
    key: string;
    shgId: string;
    groupName: string;
}

const ShgGroup: React.FC = () => {
    const [searchValue, setSearchValue] = useState("");
    const [field, setField] = useState("Name");
    const [type, setType] = useState("like");
    const [searchText, setSearchText] = useState("");
    const router =useRouter();
    React.useEffect(() => {
      // Check if the token exists in SecureStorage
      const token = SecureStorage.getItem('accessToken');
      if (!token) {
        router.push("/"); // Redirect to login page if token is not present
      } else {
      
      }
    }, []); 
    const data: SHGData[] = [
        { key: "1", shgId: "UJSBAN2023_01", groupName: "SARASWATI SHG KHARKHADA" },

    ];

    const columns: ColumnsType<SHGData> = [
        {
            title: "SHG Group ID",
            dataIndex: "shgId",
            key: "shgId",
        },
        {
            title: "Status",
            dataIndex: "status",
            sorter: true,
        },
        {
            title: "Create User",
            dataIndex: "createUser",
            sorter: true,
        },
        {
            title: "Modify User",
            dataIndex: "modifyUser",
            sorter: true,
        },
        {
            title: "View User",
            dataIndex: "viewUser",
            sorter: true,
        },
        {
            title: "Create Role",
            dataIndex: "createRole",
            sorter: true,
        },
        {
            title: "Modify Role",
            dataIndex: "modifyRole",
            sorter: true,
        },
        {
            title: "User Report",
            dataIndex: "userReport",
            sorter: true,
        },
        {
            title: "Data Report",
            dataIndex: "dataReport",
            sorter: true,
        },
        {
            title: "History Report",
            dataIndex: "historyReport",
            sorter: true,
        },
        {
            title: "Group Name",
            dataIndex: "groupName",
            key: "groupName",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Button type="primary" icon={<EditOutlined />} className="bg-gray-700">
                    Edit
                </Button>
            ),
        },
    ];

    const handleSearch = () => {
        console.log("Searching for:", searchValue);
    };

    const handleExport = () => {
        console.log("Exporting XLSX...");
    };
    // Custom search input
    const searchInput = (
        <Input
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
            suffix={<IoMdSearch />}
        />
    );
    return (
        < >
            <div className="">
                <TopNavbar />
                <HorizontalBar />
                <div className="flex bg-gray-100">


                    {/* Main Content */}
                    <div className="w-full  mt-[100px]  bg-white">
                        <h2 className="text-black text-[16px] ml-[10vw] lg:ml-[6vw] xl:ml-[2vw] lg:mt-4">
                            SHG Group
                        </h2>

                        <div className="w-full">
                            <ConfigProvider
                                theme={{
                                    algorithm: theme.defaultAlgorithm,
                                }}
                            >
                                <div>
                                    {/* laptop */}
                                    <Row justify="space-between" align="middle" style={{ marginBottom: 16 }} className="hidden lg:flex p-3">
                                        <Col>
                                            <Space>




                                                {/* Value Search Input */}
                                                SHG Group :  <Input
                                                    placeholder="Search..."
                                                    value={searchValue}
                                                    onChange={(e) => setSearchValue(e.target.value)}
                                                    style={{ width: 200 }}
                                                />

                                                {/* Go Button */}
                                                <Button type="primary" onClick={handleSearch} className='bg-gray-700'>Go</Button>
                                            </Space>
                                        </Col>

                                        {/* Export XLSX Button */}
                                        <Col>
                                            <Button type="default" onClick={handleExport} className='bg-gray-700 text-white'>Export XLSX</Button>
                                        </Col>
                                    </Row>
                                    <Row justify="space-between" style={{ marginBottom: 16 }} className="hidden lg:flex p-3">
                                        <Col>
                                            <Space > {/* Use 'size' prop to add space */}
                                                {/* Value Search Input */}
                                                Meeting Date:
                                                <Input
                                                    placeholder="DD/MM/YYYY"
                                                    type="date"
                                                    value={searchValue}
                                                    onChange={(e) => setSearchValue(e.target.value)}
                                                    style={{ width: 200 }}
                                                />
                                                <h6>Total Meeting: 0</h6>

                                                {/* Adding "Last Meeting" with space */}
                                                <h6 style={{ marginLeft: '20px' }}>Last Meeting: 0</h6>
                                            </Space>
                                        </Col>


                                    </Row>


                                    {/* mobile */}
                                    <div className=" lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4 p-3">
                                        {/* Left section for dropdowns and search input */}
                                        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
                                            {/* Field Dropdown */}
                                            <Select defaultValue={field} onChange={(value) => setField(value)} className="w-full md:w-32">
                                                <Option value="Name">Name</Option>
                                                <Option value="ID">ID</Option>
                                            </Select>

                                            {/* Type Dropdown */}
                                            <Select defaultValue={type} onChange={(value) => setType(value)} className="w-full md:w-32">
                                                <Option value="like">like</Option>
                                                <Option value="equal">equal</Option>
                                                <Option value="not equal">not equal</Option>
                                            </Select>

                                            {/* Value Search Input */}
                                            <Input
                                                placeholder="Search..."
                                                value={searchValue}
                                                onChange={(e) => setSearchValue(e.target.value)}
                                                className="w-full md:w-64"
                                            />

                                            {/* Go Button */}
                                            <Button type="primary" onClick={handleSearch} className="bg-gray-700 text-white">Go</Button>
                                        </div>

                                        {/* Export XLSX Button */}
                                        <div className="flex justify-end md:justify-start">
                                            <Button type="default" onClick={handleExport} className="bg-gray-700 text-white">
                                                Export XLSX
                                            </Button>
                                        </div>
                                    </div>
 
                                    
                                    {/* Table */}
                                    <Table
                                        columns={columns}
                                        dataSource={data}
                                        // pagination={{ pageSize: 10 }}
                                        scroll={{ x: 1500 }}
                                    />
                                </div>
                            </ConfigProvider>
          
                        </div>
                        <div className="container mx-3 md:mx-0 p-0">
      <h2 className="text-2xl font-bold text-red-600 mb-2">Current Month Loan Summary</h2>
      <p className="text-lg mb-4">
      Sum Of Monthly Summary: <input type="checkbox" className="ml-2" />
      </p>

      {/* Loan Summary Table */}
      <div className="overflow-x-auto ">
        <table className="w-full min-w-[900px] table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 w-1/3">Income Source</th>
              <th className="border border-gray-300 p-2 w-1/6">Amount</th>
              <th className="border border-gray-300 p-2 w-1/3">Pay Source</th>
              <th className="border border-gray-300 p-2 w-1/6">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Last remaining amount</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
              <td className="border border-gray-300 p-2">Internal Loan Amount</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Today's Saving</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
              <td className="border border-gray-300 p-2">Group Expanses</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Internal Loan EMI</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
              <td className="border border-gray-300 p-2">CLF Expenses</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Internal Loan Interest</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
              <td className="border border-gray-300 p-2">Bank Loan Amount Submit</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Bank Saving/Loan EMI Amount</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
              <td className="border border-gray-300 p-2">Bank Saving Amount</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Bank/CLF(VO) Loan Amount</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
              <td className="border border-gray-300 p-2">CLF(VO) Interest Amount</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">CLF Amount</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
              <td className="border border-gray-300 p-2">CLF Amount</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Others</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
              <td className="border border-gray-300 p-2">Cash In Hand</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
            </tr>
            {/* Total Amount Row */}
            <tr className="bg-blue-100">
              <td className="border border-gray-300 p-2 font-bold">Total Amount</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" readOnly />
              </td>
              <td className="border border-gray-300 p-2 font-bold">Total Amount</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" readOnly />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className="container mx-3 md:mx-0 p-0 mt-5">
      <h2 className="text-2xl font-bold text-red-600 mb-2">Total Loan Summary</h2>
      <p className="text-lg mb-4">
        Sum Of Total Summary: <input type="checkbox" className="ml-2" />
      </p>

      {/* Loan Summary Table */}
      <div className="overflow-x-auto ">
        <table className="w-full min-w-[900px] table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 w-1/3">Income Source</th>
              <th className="border border-gray-300 p-2 w-1/6">Amount</th>
              <th className="border border-gray-300 p-2 w-1/3">Pay Source</th>
              <th className="border border-gray-300 p-2 w-1/6">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Member Saving</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
              <td className="border border-gray-300 p-2">Distributed Internal Loan</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Interest Income</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
              <td className="border border-gray-300 p-2">Fix Loan</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Submit Bank Loan Amount</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
              <td className="border border-gray-300 p-2">Group Expenses</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Bank/CLF Saving/Interest Amount</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
              <td className="border border-gray-300 p-2">Bank/CLF Saving/Interest Amount</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Penality</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
              <td className="border border-gray-300 p-2">Bank Saving Amount</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Bank/CLF(VO) Loan Amount</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
              <td className="border border-gray-300 p-2">CLF(VO) Interest Amount</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">CLF Amount</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
              <td className="border border-gray-300 p-2">CLF Amount</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Others</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
              <td className="border border-gray-300 p-2">Cash In Hand</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" value="0" readOnly />
              </td>
            </tr>
            {/* Total Amount Row */}
            <tr className="bg-blue-100">
              <td className="border border-gray-300 p-2 font-bold">Total Amount</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" readOnly />
              </td>
              <td className="border border-gray-300 p-2 font-bold">Total Amount</td>
              <td className="border border-gray-300 p-2">
                <input type="number" className="w-full p-1 border border-gray-300" readOnly />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
                
                 
        <div className="flex justify-between mt-6 ml-5">
          <Button type="primary" htmlType="submit" className='bg-gray-900 text-white'>
            Save
          </Button><br/>
    
        </div>    </div>
                </div></div>

        </>
    );
};

export default ShgGroup;
