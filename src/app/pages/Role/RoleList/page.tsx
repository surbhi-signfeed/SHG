"use client";
import React, { useState } from "react";
import { Table, Input, Button, Space, Dropdown, Menu } from "antd";
import { IoMdSearch } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ConfigProvider, theme } from "antd";
import Sidebar from "@/app/Component/Sidebar/page";
import TopNavbar from "@/app/Component/Topnavbar/page";

const columns = [
  {
    title: "Role",
    dataIndex: "role",
    sorter: true,
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
];

const data = [
  {
    key: "1",
    role: "Admin",
    status: "Active",
    createUser: "Yes",
    modifyUser: "Yes",
    viewUser: "Yes",
    createRole: "Yes",
    modifyRole: "Yes",
    userReport: "Yes",
    dataReport: "Yes",
    historyReport: "Yes",
  },
  // Add more data rows here
];

const RoleList = () => {
  const [searchText, setSearchText] = useState("");

  // Handle table change (pagination, sorting, etc.)
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    console.log("Various parameters", pagination, filters, sorter);
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
            Role List
          </h2>

          <div className="w-full">
            <ConfigProvider
              theme={{
                algorithm: theme.defaultAlgorithm,
              }}
            >
              {/* Controls Row */}
              <div className="flex justify-between items-center my-4 px-4">
                {/* Left: Show Entries Dropdown */}
                <div className="flex items-center space-x-2">
                  <span>show entries:</span>
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item key="10">10</Menu.Item>
                        <Menu.Item key="25">25</Menu.Item>
                        <Menu.Item key="50">50</Menu.Item>
                      </Menu>
                    }
                  >
                    <Button>10 <MdKeyboardArrowDown/>{/* Default value */}</Button>
                  </Dropdown>
                </div>

                {/* Right: Search Input */}
                <div className="flex items-center">{searchInput}</div>
              </div>

              {/* Table */}
              <div className="px-4 my-4">
                {" "}
                {/* Add margin to separate the table from the controls */}
                <Table
                  columns={columns}
                  dataSource={data}
                  onChange={handleTableChange}
                  pagination={{
                    position: ["bottomRight"],
                    defaultPageSize: 10,
                  }}
                  bordered
                  size="middle"
                />
              </div>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleList;
