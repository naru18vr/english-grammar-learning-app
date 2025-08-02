
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Grade, Unit, Sentence } from '../types';
import { GRADES_DATA } from '../constants';

interface AppContextType {
  grades: Grade[];
  getGradeById: (gradeId: string) => Grade | undefined;
  getUnitById: (gradeId: string, unitId: string) => Unit | undefined;
  getSentencesForUnit: (gradeId: string, unitId: string) => Sentence[] | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [grades] = useState<Grade[]>(GRADES_DATA);

  const getGradeById = (gradeId: string): Grade | undefined => {
    return grades.find(g => g.id === gradeId);
  };

  const getUnitById = (gradeId: string, unitId: string): Unit | undefined => {
    const grade = getGradeById(gradeId);
    return grade?.units.find(u => u.id === unitId);
  };

  const getSentencesForUnit = (gradeId: string, unitId: string): Sentence[] | undefined => {
    const unit = getUnitById(gradeId, unitId);
    return unit?.sentences;
  };

  return (
    <AppContext.Provider value={{ grades, getGradeById, getUnitById, getSentencesForUnit }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};