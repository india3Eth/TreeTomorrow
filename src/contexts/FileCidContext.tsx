// File: FileCidContext.tsx

import { createContext, useState, useContext } from 'react';
import React from 'react';

// Create the context
const FileCidContext = createContext<string | null>(null);

// Create a provider component
export const FileCidProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [fileCid, setFileCid] = useState<string | null>(null);
    return (
        <FileCidContext.Provider value={fileCid}> 
            {children}
        </FileCidContext.Provider>
    );
};

// Create a custom hook for easy access to the context
export const useFileCid = () => {
    const context = useContext(FileCidContext);
    if (!context) {
        throw new Error('useFileCid must be used within a FileCidProvider');
    }
    return context;
};

export default FileCidContext;
