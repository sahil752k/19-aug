import React from 'react';
import { useAppContext } from '../context/AppContext';

export const Logo = ({ className = "", size = "md", textContainerClassName = "" }: { className?: string, size?: "sm" | "md" | "lg", textContainerClassName?: string }) => {
  const sizes = {
    sm: { img: "w-[60px] h-[60px]", title: "text-[20px]", subtitle: "text-[15px]", tagline: "text-[10px]" },
    md: { img: "w-[75px] h-[75px]", title: "text-[28px]", subtitle: "text-[20px]", tagline: "text-[12px]" },
    lg: { img: "w-[85px] h-[85px]", title: "text-[32px]", subtitle: "text-[22px]", tagline: "text-[13px]" }
  };
  const s = sizes[size];
  
  return (
    <div className={`flex items-center gap-2 md:gap-3 ${className}`}>
      <div className={`${s.img} flex items-center justify-center shrink-0`}>
        {/* Add your logo URL in the src attribute below */}
        <img src="https://cdn.jsdelivr.net/gh/sahil752k/solar-biling-software-sumit-bhandari@main/ChatGPT_Image_Jun_13__2026__03_30_24_PM-removebg-preview.png" alt="Logo" className="w-full h-full object-contain mix-blend-multiply mix-blend-multiply" />
      </div>
      <div className={`flex flex-col justify-center whitespace-nowrap ${textContainerClassName}`}>
        <span className={`text-[#e27d28] font-bold ${s.title} tracking-widest uppercase leading-none font-times`} style={{fontFamily: 'Montserrat, sans-serif'}}>r. s. bhandari</span>
        <span className={`text-[#415a77] font-bold ${s.subtitle} tracking-tight leading-none mt-1`}>Solar Energy Solutions</span>
      </div>
    </div>
  );
};

// We simulate the stamp using CSS border and text as per standard practice when real assets aren't strictly available in filesystem
export const Stamp = () => (
  <div className="relative w-32 h-auto flex flex-col items-center justify-center mix-blend-multiply">
    <img 
      src="https://cdn.jsdelivr.net/gh/sahil752k/solar-biling-software-sumit-bhandari@main/rs%20final%20sign.png" 
      alt="R.S. Bhandari Signature and Stamp" 
      className="max-w-full h-auto object-contain mix-blend-multiply mb-1" 
    />
  </div>
);
