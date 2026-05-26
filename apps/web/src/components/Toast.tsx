'use client';

import { useEffect, useState, createContext, useContext, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return { showToast: (msg: string) => console.log(msg) };
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(type === 'error' ? [100, 50, 100] : [50]);
    }
  }, []);

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-24 left-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm sm:ml-auto">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={() => dismissToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const colors = {
    success: { bg: 'bg-emerald-500/95', icon: '✓' },
    error: { bg: 'bg-red-500/95', icon: '✕' },
    warning: { bg: 'bg-amber-500/95', icon: '!' },
    info: { bg: 'bg-[#0E3B36]/95 backdrop-blur-lg', icon: 'i' },
  };

  const config = colors[toast.type];

  return (
    <div
      className={`${config.bg} backdrop-blur-lg rounded-xl border border-[rgba(255,255,255,0.1)] p-4 flex items-center gap-3 shadow-2xl transform transition-all duration-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
    >
      <div className="text-white font-bold">{config.icon}</div>
      <p className="text-white text-sm font-medium flex-1">{toast.message}</p>
      <button onClick={onDismiss} className="text-white/70 hover:text-white">✕</button>
    </div>
  );
}
