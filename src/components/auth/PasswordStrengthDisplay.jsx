// src/components/PasswordStrengthDisplay.js
import React from 'react';
import { calculatePasswordStrength } from '@/utils/PasswordValidation';

export function PasswordStrengthDisplay({ password }) {
  const strength = calculatePasswordStrength(password);
  
  const strengthLabels = [
    'Very Weak',
    'Weak',
    'Fair',
    'Good',
    'Strong',
    'Very Strong',
    'Excellent'
  ];

  const strengthColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-yellow-600',
    'bg-green-500',
    'bg-green-600',
    'bg-green-700'
  ];

  return (
    <div className="mt-2">
      <div className="flex space-x-1 h-1.5">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div 
            key={index} 
            className={`flex-1 rounded-full ${
              index < strength ? strengthColors[strength] : 'text-gray-300'
            }`}
          >

          </div>
        ))}
      </div>
      <div className='flex'>
      <p className={`text-sm mt-1 ${strengthColors[strength]} px-2 py-1 rounded-xl`}>
        {password ? strengthLabels[strength] : 'Password Strength'}
      </p>

      </div>
    </div>
  );
}