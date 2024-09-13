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
const { Option } = Select;

interface SHGData {
  key: string;
  shgId: string;
  groupName: string;
}
const menuItems = [
  { key: '10', label: '10' },
  { key: '25', label: '25' },
  { key: '50', label: '50' },
];
const FPOReport: React.FC = () => {
  // Define the menu for Dropdown
  const menu = {
    items: menuItems,
  };
  const [searchValue, setSearchValue] = useState("");
  const [field, setField] = useState("Name");
  const [type, setType] = useState("like");
  const [searchText, setSearchText] = useState("");
  const data: SHGData[] = [
    { key: "1", shgId: "UJSBAN2023_01", groupName: "SARASWATI SHG KHARKHADA" },
    { key: "2", shgId: "UJSSHG2022_01", groupName: "VISWASH SHG" },
    { key: "3", shgId: "UJSSHG2022_02", groupName: "MOUSAM SHG" },
    { key: "4", shgId: "UJSSHG2022_03", groupName: "SHALU SHG" },
    { key: "5", shgId: "UJSSHG2022_04", groupName: "MONIKA SHG" },
    { key: "6", shgId: "UJSSHG2022_05", groupName: "JYOTI SHG" },
    { key: "7", shgId: "UJSSHG2022_06", groupName: "MADHU SHG" },
  ];

  const columns: ColumnsType<SHGData> = [
    {
      title: "SHG Group ID",
      dataIndex: "shgId",
      key: "shgId",
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
    <>
      <TopNavbar />

      <div className="flex bg-gray-100">
        {/* Sidebar - fixed width */}
        <div className="lg:w-1/4 h-screen">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4 mt-[100px] xl:ml-[-50px] bg-white">
          <h2 className="text-black text-[16px] ml-[10vw] lg:ml-[6vw] xl:ml-[2vw] lg:mt-4">
            FPO Report
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
            {/* Field Dropdown */}
            <Select defaultValue={field} onChange={(value) => setField(value)} style={{ width: 120 }}>
              <Option value="Name">Name</Option>
              <Option value="ID">ID</Option>
            </Select>

            {/* Type Dropdown */}
            <Select defaultValue={type} onChange={(value) => setType(value)} style={{ width: 120 }}>
              <Option value="like">like</Option>
              <Option value="equal">equal</Option>
              <Option value="not equal">not equal</Option>
            </Select>

            {/* Value Search Input */}
            <Input 
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

                {/* Controls Row */}
                <div className="flex justify-between items-center my-4 px-4">
                  {/* Left: Show Entries Dropdown */}
                  <div className="flex items-center space-x-2">
                    <span>show entries:</span>
                     <Dropdown menu={menu}>
        <Button>
          10 <MdKeyboardArrowDown />
        </Button>
      </Dropdown>
                  </div>

                  {/* Right: Search Input */}
                  <div className="flex items-center">{searchInput}</div>
                </div>
                {/* Table */}
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={{ pageSize: 10 }}
                />
              </div>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default FPOReport;
