import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Menu, MessageSquare, Clock, Star, Settings, 
  PanelRightClose, PanelRightOpen, Paperclip, ArrowUp, Sparkles, X,
  FileText, Image as ImageIcon, Trash2
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('chat');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isArtifactsOpen, setIsArtifactsOpen] = useState(true);
  
  // Database States
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [historyList, setHistoryList] = useState<any[]>([]);

  // Chat State
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [useWebSearch, setUseWebSearch] = useState(true);
  const [forceLocal, setForceLocal] = useState(false);
  
  const [messages, setMessages] = useState<{id: string | number, role: string, content: string, file?: string}[]>([
    { id: 1, role: 'ai', content: 'Halo! Saya Veltrix. Ada yang bisa saya bantu hari ini?' }
  ]);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Settings State 
  const [sysPrompt, setSysPrompt] = useState('Standard Veltrix Prompt');
  const [temperature, setTemperature] = useState(0.7);

  // Auto-scroll to bottom of chat, optimized for very long markdown texts
  useEffect(() => {
    const timer = setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  // Fetch History List when opening Recents tab
  useEffect(() => {
    if (activeTab === 'recents') {
      fetch('http://localhost:3005/api/conversations')
        .then(res => res.json())
        .then(data => setHistoryList(data))
        .catch(console.error);
    }
  }, [activeTab]);

  const handleNewChat = () => {
    setActiveConversationId(null);
    setMessages([{ id: Date.now(), role: 'ai', content: 'Halo! Saya Veltrix. Ada yang bisa saya bantu hari ini?' }]);
    setActiveTab('chat');
  };

  const loadConversation = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3005/api/conversations/${id}`);
      const data = await res.json();
      setActiveConversationId(data.id);
      
      const loadedMessages = data.messages.map((m: any) => ({
        id: m.id || Date.now(),
        role: m.role === 'assistant' ? 'ai' : 'user',
        content: m.content
      }));
      setMessages(loadedMessages);
      setActiveTab('chat');
    } catch (e) {
      console.error(e);
    }
  };

  const deleteConversation = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await fetch(`http://localhost:3005/api/conversations/${id}`, { method: 'DELETE' });
      setHistoryList(prev => prev.filter(c => c.id !== id));
      if (activeConversationId === id) handleNewChat();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() && !selectedFile) return;

    const userText = inputText.trim();
    const fileName = selectedFile ? selectedFile.name : undefined;
    
    // Add user message to UI
    const newMessages = [...messages, { 
      id: Date.now(), 
      role: 'user', 
      content: userText,
      file: fileName
    }];
    
    setMessages(newMessages);
    setInputText('');
    const fileToRead = selectedFile;
    setSelectedFile(null);
    setIsLoading(true);

    try {
      let fileContentText = "";
      if (fileToRead) {
        if (fileToRead.type === 'application/pdf') {
          const arrayBuffer = await fileToRead.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
          
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            fileContentText += textContent.items.map((item: any) => item.str).join(" ") + "\\n";
          }
        } else {
          fileContentText = await fileToRead.text();
        }
      }

      // Format messages for the Express backend
      const apiMessages = newMessages.map(m => {
        let textContent = m.content;
        if (m.id === newMessages[newMessages.length - 1].id && fileContentText) {
           textContent = `[Attached File Content for ${m.file}]:\\n\\n${fileContentText}\\n\\n[User Message]:\\n${m.content}`;
        } else if (m.file && !fileContentText) {
           textContent = `[Attached File: ${m.file}] ${m.content}`;
        }
        return {
          role: m.role === 'ai' ? 'assistant' : 'user',
          content: textContent
        };
      });

      const response = await fetch('http://localhost:3005/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: apiMessages,
          conversationId: activeConversationId,
          useWebSearch,
          forceLocal
        })
      });

      const data = await response.json();

      if (response.ok && data.choices && data.choices.length > 0) {
        if (data.conversationId) setActiveConversationId(data.conversationId);
        setMessages(prev => [...prev, {
          id: Date.now(),
          role: 'ai',
          content: data.choices[0].message.content
        }]);
      } else {
        setMessages(prev => [...prev, { 
          id: Date.now(), 
          role: 'ai', 
          content: `Error: ${data.error || 'Server gagal memproses permintaan'}` 
        }]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        role: 'ai', 
        content: "Maaf, tidak dapat terhubung ke server backend (http://localhost:3005). Pastikan server menyala!" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const navItems = [
    { id: 'chat', icon: MessageSquare, label: 'New Chat', action: handleNewChat },
    { id: 'recents', icon: Clock, label: 'Recents', action: () => setActiveTab('recents') },
    { id: 'starred', icon: Star, label: 'Starred', action: () => setActiveTab('starred') },
  ];

  const renderChat = () => (
    <div className="flex-1 overflow-hidden flex flex-col relative w-full items-center">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto w-full flex justify-center">
        <div className="w-full max-w-3xl px-4 md:px-6 flex flex-col gap-6 pt-6 pb-48 transition-all">
          
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              {msg.role === 'user' ? (
                // User Message Style (soft gray rounded box)
                <div className="max-w-[80%] bg-[#EFECE6] px-5 py-3.5 rounded-2xl rounded-br-sm text-[15px] shadow-sm flex flex-col gap-2">
                  {msg.file && (
                    <div className="flex items-center gap-2 bg-white/50 px-3 py-2 rounded-lg text-sm text-[#6B6A68]">
                      <FileText className="w-4 h-4" />
                      <span className="truncate">{msg.file}</span>
                    </div>
                  )}
                  {msg.content}
                </div>
              ) : (
                // AI Message Style (plain text, generous line-height)
                <div className="w-full flex gap-4">
                  <div className="w-7 h-7 shrink-0 mt-0.5 flex items-center justify-center rounded-lg bg-[#EFECE6]">
                    <Sparkles className="w-4 h-4 text-[#D97757]" />
                  </div>
                  <div className="flex-1 text-[15.5px] leading-[1.65] text-[#222222] min-w-0 prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-[#F2EFEA] prose-pre:text-[#222222] prose-table:border prose-table:border-[#EAE9E5] prose-th:bg-[#EFECE6] prose-th:p-2 prose-th:border-b prose-th:border-[#EAE9E5] prose-td:p-2 prose-td:border-b prose-td:border-[#EAE9E5]">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex w-full justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
               <div className="w-full flex gap-4">
                  <div className="w-7 h-7 shrink-0 mt-0.5 flex items-center justify-center rounded-lg bg-[#EFECE6]">
                    <Sparkles className="w-4 h-4 text-[#D97757] animate-pulse" />
                  </div>
                  <div className="flex-1 text-[15.5px] leading-[1.65] text-[#858482] min-w-0 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#858482] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                    <span className="w-1.5 h-1.5 bg-[#858482] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                    <span className="w-1.5 h-1.5 bg-[#858482] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                  </div>
               </div>
            </div>
          )}

          <div ref={chatEndRef} className="h-36 md:h-48 shrink-0" />
        </div>
      </div>

      {/* Input Area (Centered, Floating) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#F9F8F6] via-[#F9F8F6] to-transparent pointer-events-none flex justify-center">
        <div className="w-full max-w-3xl pointer-events-auto">
          
          <form 
            onSubmit={handleSendMessage}
            className="relative flex flex-col w-full bg-white border border-[#E5E3DB] shadow-sm rounded-[24px] px-2 py-2 overflow-hidden focus-within:ring-2 focus-within:ring-[#E5E3DB] focus-within:border-transparent transition-shadow"
          >
            {/* File Preview Area */}
            {selectedFile && (
              <div className="px-3 pt-3 pb-1 flex flex-wrap gap-2">
                <div className="flex items-center gap-2 bg-[#F2EFEA] border border-[#EAE9E5] pl-3 pr-2 py-1.5 rounded-lg text-sm text-[#444444] animate-in fade-in zoom-in-95 duration-200">
                  {selectedFile.type.startsWith('image/') ? <ImageIcon className="w-4 h-4 text-[#858482]" /> : <FileText className="w-4 h-4 text-[#858482]" />}
                  <span className="max-w-[200px] truncate">{selectedFile.name}</span>
                  <button 
                    type="button" 
                    onClick={() => setSelectedFile(null)}
                    className="ml-1 p-1 hover:bg-[#EAE9E5] rounded-full transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-end w-full">
              {/* Left Utilities */}
              <div className="flex items-center shrink-0 mb-1 ml-1">
                <input 
                  type="file" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleFileSelect} 
                />
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-[#858482] hover:bg-[#F2EFEA] hover:text-[#444444] rounded-full transition-colors active:scale-95"
                  title="Attach File"
                >
                  <Paperclip className="w-[18px] h-[18px]" strokeWidth={2.5} />
                </button>

                {/* Web Search Toggle */}
                <button 
                  type="button" 
                  onClick={() => setUseWebSearch(!useWebSearch)}
                  className={`p-2 rounded-full transition-all active:scale-95 ${useWebSearch ? 'text-[#D97757] bg-[#F9F8F6]' : 'text-[#858482] hover:bg-[#F2EFEA]'}`}
                  title={useWebSearch ? "Web Search Active" : "Web Search Disabled"}
                >
                  <Sparkles className="w-[18px] h-[18px]" strokeWidth={2.5} />
                </button>

                {/* Local LLM Toggle */}
                <button 
                  type="button" 
                  onClick={() => setForceLocal(!forceLocal)}
                  className={`p-2 rounded-full transition-all active:scale-95 ${forceLocal ? 'text-[#8C62A1] bg-[#F9F8F6]' : 'text-[#858482] hover:bg-[#F2EFEA]'}`}
                  title={forceLocal ? "Forcing Local LLM" : "Auto (Groq/Local)"}
                >
                  <Settings className="w-[18px] h-[18px]" strokeWidth={2.5} />
                </button>
              </div>
              
              {/* Textarea */}
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
                placeholder="Message Veltrix..."
                className="flex-1 max-h-32 min-h-[44px] bg-transparent border-none outline-none resize-none py-3 px-3 text-[15px] placeholder-[#858482] align-middle disabled:opacity-50"
                rows={1}
              />
              
              {/* Send Button */}
              <div className="shrink-0 mb-1 mr-1">
                <button 
                  type="submit"
                  disabled={isLoading || (!inputText.trim() && !selectedFile)}
                  className={`p-2.5 rounded-full transition-all duration-200 active:scale-95 flex items-center justify-center
                    ${(inputText.trim() || selectedFile) && !isLoading
                      ? 'bg-[#D97757] text-white shadow-md' 
                      : 'bg-[#F2EFEA] text-[#C2C0BA] cursor-not-allowed'
                    }`}
                >
                  <ArrowUp className="w-[18px] h-[18px]" strokeWidth={3} />
                </button>
              </div>
            </div>
          </form>
          
          <div className="text-center mt-3 text-[11px] text-[#A09E9B]">
            Veltrix can make mistakes. Please verify important information.
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecents = () => (
    <div className="flex-1 overflow-y-auto w-full p-8 flex justify-center">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-[#222222] mb-6">Recent Conversations</h2>
        {historyList.length === 0 ? (
          <div className="text-center py-10 text-[#858482]">Belum ada riwayat obrolan.</div>
        ) : (
          <div className="flex flex-col gap-2">
            {historyList.map((history) => (
              <div 
                key={history.id} 
                onClick={() => loadConversation(history.id)}
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#EAE9E5] hover:border-[#D8D6D1] hover:shadow-sm cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-[#F9F8F6] rounded-lg">
                    <MessageSquare className="w-5 h-5 text-[#858482]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#444444] group-hover:text-[#D97757] transition-colors">{history.title}</h3>
                    <p className="text-xs text-[#858482] mt-0.5">Berakhir pada: {new Date(history.updated_at).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[#A09E9B]">
                    {activeConversationId === history.id && '• Aktif'}
                  </span>
                  <button 
                    onClick={(e) => deleteConversation(history.id, e)}
                    className="p-1.5 text-[#C2C0BA] hover:text-[#EF4444] opacity-0 group-hover:opacity-100 transition-all rounded hover:bg-red-50"
                    title="Hapus riwayat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="flex-1 overflow-y-auto w-full p-8 flex justify-center">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-[#222222] mb-6">Settings</h2>
        
        <div className="bg-white border border-[#EAE9E5] rounded-2xl overflow-hidden shadow-sm">
          {/* Setting Group 1 */}
          <div className="p-6 border-b border-[#EAE9E5]">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#858482] mb-4">Model Configuration</h3>
            
            <div className="space-y-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#444444]">System Prompt</label>
                <textarea 
                  value={sysPrompt}
                  onChange={(e) => setSysPrompt(e.target.value)}
                  className="w-full border border-[#EAE9E5] bg-[#F9F8F6] px-3 py-2.5 rounded-xl text-sm outline-none focus:border-[#D97757] focus:ring-1 focus:ring-[#D97757] transition-all resize-none h-24"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-[#444444]">Temperature</label>
                  <span className="text-sm text-[#858482]">{temperature}</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="1" step="0.1" 
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-[#D97757] h-1.5 bg-[#EAE9E5] rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Setting Group 2 */}
          <div className="p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#858482] mb-4">Account Features</h3>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex flex-col">
                <span className="font-medium text-[#444444]">Artifacts</span>
                <span className="text-sm text-[#858482]">Open generated code & documents in a dedicated panel</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked readOnly />
                <div className="w-11 h-6 bg-[#EAE9E5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D97757]"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-[#F9F8F6] text-[#333333] font-sans antialiased overflow-hidden">
      
      {/* SIDEBAR PANEL */}
      <aside 
        className={`${isSidebarOpen ? 'w-[260px] translate-x-0' : 'w-[0px] -translate-x-full'} 
        flex flex-col bg-[#F9F8F6] border-r border-[#EAE9E5] transition-all duration-300 ease-in-out shrink-0 overflow-hidden`}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 px-2 cursor-pointer" onClick={() => setActiveTab('chat')}>
            <Sparkles className="w-5 h-5 text-[#D97757]" />
            <span className="font-medium text-[15px]">Veltrix</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-1.5 rounded-lg text-[#858482] hover:bg-[#EDECE9] transition-colors md:hidden"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto hover:scrollbar-thin scrollbar-thumb-[#D8D6D1] scrollbar-track-transparent">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 active:scale-[0.98]
                  ${isActive 
                    ? 'bg-[#EFECE6] font-medium text-[#222222]' 
                    : 'text-[#6B6A68] hover:bg-[#F2EFEA] hover:text-[#444444]'
                }`}
              >
                <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-[#444444]' : 'text-[#858482]'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#EAE9E5]">
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 active:scale-[0.98]
               ${activeTab === 'settings' 
                 ? 'bg-[#EFECE6] font-medium text-[#222222]' 
                 : 'text-[#6B6A68] hover:bg-[#F2EFEA] hover:text-[#444444]'
            }`}
          >
            <Settings className="w-[18px] h-[18px]" />
            Settings
          </button>
          <div className="mt-2 px-3 py-2 flex items-center gap-3 rounded-xl hover:bg-[#F2EFEA] cursor-pointer transition-colors">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#D97757] to-[#8C62A1] flex items-center justify-center text-[10px] text-white font-bold">
              U
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium leading-none">User Account</span>
              <span className="text-[11px] text-[#858482] mt-1">Pro Plan</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F9F8F6] relative">
        
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 h-14 shrink-0 bg-transparent z-10 w-full">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-1.5 rounded-lg text-[#858482] hover:bg-[#EDECE9] transition-colors"
                title="Open Sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-sm font-medium text-[#444444] capitalize">
              {activeTab === 'chat' ? 'Veltrix Session' : activeTab}
            </h1>
          </div>
          
          {activeTab === 'chat' && (
            <button
              onClick={() => setIsArtifactsOpen(!isArtifactsOpen)}
              className="p-1.5 rounded-lg text-[#858482] hover:bg-[#EDECE9] transition-colors active:scale-95"
              title="Toggle Artifacts/Preview Panel"
            >
              {isArtifactsOpen ? <PanelRightClose className="w-5 h-5" /> : <PanelRightOpen className="w-5 h-5" />}
            </button>
          )}
        </header>

        {/* Dynamic Route Switching */}
        {activeTab === 'chat' && renderChat()}
        {activeTab === 'recents' && renderRecents()}
        {activeTab === 'settings' && renderSettings()}
        {activeTab === 'starred' && (
          <div className="flex-1 flex items-center justify-center text-[#858482]">
            No starred conversations yet.
          </div>
        )}

      </main>

      {/* RIGHT ARTIFACT PREVIEW PANEL (Only visible in Chat mode) */}
      <aside 
        className={`${isArtifactsOpen && activeTab === 'chat' ? 'w-full md:w-[45%] translate-x-0 border-l border-[#EAE9E5]' : 'w-[0px] translate-x-full border-none hidden md:block'} 
        absolute md:relative right-0 h-full bg-white transition-all duration-300 ease-in-out shrink-0 overflow-hidden z-20 shadow-[-10px_0_20px_rgba(0,0,0,0.02)] md:shadow-none`}
      >
        <div className="h-full flex flex-col">
          {/* Artifact Header */}
          <div className="px-4 py-3 border-b border-[#EAE9E5] flex items-center justify-between shrink-0 h-14 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="px-2 py-1 bg-[#F2EFEA] text-[#6B6A68] rounded text-xs font-semibold uppercase tracking-wider">
                Artifact Viewer
              </div>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <button 
                onClick={() => setIsArtifactsOpen(false)}
                className="p-1.5 rounded-lg text-[#858482] hover:bg-[#F2EFEA] transition-colors md:hidden active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Artifact Body */}
          <div className="flex-1 overflow-y-auto bg-[#FAFAFA] text-[#858482] flex items-center justify-center p-6 text-center">
             <div className="max-w-sm space-y-4">
                <div className="w-12 h-12 bg-[#EFECE6] rounded-xl mx-auto flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#C2C0BA]" />
                </div>
                <h3 className="font-medium text-[#444444]">Veltrix Workspace</h3>
                <p className="text-sm">When Veltrix generates code or complex UI, it will appear in this dedicated window so you can interact with it.</p>
             </div>
          </div>
        </div>
      </aside>

    </div>
  );
}
