import React from "react";

const Loader = ({ 
  fullScreen = false, 
  text = "Loading...", 
  size = "md" 
}) => {
  // Size mapping for the spinner
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-14 h-14 border-4",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
    : "min-h-[240px] w-full flex flex-col items-center justify-center py-12";

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      <div className="relative flex items-center justify-center">
        {/* Subtle background track circle */}
        <div
          className={`${sizeClasses[size] || sizeClasses.md} rounded-full border-slate-200`}
        />
        {/* Rotating gradient-styled accent ring */}
        <div
          className={`absolute ${sizeClasses[size] || sizeClasses.md} rounded-full border-blue-600 border-t-transparent border-r-transparent animate-spin`}
        />
      </div>

      {text && (
        <p className="mt-3.5 text-xs font-semibold tracking-wide uppercase text-slate-500 animate-pulse">
          {text}
        </p>
      )}

      {/* Screen-reader only fallback text */}
      <span className="sr-only">{text || "Loading..."}</span>
    </div>
  );
};

export default Loader;