import React from 'react';
import { InfoRowTextAreaNolabel } from './InfoRow';
import { Trash2 } from 'lucide-react';

const Instructions = ({ instructions, setFormData }) => {
    const addInstruction = () => {
      setFormData(prev => ({ 
        ...prev, 
        instructions: [...prev.instructions, ''] 
      }));
    };
  
    const removeInstruction = (index) => {
      setFormData(prev => ({
        ...prev,
        instructions: prev.instructions.filter((_, i) => i !== index)
      }));
    };
  
    const updateInstruction = (index, value) => {
      setFormData(prev => {
        const newInstructions = [...prev.instructions];
        newInstructions[index] = value;
        return { ...prev, instructions: newInstructions };
      });
    };
  
    return (
      <>
        <div className="p-1 text-sm border-[1px] border-black">
          <p className="font-light italic">Instructions</p>
        </div>
        <div className="border-t border-[1px] border-black col-span-3">
          {instructions.map((instruction, idx) => (
            <div key={idx} className="flex w-[100%]">
              <input 
                className="p-1 flex-1"
                value={`${idx+1}. ${instruction}`}
                onChange={(e) => updateInstruction(idx, e.target.value)}
              />
              <button 
                type="button"
                onClick={() => removeInstruction(idx)}
                className="px-2 bg-red-500 text-white rounded-full w-8 h-8 mr-1 flex justify-center items-center mt-1"
              >
                <Trash2 size={20}  className='rounded-full'/>
              </button>
            </div>
          ))}
          <button 
            type="button"
            onClick={addInstruction}
            className="w-full p-1 bg-green-500 text-white"
          >
            Add Instruction
          </button>
        </div>
      </>
    );
  };
  
  export default Instructions;