import React, { useEffect } from 'react';

export default function Notification({ notification, onClose }) {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  if (!notification) return null;

  const getColors = () => {
    switch (notification.type) {
      case 'success':
        return 'border-primary bg-primary/10 text-primary';
      case 'error':
        return 'border-secondary bg-secondary/10 text-secondary';
      case 'info':
        return 'border-tertiary bg-tertiary/10 text-tertiary';
      default:
        return 'border-primary bg-primary/10 text-primary';
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'info':
        return 'info';
      default:
        return 'notifications';
    }
  };

  return (
    <div className={`fixed top-6 right-6 z-[9999] border ${getColors()} p-4 rounded-sm flex items-center gap-3 gap-4 max-w-sm backdrop-blur-sm shadow-lg animate-in fade-in slide-in-from-right-4 duration-300`}>
      <span className="material-symbols-outlined text-lg">{getIcon()}</span>
      <div className="flex flex-col gap-1">
        <div className="font-headline text-xs uppercase tracking-widest">{notification.title}</div>
        <div className="text-xs font-mono">{notification.message}</div>
      </div>
      <button 
        onClick={onClose}
        className="ml-2 opacity-60 hover:opacity-100 transition-opacity"
      >
        <span className="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
  );
}
