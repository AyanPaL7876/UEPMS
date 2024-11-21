// src/components/ChangePasswordForm.js
'use client';

import React, { useState } from 'react';
import { Lock, KeyRound, EyeIcon, EyeOffIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { getTokenFromCookies } from '@/utils/auth';
import { validatePassword } from '@/utils/PasswordValidation';
import { PasswordStrengthDisplay } from './PasswordStrengthDisplay';

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    // Reset previous messages
    setValidationErrors([]);
    setSuccessMessage('');

    // Validate passwords
    const validation = validatePassword(currentPassword, newPassword, confirmPassword);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setIsLoading(true);

    try {
      const token = getTokenFromCookies()
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage('Password changed successfully');
        // Reset form
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setValidationErrors([result.message || 'Failed to change password']);
      }
    } catch (error) {
      setValidationErrors(['Network error. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-slate-800/50 overflow-hidden">
      <div className="p-8">
        <div className="flex items-center justify-center mb-6">
          <Lock className="w-10 h-10 text-blue-500 mr-2" />
          <h2 className="text-2xl font-bold text-white">Change Password</h2>
        </div>

        {/* Error Messages Section */}
        {validationErrors.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-center text-red-500 mb-2">
              <AlertCircle className="mr-2" />
              <span className="font-semibold">Password Change Errors</span>
            </div>
            <ul className="list-disc list-inside text-red-400 space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Success Messages Section */}
        {successMessage && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-center text-green-500">
              <CheckCircle2 className="mr-2" />
              <span className="font-semibold">{successMessage}</span>
            </div>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div className="relative">
            <label className="text-sm font-medium text-slate-300 mb-2 flex items-center">
              <KeyRound size={16} className="mr-2" /> Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showCurrentPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-slate-300 mb-2 flex items-center">
              <KeyRound size={16} className="mr-2" /> New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showNewPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
            <PasswordStrengthDisplay password={newPassword} />
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-slate-300 mb-2 flex items-center">
              <KeyRound size={16} className="mr-2" /> Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 font-semibold transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              'Change Password'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}