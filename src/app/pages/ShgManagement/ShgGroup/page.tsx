'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios'; // Import axios for API calls
import SecureStorage from 'react-secure-storage'; // Import SecureStorage for token management
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
import * as XLSX from 'xlsx';
import { ConfigProvider, theme } from "antd";
const { Option } = Select;

interface SHGData {
  key: string;
  group_name: string;
  Status: string;
  group_leader:string;
  totalMember:string

}

const menuItems = [
  { key: '5', label: '5' },
  { key: '25', label: '25' },
  { key: '50', label: '50' },
];

const ShgGroup: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<SHGData[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [field, setField] = useState("Name");
  const [type, setType] = useState("like");
  const [searchText, setSearchText] = useState("");
  const [originalData, setOriginalData] = useState<SHGData[]>([]);
  const [pageSize, setPageSize] = useState(5); // Add page size state
  const [hasModifyPermission, setHasModifyPermission] = useState<boolean | null>(null); // Set initial value to null
  const [hasViewPermission, setHasViewPermission] = useState<boolean | null>(null); // Set initial value to null
  React.useEffect(() => {
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
    const modifyPermission = permissions.some((p: any) => p.permission_name === 'edit_shg_group' && p.active === 1);
    const viewPermission = permissions.some((p: any) => p.permission_name === 'view_shg_group' && p.active === 1);
    setHasModifyPermission(modifyPermission);
    setHasViewPermission(viewPermission);

  
  }, [hasModifyPermission,hasViewPermission]);
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
          key: item.id,
          group_name: item.group_name,
          group_leader:item.group_leader,
          totalMember:item.totalMember,
          Status: item.status,
        }));
        setData(formattedData);
        setOriginalData(formattedData); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Fetch data from API when the component mounts
  
  // Filter the data based on the search text
  useEffect(() => {
    if (searchText.trim() === "") {
      setData(originalData); // Show all data if search input is empty
    } else {
      const result = originalData.filter(item =>
        item.group_name.toLowerCase().includes(searchText.toLowerCase())
      );
      setData(result);
    }
  }, [searchText, originalData]); 
  const handleEditClick = (record: SHGData) => {
    router.push(`/pages/ShgManagement/UpdateShgGroup?id=${record.key}`);
  };
  

  // Handle page size change from dropdown
  const handleMenuClick = (e: any) => {
    const newSize = parseInt(e.key, 10); // Convert key to number
    setPageSize(newSize); // Update page size state
  };

  const columns: ColumnsType<SHGData> = [
    {
      title: "Group Name",
      dataIndex: "group_name",
      key: "group_name",
      sorter: (a, b) => a.group_name.localeCompare(b.group_name),
    },
    {
      title: "Group Leader",
      dataIndex: "group_leader",
      key: "group_leader",
      sorter: (a, b) => a.group_leader.localeCompare(b.group_leader),
    },
    {
      title: "Total member",
      dataIndex: "totalMember",
      key: "totalMember",
      sorter: (a, b) => a.totalMember.localeCompare(b.totalMember),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      sorter: (a, b) => a.Status === "1" ? -1 : 1,
      render: (text) => (
        <span>{text == "1" ? "Active" : "De-Active"}</span>
      ),
    },
    ...(hasModifyPermission
      ? [
          {
            title: "Action",
            key: "action",
            render: (_: any, record: SHGData) => (
              <Button
                type="primary"
                icon={<EditOutlined />}
                className="bg-gray-700"
                onClick={() => handleEditClick(record)}
              >
                Edit
              </Button>
            ),
          },
        ]
      : []),
  ];

  const handleSearch = () => {
    console.log("Searching for:", searchValue);
  };

  const searchInput = (
    <Input
      placeholder="Search"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      style={{ width: 200 }}
      suffix={<IoMdSearch />}
    />
  );

  const menu = (
    <Menu onClick={handleMenuClick} items={menuItems} /> // Add onClick handler
  );
// download excel file
const exportToExcel = (data: any[]) => {
  if (data.length === 0) return; // Ensure there is data to export

  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Extract headers dynamically from the first item in the data array
  const headers = Object.keys(data[0]);

  // Create a worksheet using the data array directly
  const worksheetData = data.map(item => {
      const row: any = {};
      headers.forEach(header => {
          row[header] = item[header];
      });
      return row;
  });

  // Convert to worksheet
  const worksheet = XLSX.utils.json_to_sheet(worksheetData, { header: headers });

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Departments');

  // Create an Excel file and trigger the download when user clicks the button
  XLSX.writeFile(workbook, 'DepartmentData.xlsx');
};
  return (
    <>
      <TopNavbar />

      <div className="flex bg-gray-100">
        <div className="lg:w-1/4 h-screen">
          <Sidebar />
        </div>

        <div className="w-full lg:w-3/4 mt-[100px] xl:ml-[-50px] bg-white">
          <h2 className="text-black text-[16px] ml-[10vw] lg:ml-[6vw] xl:ml-[2vw] lg:mt-4">
            SHG Group List
          </h2>

          <div className="w-full">
            <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
              <div>
                {/* laptop view */}
                <Row justify="space-between" align="middle" style={{ marginBottom: 16 }} className="hidden lg:flex p-3">
                  <Col>
                    <Space>
                      <Select defaultValue={field} onChange={(value) => setField(value)} style={{ width: 120 }}>
                        <Option value="Name">Name</Option>
                        <Option value="ID">ID</Option>
                      </Select>

                      <Select defaultValue={type} onChange={(value) => setType(value)} style={{ width: 120 }}>
                        <Option value="like">like</Option>
                        <Option value="equal">equal</Option>
                        <Option value="not equal">not equal</Option>
                      </Select>

                      <Input
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        style={{ width: 200 }}
                      />

                      <Button type="primary" onClick={handleSearch} className="bg-gray-700">Go</Button>
                    </Space>
                  </Col>

                  <Col>
                    <Button type="default" onClick={() => exportToExcel(data)}  id="no-hover" className="bg-gray-700 text-white">
                      Export XLSX
                    </Button>
                  </Col>
                </Row>

                {/* Show Entries Dropdown */}
                <div className="flex justify-between items-center my-4 px-4">
                  <div className="flex items-center space-x-2">
                    <span>Show entries:</span>
                    <Dropdown overlay={menu} trigger={['click']}>
                      <Button>
                        {pageSize} <MdKeyboardArrowDown />
                      </Button>
                    </Dropdown>
                  </div>

                  <div className="flex items-center">{searchInput}</div>
                </div>

                {/* Table with dynamic page size */}
                {hasViewPermission!==null && hasViewPermission?(<>
                  <Table
                  columns={columns}
                  dataSource={data}
                  pagination={{ pageSize }} // Use dynamic page size
                />
                </>):"no access"}
              </div>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShgGroup;

