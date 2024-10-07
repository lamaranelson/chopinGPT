import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 w-full border-b border-gray-300 bg-white">
      <div className="flex gap-3 items-center">
        <img loading="lazy" src="assets/Sidebar/chopin_headshot.png" className="object-contain w-10 rounded-lg" alt="Standard plan logo" />
        <div>
          <div className="text-lg font-medium text-black">ChopinGPT</div>
          <div className="flex gap-1 items-center mt-1 text-sm text-green-600">
            <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
            <div>Online</div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <a href="https://xy.ai" target="_blank" className="flex gap-2 items-center">
          <div className="px-1 w-7 h-7 text-sm font-medium text-center text-white bg-black rounded">
            XY
          </div>
          <div className="text-base text-black">XY.ai</div>
        </a>
      </div>
    </header>
  );
};

export default Header;