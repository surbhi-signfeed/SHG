'use client'
import React, { useState, useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";
import Sidebar from "@/app/Component/Sidebar/page";
import TopNavbar from "@/app/Component/Topnavbar/page";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoMdCard } from "react-icons/io";
import { useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import axios from "axios";

import Link from "next/link";
const Dashboard = () => {
  const router = useRouter();
  const id = secureLocalStorage.getItem('id')
  const token = secureLocalStorage.getItem('accessToken')
  console.log('id', id, token)
  const [data, setData] = useState([])
  useEffect(() => {
    // Check if the token exists in SecureStorage
    const token = secureLocalStorage.getItem('accessToken');
    if (!token) {
      router.push("/"); // Redirect to login page if token is not present
    } else {
      fetchPermission();
    }
  }, []); 
  const fetchPermission = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/ujs/ListRolePermission/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Checking if the response is okay
      if (!response.ok) {
        console.error(`Error fetching data: ${response.status} - ${response.statusText}`);
        return;
      }

      const result = await response.json();
      // Store the data as a string in localStorage
      localStorage.setItem("permission", JSON.stringify(result.data[0].permissions));
      setData(result);
      sessionStorage.setItem("Permission", JSON.stringify(result));
    } catch (error) {
      console.error("Network or server error:", error);
    }
  };
