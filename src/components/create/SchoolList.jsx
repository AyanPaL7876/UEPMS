import { 
  GraduationCap,
  Building2, 
  BookOpen } from 'lucide-react';

export default function SchoolList({ universities }) {
  if (!universities || universities.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center p-8 bg-slate-900/50 rounded-2xl border border-slate-800">
          <GraduationCap className="w-16 h-16 mx-auto text-slate-500 mb-4" />
          <h3 className="text-xl font-semibold text-slate-300 mb-2">No Schools Yet</h3>
          <p className="text-slate-400">Start by adding your first school</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto flex justify-start items-start">
      {universities.map((university) => (
        <div key={university._id} className="bg-slate-900/30 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 flex items-center gap-3">
            <Building2 className="text-white/90" size={24} />
            <h2 className="text-xl font-bold text-white">{university.name}</h2>
          </div>
          
          <div className="p-4 space-y-4 overflow-y-auto h-[70vh]">
            {(university.schools || []).map((school, schoolIndex) => (
              <div
                key={`${university._id}-school-${schoolIndex}`}
                className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/50"
              >
                <div className="bg-slate-800 p-3 flex items-center gap-2">
                  <BookOpen className="text-blue-400" size={20} />
                  <h3 className="font-semibold text-slate-200">
                    {school.name}
                  </h3>
                </div>

                <div className="p-4">
                  {school.departments && school.departments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {school.departments.map((dept, deptIndex) => (
                        <div
                          key={`${school.name}-dept-${deptIndex}`}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800/90 bg-slate-800/30 transition-colors duration-300 ease-in-out"
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                          <span className="text-slate-300 text-sm">
                            {dept.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 text-sm italic text-center py-2">
                      No departments added yet
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}