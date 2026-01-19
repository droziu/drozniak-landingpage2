import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserCourses, type CourseWithProgress } from '../hooks/useUserCourses';
import { LoadingState } from './LoadingState';

export const ClientCoursesView: React.FC = () => {
  const { courses, loading } = useUserCourses();
  const navigate = useNavigate();

  if (loading) {
    return <LoadingState variant="block" label="Ładowanie kursów…" skeleton="cards" />;
  }

  if (courses.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-400 text-sm">Brak przypisanych kursów.</p>
        <p className="text-gray-500 text-xs mt-1">Skontaktuj się z administratorem.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-white mb-4">Twoje kursy</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {courses.map((c) => (
          <CourseCard key={c.id} course={c} onOpen={() => navigate(`/panel/courses/${c.id}`)} />
        ))}
      </div>
    </div>
  );
};

const CourseCard: React.FC<{ course: CourseWithProgress; onOpen: () => void }> = ({ course, onOpen }) => {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.05] transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-white text-sm truncate">{course.name}</h3>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] rounded-full transition-all"
                style={{ width: `${Math.min(100, course.completionPercent)}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 tabular-nums flex-shrink-0">{course.completionPercent}%</span>
          </div>
        </div>
        <button
          onClick={onOpen}
          className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-[#fee715] text-[#101820] text-xs font-semibold hover:bg-[#fee715]/90 transition-colors"
          title="Otwórz w trybie pełnoekranowym"
        >
          Otwórz
        </button>
      </div>
    </div>
  );
};
