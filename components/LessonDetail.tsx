import React from 'react';
import { ArrowLeft, Play, MessageCircle } from 'lucide-react';
import { Lesson } from '../types';

interface LessonDetailProps {
  lesson: Lesson;
  onBack: () => void;
}

const LessonDetail: React.FC<LessonDetailProps> = ({ lesson, onBack }) => {
  return (
    <div className="flex-1 flex flex-col fade-in bg-white">
      {/* Header Navigation */}
      <div className="p-6 border-b border-gray-100 flex items-center sticky top-0 bg-white z-10">
        <button 
          onClick={onBack} 
          className="flex items-center text-slate-600 hover:text-blue-600 transition-colors text-lg font-medium cursor-pointer group"
        >
          <div className="bg-slate-100 p-2 rounded-full mr-2 group-hover:bg-blue-100">
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </div>
          Retour à la liste
        </button>
      </div>

      <div className="p-6 sm:p-10 flex-1 flex flex-col items-center max-w-2xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-2">{lesson.title}</h2>
        <p className="text-slate-500 text-xl mb-8 text-center">{lesson.desc}</p>

        {/* Vidéo Placeholder */}
        <div className="w-full aspect-video bg-slate-900 rounded-lg shadow-lg flex items-center justify-center mb-10 relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all">
          <img 
            src={`https://img.youtube.com/vi/${lesson.videoId}/maxresdefault.jpg`} 
            alt="Miniature vidéo"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="z-10 bg-white/10 backdrop-blur-sm p-4 rounded-full border-2 border-white/50 group-hover:scale-110 transition-transform">
             <Play className="w-12 h-12 text-white fill-white" />
          </div>
        </div>

        {/* Zone Action Élève */}
        <div className="w-full bg-blue-50 border border-blue-100 rounded-xl p-6 sm:p-8 text-center">
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">J'ai terminé !</h3>
          <p className="text-lg text-slate-600 mb-6">Pour débloquer la suite, filme ton exercice et envoie-le à François.</p>
          
          <a 
            href={`https://wa.me/33600000000?text=Bonjour François, voici ma vidéo pour le ${lesson.title}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
          >
            <MessageCircle className="w-6 h-6 mr-3" />
            Envoyer ma vidéo
          </a>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;