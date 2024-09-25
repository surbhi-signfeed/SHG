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
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineViewList } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { ColumnsType } from "antd/es/table";
import Sidebar from "@/app/Component/Sidebar/page";
import { MdKeyboardArrowDown } from "react-icons/md";
import TopNavbar from "@/app/Component/Topnavbar/page";
import * as XLSX from 'xlsx';
import { ConfigProvider, theme } from "antd";
const { Option } = Select;

interface SHGData {
  blockTaluka: any;
  meetingDate: any;
  group_name: string;
  gid: any;
  mid: any;
  Membername: any;
  key: string;
  name: string;
  Status: string;
}

const menuItems = [
  { key: '5', label: '5' },
  { key: '25', label: '25' },
  { key: '50', label: '50' },
];

const ShgMeetingSummaryReport: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<SHGData[]>([]);
  const [searchText, setSearchText] = useState("");
  const [originalData, setOriginalData] = useState<SHGData[]>([]);
  const [grpName, setGrpName] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState(5); // Add page size state
  const [hasModifyPermission, setHasModifyPermission] = useState<boolean | null>(null); // Set initial value to null
  const [hasViewPermission, setHasViewPermission] = useState<boolean | null>(null); // Set initial value 
  useEffect(() => {
    const permissions = JSON.parse(localStorage.getItem('permission') || '[]');
    
    const modifyPermission = permissions.some((p: any) => p.permission_name === 'modify_department' && p.active === 1);
    const viewPermission = permissions.some((p: any) => p.permission_name === 'view_department' && p.active === 1);
    setHasModifyPermission(modifyPermission);
    setHasViewPermission(viewPermission);


  }, [hasModifyPermission, hasViewPermission]);


  useEffect(() => {
    // Check if the token exists in SecureStorage
    const token = SecureStorage.getItem('accessToken');
    if (!token) {
      router.push("/"); // Redirect to login page if token is not present
    } else {
      // Fetch data only if token exists
      fetchShgLoanData();
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const token = SecureStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:4000/ujs/ListShgGroup', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const apiData = response.data;
console.log("api",apiData)
      // Use a Set to store unique group names
      const uniqueGroups = new Set(apiData.shgGroup.map((item: any) => item.group_name));

      // Convert the Set back to an array of objects with keys
      const formattedGroupData = Array.from(uniqueGroups).map((groupName) => ({
              group_name: groupName,
      }));

      setGrpName(formattedGroupData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const fetchShgLoanData = async () => {
    try {
      const token = SecureStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:4000/ujs/ListShgMeetingSummary', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const apiData = response.data;
      const formattedData = apiData.shgMeetingSummary.map((item: any) => ({
        key: item.Id,
      
        name: item.groupName,
        blockTaluka: item.blockTaluka,
        meetingDate: item.meetingDate,
      
      }));
      setData(formattedData);
      setOriginalData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  // Filter the data based on the search text
  useEffect(() => {
    if (searchText.trim() === "") {
      setData(originalData); // Show all data if search input is empty
    } else {
      const result = originalData.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setData(result);
    }
  }, [searchText, originalData]);
  const handleEditClick = (record: SHGData) => {
    router.push(`/pages/Departments/UpdateDepartment?id=${record.key}`);
  };


  // Handle page size change from dropdown
  const handleMenuClick = (e: any) => {
    const newSize = parseInt(e.key, 10); // Convert key to number
    setPageSize(newSize); // Update page size state
  };

  const columns: ColumnsType<SHGData> = [
    {
      title: "SHG Group ID",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key.localeCompare(b.key),
    }, {
      title: "SHG Group Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    }, {
      title: "Taluka",
      dataIndex: "blockTaluka",
      key: "blockTaluka",
      sorter: (a, b) => a.blockTaluka.localeCompare(b.blockTaluka),
    }, {
      title: "Meeting Date",
      dataIndex: "meetingDate",
      key: "meetingDate",
      sorter: (a, b) => a.meetingDate.localeCompare(b.meetingDate),
    },
    {
      title: "View Meeting",
      key: "action",
      render: (_, record) => (
        <Button type="primary" icon={<MdOutlineViewList />} className="bg-green-800">
          View
        </Button>
      ),
    },
    ...(hasModifyPermission
      ? [
        {
          title: "Edit Meeting",
          key: "action",
          render: (_: any, record: SHGData) => (
            <Button
              type="primary"
              icon={<EditOutlined />}
              className="bg-white text-black border-gray-400"
              onClick={() => handleEditClick(record)}
            >
              Edit
            </Button>
          ),
        },
      ]
      : []), // If no permission, omit the column entirely
      {
        title: "Delete Meeting",
        key: "action",
        render: (_, record) => (
          <Button type="primary" icon={<MdOutlineDeleteOutline /> } className="bg-red-700">
            Delete
          </Button>
        ),
      }
  ];

  

  // Function to handle group selection
  const handleGroupChange = (value: string | null) => {
    setSelectedGroup(value); // Set the selected group

    if (value) {
    
      const filteredData = originalData.filter(item => item.name === value);
      setData(filteredData);
    } else {
      // Show all data if no group is selected
      setData(originalData);
    }
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
            User List
          </h2>

          <div className="w-full">
            <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
              <div>
                {/* laptop view */}
                <Row justify="space-between" align="middle" style={{ marginBottom: 16 }} className=" lg:flex p-3">
                  <Col>
                    <Space>
                      Quiz <Select placeholder="Select Group" className="w-[100%]" onChange={handleGroupChange}  // Handle group change
                        allowClear>
                        {grpName.map((item: any) => (
                          <Option key={item.id} value={item.group_name}>
                            {item.group_name}
                          </Option>
                        ))}
                      </Select>



                      {/* <Button type="primary" onClick={handleSearch} className="bg-gray-700">Go</Button> */}
                    </Space>
                  </Col>

                  <Col>
                    <Button onClick={() => exportToExcel(data)}  id="no-hover" className="bg-gray-700 text-white hover:bg-white hover:text-black">
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
                {hasViewPermission !== null && hasViewPermission ? (<>
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize }} // Use dynamic page size
                  />
                </>) : "no access"}
              </div>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShgMeetingSummaryReport;

