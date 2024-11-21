import { useState } from 'react';
import { PlusIcon, TrashIcon, Building2, GraduationCap, BookOpen } from 'lucide-react';

export default function SchoolForm({ onAdd, errorMsg, successMsg, universityName }) {
  const [name, setName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [departments, setDepartments] = useState(['']);

  const handleAddDepartment = () => setDepartments([...departments, '']);

  const handleRemoveDepartment = (indexToRemove) => {
    setDepartments(departments.filter((_, index) => index !== indexToRemove));
  };

  const handleDepartmentChange = (index, value) => {
    const updatedDepartments = [...departments];
    updatedDepartments[index] = value;
    setDepartments(updatedDepartments);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const university = {
      name: universityName || name,
      school: [{
        name: schoolName,
        departments: departments.filter(dept => dept.trim() !== '').map(name => ({ name }))
      }]
    };
    onAdd(university);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900/80 backdrop-blur-lg shadow-2xl rounded-2xl border border-slate-800/50 overflow-hidden"
    >
      <div className=" p-6">
        <div className="flex items-center justify-center gap-3 mb-3">
          <GraduationCap className="w-8 h-8 text-white/90" />
          <h2 className="text-2xl font-bold text-white">Edit School</h2>
        </div>
        <p className="text-blue-100/80 text-center text-sm">
          Edit the details below to edit school or add new departments
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <Building2 size={16} />
              University Name
            </label>
            <input
              value={universityName}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Stanford University"
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 text-white rounded-lg shadow-sm outline-none placeholder-slate-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              required
              disabled={!!universityName}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <BookOpen size={16} />
              School Name
            </label>
            <input
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="e.g., School of Engineering"
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 text-white rounded-lg shadow-sm outline-none placeholder-slate-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
              Departments
            </label>
            {departments.map((department, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  value={department}
                  onChange={(e) => handleDepartmentChange(index, e.target.value)}
                  placeholder="Department name"
                  className="flex-1 px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 text-white rounded-lg shadow-sm outline-none placeholder-slate-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                />
                {departments.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveDepartment(index)}
                    className="p-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <TrashIcon size={18} />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddDepartment}
              className="w-full flex items-center justify-center py-2.5 px-4 border border-dashed border-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-800/50 hover:border-slate-600/50 transition-all gap-2"
            >
              <PlusIcon size={16} /> Add Department
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 font-semibold shadow-lg flex items-center justify-center gap-2 duration-300 transition-all hover:scale-90"
        >
          <PlusIcon size={16} /> Add School
        </button>

        {errorMsg && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm text-center">
            {successMsg}
          </div>
        )}
      </div>
    </form>
  );
}