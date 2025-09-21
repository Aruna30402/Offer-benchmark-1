import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Upload, Building2, Plus, Check } from 'lucide-react';
import { BankData, Competitor, AnalysisData } from '../App';

// Add missing types
export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
  actionType?: string;
  showCompetitors?: boolean;
  showFileUpload?: boolean;
  showBankNameInput?: boolean;
  showDataInput?: boolean;
  showCustomCompetitor?: boolean;
}

export type ConversationFlow = 'greeting' | 'bank_name' | 'data_input' | 'competitor_selection' | 'competitor_done' | 'analytics_actions';

interface ChatInterfaceProps {
  onBankDataChange: (data: BankData) => void;
  onCompetitorsChange: (competitors: Competitor[]) => void;
  onAnalysisDataChange: (data: AnalysisData) => void;
}

// UAE Banks data
const uaeBanks = [
  { id: 'adcb', name: 'ADCB', url: 'https://offers.adcb.com/offer/websites/personal/offer-categories', suggested: true, relevance: 95 },
  { id: 'fab', name: 'FAB', url: 'https://www.bankfab.com/en-ae/personal/credit-cards/offers', suggested: true, relevance: 92 },
  { id: 'dib', name: 'DIB', url: 'https://www.dib.ae/offers/card-offers', suggested: true, relevance: 90 },
  { id: 'enbd', name: 'ENBD', url: 'https://www.emiratesnbd.com/en/promotions', suggested: true, relevance: 88 },
];

