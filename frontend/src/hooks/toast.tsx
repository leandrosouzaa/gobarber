import React, { createContext, useCallback, useContext } from 'react';

import { ToastContainer } from '../components';

interface ToastContextData {
   addToast(): void;
   removeToast(): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
   const addToast = useCallback(() => {
      console.log('addtoast');
   }, []);

   const removeToast = useCallback(() => {
      console.log('removetoast');
   }, []);

   return (
      <ToastContext.Provider value={{ addToast, removeToast }}>
         {children}
         <ToastContainer />
      </ToastContext.Provider>
   );
};

function useToast(): ToastContextData {
   const context = useContext(ToastContext);

   if (!context) {
      throw new Error('useToast must be used within a ToastProvider');
   }

   return context;
}

export { ToastProvider, useToast };
