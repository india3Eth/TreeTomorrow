import { createContext, useState, useContext } from 'react';
import React from 'react';

interface Metadata {
    plantName: string;
    description: string;
    fileCid: string;
}

// Create the context
const MetadataContext = createContext<{ metadata: Metadata | null; setMetadata: React.Dispatch<React.SetStateAction<Metadata | null>> } | null>(null);

// Create a provider component
export const MetadataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [metadata, setMetadata] = useState<Metadata | null>(null);
    return (
        <MetadataContext.Provider value={{ metadata, setMetadata }}>
            {children}
        </MetadataContext.Provider>
    );
};

// Create a custom hook for easy access to the context
export const useMetadata = () => {
    const context = useContext(MetadataContext);
    if (!context) {
        throw new Error('useMetadata must be used within a MetadataProvider');
    }
    return context;
};

export default MetadataContext;