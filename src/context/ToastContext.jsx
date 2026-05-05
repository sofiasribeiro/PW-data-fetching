import { createContext, useCallback, useReducer } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const ToastContext = createContext(null);

let nextId = 0;

function toastReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.toast];
    case 'REMOVE':
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}

export function ToastProvider({ children }) {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const addToast = useCallback((message, variant = 'add') => {
    const id = ++nextId;
    dispatch({ type: 'ADD', toast: { id, message, variant } });
    setTimeout(() => dispatch({ type: 'REMOVE', id }), 3000);
  }, []);

  const removeToast = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}
