"use client";
import React, { useRef, useEffect } from 'react';

export const InfoRow = ({ label, value, onChange, type = "text" }) => (
    <>
      <div className="p-1 border-[1px] border-black">
        <p className="font-medium">{label}</p>
      </div>
      <div className="p-1 border-[1px] border-black">
        <input 
          required={true}
          type={type}
          className="w-full"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </>
  );

  const AutoResizeTextArea = ({ value, onChange, className }) => {
    const textareaRef = useRef(null);
  
    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };
  
    useEffect(() => {
      adjustHeight();
    }, [value]);
  
    return (
      <textarea
        required={true}
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} overflow-hidden resize-none`}
        rows={1}
      />
    );
  };
  
  export const InfoRowTextArea = ({ label, value, onChange }) => (
    <>
      <div className="p-1 border-[1px] border-black">
        <p className="font-medium">{label}</p>
      </div>
      <div className="p-1 border-[1px] border-black">
        <AutoResizeTextArea 
          className="w-full"
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );

  export const InfoRowTextAreaNolabel = ({value, onChange }) => (
    <>
      <div className="p-1 border-[1px] border-black">
        <AutoResizeTextArea 
          className="w-full"
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
  