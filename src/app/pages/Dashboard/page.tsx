'use client'
import React, { useState ,useEffect} from "react";
import { IoLocationOutline } from "react-icons/io5";
import Sidebar from "@/app/Component/Sidebar/page";
import TopNavbar from "@/app/Component/Topnavbar/page";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoMdCard } from "react-icons/io";
import secureLocalStorage from "react-secure-storage";
import { ConsoleSqlOutlined } from "@ant-design/icons";
const Dashboard = () => {
const id=secureLocalStorage.getItem('id')
const token =secureLocalStorage.getItem('accessToken')
console.log('id',id,token)
const[data,setData]=useState([])
const fetchData2 = async () => {
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

useEffect(() => {
  fetchData2();
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
                <div className="text-gray-500 mt-2 text-[14px]">Total State</div>
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
                <div className="text-gray-500 mt-2 text-[14px]">Total District</div>
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
                <div className="text-gray-500 mt-2 text-[14px]">Total Village</div>
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
                <div className="text-gray-500 mt-2 text-[14px]">Total Cluster</div>
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
                <div className="text-gray-500 mt-2 text-[14px]">Total FPO</div>
              </div>

              {/* Card 6 */}
              <div className="bg-white shadow-md rounded-lg p-3 xl:h-[25vh]">
                <div className="flex items-center justify-between">
                  <div className="text-yellow-500 text-[26px]">
                  <IoMdCard/>
                  </div>
                  <div className="bg-[#0D9488] text-white text-[12px] px-3 py-1 rounded-[50px]">
                    510
                  </div>
                </div>
                <div className="text-3xl font-[500] mt-4">510</div>
                <div className="text-gray-500 mt-2 text-[14px]">Total FPO Member</div>
              </div>
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
                <div className="text-gray-500 mt-2 text-[14px]">Total State</div>
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
                <div className="text-gray-500 mt-2 text-[14px]">Total District</div>
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
                <div className="text-gray-500 mt-2 text-[14px]">Total Village</div>
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
                <div className="text-gray-500 mt-2 text-[14px]">Total Cluster</div>
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
                <div className="text-gray-500 mt-2 text-[14px]">Total FPO</div>
              </div>

              {/* Card 6 */}
              <div className="bg-white shadow-md rounded-lg p-3 xl:h-[25vh]">
                <div className="flex items-center justify-between">
                  <div className="text-yellow-500 text-[26px]">
                  <IoMdCard/>
                  </div>
                  <div className="bg-[#0D9488] text-white text-[12px] px-3 py-1 rounded-[50px]">
                    510
                  </div>
                </div>
                <div className="text-3xl font-[500] mt-4">510</div>
                <div className="text-gray-500 mt-2 text-[14px]">Total FPO Member</div>
              </div>
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
                <div className="text-gray-500 mt-2 text-[14px]">Total State</div>
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
                <div className="text-gray-500 mt-2 text-[14px]">Total District</div>
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
                <div className="text-gray-500 mt-2 text-[14px]">Total Village</div>
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
                <div className="text-gray-500 mt-2 text-[14px]">Total Cluster</div>
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
                <div className="text-gray-500 mt-2 text-[14px]">Total FPO</div>
              </div>

              {/* Card 6 */}
              <div className="bg-white shadow-md rounded-lg p-3 xl:h-[25vh]">
                <div className="flex items-center justify-between">
                  <div className="text-yellow-500 text-[26px]">
                  <IoMdCard/>
                  </div>
                  <div className="bg-[#0D9488] text-white text-[12px] px-3 py-1 rounded-[50px]">
                    510
                  </div>
                </div>
                <div className="text-3xl font-[500] mt-4">510</div>
                <div className="text-gray-500 mt-2 text-[14px]">Total FPO Member</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  ); 
};

export default Dashboard;
