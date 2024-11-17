import React from 'react';
import { Plus, Calendar, MoreVertical, CheckCircle2, Circle } from 'lucide-react';

function Tasks() {
  const tasks = [
    {
      id: 1,
      title: "CSE301",
      date: "2024-12-10",
      description: "Create semester exam question paper for CSE301, subjects name : Data Structure, program name: BCA",
      status: "pending"
    },
    {
      id: 2,
      title: "CSE201",
      date: "2024-12-12",
      description: "Moderate semester exam question paper for CSE201, subjects name : Algorithm, program name: BCA",
      status: "pending"
    },
    {
      id: 3,
      title: "CSE101",
      date: "2024-12-15",
      description: "Create semester exam question paper for CSE101, subjects name : Operating System, program name: B.Tech",
      status: "pending"
    }
  ];

  return (
    <div className="bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto py-12 px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-1 p-1">My Tasks</h1>
            <p className="text-gray-400">Manage your tasks and stay organized</p>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-slate-800 rounded-lg shadow-md hover:shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-200 group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {task.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">{task.description}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400 mt-4">
                  <Calendar className="w-4 h-4" />
                  <span>{task.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="text-center py-12 bg-slate-800 rounded-lg shadow-md border border-gray-700 mt-6">
            <div className="bg-slate-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-1">No tasks yet</h3>
            <p className="text-gray-400">Create your first task to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;
