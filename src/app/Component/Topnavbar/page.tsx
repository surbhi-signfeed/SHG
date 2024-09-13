import React from 'react';

const TopNavbar = () => {
  return (
    <div className='hidden lg:flex'>
      {/* Background div for 3D effect */}
      <div className="fixed top-0 left-4 w-[96vw] h-[70px]  z-20 rounded-lg transform translate-y-3 translate-x-3" style={{background: "linear-gradient(164deg, rgba(114,130,153,1) 0%, rgba(44,53,66,1) 60%, rgba(34,42,53,1) 100%"}}></div>

      {/* Main Navbar */}
      <div className="fixed top-0 left-3 w-[96vw]  text-white shadow-md z-20 rounded-lg"  style={{background: "linear-gradient(164deg, rgba(114,130,153,1) 0%, rgba(44,53,66,1) 60%, rgba(34,42,53,1) 100%"}}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold">
            <img src='../../../img/logo.png' className='h-10' alt="Logo" />
          </div>
          <div className="flex items-center">
            <div className="ml-4">Dashboard</div>
            <div className="ml-4">
              <img src='../../../img/user.png' className='h-10' alt="User" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