export function ChatInterface({ 
  onBankDataChange,
  onCompetitorsChange,
  onAnalysisDataChange
}: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationFlow, setConversationFlow] = useState<ConversationFlow>('greeting');
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [bankName, setBankName] = useState('');
  const [bankUrl, setBankUrl] = useState('');
  const [customBankName, setCustomBankName] = useState('');
  const [customBankUrl, setCustomBankUrl] = useState('');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with greeting message
  useEffect(() => {
    if (messages.length === 0) {
      const greetingMessage: ChatMessage = {
        id: '1',
        type: 'assistant',
        content: "👋 Hello! Welcome to the Offer Benchmarking Agent. How can I assist you today?\n\nDo you need any help or would you like to begin benchmarking your bank's offers against competitors?",
        timestamp: new Date(),
        quickReplies: ['Start Benchmarking'],
        actionType: 'greeting'
      };
      setMessages([greetingMessage]);
    }
  }, []);

  const handleQuickReply = (reply: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: reply,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    handleAIResponse(reply);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    handleAIResponse(inputValue);
  };

  const handleBankNameSubmit = () => {
    if (!bankName.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: `Bank Name: ${bankName}`,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    const response: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: `Great! I've noted your bank: ${bankName}\n\nNow please provide your bank's offer data. You can either enter a URL to your offers page or upload a CSV file.`,
      timestamp: new Date(),
      actionType: 'data_input',
      showDataInput: true
    };
    setMessages(prev => [...prev, response]);
    setConversationFlow('data_input');
  };

  const handleDataSubmit = () => {
    if (!bankUrl.trim()) return;

    const bankData: BankData = {
      name: bankName,
      dataSource: 'url',
      url: bankUrl
    };
    onBankDataChange(bankData);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: `URL: ${bankUrl}`,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    const response: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: `Perfect! I've received your bank data:\n• **Bank**: ${bankName}\n• **URL**: ${bankUrl}\n\nNow let's select competitors for comparison. Here are some top UAE banks I've identified:`,
      timestamp: new Date(),
      actionType: 'competitor_selection',
      showCompetitors: true
    };
    setMessages(prev => [...prev, response]);
    setConversationFlow('competitor_selection');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const bankData: BankData = {
        name: bankName,
        dataSource: 'csv',
        csvData: []
      };
      onBankDataChange(bankData);

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: `Uploaded file: ${file.name}`,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);

      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Excellent! I've received your file: ${file.name}\n\nNow let's select competitors for comparison. Here are some top UAE banks I've identified:`,
        timestamp: new Date(),
        actionType: 'competitor_selection',
        showCompetitors: true
      };
      setMessages(prev => [...prev, response]);
      setConversationFlow('competitor_selection');
    }
  };

  const handleCompetitorSelect = (competitorId: string) => {
    const competitor = uaeBanks.find((c: any) => c.id === competitorId);
    if (!competitor) return;

    const updatedCompetitors = competitors.some((c: Competitor) => c.id === competitorId)
      ? competitors.filter((c: Competitor) => c.id !== competitorId)
      : [...competitors, { ...competitor, selected: true }];

    setCompetitors(updatedCompetitors);
  };

  const handleCustomCompetitorAdd = () => {
    if (!customBankName.trim() || !customBankUrl.trim()) return;

    const customCompetitor: Competitor = {
      id: `custom-${Date.now()}`,
      name: customBankName,
      url: customBankUrl,
      selected: true,
      suggested: false
    };

    const updatedCompetitors = [...competitors, customCompetitor];
    setCompetitors(updatedCompetitors);
    setCustomBankName('');
    setCustomBankUrl('');
    setShowCustomForm(false);

    const response: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: `Added custom competitor: ${customBankName}\n\nYou can add more competitors or click DONE when you're ready to proceed.`,
      timestamp: new Date(),
      actionType: 'competitor_selection',
      showCompetitors: true
    };
    setMessages(prev => [...prev, response]);
  };

  const handleCompetitorsDone = () => {
    onCompetitorsChange(competitors);

    const response: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: `Perfect! You've selected ${competitors.length} competitors:\n\n${competitors.map(c => `• ${c.name}`).join('\n')}\n\nNow you can ask me to perform various analyses:`,
      timestamp: new Date(),
      quickReplies: ['List active offers per category', 'List newly added merchants', 'Provide a comparative scorecard'],
      actionType: 'analytics_actions'
    };
    setMessages(prev => [...prev, response]);
    setConversationFlow('analytics_actions');
  };

  const handleAnalysisRequest = (analysisType: string) => {
    let analysisData: AnalysisData;
    let response: ChatMessage;

    switch (analysisType) {
      case 'offers':
        analysisData = {
          type: 'offers',
          title: 'Offer Portfolio Analysis',
          data: {},
          viewType: 'table'
        };
        response = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: "Here's a summary of active offers, categorized and previewed for your bank and selected competitors. Click a category to view associated merchants.\n\nI've displayed the analysis in the right panel. You can switch between table and chart views using the buttons above the results.",
          timestamp: new Date(),
          quickReplies: ['Show Merchant Tracker', 'Show Scorecard'],
          actionType: 'analytics_action'
        };
        break;

      case 'merchants':
        analysisData = {
          type: 'merchants',
          title: 'New Merchant Tracker',
          data: {},
          viewType: 'table'
        };
        response = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: "Here's a comparison of newly onboarded merchants against the previous month, for each bank.\n\nI've displayed the merchant tracker in the right panel showing recent additions across all banks.",
          timestamp: new Date(),
          quickReplies: ['Show Offer Analysis', 'Show Scorecard'],
          actionType: 'analytics_action'
        };
        break;

      case 'scorecard':
        analysisData = {
          type: 'scorecard',
          title: 'Comparative Scorecard',
          data: {},
          viewType: 'table'
        };
        response = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: "Here's a visual scorecard comparing your bank and selected competitors on:\n\n• Merchant portfolio depth\n• Offer validity\n• Merchant addition rate\n\nI've displayed the scorecard in the right panel. You can switch between table and chart views to see the data in different formats.",
          timestamp: new Date(),
          quickReplies: ['Show Offer Analysis', 'Show Merchant Tracker'],
          actionType: 'analytics_action'
        };
        break;

      default:
        analysisData = {
          type: 'custom',
          title: 'Custom Analysis',
          data: { query: analysisType },
          viewType: 'table'
        };
        response = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: `I'm analyzing your query: "${analysisType}"\n\nBased on the data, here are the insights I've found. I've displayed the analysis results in the right panel.`,
          timestamp: new Date(),
          quickReplies: ['Show Offer Analysis', 'Show Scorecard'],
          actionType: 'custom_query'
        };
    }

    onAnalysisDataChange(analysisData);
    setMessages(prev => [...prev, response]);
  };

  const handleAIResponse = async (userInput: string) => {
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      let response: ChatMessage;
      
      const input = userInput.toLowerCase();

      if (conversationFlow === 'greeting' || input.includes('start') || input.includes('benchmarking')) {
        response = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: "Great! Let's start benchmarking your bank's offers. First, please tell me your bank's name.",
          timestamp: new Date(),
          actionType: 'bank_name',
          showBankNameInput: true
        };
        setConversationFlow('bank_name');
      } else if (conversationFlow === 'analytics_actions' || conversationFlow === 'competitor_done') {
        if (input.includes('offers') || input.includes('category')) {
          handleAnalysisRequest('offers');
          setIsTyping(false);
          return;
        } else if (input.includes('merchants') || input.includes('merchant')) {
          handleAnalysisRequest('merchants');
          setIsTyping(false);
          return;
        } else if (input.includes('scorecard') || input.includes('score')) {
          handleAnalysisRequest('scorecard');
          setIsTyping(false);
          return;
        } else {
          handleAnalysisRequest(userInput);
          setIsTyping(false);
          return;
        }
      } else {
        response = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: "I'm here to help! Please let me know what you'd like to explore or if you need assistance with anything specific.",
          timestamp: new Date(),
          quickReplies: ['Start Benchmarking', 'Ask Question'],
          actionType: 'greeting'
        };
      }

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            <div
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[80%] flex items-start space-x-2
                  ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}
                `}
              >
                <div
                  className={`
                    p-2 rounded-full flex-shrink-0
                    ${message.type === 'user' 
                      ? 'bg-[#0366D6] text-white' 
                      : 'bg-[#F7F8FA] text-[#0366D6]'
                    }
                  `}
                >
                  {message.type === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                
                <div
                  className={`
                    p-3 rounded-lg shadow-sm
                    ${message.type === 'user'
                      ? 'bg-[#0366D6] text-white rounded-br-sm'
                      : 'bg-[#F7F8FA] text-[#24292F] rounded-bl-sm'
                    }
                  `}
                >
                  <p className="text-base whitespace-pre-wrap">{message.content}</p>
                  <p
                    className={`
                      text-sm mt-1 opacity-70
                      ${message.type === 'user' ? 'text-blue-100' : 'text-[#454C56]'}
                    `}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>

            {/* Bank Name Input */}
            {message.showBankNameInput && (
              <div className="ml-12 mt-2">
                <div className="bg-white border border-[#E1E4E8] rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="Enter your bank's name..."
                      className="flex-1 px-3 py-2 border border-[#E1E4E8] rounded-lg focus:ring-2 focus:ring-[#0366D6] focus:border-[#0366D6]"
                      onKeyPress={(e) => e.key === 'Enter' && handleBankNameSubmit()}
                    />
                    <button
                      onClick={handleBankNameSubmit}
                      disabled={!bankName.trim()}
                      className="px-4 py-2 bg-[#0366D6] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Data Input */}
            {message.showDataInput && (
              <div className="ml-12 mt-2 space-y-3">
                <div className="bg-white border border-[#E1E4E8] rounded-lg p-4">
                  <h4 className="font-medium text-[#24292F] mb-3 text-base">Enter URL</h4>
                  <div className="flex items-center space-x-2">
                    <input
                      type="url"
                      value={bankUrl}
                      onChange={(e) => setBankUrl(e.target.value)}
                      placeholder="https://yourbank.com/offers"
                      className="flex-1 px-3 py-2 border border-[#E1E4E8] rounded-lg focus:ring-2 focus:ring-[#0366D6] focus:border-[#0366D6]"
                    />
                    <button
                      onClick={handleDataSubmit}
                      disabled={!bankUrl.trim()}
                      className="px-4 py-2 bg-[#0366D6] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-[#E1E4E8] rounded-lg p-4">
                  <h4 className="font-medium text-[#24292F] mb-3 text-base">Or Upload File</h4>
                  <div className="border-2 border-dashed border-[#E1E4E8] rounded-lg p-4 hover:border-[#0366D6] transition-colors">
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-[#454C56] mb-2" />
                      <p className="text-base text-[#454C56] mb-2">Upload CSV/XLSX file</p>
                      <input
                        type="file"
                        accept=".csv,.xlsx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="px-4 py-2 bg-[#0366D6] text-white rounded-lg text-base font-medium cursor-pointer hover:bg-blue-700 transition-colors"
                      >
                        Choose File
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Competitor Selection Cards */}
            {message.showCompetitors && (
              <div className="ml-12 mt-2 space-y-3">
                <div className="space-y-2">
                  {uaeBanks.map((bank) => (
                    <div
                      key={bank.id}
                      className="flex items-center justify-between p-3 bg-white border border-[#E1E4E8] rounded-lg hover:border-[#0366D6] transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-[#F7F8FA] rounded-lg">
                          <Building2 className="h-4 w-4 text-[#0366D6]" />
                        </div>
                        <div>
                          <div className="font-medium text-[#24292F] text-base">{bank.name}</div>
                          <div className="text-sm text-[#454C56]">Relevance: {bank.relevance}%</div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCompetitorSelect(bank.id)}
                        className={`px-3 py-1 rounded-lg text-base font-medium transition-colors ${
                          competitors.some((c: Competitor) => c.id === bank.id)
                            ? 'bg-[#218838] text-white'
                            : 'bg-[#F7F8FA] text-[#454C56] hover:bg-[#E1E4E8]'
                        }`}
                      >
                        {competitors.some((c: Competitor) => c.id === bank.id) ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Custom Competitor Form */}
                {!showCustomForm ? (
                  <button
                    onClick={() => setShowCustomForm(true)}
                    className="flex items-center space-x-2 text-[#0366D6] hover:text-blue-700 transition-colors p-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Custom Competitor</span>
                  </button>
                ) : (
                  <div className="bg-white border border-[#E1E4E8] rounded-lg p-4 space-y-3">
                    <h4 className="font-medium text-[#24292F] text-base">Add Custom Competitor</h4>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={customBankName}
                        onChange={(e) => setCustomBankName(e.target.value)}
                        placeholder="Bank name..."
                        className="w-full px-3 py-2 border border-[#E1E4E8] rounded-lg focus:ring-2 focus:ring-[#0366D6] focus:border-[#0366D6]"
                      />
                      <input
                        type="url"
                        value={customBankUrl}
                        onChange={(e) => setCustomBankUrl(e.target.value)}
                        placeholder="Bank URL..."
                        className="w-full px-3 py-2 border border-[#E1E4E8] rounded-lg focus:ring-2 focus:ring-[#0366D6] focus:border-[#0366D6]"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleCustomCompetitorAdd}
                        disabled={!customBankName.trim() || !customBankUrl.trim()}
                        className="px-4 py-2 bg-[#0366D6] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setShowCustomForm(false)}
                        className="px-4 py-2 bg-[#F7F8FA] text-[#454C56] rounded-lg hover:bg-[#E1E4E8] transition-colors text-base"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Done Button */}
                {competitors.length > 0 && (
                  <div className="flex justify-center pt-2">
                    <button
                      onClick={handleCompetitorsDone}
                      className="px-6 py-2 bg-[#218838] text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Check className="h-4 w-4" />
                      <span>DONE</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Quick Replies */}
            {message.quickReplies && message.quickReplies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 ml-12">
                {message.quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1 bg-[#F7F8FA] text-[#0366D6] rounded-full text-sm font-medium hover:bg-[#E1E4E8] transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="p-2 rounded-full bg-[#F7F8FA] text-[#0366D6]">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-[#F7F8FA] text-[#24292F] p-3 rounded-lg rounded-bl-sm shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#454C56] rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-[#454C56] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-[#454C56] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-[#E1E4E8] p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything or start benchmarking..."
            className="flex-1 px-4 py-2 border border-[#E1E4E8] rounded-lg focus:ring-2 focus:ring-[#0366D6] focus:border-[#0366D6] text-[#24292F] text-base"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="px-4 py-2 bg-[#0366D6] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}