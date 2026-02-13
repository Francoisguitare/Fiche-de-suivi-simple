import React from 'react';
import { Play, CheckCircle, Lock, Video, ChevronRight } from 'lucide-react';
import { Lesson, LessonStatus } from '../types';

interface LessonListProps {
  lessons: Lesson[];
  completedLessons: number;
  isTeacherMode: boolean;
  onOpenLesson: (id: number) => void;
  onValidateLesson: (index: number) => void;
  onUnvalidateLesson: () => void;
}

const LessonList: React.FC<LessonListProps> = ({
  lessons,
  completedLessons,
  isTeacherMode,
  onOpenLesson,
  onValidateLesson,
  onUnvalidateLesson
}) => {
  const progressPct = (completedLessons / lessons.length) * 100;

  const getStatus = (index: number): LessonStatus => {
    if (index < completedLessons) return 'completed';
    if (index === completedLessons) return 'current';
    return 'locked';
  };

  return (
    <>
      {/* Header */}
      <div className="p-8 sm:p-10 border-b-2 border-slate-100">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-2">Suivi de Progression</h1>
            <p className="text-xl text-slate-500">Guitare Impro Académie — Élève</p>
          </div>
        </div>
        <div className="mt-6 w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-1000" 
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 pb-10">
        {lessons.map((lesson, index) => {
          const status = getStatus(index);
          const isLocked = status === 'locked';
          const isCurrent = status === 'current';
          const isCompleted = status === 'completed';

          let bgClass = "";
          if (isLocked) {
            bgClass = 'bg-slate-50 opacity-60 cursor-not-allowed grayscale border-b border-slate-100';
          } else {
            bgClass = 'bg-white cursor-pointer border-b border-slate-100 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg hover:z-10 relative';
            if (isCurrent) {
              bgClass += ' ring-2 ring-blue-500 ring-offset-2 shadow-md z-10 my-1 rounded-sm';
            } else {
              bgClass += ' hover:bg-green-50';
            }
          }

          return (
            <div 
              key={lesson.id}
              className={`p-6 sm:p-8 flex items-center ${bgClass}`}
              onClick={() => {
                if (!isLocked || isTeacherMode) {
                  onOpenLesson(lesson.id);
                }
              }}
            >
              {/* Teacher Controls */}
              {isTeacherMode && (
                <>
                  {isCurrent && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onValidateLesson(index);
                      }}
                      className="absolute right-2 top-2 bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-bold border border-green-200 z-20 hover:bg-green-200 cursor-pointer"
                    >
                      VALIDER
                    </button>
                  )}
                  {isCompleted && index === completedLessons - 1 && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onUnvalidateLesson();
                      }}
                      className="absolute right-2 top-2 bg-red-50 text-red-400 px-2 py-1 rounded text-xs border border-red-100 z-20 hover:bg-red-100 cursor-pointer"
                    >
                      ANNULER
                    </button>
                  )}
                </>
              )}

              {/* Icon */}
              <div className="mr-6 sm:mr-8 flex-shrink-0">
                {isCompleted && (
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                )}
                {isCurrent && (
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg animate-pulse">
                    <Play className="w-6 h-6 ml-1 fill-white" />
                  </div>
                )}
                {isLocked && (
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                    <Lock className="w-6 h-6" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className={`text-xl sm:text-2xl font-bold mb-1 ${isLocked ? 'text-slate-400' : 'text-slate-800'}`}>
                  {lesson.title}
                </h3>
                <div className="flex items-center text-slate-500">
                  <Video className="w-4 h-4 mr-2" />
                  <span className="text-base">{lesson.duration}</span>
                  {isCurrent && (
                    <span className="ml-4 text-blue-600 font-bold bg-blue-100 px-2 py-0.5 rounded text-sm uppercase tracking-wide">
                      C'est ici !
                    </span>
                  )}
                  {isCompleted && (
                    <span className="ml-4 text-green-600 font-bold text-sm uppercase tracking-wide">
                      Validé
                    </span>
                  )}
                </div>
              </div>

              {/* Chevron */}
              <div className="ml-4 text-slate-300">
                {!isLocked && (
                  <div className="bg-blue-50 p-2 rounded-full text-blue-500">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-6 bg-slate-50 text-center border-t border-slate-200 mt-auto">
        <p className="text-slate-400 italic">Besoin d'aide ? Appelle François directement.</p>
      </div>
    </>
  );
};

export default LessonList;