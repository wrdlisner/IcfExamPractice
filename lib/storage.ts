import { QuizSession } from '@/types/quiz';

const STORAGE_KEY = 'icf-quiz-history-v1';
const ACTIVE_KEY = 'icf-active-session-v1';

export function saveSession(session: QuizSession): void {
  if (typeof window === 'undefined') return;
  const sessions = getSessions();
  const existingIndex = sessions.findIndex((item) => item.id === session.id);
  if (existingIndex >= 0) {
    sessions[existingIndex] = session;
  } else {
    sessions.unshift(session);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function getSessions(): QuizSession[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as QuizSession[];
  } catch {
    return [];
  }
}

export function setActiveSessionId(sessionId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACTIVE_KEY, sessionId);
}

export function getActiveSessionId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACTIVE_KEY);
}

export function clearActiveSessionId(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACTIVE_KEY);
}
