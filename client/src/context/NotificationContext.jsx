import React, { createContext } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const notify = {
        success: (message) => toast.success(message),
        error: (message) => toast.error(message),
        warning: (message) => toast(message, { icon: '⚠️' }),
        info: (message) => toast(message, { icon: 'ℹ️' }),
    };

    return (
        <NotificationContext.Provider value={notify}>
            {children}
            <Toaster position="top-right" />
        </NotificationContext.Provider>
    );
};
