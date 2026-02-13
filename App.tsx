import React, { useState } from 'react';
import { LESSONS, TEACHER_PIN } from './constants';
import { ViewState } from './types';
import LessonList from './components/LessonList';
import LessonDetail from './components/LessonDetail';

const App: React.FC = () => {
  const [completedLessons, setCompletedLessons] = useState<number>(0);
  const [view, setView] = useState<ViewState>('list');
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [isTeacherMode, setIsTeacherMode] = useState<boolean>(false);

  // Handlers
  const handleOpenLesson = (id: number) => {
    setSelectedLessonId(id);
    setView('detail');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedLessonId(null);
    setView('list');
  };

  const handleValidateLesson = (index: number) => {
    if (index === completedLessons) {
      setCompletedLessons(prev => prev + 1);
    }
  };

  const handleUnvalidateLesson = () => {
    if (completedLessons > 0) {
      setCompletedLessons(prev => prev - 1);
    }
  };

  const toggleTeacherMode = () => {
    const code = prompt("Code PIN Professeur :");
    if (code === TEACHER_PIN) {
      setIsTeacherMode(prev => !prev);
    } else if (code !== null) {
      alert("Code incorrect.");
    }
  };

  const selectedLesson = LESSONS.find(l => l.id === selectedLessonId);

  return (
    // Container principal (La feuille A4)
    <div id="app-container" className="w-full max-w-3xl bg-white shadow-2xl rounded-sm min-h-[85vh] flex flex-col relative overflow-hidden">
      
      {/* Reliure visuelle */}
      <div className="absolute top-0 left-0 w-full h-2 bg-blue-600 z-20"></div>

      {/* Pastille Professeur (Cachée en haut à droite) */}
      <div 
        id="teacher-dot" 
        onClick={toggleTeacherMode}
        className={`absolute top-4 right-4 w-3 h-3 rounded-full cursor-pointer z-50 transition-all duration-300 hover:scale-150 hover:opacity-100 ${isTeacherMode ? 'bg-green-500 opacity-100' : 'bg-blue-400 opacity-30'}`}
        title="Espace Professeur"
      ></div>

      {/* Content */}
      <div id="content" className="flex-1 flex flex-col">
        {view === 'list' ? (
          <LessonList 
            lessons={LESSONS}
            completedLessons={completedLessons}
            isTeacherMode={isTeacherMode}
            onOpenLesson={handleOpenLesson}
            onValidateLesson={handleValidateLesson}
            onUnvalidateLesson={handleUnvalidateLesson}
          />
        ) : (
          selectedLesson && (
            <LessonDetail 
              lesson={selectedLesson}
              onBack={handleBack}
            />
          )
        )}
      </div>

    </div>
  );
};

export default App;