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
  monthlySaving: any;
  fedrationSaving: any;
  animator: any;
  mobile: any;
  totalMember: any;
  leader: any;
  key: string;
  name: string;
  Status: string;
}

const menuItems = [
  { key: '5', label: '5' },
  { key: '25', label: '25' },
  { key: '50', label: '50' },
];

const ShgMemberReport: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<SHGData[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [field, setField] = useState("Name");
  const [type, setType] = useState("like");
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(5); // Add page size state
  const [hasModifyPermission, setHasModifyPermission] = useState<boolean | null>(null); // Set initial value to null
  const [hasViewPermission, setHasViewPermission] = useState<boolean | null>(null); // Set initial value to null
  useEffect(() => {
    const permissions = JSON.parse(localStorage.getItem('permission') || '[]');
    console.log("ol",permissions)
    const modifyPermission = permissions.some((p: any) => p.permission_name === 'modify_department' && p.active === 1);
    const viewPermission = permissions.some((p: any) => p.permission_name === 'view_department' && p.active === 1);
    setHasModifyPermission(modifyPermission);
    setHasViewPermission(viewPermission);

  
  }, [hasModifyPermission,hasViewPermission]);
  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = SecureStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:4000/ujs/ListShgMember', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const apiData = response.data;
        const formattedData = apiData.shgMember.map((item: any) => ({
          key: item.id,
          name: item.group_name,
          leader: item.leader_name,
          animator: item.animator_name,
          fedrationSaving:item.fedrationSaving,
          monthlySaving:item.monthlySaving,
          mobile: item.mobile,
          Status: item.status,
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  

  // Handle page size change from dropdown
  const handleMenuClick = (e: any) => {
    const newSize = parseInt(e.key, 10); // Convert key to number
    setPageSize(newSize); // Update page size state
  };

  const columns: ColumnsType<SHGData> = [
    {
      title: "Group Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Group Leader",
      dataIndex: "leader",
      key: "leader",
      sorter: (a, b) => a.leader.localeCompare(b.leader),
    },{
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      sorter: (a, b) => a.mobile.localeCompare(b.mobile),
    },{
      title: "Animator",
      dataIndex: "animator",
      key: "animator",
      sorter: (a, b) => a.animator.localeCompare(b.animator),
    },
    {
      title: "Fedration Saving",
      dataIndex: "fedrationSaving",
      key: "fedrationSaving",
      sorter: (a, b) => a.fedrationSaving.localeCompare(b.fedrationSaving),
    },
    {
      title: "Monthly Saving",
      dataIndex: "monthlySaving",
      key: "monthlySaving",
      sorter: (a, b) => a.monthlySaving.localeCompare(b.monthlySaving),
    }
  
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
  XLSX.utils.book_append_sheet(workbook, worksheet, 'ShgMember');

  // Create an Excel file and trigger the download when user clicks the button
  XLSX.writeFile(workbook, 'ShgMemberReport.xlsx');
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
          SHG Member Report
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
                    <Button type="default" onClick={() => exportToExcel(data)} className="bg-gray-700 text-white">
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

export default ShgMemberReport;

