import { useState } from 'react';
import { FormData } from '../types/questionnaire';

export function useQuestionnaireForm() {
  const [formData, setFormData] = useState<FormData>(() => {
    const saved = localStorage.getItem('questionnaireData');
    return saved ? JSON.parse(saved) : {};
  });

  const updateFormData = (sectionId: string, questionId: string, value: any) => {
    const newFormData = {
      ...formData,
      [questionId]: value,
    };
    setFormData(newFormData);
    localStorage.setItem('questionnaireData', JSON.stringify(newFormData));
  };

  return {
    formData,
    updateFormData,
  };
}