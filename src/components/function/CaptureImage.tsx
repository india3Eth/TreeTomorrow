import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { GreenTreeIcon } from '../Icons';
import { Input } from '../ui/input';
import { useMetadata } from '../../contexts/MetadataContext';


interface ImageCaptureProps {
  onImageCapture: (imageFile: string, location: { latitude: number; longitude: number }) => void; 
}

const CaptureImage  : React.FC<ImageCaptureProps> = ({ onImageCapture }) => {
  const [image, setImage] = useState<string | null>(null);;
  const [geoLocation, setGeoLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const {metadata, setMetadata} = useMetadata();
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = useRef<Webcam | null>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) { 
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
      getGeolocation(imageSrc);
    } else {
      console.error('Error: Webcam ref is not initialized.');
    }
  }, [webcamRef]);

  const getGeolocation = (imageSrc: string|null) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setGeoLocation({ latitude, longitude });
          drawMetadataOnImage(imageSrc, latitude, longitude);
        },
        (error) => {
          console.error('Error getting geolocation:', error.message);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const drawMetadataOnImage = (imageSrc: string|null, latitude: number, longitude: number) => {
  if (imageSrc) {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Draw company logo
      const logo = new Image();
      
      logo.src = './logo.png'; // Replace with your logo path
      logo.onload = () => {
        ctx.drawImage(logo, canvas.width - 150, 10, 140, 70);

        // Draw metadata
        ctx.fillStyle = 'white';
        ctx.fillRect(10, canvas.height - 110, 300, 100);
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.fillText(`Latitude: ${latitude}`, 20, canvas.height - 80);
        ctx.fillText(`Longitude: ${longitude}`, 20, canvas.height - 60);
        ctx.fillText(`Plant Name: ${metadata.plantName}`, 20, canvas.height - 40);
        ctx.fillText(`Description: ${metadata.description}`, 20, canvas.height - 20);

        const finalImage = canvas.toDataURL('image/jpeg');
        onImageCapture(finalImage, { latitude, longitude });
      };
    };
  }else{
    console.error('Error: Image source is null.'); 
  }
  };
  

  const handleMetadataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetadata({ ...metadata, [e.target.name]: e.target.value });
  };

  console.log('metadata:in captureimage', metadata);

  return (
    <div>
      <Card key="Capture Image">
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    <GreenTreeIcon/>
                  </div>
                  <div className='justify-items-center'>
                    <CardTitle>Capture Image</CardTitle>
                    <CardDescription className="text-md mt-2">
                      Click on the button below to open the camera and capture an image of the plant.
                    </CardDescription>
                    {!showWebcam && (
                        <Button className="w-full md:mr-4 md:w-auto" onClick={() => setShowWebcam(true)}>Open Camera</Button> 
                    )}
                     {showWebcam && (
                        <div>
                          <Webcam
                            audio={false}
                            ref={webcamRef as React.RefObject<Webcam>}
                            screenshotFormat="image/jpeg"
                          />
                          <Button className="w-full md:mr-4 md:w-auto mx-36 mt-6" onClick={capture}>Capture Image</Button>
                        </div>
                      )}
                      {image && (
                        <div className='flex-col'>
                          <img src={image} alt="Captured" style={{ width: '100px', height: '100px' }} />
                          <div className='flex-row mt-4 items-center'>
                            <label>Plant Name: <Input type="text" name="plantName" onChange={handleMetadataChange} /></label>
                            <label>Description: <Input type="text" name="description" onChange={handleMetadataChange} /></label>
                            <Button className='mt-4' onClick={() => getGeolocation(image)}>Get Geolocation</Button>
                          </div>
                        </div>
                      )}
                  </div>
                </CardHeader>
      </Card>  
    
      
     
    </div>
    
  );
};

export default CaptureImage;
