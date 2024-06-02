import { useState } from "react";
import { ClientProvider } from "../contexts/ClientContext.tsx";
import UploadFile from "./function/UploadFile.jsx";
import UploadList from "./function/UploadList.jsx";
import CaptureImage from "./function/CaptureImage.tsx";
import MintNFT from "./function/MintNFT.jsx";
import { Button } from "./ui/button";
import { useMetadata } from "@/contexts/MetadataContext.tsx";
// import { useFileCid } from "@/contexts/FileCidContext.tsx";

export default function GrowAPlant() {
  const [showUploads, setShowUploads] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [geoLocation, setGeoLocation] = useState(null);
  const {metadata, setMetadata} = useMetadata();
  const [serialNo, setSerialNo] = useState(1); // Initialize serial number
  // const {fileCid} = useFileCid();

  const handleImageCapture = (
    imageFile: string,
    location: { latitude: number; longitude: number }
  ) => {
    setCapturedImage(imageFile);
    setGeoLocation(location);
  };

  const handleMetadataChange = (newMetadata: any) => {
    setMetadata(newMetadata);
  };

 console.log("metadata in growplat", metadata);

  return (
    <ClientProvider>
    
     <section id="cta" className="bg-muted/50 py-16 my-24 sm:my-32">
        <div className="container lg:grid lg:grid-cols-2 place-items-center">
          <CaptureImage onImageCapture={handleImageCapture} />
          <div>
            <h2 className="text-3xl md:text-4xl font-bold ">Grow A Plant</h2>
            <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
              Capture an image of your plant and mint an NFT
            </p>
          </div>  
        </div>
      </section>
      
      <section className="bg-muted/50 py-16 my-24 sm:my-32">
          {capturedImage && (
              <UploadFile
                image={capturedImage}
                location={geoLocation}
                onMetadataChange={handleMetadataChange}
              />
            )}
      </section>
      <section className="bg-muted/50 py-16 my-24 sm:my-32">
          <button onClick={() => setShowUploads(!showUploads)}>
              {showUploads ? "Hide Uploads" : "Show Uploads"}
          </button>
            {showUploads && <UploadList />}
            {1 && (
              <MintNFT
                image={
                  metadata?.fileCid
                }
                metadata={metadata}
                plantName={ metadata?.plantName }
                serialNo={1}
              />
            )}
      </section>

    </ClientProvider>
  );
}


