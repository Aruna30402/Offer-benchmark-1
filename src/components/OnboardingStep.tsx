import React, { useState } from 'react';
import { Upload, Link, Building2, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { BankData } from '../App';

interface OnboardingStepProps {
  onComplete: (data: BankData) => void;
}

export function OnboardingStep({ onComplete }: OnboardingStepProps) {
  const [bankName, setBankName] = useState('');
  const [dataSource, setDataSource] = useState<'url' | 'csv'>('url');
  const [url, setUrl] = useState('');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }

    if (dataSource === 'url' && !url.trim()) {
      newErrors.url = 'URL is required';
    } else if (dataSource === 'url' && !isValidUrl(url)) {
      newErrors.url = 'Please enter a valid URL';
    }

    if (dataSource === 'csv' && !csvFile) {
      newErrors.csvFile = 'CSV file is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate processing time
    setTimeout(() => {
      const bankData: BankData = {
        name: bankName.trim(),
        dataSource,
        ...(dataSource === 'url' ? { url: url.trim() } : { csvData: [] })
      };

      onComplete(bankData);
      setIsProcessing(false);
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      setErrors(prev => ({ ...prev, csvFile: '' }));
    } else {
      setErrors(prev => ({ ...prev, csvFile: 'Please select a valid CSV file' }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Offer Benchmarking
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get started by providing your bank's information and offer data. We'll help you 
          analyze your offers against competitors and identify opportunities for improvement.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Bank Name */}
          <div>
            <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-2">
              Bank Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="bankName"
                value={bankName}
                onChange={(e) => {
                  setBankName(e.target.value);
                  setErrors(prev => ({ ...prev, bankName: '' }));
                }}
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.bankName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your bank's name"
              />
            </div>
            {errors.bankName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.bankName}
              </p>
            )}
          </div>

          {/* Data Source Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              How would you like to provide your offer data? *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  setDataSource('url');
                  setErrors(prev => ({ ...prev, url: '', csvFile: '' }));
                }}
                className={`p-6 border-2 rounded-lg text-left transition-all ${
                  dataSource === 'url'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    dataSource === 'url' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Link className={`h-6 w-6 ${
                      dataSource === 'url' ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Website URL</h3>
                    <p className="text-sm text-gray-500">Provide a link to your offers page</p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setDataSource('csv');
                  setErrors(prev => ({ ...prev, url: '', csvFile: '' }));
                }}
                className={`p-6 border-2 rounded-lg text-left transition-all ${
                  dataSource === 'csv'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    dataSource === 'csv' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <FileText className={`h-6 w-6 ${
                      dataSource === 'csv' ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">CSV File</h3>
                    <p className="text-sm text-gray-500">Upload a CSV file with your offers</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* URL Input */}
          {dataSource === 'url' && (
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                Offers Page URL *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Link className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setErrors(prev => ({ ...prev, url: '' }));
                  }}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.url ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="https://yourbank.com/offers"
                />
              </div>
              {errors.url && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.url}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                We'll automatically extract offer information from your website
              </p>
            </div>
          )}

          {/* CSV File Upload */}
          {dataSource === 'csv' && (
            <div>
              <label htmlFor="csvFile" className="block text-sm font-medium text-gray-700 mb-2">
                CSV File *
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="csvFile"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="csvFile"
                        name="csvFile"
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">CSV files only</p>
                </div>
              </div>
              {csvFile && (
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {csvFile.name}
                </div>
              )}
              {errors.csvFile && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.csvFile}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Your CSV should include columns for merchant name, category, offer details, and validity period
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isProcessing}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  <span>Continue to Competitor Selection</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-3">Need Help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-1">For Website URLs:</h4>
            <p>Make sure the URL points to a page that lists your current offers, promotions, or rewards programs.</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">For CSV Files:</h4>
            <p>Include columns for merchant name, category, offer description, and validity period for best results.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
