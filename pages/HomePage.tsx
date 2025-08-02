
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import GradeCard from '../components/GradeCard';

const HomePage: React.FC = () => {
  const { grades } = useAppContext();

  return (
    <div className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-10 pt-8 sm:pt-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">英語の文法の練習アプリ</h1>
        <p className="text-slate-600 mt-2 text-base sm:text-lg">学年を選んで学習を開始しましょう！</p>
      </header>
      
      <main className="max-w-xl mx-auto">
        <div className="flex flex-col gap-6">
          {grades.map((grade) => (
            <GradeCard key={grade.id} grade={grade} />
          ))}
        </div>
      </main>
      
      <footer className="text-center mt-12 text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} 英語文法学習アプリ. 楽しく学習しましょう！</p>
      </footer>
    </div>
  );
};

export default HomePage;