
// localStorageService.ts

const ATTEMPT_COUNT_KEY_PREFIX = 'setAttemptCount';
const SET_STATS_KEY_PREFIX = 'setStats';
const SENTENCE_MISTAKE_COUNT_KEY_PREFIX = 'sentenceMistakeCount';

/**
 * Generates a unique key for storing the attempt count of a specific problem set.
 */
const getSetAttemptKey = (gradeId: string, unitId: string, setIndex: number): string => {
  return `${ATTEMPT_COUNT_KEY_PREFIX}_${gradeId}_${unitId}_${setIndex}`;
};

/**
 * Generates a unique key for storing correctness statistics of a specific problem set.
 */
const getSetStatsKey = (gradeId: string, unitId: string, setIndex: number): string => {
  return `${SET_STATS_KEY_PREFIX}_${gradeId}_${unitId}_${setIndex}`;
};

/**
 * Generates a unique key for storing the mistake count of a specific sentence.
 */
const getSentenceMistakeKey = (gradeId: string, unitId: string, sentenceId: string): string => {
  // Normalize IDs that might have special chars, though current ones are fine.
  return `${SENTENCE_MISTAKE_COUNT_KEY_PREFIX}_${gradeId}_${unitId}_${sentenceId}`;
};


/**
 * Retrieves the attempt count for a specific problem set from localStorage.
 */
export const getSetAttemptCount = (gradeId: string, unitId: string, setIndex: number): number => {
  if (typeof localStorage === 'undefined') return 0;
  const key = getSetAttemptKey(gradeId, unitId, setIndex);
  const count = localStorage.getItem(key);
  return count ? parseInt(count, 10) : 0;
};

/**
 * Increments the attempt count for a specific problem set in localStorage.
 */
export const incrementSetAttemptCount = (gradeId: string, unitId: string, setIndex: number): void => {
  if (typeof localStorage === 'undefined') return;
  const key = getSetAttemptKey(gradeId, unitId, setIndex);
  const currentCount = getSetAttemptCount(gradeId, unitId, setIndex);
  localStorage.setItem(key, (currentCount + 1).toString());
};

/**
 * Interface for set statistics.
 */
export interface SetStats {
  correct: number;
  attempted: number; // Total questions answered in this set across all attempts
}

/**
 * Retrieves the correctness statistics for a specific problem set from localStorage.
 * @returns The SetStats object, or defaults if not found.
 */
export const getSetStats = (gradeId: string, unitId: string, setIndex: number): SetStats => {
  if (typeof localStorage === 'undefined') return { correct: 0, attempted: 0 };
  const key = getSetStatsKey(gradeId, unitId, setIndex);
  const statsString = localStorage.getItem(key);
  if (statsString) {
    try {
      const stats = JSON.parse(statsString);
      return {
        correct: Number(stats.correct) || 0,
        attempted: Number(stats.attempted) || 0,
      };
    } catch (e) {
      console.error("Error parsing set stats from localStorage", e);
      return { correct: 0, attempted: 0 };
    }
  }
  return { correct: 0, attempted: 0 };
};

/**
 * Records an answer for a specific problem set and updates statistics in localStorage.
 * @param gradeId The ID of the grade.
 * @param unitId The ID of the unit.
 * @param setIndex The index of the problem set.
 * @param isCorrect Whether the answer was correct.
 */
export const recordSetAnswer = (gradeId: string, unitId: string, setIndex: number, isCorrect: boolean): void => {
  if (typeof localStorage === 'undefined') return;
  const key = getSetStatsKey(gradeId, unitId, setIndex);
  const currentStats = getSetStats(gradeId, unitId, setIndex);

  const newStats: SetStats = {
    correct: currentStats.correct + (isCorrect ? 1 : 0),
    attempted: currentStats.attempted + 1,
  };
  localStorage.setItem(key, JSON.stringify(newStats));
};


/**
 * Retrieves the mistake count for a specific sentence from localStorage.
 */
export const getSentenceMistakeCount = (gradeId: string, unitId: string, sentenceId: string): number => {
  if (typeof localStorage === 'undefined') return 0;
  const key = getSentenceMistakeKey(gradeId, unitId, sentenceId);
  const count = localStorage.getItem(key);
  return count ? parseInt(count, 10) : 0;
};

/**
 * Increments the mistake count for a specific sentence in localStorage.
 */
export const incrementSentenceMistakeCount = (gradeId: string, unitId: string, sentenceId: string): void => {
  if (typeof localStorage === 'undefined') return;
  const key = getSentenceMistakeKey(gradeId, unitId, sentenceId);
  const currentCount = getSentenceMistakeCount(gradeId, unitId, sentenceId);
  localStorage.setItem(key, (currentCount + 1).toString());
};
