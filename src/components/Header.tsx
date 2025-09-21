import React from 'react';
import { BarChart3, CheckCircle } from 'lucide-react';
import { Step } from '../App';

interface HeaderProps {
  currentStep: Step;
}

export function Header({ currentStep }: HeaderProps) {
  const steps = [
    { id: 'onboarding', label: 'Data Input', icon: '📊' },
    { id: 'competitors', label: 'Competitors', icon: '🏢' },
    { id: 'results', label: 'Analysis', icon: '📈' }
  ];

  const getStepStatus = (stepId: string) => {
    const stepIndex = steps.findIndex(s => s.id === stepId);
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'upcoming';
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Offer Benchmarking Agent
            </h1>
          </div>

          <nav className="flex items-center space-x-8">
            {steps.map((step, index) => {
              const status = getStepStatus(step.id);
              return (
                <div key={step.id} className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all
                        ${status === 'completed' 
                          ? 'bg-green-100 text-green-600' 
                          : status === 'active'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-400'
                        }
                      `}
                    >
                      {status === 'completed' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <span
                      className={`
                        text-sm font-medium transition-colors
                        ${status === 'active' ? 'text-blue-600' : 'text-gray-500'}
                      `}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-px bg-gray-200 ml-4" />
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}