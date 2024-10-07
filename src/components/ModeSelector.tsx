import React from 'react';

interface ModeOption {
  title: string;
  description: string;
  icon?: string;
}

interface ModeSelectorProps {
  selectedMode: string;
  onModeSelect: (mode: string) => void;
}

const modeOptions: ModeOption[] = [
  {
    title: "Creative mode",
    description: '"Creative mode" could refer to a chatbot or AI language model designed to assist and inspire creativity. Such a chatbot or AI model might provide prompts, suggest ideas, or even generate content for creative projects.'
  },
  {
    title: "Balanced mode",
    description: '"Balance mode" generally refers to an AI chatbot or language model designed to strike a balance between providing helpful responses and maintaining appropriate boundaries with users.',
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/..."
  },
  {
    title: "Strict mode",
    description: '"Strict mode" generally refers to an AI chatbot or language model that is designed to strictly adhere to a set of predefined rules or guidelines for responding to user queries.'
  }
];

const ModeSelector: React.FC<ModeSelectorProps> = ({ selectedMode, onModeSelect }) => {
  const handleModeSelect = (mode: string) => {
    onModeSelect(mode);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full">
        <h2 className="text-2xl font-medium text-black">Mode</h2>
        {modeOptions.map((option, index) => (
          <div
            key={index}
            className={`relative flex overflow-hidden flex-col justify-center px-4 py-3 mt-3 w-full rounded-lg border border-solid cursor-pointer ${
              selectedMode === option.title ? 'border-blue-500' : 'border-gray-200'
            }`}
            onClick={() => handleModeSelect(option.title)}
          >
            <div className="flex gap-3 items-start w-full">
              <div className="flex overflow-hidden flex-col justify-center p-1 w-6">
                <div className={`flex shrink-0 rounded-full border border-dashed border-neutral-300 h-[17px] ${selectedMode === option.title ? 'bg-blue-500' : ''}`}>
                  {selectedMode === option.title && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="flex flex-col flex-1 shrink justify-center basis-0 min-w-[240px]">
                <div className="text-base font-medium text-black">{option.title}</div>
                <div className="mt-2 text-sm text-neutral-500">{option.description}</div>
              </div>
            </div>
          </div>
        ))}
        {selectedMode && (
          <div className="mt-4 p-4 bg-blue-100 rounded-lg">
            <h3 className="text-lg font-medium text-blue-700">Selected Mode: {selectedMode}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModeSelector;