'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ActionableStep } from '@/lib/types';

interface NextStepsProps {
  steps: ActionableStep[];
}

// Local storage key for completed steps
const COMPLETED_STEPS_KEY = 'diaspora-completed-steps';

const priorityConfig = {
  urgent: {
    badge: 'URGENT',
    badgeColor: 'bg-red-100 text-red-800',
    borderColor: 'border-l-red-500',
  },
  high: {
    badge: 'PRIORITATE',
    badgeColor: 'bg-orange-100 text-orange-800',
    borderColor: 'border-l-orange-500',
  },
  medium: {
    badge: 'IMPORTANT',
    badgeColor: 'bg-yellow-100 text-yellow-800',
    borderColor: 'border-l-yellow-500',
  },
  low: {
    badge: 'INFO',
    badgeColor: 'bg-blue-100 text-blue-800',
    borderColor: 'border-l-blue-500',
  },
};

const categoryIcons = {
  tax: '💰',
  'social-security': '🛡️',
  healthcare: '🏥',
  documents: '📄',
  registration: '📝',
};

export default function NextSteps({ steps }: NextStepsProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  // Load completed steps from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(COMPLETED_STEPS_KEY);
      if (saved) {
        setCompletedSteps(new Set(JSON.parse(saved)));
      }
    } catch (error) {
      console.error('Error loading completed steps:', error);
    }
  }, []);

  // Save completed steps to localStorage
  const toggleStepComplete = (stepId: string) => {
    setCompletedSteps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      try {
        localStorage.setItem(COMPLETED_STEPS_KEY, JSON.stringify(Array.from(newSet)));
      } catch (error) {
        console.error('Error saving completed steps:', error);
      }
      return newSet;
    });
  };

  if (!steps || steps.length === 0) {
    return null;
  }

  const completedCount = steps.filter((step) => completedSteps.has(step.id)).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          ✓ Ce trebuie să faci
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Pașii următori pentru situația ta
        </p>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span>Progres</span>
            <span className="font-medium">
              {completedCount} / {steps.length} completat{completedCount !== 1 ? 'e' : ''}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {steps.map((step, index) => {
          const config = priorityConfig[step.priority];
          const icon = categoryIcons[step.category] || '📌';
          const isCompleted = completedSteps.has(step.id);

          return (
            <div
              key={step.id}
              className={`p-4 border-l-4 ${config.borderColor} hover:bg-gray-50 transition-colors ${
                isCompleted ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <button
                  onClick={() => toggleStepComplete(step.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                    isCompleted
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 hover:border-blue-500'
                  }`}
                  aria-label={isCompleted ? 'Marchează ca necompletată' : 'Marchează ca completată'}
                >
                  {isCompleted && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{icon}</span>
                    <h3 className={`font-semibold ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">
                    {step.description}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${config.badgeColor}`}
                    >
                      {config.badge}
                    </span>

                    {step.deadline && (
                      <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                        <span>📅</span>
                        <span>Deadline: {step.deadline}</span>
                      </span>
                    )}
                  </div>

                  {step.link && (
                    <Link
                      href={step.link}
                      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <span>📚</span>
                      <span>Vezi ghidul pas-cu-pas →</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {completedCount === steps.length && steps.length > 0 && (
        <div className="p-4 bg-green-50 border-t border-green-200">
          <div className="flex items-center gap-2 text-green-800">
            <span className="text-xl">🎉</span>
            <p className="text-sm font-medium">
              Felicitări! Ai completat toți pașii necesari!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
