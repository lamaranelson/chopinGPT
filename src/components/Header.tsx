import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-10 py-6 w-full border-b border-solid bg-white bg-opacity-30 border-b-gray-300">
      <div className="flex gap-3 items-center">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d4d3e157bc7040dbf44bce8c2e39e31732a24087b3fb47f43c681f73582797e?placeholderIfAbsent=true&apiKey=ca86d17a9e3445648b7b484e3e244d9a" className="object-contain w-12 rounded-lg" alt="Standard plan logo" />
        <div>
          <div className="text-lg font-medium text-black">Chopin GPT</div>
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