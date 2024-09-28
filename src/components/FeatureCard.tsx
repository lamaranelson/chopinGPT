
import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  items: string[];
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, items }) => {
  return (
    <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
      <div className="flex overflow-hidden flex-col justify-center px-6 py-5 w-full bg-white rounded-xl border-2 border-solid border-neutral-200 max-md:px-5">
        <div className="flex flex-col w-full">
          <div className="flex gap-2.5 items-center p-3 w-12 h-12 bg-stone-50 rounded-[90px]">
            <img loading="lazy" src={icon} className="object-contain w-6 aspect-square" alt={`${title} icon`} />
          </div>
          <div className="flex flex-col mt-5 w-full">
            <div className="text-lg font-medium text-black">{title}</div>
            <div className="mt-3 text-sm leading-5 text-neutral-400">
              {items[0]}
            </div>
          </div>
        </div>
      </div>
      {items.slice(1).map((item, index) => (
        <div key={index} className="overflow-hidden px-6 py-5 mt-4 w-full text-sm leading-5 bg-white rounded-xl border-2 border-solid border-neutral-200 text-neutral-400 max-md:px-5">
          {item}
        </div>
      ))}
    </div>
  );
};

export default FeatureCard;