'use client';

import React, { useState, useRef, useEffect } from 'react';
import ModeSelector from 'src/components/ModeSelector';

interface Version {
  name: string;
  imageId: string;
}

// interface MenuItem {
//   text: string;
//   imgSrc?: string;
//   icon?: string; 
// }

interface NavItem {
  text: string;
  imgSrc: string;
  active: boolean;
}

const versions: Version[] = [
  {
    name: 'GPT 3.5',
    imageId: '5bbb2a8e3bce39b84b3c69f10a3da0b5b444ccf5e0012083ae9b3073d0c88beb',
  },
  {
    name: 'GPT 4',
    imageId: '6cd0a346e11e78b0751c384b9b42a8035a8d90f10612299c570d26c91a86b54f',
  },
  {
    name: 'GPT 4o',
    imageId: '422d0b441f974cc8e0af18e7f5763a0e7ef6c6719b164abdc912815bb7fe24b9',
  },
];

// const menuItems: MenuItem[] = [
//   {
//     text: 'Show resource-link',
//     imgSrc:
//       'https://cdn.builder.io/api/v1/image/assets/TEMP/6cd0a346e11e78b0751c384b9b42a8035a8d90f10612299c570d26c91a86b54f?placeholderIfAbsent=true&apiKey=YOUR_API_KEY',
//   },
//   {
//     text: 'Show proposed prompt',
//     imgSrc:
//       'https://cdn.builder.io/api/v1/image/assets/TEMP/6cd0a346e11e78b0751c384b9b42a8035a8d90f10612299c570d26c91a86b54f?placeholderIfAbsent=true&apiKey=YOUR_API_KEY',
//   },
//   {
//     text: 'Dark mode',
//     icon: 'circle',
//   },
// ];

const initialNavItems: NavItem[] = [
  {
    text: 'History',
    imgSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/1d10da83f20e0fdab62122112c98374a4270123af1ae1259d754b2b89072e53a?placeholderIfAbsent=true&apiKey=YOUR_API_KEY',
    active: false,
  },
  {
    text: 'Main',
    imgSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/422d0b441f974cc8e0af18e7f5763a0e7ef6c6719b164abdc912815bb7fe24b9?placeholderIfAbsent=true&apiKey=YOUR_API_KEY',
    active: true,
  },
];

const VersionSelect: React.FC<{
  versions: Version[];
  selectedVersion: string;
  setSelectedVersion: (name: string) => void;
}> = ({ versions, selectedVersion, setSelectedVersion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (version: Version) => {
    setSelectedVersion(version.name);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const selectedVersionData = versions.find(
    (v) => v.name === selectedVersion
  );

  return (
    <div className="relative mt-6 w-full" ref={selectRef}>
      <button
        onClick={toggleOpen}
        className="flex items-center justify-between w-full px-4 py-2 border border-gray-200 rounded-md text-left cursor-pointer"
      >
        <div className="flex items-center">
          <span>{selectedVersion}</span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0
            011.414 0L10 10.586l3.293-3.293a1 1 0
            111.414 1.414l-4 4a1 1 0
            01-1.414 0l-4-4a1 1 0
            010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        </button>
      {isOpen && (
        <ul className="absolute mt-1 max-h-60 overflow-auto w-full bg-white border border-gray-200 rounded-md z-10">
          {versions.map((version) => (
            <li
              key={version.name}
              onClick={() => handleOptionClick(version)}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <span>{version.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const [selectedVersion, setSelectedVersion] = useState('GPT 3.5');
  const [navItems, setNavItems] = useState<NavItem[]>(initialNavItems);

  const handleNavItemClick = (index: number) => {
    setNavItems((prevItems) =>
      prevItems.map((item, i) => ({
        ...item,
        active: i === index,
      }))
    );
  };

  return (
    <div className="flex flex-col w-3/12 h-screen max-md:ml-0 max-md:w-full">
      <div className="flex flex-col justify-between px-10 py-6 w-full border-r border-gray-300 max-md:px-5">
        <div className="flex flex-col w-full">
          <h1 className="text-4xl font-medium text-black">Main</h1>
          <ModeSelector />

          {/* Use the custom VersionSelect component */}
          <VersionSelect
            versions={versions}
            selectedVersion={selectedVersion}
            setSelectedVersion={setSelectedVersion}
          />

          {/* Add Chopin's picture
          <div className="flex items-center mt-2 w-full">
            <img
              loading="lazy"
              src="assets/Sidebar/chopin_portrait.png"
              className="w-full h-auto rounded-md"
              alt="Chopin"
            />
          </div> */}
        </div>

        {/* Render navigation items */}
        <nav className="flex items-center mt-40 text-sm font-medium max-md:mt-10">
          {navItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleNavItemClick(index)}
              className={`flex items-center px-4 py-2 mr-2 ${
                item.active
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-500 border border-gray-200'
              } rounded-lg cursor-pointer`}
            >
              <img
                loading="lazy"
                src={item.imgSrc}
                className="w-4 h-4 mr-2"
                alt={item.text}
              />
              <span>{item.text}</span>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;