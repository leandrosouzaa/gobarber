import React, { useEffect } from 'react';

import { FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';

import { useToast, ToastMessage } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
   message: ToastMessage;
}

const icons = {
   info: <FiInfo size={24} />,
   error: <FiXCircle size={24} />,
   success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message }) => {
   const { removeToast } = useToast();

   useEffect(() => {
      const timer = setTimeout(() => {
         removeToast(message.id);
      }, 3000);

      return () => {
         clearTimeout(timer);
      };
   }, [message.id, removeToast]);

   return (
      <Container type={message.type} hasDescription={!!message.description}>
         {icons[message.type || 'info']}

         <div>
            <strong>{message.title}</strong>
            {message.description && <p>{message.description}</p>}
         </div>
         <button type="button" onClick={() => removeToast(message.id)}>
            <FiXCircle size={18} />
         </button>
      </Container>
   );
};

export default Toast;
