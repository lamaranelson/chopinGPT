'use client';

import React, { useState, useRef, useEffect } from 'react';
import ModeSelector from './ModeSelector';

interface NavItem {
  text: string;
  imgSrc: string;
  active: boolean;
}

interface Model {
  displayName: string;
  apiName: string; // Name used in API call
}

interface SidebarProps {
  selectedMode: string;
  onModeSelect: (mode: string) => void;
  selectedModel: Model;
  onModelSelect: (model: Model) => void;
}

const initialNavItems: NavItem[] = [];

const models: Model[] = [
  { displayName: 'GPT 4 Turbo', apiName: 'gpt-4-turbo' },
  { displayName: 'GPT 4', apiName: 'gpt-4' },
  { displayName: 'GPT 4o', apiName: 'gpt-4o' },
  { displayName: 'o1-preview', apiName: 'o1-preview' },
  { displayName: 'o1-mini', apiName: 'o1-mini' },
  { displayName: 'gpt-4o-mini', apiName: 'gpt-4o-mini' },
];

const ModelSelect: React.FC<{
  models: Model[];
  selectedModel: Model;
  setSelectedModel: (model: Model) => void;
}> = ({ models, selectedModel, setSelectedModel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (model: Model) => {
    setSelectedModel(model);
    setIsOpen(false);
  };

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

  return (
    <div className="relative mt-4 w-full" ref={selectRef}>
      <button
        onClick={toggleOpen}
        className="flex items-center justify-between w-full px-4 py-2 border border-gray-200 rounded-md text-left cursor-pointer"
      >
        <div className="flex items-center">
          <span>{selectedModel.displayName}</span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          {/* SVG path */}
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
          {models.map((model) => (
            <li
              key={model.apiName}
              onClick={() => handleOptionClick(model)}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <span>{model.displayName}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({
  selectedMode,
  onModeSelect,
  selectedModel,
  onModelSelect,
}) => {
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

          <ModeSelector
            selectedMode={selectedMode}
            onModeSelect={onModeSelect}
          />

          {/* ModelSelect Component */}
          <ModelSelect
            models={models}
            selectedModel={selectedModel}
            setSelectedModel={onModelSelect}
          />
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