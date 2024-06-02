import { useState, useEffect } from 'react';
import { useClient } from '../../contexts/ClientContext';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { GreenTreeIcon } from '../Icons';
import { Button } from "../ui/button";
import MintNFT from './MintNFT';



const base64ToFile = (base64, filename) => {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const UploadFile = ({ image, location, onMetadataChange }) => {
  console.log(location)
  console.log(onMetadataChange)
  const [file, setFile] = useState(image ? base64ToFile(image, 'captured_image.jpg') : null);
  const { client, initialized } = useClient();
  const [metadata, setMetadata] = useState({});
  


  useEffect(() => {
    if (image) {
      setFile(base64ToFile(image, 'captured_image.jpg'));
    }
  }, [image]);

  const handleUpload = async () => {
    if (!file) return alert('Please select a file first');
    if (!client || !initialized) return alert('Client not initialized');

    try {
      const cid = await client.uploadFile(file, {
        onShardStored: (shard) => {
          console.log('Shard stored:', shard);
        }
      });
      
      setMetadata({ ...metadata, fileCid: cid.toString() });
      const metadataContent = {
        ...metadata,
        location,
        image: cid.toString(),
      };
      onMetadataChange(metadataContent);
    } catch (error) {
      console.error('Error uploading file:', error.message);
      alert(`Failed to upload file: ${error.message}`);
    }
  };

  const handleMetadataChange = (e) => {
    setMetadata({ ...metadata, [e.target.name]: e.target.value });
  };

  return (
    
        <div>
         <Card key="Upload Image" className='flex'>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-center gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    <GreenTreeIcon/>
                  </div>
                  <div className='justify-items-center'>
                    <CardTitle>Upload a Image to web3.storage</CardTitle>
                    <CardDescription className="text-md mt-2">
                      Click on the button below to upload the image of the plant to web3.storage.
                    </CardDescription>
                    

                  </div>
                </CardHeader>
                <CardHeader>
                {file && <img src={URL.createObjectURL(file)} alt="Selected" style={{ width: '200px', height: '200px' }} />}
                    <Button onClick={handleUpload} disabled={!initialized}>Upload</Button>
                </CardHeader>
        </Card>  
          
          {metadata.fileCid && (
            <div>
              <p>File uploaded successfully!</p>
              <p>IPFS CID: {metadata.fileCid.toString()}</p>
            </div>
          )}

          {metadata.fileCid && (
            <MintNFT
            image={
              metadata.fileCid.toString()
            }
            metadata={metadata}
            plantName={metadata.plantName}
            serialNo={1}
          />
          )}
        </div>
  );
};

export default UploadFile;
