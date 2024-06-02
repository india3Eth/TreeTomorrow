import { createContext, useContext, useState, useEffect } from 'react';
import { create , Client} from '@web3-storage/w3up-client';

const ClientContext = createContext<{ client: Client | null; initialized: boolean } | null>(null); 

interface ClientProviderProps {
  children: React.ReactNode; // Define children prop type
}
export const ClientProvider = ({ children }: ClientProviderProps) => {
  const [client, setClient] = useState<Client | null>(null);;
  const [initialized, setInitialized] = useState(false);
  const email = 'rutvijpatel121@gmail.com'; // Your email

  useEffect(() => {
    const initClient = async () => {
      const client = await create();
      setClient(client);
      await client.login(email);
      const spaces = client.spaces();
      if (spaces.length > 0) {
          const space = spaces.find(space => space.name === 'Rutvij');
          if (space){
            console.log('space:', space);
            await client.setCurrentSpace(space.did());
          }
      }
      setInitialized(true);
    };

    initClient();
  }, []);

  return (
    <ClientContext.Provider value={{ client, initialized }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  return useContext(ClientContext);
};
