import { useEffect, useRef, useState, createContext, useContext, useCallback } from 'react';
import './Toast.css';

/* ─── Context ─────────────────────────────────────────────────── */
const ToastContext = createContext(null);

let _addToast = null;

/**
 * Programmatic API – usable outside React trees.
 * toast.success('msg')  toast.error('msg')  toast.info('msg')  toast.warning('msg')
 */
export const toast = {
  success: (msg, opts) => _addToast?.({ msg, type: 'success', ...opts }),
  error:   (msg, opts) => _addToast?.({ msg, type: 'error',   ...opts }),
  info:    (msg, opts) => _addToast?.({ msg, type: 'info',    ...opts }),
  warning: (msg, opts) => _addToast?.({ msg, type: 'warning', ...opts }),
};

/* ─── Hook ────────────────────────────────────────────────────── */
export function useToast() {
  return useContext(ToastContext);
}

/* ─── Single Toast item ───────────────────────────────────────── */
function ToastItem({ id, msg, type = 'info', duration = 4000, onDismiss }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    startRef.current = Date.now();

    function tick() {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(pct);
      if (pct > 0) rafRef.current = requestAnimationFrame(tick);
      else dismiss();
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function dismiss() {
    setVisible(false);
    setTimeout(() => onDismiss(id), 350);
  }

  const icons = {
    success: (
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 10.5l2.5 2.5 5.5-5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    error: (
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    warning: (
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M10 3L18 17H2L10 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 9v4M10 14.5v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    info: (
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 9v5M10 6.5v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  };

  return (
    <div className={`toast-item toast-${type} ${visible ? 'toast-in' : 'toast-out'}`} role="alert">
      <div className="toast-icon">{icons[type]}</div>
      <p className="toast-msg">{msg}</p>
      <button className="toast-close" onClick={dismiss} aria-label="Dismiss">
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </button>
      <div className="toast-progress-bar">
        <div className={`toast-progress-fill toast-progress-${type}`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

/* ─── Provider ────────────────────────────────────────────────── */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ msg, type = 'info', duration = 4000 }) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev.slice(-4), { id, msg, type, duration }]);
  }, []);

  const removeToast = useCallback(id => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Expose programmatic API
  useEffect(() => { _addToast = addToast; return () => { _addToast = null; }; }, [addToast]);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="toast-portal" aria-live="polite">
        {toasts.map(t => (
          <ToastItem key={t.id} {...t} onDismiss={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
