"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  Save, 
  Trash2, 
  RefreshCcw, 
  FileText,
  X 
} from 'lucide-react';

const ActionButton = ({ onSave, onDelete, onReset, onGeneratePDF }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const buttons = [
      { 
        label: 'Reset', 
        icon: <RefreshCcw className="mr-2" />,
        className: 'text-gray-500 hover:text-gray-700 border border-gray-300 hover:border-gray-500', 
        onClick: () => {
          onReset();
          setIsExpanded(false);
        }
      },
      { 
        label: 'Generate PDF', 
        icon: <FileText className="mr-2" />,
        className: 'text-green-500 hover:text-green-600 border border-green-300 hover:border-green-500', 
        onClick: () => {
          onGeneratePDF();
          setIsExpanded(false);
        }
    },
      { 
      label: 'Save', 
      icon: <Save className="mr-2" />,
      className: 'bg-blue-500 hover:bg-blue-600 text-white', 
      onClick: () => {
        onSave();
        setIsExpanded(false);
      }
    },
    { 
      label: 'Delete', 
      icon: <Trash2 className="mr-2" />,
      className: 'bg-red-500 hover:bg-red-600 text-white', 
      onClick: () => {
        onDelete();
        setIsExpanded(false);
      }
    },
  ];
  
  return (
    <div className='fixed bottom-5 right-5'>
      {isExpanded ? (
        <div className='bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 p-4 pt-8 space-y-3 w-48 relative z-50'>
          <button 
            onClick={() => setIsExpanded(false)}
            className='
              absolute top-0 right-1/2 transform translate-x-1/2
              bg-gray-100 text-gray-500 hover:text-gray-700 
              hover:bg-gray-200 rounded-full p-2 
              shadow-md transition-all duration-300
              hover:rotate-45 hover:scale-105
            '
          >
            <X size={16} />
          </button>
          {buttons.map((button, index) => (
            <button 
              key={index}
              className={`
                w-full flex items-center justify-center 
                px-4 py-3 rounded-lg 
                transition-all duration-300 
                transform hover:-translate-y-1 
                hover:shadow-lg 
                focus:outline-none 
                ${button.className}
              `}
              onClick={button.onClick}
            >
              {button.icon}
              <span className='font-medium text-sm'>{button.label}</span>
            </button>
          ))}
        </div>
      ) : (
        <button 
          onClick={() => setIsExpanded(true)}
          className='
            bg-blue-500 text-white 
            rounded-full p-4 
            shadow-lg 
            hover:bg-blue-600 
            transition-all duration-300 
            transform hover:scale-110 
            flex items-center 
            justify-center
          '
        >
          <Plus size={24} />
        </button>
      )}
    </div>
  );
};

export default ActionButton;
