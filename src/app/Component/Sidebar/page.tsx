'use client'
import React, { useState } from "react";
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdOutlineHouse } from "react-icons/md";

import { IoLayersOutline } from "react-icons/io5";
import { AiOutlineGlobal } from "react-icons/ai";
import { LuUserPlus } from "react-icons/lu";
import { TbWaveSawTool } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import Link from "next/link";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Controls sidebar toggle
  const [isRolesOpen, setIsRolesOpen] = useState(false); // Controls roles dropdown
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false); // Con
  const [isUserOpen, setIsUserOpen] = useState(false); // Con
  const [isSHGOpen, setIsSHGOpen] = useState(false); // Con
  const [isSHGLoanOpen, setIsSHGLoanOpen] = useState(false); // Con
  const [isReportOpen, setIsReportOpen] = useState(false); // Con
  return (
    <>
      {/* Sidebar  laptop*/}
      <div
        className={` hidden md:flex fixed  left-0 h-full  text-white shadow-md z-10 lg:w-64 ${
          isOpen ? "w-64" : "w-0"
        } transition-all duration-300 overflow-hidden lg:block  `}
        style={{ background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(136,135,132,1) 100%)"}}
      >
         <div className="px-4 py-2 mt-[110px]">
      {/* This wrapper will control the scrolling */}
      <div className="max-h-[calc(100vh-80px)] overflow-y-auto no-scrollbar">
        <div className=" flex items-center space-x-2 cursor-pointer">
          <MdOutlineHouse />
         <Link href='/pages/Dashboard' className="no-underline decoration-none text-white"><span>Dashboard</span></Link>
        </div>

        {/* Roles Dropdown */}
        <div className="mt-4">
          <button
            className="w-full text-left flex justify-between items-center"
            onClick={() => setIsRolesOpen(!isRolesOpen)}
          >
            <span className="flex items-center space-x-2 cursor-pointer">
              <IoLayersOutline />
              <span>Roles</span>
            </span>
            {isRolesOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isRolesOpen && (
            <div className="mt-2 p-4 bg-gray-700 rounded-md shadow-lg">
               <Link
                href="/pages/Role/RoleList"
                className="py-2 no-underline text-white text-left flex items-center space-x-2 cursor-pointer text-[13px]"
              >
                <TbWaveSawTool /> <span>Role List</span>
              </Link>
              <Link
                href="/pages/Role/CreateRole"
                className="py-2 no-underline text-white text-left flex items-center space-x-2 cursor-pointer text-[13px]"
              >
                <TbWaveSawTool /> <span>Create Role</span>
              </Link>
             
             
            </div>
          )}
        </div>

        {/* Departments Dropdown */}
        <div className="mt-4">
          <button
            className="w-full text-left flex justify-between items-center"
            onClick={() => setIsDepartmentsOpen(!isDepartmentsOpen)}
          >
            <span className="flex items-center space-x-2">
              <AiOutlineGlobal />
              <span>Department</span>
            </span>
            {isDepartmentsOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isDepartmentsOpen && (
            <div className="mt-2 p-4 bg-gray-700 rounded-md shadow-lg">
              <a
                href="#"
                className="py-2 no-underline text-white text-left flex items-center space-x-2 text-[13px]"
              >
                <TbWaveSawTool /> <span>Create Department</span>
              </a>
              <a
                href="#"
                className="py-2 no-underline text-white text-left flex items-center space-x-2 text-[13px]"
              >
                <TbWaveSawTool /> <span>Modify Department</span>
              </a>
              <a
                href="#"
                className="py-2 no-underline text-white text-left flex items-center space-x-2 text-[13px]"
              >
                <TbWaveSawTool /> <span>View Department</span>
              </a>
            </div>
          )}
        </div>

        {/* User Dropdown */}
        <div className="mt-4">
          <button
            className="w-full text-left flex justify-between items-center"
            onClick={() => setIsUserOpen(!isUserOpen)}
          >
            <span className="flex items-center space-x-2">
              <LuUserPlus />
              <span>User</span>
            </span>
            {isUserOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isUserOpen && (
            <div className="mt-2 p-4 bg-gray-700 rounded-md shadow-lg">
              <a
                href="#"
                className="py-2 no-underline text-white text-left flex items-center space-x-2 text-[13px]"
              >
                <TbWaveSawTool /> <span>Create User</span>
              </a>
            </div>
          )}
        </div>

        {/* SHG Dropdown */}
        <div className="mt-4">
          <button
            className="w-full text-left flex justify-between items-center"
            onClick={() => setIsSHGOpen(!isSHGOpen)}
          >
            <span className="flex items-center space-x-2">
              <AiOutlineGlobal />
              <span>SHG Management</span>
            </span>
            {isSHGOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isSHGOpen && (
            <div className="mt-2 p-4 bg-gray-700 rounded-md shadow-lg">
              <a
                href="#"
                className="py-2 no-underline text-white text-left flex items-center space-x-2 text-[13px]"
              >
                <TbWaveSawTool /> <span>SHG Department</span>
              </a>
            </div>
          )}
        </div>

        {/* SHG Loan Dropdown */}
        <div className="mt-4">
          <button
            className="w-full text-left flex justify-between items-center"
            onClick={() => setIsSHGLoanOpen(!isSHGLoanOpen)}
          >
            <span className="flex items-center space-x-2">
              <FiUsers />
              <span>SHG Loan</span>
            </span>
            {isSHGLoanOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isSHGLoanOpen && (
            <div className="mt-2 p-4 bg-gray-700 rounded-md shadow-lg">
              <a
                href="#"
                className="py-2 no-underline text-white text-left flex items-center space-x-2 text-[13px]"
              >
                <TbWaveSawTool /> <span>SHG Loan</span>
              </a>
            </div>
          )}
        </div>

        <hr />

        {/* Reports Dropdown */}
        <div className="mt-4">
          <button
            className="w-full text-left flex justify-between items-center"
            onClick={() => setIsReportOpen(!isReportOpen)}
          >
            <span className="flex items-center space-x-2">
              <FiUsers />
              <span>Reports</span>
            </span>
            {isReportOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isReportOpen && (
            <div className="mt-2 p-4 bg-gray-700 rounded-md shadow-lg">
              <a
                href="#"
                className="py-2 no-underline text-white text-left flex items-center space-x-2 text-[13px]"
              >
                <TbWaveSawTool /> <span>Report</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
      </div>
      {/* sidebar mobile */}
      {/* Top Navbar */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-16 bg-gray-800 text-white flex justify-between items-center px-4 z-20">
        <div className="text-lg font-bold">
          <img src="../../img/logo.png" className="h-10" />
        </div>
        {/* Toggle Button (Visible only on mobile) */}
        
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden text-white text-2xl"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full bg-gray-900 text-white shadow-md z-10 transition-transform duration-300 w-64 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="px-4 py-2 mt-16">
          <div className=" flex items-center space-x-2">
            <MdOutlineHouse />
            <span>Dashboard</span>
          </div>

          {/* Roles Dropdown */}
          <div className="mt-4">
            <button
              className="w-full text-left flex justify-between items-center"
              onClick={() => setIsRolesOpen(!isRolesOpen)}
            >
              {/* Icon and Text aligned horizontally */}
              <span className="flex items-center space-x-2">
                <IoLayersOutline />
                <span>Roles</span>
              </span>
              {isRolesOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isRolesOpen && (
              <div className="mt-2 p-4 bg-gray-700 rounded-md shadow-lg">
                  <a
                href="#"
                className="py-2 no-underline text-white text-left flex items-center space-x-2 text-[13px]"
              >
                <TbWaveSawTool /> <span> Role List</span>
              </a>
                  <a
                href="#"
                className="py-2 no-underline text-white text-left flex items-center space-x-2 text-[13px]"
              >
                <TbWaveSawTool /> <span>Create Role</span>
              </a>
            
              </div>
            )}
          </div>

          {/* Departments Dropdown */}
          <div className="mt-4">
            <button
              className="w-full text-left flex justify-between items-center"
              onClick={() => setIsDepartmentsOpen(!isDepartmentsOpen)}
            >
              {/* Icon and Text aligned horizontally */}
              <span className="flex items-center space-x-2">
                <AiOutlineGlobal />
                <span>Department</span>
              </span>
              {isDepartmentsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isDepartmentsOpen && (
              <div className="mt-2 p-4 bg-gray-700 rounded-md shadow-lg">
                <a
                  href="#"
                  className=" py-2 no-underline text-white text-left flex items-center space-x-2 text-[13px]"
                >
                  <TbWaveSawTool /> <span>Create Department</span>
                </a>
                <a
                  href="#"
                  className=" py-2 no-underline text-white text-left flex items-center space-x-2 text-[13px]"
                >
                  <TbWaveSawTool /> <span>Modify Department</span>
                </a>
                <a
                  href="#"
                  className="py-2 no-underline text-white text-left flex items-center space-x-2 text-[13px]"
                >
                  <TbWaveSawTool /> <span>View Department</span>
                </a>
              </div>
            )}
          </div>

          {/* user Dropdown */}
          <div className="mt-4">
            <button
              className="w-full text-left flex justify-between items-center"
              onClick={() => setIsUserOpen(!isUserOpen)}
            >
              {/* Icon and Text aligned horizontally */}
              <span className="flex items-center space-x-2">
                <LuUserPlus />
                <span>User</span>
              </span>
              {isUserOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isUserOpen && (
              <div className="mt-2 p-4 bg-gray-700 rounded-md shadow-lg">
                <a
                  href="#"
                  className="py-2 no-underline text-white text-left flex items-center space-x-2 text-[13px]"
                >
                  <TbWaveSawTool /> <span>Create User</span>
                </a>
              </div>
            )}
          </div>

          {/* SHG Dropdown */}
          <div className="mt-4">
            <button
              className="w-full text-left flex justify-between items-center"
              onClick={() => setIsSHGOpen(!isSHGOpen)}
            >
              {/* Icon and Text aligned horizontally */}
              <span className="flex items-center space-x-2">
                <AiOutlineGlobal />
                <span>SHG Management</span>
              </span>
              {isSHGOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isSHGOpen && (
              <div className="mt-2 p-4 bg-gray-700 rounded-md shadow-lg">
                <a
                  href="#"
                  className="py-2 no-underline text-white text-left flex items-center space-x-2 text-[13px]"
                >
                  <TbWaveSawTool /> <span>SHG Department</span>
                </a>
              </div>
            )}
          </div>
            {/* SHG LOan Dropdown */}
            <div className="mt-4">
            <button
              className="w-full text-left flex justify-between items-center"
              onClick={() => setIsSHGLoanOpen(!isSHGLoanOpen)}
            >
              {/* Icon and Text aligned horizontally */}
              <span className="flex items-center space-x-2">
                <FiUsers />
                <span>SHG Loan</span>
              </span>
              {isSHGLoanOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isSHGLoanOpen && (
              <div className="mt-2 p-4 bg-gray-700 rounded-md shadow-lg">
                <a
                  href="#"
                  className="py-2 no-underline text-white text-left flex items-center space-x-2 text-[13px]"
                >
                  <TbWaveSawTool /> <span>SHG Loan</span>
                </a>
              </div>
            )}
          </div>
          <hr/>
           {/* Report Dropdown */}
           <div className="mt-4">
            <button
              className="w-full text-left flex justify-between items-center"
              onClick={() => setIsReportOpen(!isReportOpen)}
            >
              {/* Icon and Text aligned horizontally */}
              <span className="flex items-center space-x-2">
                <FiUsers />
                <span>Reports</span>
              </span>
              {isReportOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isReportOpen && (
              <div className="mt-2 p-4 bg-gray-700 rounded-md shadow-lg">
              <a
                href="#"
                className="py-2 no-underline text-white text-left flex items-center space-x-2 text-[13px]"
              >
                <TbWaveSawTool /> <span>Report</span>
              </a>
            </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
