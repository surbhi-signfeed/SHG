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
  loan_no: any;
  bank_name: any;
  meeting_id: any;
  member_id: any;
  group_id: any;
  loan_amt: any;
  loan_period: any;
  interest_rate: any;
  message: any;
  name: any;
  subject: any;
  messgae: any;
  state: any;
  district: any;
  block: any;
  gp_name: any;
  email: any;
  cscId: any;
  farmer: any;
  village: any;
  mobile: any;
 
}

const menuItems = [
  { key: '5', label: '5' },
  { key: '25', label: '25' },
  { key: '50', label: '50' },
];

const BankLoan: React.FC = () => {
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
  useEffect(() => {
    const permissions = JSON.parse(localStorage.getItem('permission') || '[]');
    console.log("ol",permissions)
    const modifyPermission = permissions.some((p: any) => p.permission_name === 'edit_bank_loan' && p.active === 1);
    const viewPermission = permissions.some((p: any) => p.permission_name === 'view_bank_loan' && p.active === 1);
    setHasModifyPermission(modifyPermission);
    setHasViewPermission(viewPermission);

  
  }, [hasModifyPermission,hasViewPermission]);
  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = SecureStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:4000/ujs/ListBankLoan', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const apiData = response.data;
        console.log(apiData)
        const formattedData = apiData.bankLoan.map((item: any) => ({
          key: item.id,
          loan_no: item.loan_no,
          bank_name: item.bank_name,
          meeting_id: item.meeting_id,
          group_id: item.group_id,
          member_id: item.member_id,
          loan_amt: item.loan_amt,
          interest_rate: item.interest_rate,
          loan_period: item.loan_period,
        }));
        setData(formattedData);
        setOriginalData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

   // Filter the data based on the search text
   useEffect(() => {
    if (searchText.trim() === "") {
      setData(originalData); // Show all data if search input is empty
    } else {
      const result = originalData.filter(item =>
        item.bank_name.toLowerCase().includes(searchText.toLowerCase())
      );
      setData(result);
    }
  }, [searchText, originalData]); 

  // Handle page size change from dropdown
  const handleMenuClick = (e: any) => {
    const newSize = parseInt(e.key, 10); // Convert key to number
    setPageSize(newSize); // Update page size state
  };

  const columns: ColumnsType<SHGData> = [
    {
      title: "Loan No",
      dataIndex: "loan_no",
      key: "loan_no",
      sorter: (a, b) => a.loan_no.localeCompare(b.loan_no),
    },
  
    
    {
      title: "Bank Name",
      dataIndex: "bank_name",
      key: "bank_name",
      sorter: (a, b) => a.bank_name.localeCompare(b.bank_name),
    },
    {
      title: "Meeting Id",
      dataIndex: "meeting_id",
      key: "meeting_id",
      sorter: (a, b) => a.meeting_id.localeCompare(b.meeting_id),
    },
    
    {
      title: "Member Id",
      dataIndex: "member_id",
      key: "member_id",
      sorter: (a, b) => a.member_id.localeCompare(b.member_id),
    },
    {
      title: "Group Id",
      dataIndex: "group_id",
      key: "group_id",
      sorter: (a, b) => a.group_id.localeCompare(b.group_id),
    },{
      title: "Loan Amt",
      dataIndex: "loan_amt",
      key: "loan_amt",
      sorter: (a, b) => a.loan_amt.localeCompare(b.loan_amt),
    },
    
    {
      title: "Loan Period",
      dataIndex: "loan_period",
      key: "loan_period",
      sorter: (a, b) => a.loan_period.localeCompare(b.loan_period),
    },
    {
      title: "Interest Rate",
      dataIndex: "interest_rate",
      key: "interest_rate",
      sorter: (a, b) => a.interest_rate.localeCompare(b.interest_rate),
    },
    // ...(hasModifyPermission
    //   ? [
    //       {
    //         title: "Action",
    //         key: "action",
    //         render: (_: any, record: SHGData) => (
    //           <Button
    //             type="primary"
    //             icon={<EditOutlined />}
    //             className="bg-gray-700"
    //             onClick={() => handleEditClick(record)}
    //           >
    //             Edit
    //           </Button>
    //         ),
    //       },
    //     ]
    //   : []), 
  
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
  XLSX.utils.book_append_sheet(workbook, worksheet, 'BankLoan');

  // Create an Excel file and trigger the download when user clicks the button
  XLSX.writeFile(workbook, 'BankLoan.xlsx');
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
    Bank Loan
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

export default BankLoan;

