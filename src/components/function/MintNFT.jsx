import { useState } from 'react';
import { ethers } from 'ethers';
import { http, createWalletClient, custom, createPublicClient } from 'viem';
import { sepolia } from 'viem/chains';
import { addEnsContracts } from '@ensdomains/ensjs';
import { createSubname, setTextRecord, transferName } from '@ensdomains/ensjs/wallet';
import { getName } from '@ensdomains/ensjs/public'
import { useMetadata } from "@/contexts/MetadataContext.tsx";


const MintNFT = ({ image, metadata:meta, plantName, serialNo }) => {
  const [status, setStatus] = useState('');
  const infuraProjectId = import.meta.env.VITE_INFURA_PROJECT_ID;
  if (!infuraProjectId) {
    throw new Error("Infura Project ID is missing in environment variables");
  }                                  
  
  const { metadata } = useMetadata();

  const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${infuraProjectId}`);
  console.log(provider);
  console.log(`https://sepolia.infura.io/v3/${infuraProjectId}`);
  
  const mintSubdomainNFT = async () => {
    const subdomain = `${metadata.plantName}${serialNo}`;
    console.log('subdomain', subdomain)
    setStatus('Minting...');

    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Get the signer address
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (!accounts.length) {
        throw new Error('No accounts found');
      }
      const signerAddress = accounts[0];
      console.log(signerAddress);

      // Validate the address format
      if (!ethers.isAddress(signerAddress)) {
        throw new Error('Invalid Ethereum address');
      }

      // Create the wallet client
      const wallet = createWalletClient({
        chain: addEnsContracts(sepolia),
        transport: custom(window.ethereum),
        account: signerAddress,
      });

      console.log("AddEnsContracts", addEnsContracts(sepolia));
      console.log("custom", custom(window.ethereum));
      console.log("ether", window.ethereum);
      console.log(wallet);
      const publicClient = createPublicClient({
        chain: addEnsContracts(sepolia),
        transport: http(),
      })
      const result = await getName(publicClient, {
        address: signerAddress,
      })
      console.log("result",result)

      // Create the subdomain
      console.log(`${subdomain}.treetomorrow.eth`)
      const subname = `${subdomain}.treetomorrow.eth`
      const subnameStr = String(subname)
      console.log(subnameStr)
      console.log(typeof subnameStr)
      const hash = await createSubname(wallet, {
        name: subnameStr,
        owner: signerAddress,
        contract: 'nameWrapper',
      });
      console.log(hash)
      // Set the avatar and text records
      const avatar = `ipfs://${image}`;
      const displayText = `${plantName} at ${metadata.location.latitude}, ${metadata.location.longitude}`;

      // Set avatar record
      await setTextRecord(wallet, {
        name: subnameStr,
        key: 'avatar',
        value: avatar,
        resolverAddress: "0x8FADE66B79cC9f707aB26799354482EB93a5B7dD",
      });

    //   // Set display record
      await setTextRecord(wallet, {
        name: `swaminarayan.india3.eth`,
        key: 'display',
        value: plantName,
        resolverAddress: "0x8FADE66B79cC9f707aB26799354482EB93a5B7dD",
      });

    //   // Set description record
      await setTextRecord(wallet, {
        name: `swaminarayan.india3.eth`,
        key: 'description',
        value: displayText,
        resolverAddress: "0x8FADE66B79cC9f707aB26799354482EB93a5B7dD",
      });

    // const hashname = await transferName(wallet, {
    //     name: 'swaminarayan.india3.eth',
    //     newOwnerAddress: '0x05e208390921617F97b1a5701A1B3bdD09D537aF',
    //     contract: 'nameWrapper',
    //   })
      console.log(hash)
      setStatus('Minting complete!');
    } catch (error) {
      console.error('Error minting subdomain:', error);
      setStatus('Failed to mint subdomain.');
    }
  };

  return (
    <div>
      <h2>Mint Subdomain NFT</h2>
      <button onClick={mintSubdomainNFT}>Mint</button>
      <p>{status}</p>
    </div>
  );
};

export default MintNFT;
