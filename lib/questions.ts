import questionsData from '@/data/questions.json';
import { ExamType, Question } from '@/types/quiz';

export const appDisclaimer = questionsData.disclaimer;

export const allQuestions = questionsData.questions as Question[];

export function getQuestionsByExam(exam: ExamType): Question[] {
  return allQuestions.filter((question) => question.exam === exam);
}

export function getQuestionById(id: string): Question | undefined {
  return allQuestions.find((question) => question.id === id);
}