// list of shg group
const[shgGroup,setShgGroup] =useState([])
const fetchData = async () => {
  try {
  
    const response = await axios.get('http://localhost:4000/ujs/ListShgGroup', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const recordCount = response.data.shgGroup.length; // Get the length of the records
    setShgGroup(recordCount); // Set the count state
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
// list of shg member
const[shgMember,setShgMember] =useState([])
const fetchData1 = async () => {
  try {
  
    const response = await axios.get('http://localhost:4000/ujs/ListShgMember', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const recordCount = response.data.shgMember.length; // Get the length of the records
    setShgMember(recordCount); // Set the count state
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
  useEffect(() => {
   
    fetchData();
    fetchData1();
  }, []);

  return (
    <>
      <TopNavbar />
      <div className="flex font-customRoboto">
        {/* Sidebar - fixed width */}
        <div className="lg:w-1/4 h-screen">
          <Sidebar />
        </div>

        {/* Main Content (Cards) */}
        <div className="w-full lg:w-3/4 mt-[100px] xl:ml-[-50px]">
          <h2 className="text-black text-[16px] ml-[10vw] lg:ml-[6vw] xl:ml-[2vw]">SHG Dashboard</h2>
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-2 max-w-screen-lg mx-auto">
              {/* Card 1 */}
              {/* Background shadow for 3D effect */}
              <div className="absolute top-0 left-0  bg-white rounded-lg transform translate-y-2 translate-x-2 z-0"></div>
              <div className=" bg-white shadow-md rounded-lg p-3  xl:h-[25vh]">
                <div className="flex items-center justify-between">
                  <div className="text-black text-[26px]">
                    <IoLocationOutline />
                  </div>
                  <div className="bg-[#0D9488] text-white text-[12px] px-3 py-1 rounded-[50px]">
                    1
                  </div>
                </div>
                <div className="text-3xl font-[500] mt-4">1</div>
                <div className="text-gray-500 mt-2 text-[14.7px] text-wrap ">Total State</div>
              </div>

              {/* Card 2 */}
              <div className="bg-white shadow-md rounded-lg p-3 xl:h-[25vh]">
                <div className="flex items-center justify-between">
                  <div className="text-black text-[26px]">
                    <IoLocationOutline />
                  </div>
                  <div className="bg-[#0D9488] text-white text-[12px] px-3 py-1 rounded-[50px]">
                    2
                  </div>
                </div>
                <div className="text-3xl font-[500] mt-4">2</div>
                <div className="text-gray-500 mt-2 text-[14.7px] text-wrap">Total District</div>
              </div>

              {/* Card 3 */}
              <div className="bg-white shadow-md rounded-lg p-3 xl:h-[25vh]">
                <div className="flex items-center justify-between">
                  <div className="text-black text-[26px]">
                    <IoLocationOutline />
                  </div>
                  <div className="bg-[#0D9488] text-white text-[12px] px-3 py-1 rounded-[50px]">
                    148
                  </div>
                </div>
                <div className="text-3xl font-[500] mt-4">148</div>
                <div className="text-gray-500 mt-2 text-[14.7px] text-wrap">Total Village</div>
              </div>

              {/* Card 4 */}
              <div className="bg-white shadow-md rounded-lg p-3 xl:h-[25vh]">
                <div className="flex items-center justify-between">
                  <div className="text-yellow-500 text-[26px]">
                    <HiOutlineUsers />
                  </div>
                  <div className="bg-[#0D9488] text-white text-[12px] px-3 py-1 rounded-[50px]">
                    10
                  </div>
                </div>
                <div className="text-3xl font-[500] mt-4">10</div>
                <div className="text-gray-500 mt-2 text-[14.7px] text-wrap">Total Cluster</div>
              </div>

              {/* Card 5 */}
              <Link href='/pages/Report/FPOReport' className="no-underline text-black">
                <div className="bg-white shadow-md  rounded-lg p-3 xl:h-[25vh] cursor-pointer no-underline">
                  <div className="flex items-center justify-between ">
                    <div className="text-yellow-500 text-[26px]">
                      <HiOutlineUsers />
                    </div>
                    <div className="bg-[#0D9488] text-white text-[12px] px-3 py-1 rounded-[50px]">
                      1
                    </div>
                  </div>
                  <div className="text-3xl font-[500] mt-4">1</div>
                  <div className="text-gray-500 mt-2 text-[14.7px] text-wrap">Total FPO</div>
                </div>
              </Link>

              {/* Card 6 */}
              <div className="bg-white shadow-md rounded-lg p-3 xl:h-[25vh]">
                <div className="flex items-center justify-between">
                  <div className="text-yellow-500 text-[26px]">
                    <IoMdCard />
                  </div>
                  <div className="bg-[#0D9488] text-white text-[12px] px-3 py-1 rounded-[50px]">
                    510
                  </div>
                </div>
                <div className="text-3xl font-[500] mt-4">510</div>
                <div className="text-gray-500 mt-2 text-[14.7px] text-wrap">Total FPO Member</div>
              </div>
              <Link href='/pages/ShgManagement/ShgGroup' className="no-underline text-black">
                <div className=" bg-white shadow-md rounded-lg p-3  xl:h-[25vh]">
                  <div className="flex items-center justify-between">
                    <div className="text-black text-[26px]">
                      <IoLocationOutline />
                    </div>
                    <div className="bg-[#0D9488] text-white text-[12px] px-3 py-1 rounded-[50px]">
                      {shgGroup}
                    </div>
                  </div>
                  <div className="text-3xl font-[500] mt-4"> {shgGroup}</div>
                  <div className="text-gray-500 mt-2 text-[14.7px] text-wrap">Total SHG</div>
                </div>
              </Link>
              {/* Card 2 */}
              <div className="bg-white shadow-md rounded-lg p-3 xl:h-[25vh]">
                <div className="flex items-center justify-between">
                  <div className="text-black text-[26px]">
                    <IoLocationOutline />
                  </div>
                  <div className="bg-[#0D9488] text-white text-[12px] px-3 py-1 rounded-[50px]">
                    2
                  </div>
                </div>
                <div className="text-3xl font-[500] mt-4">2</div>
                <div className="text-gray-500 mt-2 text-[14.7px] text-wrap">Total SHG Bank Account</div>
              </div>

              {/* Card 3 */}
              <div className="bg-white shadow-md rounded-lg p-3 xl:h-[25vh]">
                <div className="flex items-center justify-between">
                  <div className="text-black text-[26px]">
                    <IoLocationOutline />
                  </div>
                  <div className="bg-[#0D9488] text-white text-[12px] px-3 py-1 rounded-[50px]">
                    {shgMember}
                  </div>
                </div>
                <div className="text-3xl font-[500] mt-4"> {shgMember}</div>
                <div className="text-gray-500 mt-2 text-[14.7px] text-wrap">Total SHG Member</div>
              </div>

              {/* Card 4 */}
              <div className="bg-white shadow-md rounded-lg p-3 xl:h-[25vh]">
                <div className="flex items-center justify-between">
                  <div className="text-yellow-500 text-[26px]">
                    <HiOutlineUsers />
                  </div>
                  <div className="bg-[#0D9488] text-white text-[12px] px-3 py-1 rounded-[50px]">
                    10
                  </div>
                </div>
                <div className="text-3xl font-[500] mt-4">10</div>
                <div className="text-gray-500 mt-2 text-[14.7px] text-wrap">Total DiGipay Sakhi</div>
              </div>

              {/* Card 5 */}
              <div className="bg-white shadow-md rounded-lg p-3 xl:h-[25vh]">
                <div className="flex items-center justify-between">
                  <div className="text-yellow-500 text-[26px]">
                    <HiOutlineUsers />
                  </div>
                  <div className="bg-[#0D9488] text-white text-[12px] px-3 py-1 rounded-[50px]">
                    1
                  </div>
                </div>
                <div className="text-3xl font-[500] mt-4">1</div>
                <div className="text-gray-500 mt-2 text-[14.7px] text-wrap">Total Federation</div>
              </div>

              {/* Card 6 */}
              <div className="bg-white shadow-md rounded-lg p-3 xl:h-[25vh]">
                <div className="flex items-center justify-between">
                  <div className="text-yellow-500 text-[26px]">
                    <IoMdCard />
                  </div>
                  <div className="bg-[#0D9488] text-white text-[12px] px-3 py-1 rounded-[50px]">
                    510
                  </div>
                </div>
                <div className="text-3xl font-[500] mt-4">510</div>
                <div className="text-gray-500 mt-2 text-[14.7px] leading-tight">Total Federation Member</div>
              </div>





            </div>

          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-2 max-w-screen-lg mx-auto">
            {/* Card 2 */}
            <Link href='/pages/Report/ShgMemberReport' className="no-underline text-black">
              <div className="bg-white shadow-md rounded-lg p-3 xl:h-[25vh]">
                <div className="flex items-center justify-between">
                  <div className="text-black text-[26px]">
                    <IoLocationOutline />
                  </div>
                  <div className="bg-[#0D9488] text-white text-[12px] px-3 py-1 rounded-[50px]">
                    2
                  </div>
                </div>
                <div className="text-3xl font-[500] mt-4">2</div>
                <div className="text-gray-500 mt-2 text-[14.7px] text-wrap">SHG Member Saving</div>
              </div>
            </Link>
            {/* Card 3 */}
            <div className="bg-white shadow-md rounded-lg p-3 xl:h-[25vh]">
              <div className="flex items-center justify-between">
                <div className="text-black text-[26px]">
                  <IoLocationOutline />
                </div>
                <div className="bg-[#0D9488] text-white text-[12px] px-3 py-1 rounded-[50px]">
                  148
                </div>
              </div>
              <div className="text-3xl font-[500] mt-4">148</div>
              <div className="text-gray-500 mt-2 text-[14.7px] text-wrap">SHG Internal Loan Distribution</div>
            </div>

            {/* Card 4 */}
            <div className="bg-white shadow-md rounded-lg p-3 xl:h-[25vh]">
              <div className="flex items-center justify-between">
                <div className="text-yellow-500 text-[26px]">
                  <HiOutlineUsers />
                </div>
                <div className="bg-[#0D9488] text-white text-[12px] px-3 py-1 rounded-[50px]">
                  10
                </div>
              </div>
              <div className="text-3xl font-[500] mt-4">10</div>
              <div className="text-gray-500 mt-2 text-[14.7px] text-wrap">SHG Bank Loan Distribution</div>
            </div>

            {/* Card 5 */}
            <Link href='/pages/Report/FederationReport' className="no-underline text-black">
              <div className="bg-white shadow-md rounded-lg p-3 xl:h-[25vh]">
                <div className="flex items-center justify-between">
                  <div className="text-yellow-500 text-[26px]">
                    <HiOutlineUsers />
                  </div>
                  <div className="bg-[#0D9488] text-white text-[12px] px-3 py-1 rounded-[50px]">
                    1
                  </div>
                </div>
                <div className="text-3xl font-[500] mt-4">1</div>
                <div className="text-gray-500 mt-2 text-[14.7px] text-wrap">SHG Federation Saving</div>
              </div></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
