
import React from 'react';

interface WordTileProps {
  word: string;
  onClick: () => void;
  disabled?: boolean;
  sourceArea?: 'bank' | 'sentence';
}

const WordTile: React.FC<WordTileProps> = ({ word, onClick, disabled, sourceArea = 'bank' }) => {
  const baseStyle = "px-4 py-2 m-1.5 rounded-lg shadow-md cursor-pointer transition-all duration-200 ease-in-out text-lg font-medium transform active:scale-95";
  
  let colorStyle = "bg-white text-slate-700 hover:bg-slate-100 border border-slate-300";
  if (sourceArea === 'sentence') {
    colorStyle = "bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300";
  }

  if (disabled) {
    return (
      <div className={`${baseStyle} ${colorStyle} opacity-50 cursor-not-allowed`}>
        {word}
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${colorStyle}`}
      disabled={disabled}
    >
      {word}
    </button>
  );
};

export default WordTile;