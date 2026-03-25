"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Camera, RefreshCcw, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ScanPage() {
  const router = useRouter();
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const { toast } = useToast();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const checkPermissions = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setHasPermission(true);
            stream.getTracks().forEach(track => track.stop());
        } catch (err) {
            setHasPermission(false);
        }
    };
    checkPermissions();
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
    } else {
        toast({
            variant: "destructive",
            title: "Camera Error",
            description: "Could not capture image. Please ensure camera is working.",
        });
    }
  }, [webcamRef, setImgSrc, toast]);

  const handleAnalyze = () => {
    if (imgSrc) {
      sessionStorage.setItem('prescriptionDataUri', imgSrc);
      router.push('/analysis');
    }
  };

  const retake = () => {
    setImgSrc(null);
  };
  
  if (hasPermission === false) {
      return (
          <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground p-8 text-center">
              <Alert variant="destructive" className="max-w-md">
                <AlertTitle>Camera Access Denied</AlertTitle>
                <AlertDescription>
                    MediCare needs camera access to scan prescriptions. Please enable it in your browser settings to continue.
                </AlertDescription>
              </Alert>
              <Button asChild className="mt-6">
                  <Link href="/">Back to Home</Link>
              </Button>
          </div>
      )
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-black text-white">
        {!imgSrc ? (
            <>
                {hasPermission === true && (
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="absolute inset-0 w-full h-full object-cover"
                        videoConstraints={{ facingMode: 'environment' }}
                        onUserMediaError={() => setHasPermission(false)}
                    />
                )}
                <div className="absolute inset-0 bg-black/60" />
                
                <div className="relative z-10 flex flex-col items-center justify-between h-full w-full p-4 sm:p-8">
                    <div className="w-full">
                       <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                         <Link href="/">&larr; Back</Link>
                       </Button>
                    </div>
                    <div className="w-full max-w-3xl aspect-[4/3] max-h-[70vh] border-4 border-dashed border-white/80 rounded-lg flex items-center justify-center flex-col p-4 bg-white/10">
                        <p className="text-lg font-semibold text-center">Align your prescription within the frame</p>
                    </div>
                     <div className="flex flex-col items-center h-[80px] justify-center">
                        <Button onClick={capture} size="lg" className="w-20 h-20 rounded-full border-4 border-white bg-transparent hover:bg-white/20">
                            <Camera className="w-10 h-10" />
                        </Button>
                    </div>
                </div>
            </>
        ) : (
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4">
                <img src={imgSrc} alt="Captured prescription" className="max-h-[75vh] w-auto rounded-lg" />
                <div className="absolute bottom-6 sm:bottom-10 flex gap-4">
                    <Button onClick={retake} variant="outline" size="lg" className="bg-white/10 text-white border-white hover:bg-white/20">
                        <RefreshCcw className="mr-2" /> Retake
                    </Button>
                    <Button onClick={handleAnalyze} size="lg">
                        <Send className="mr-2" /> Analyze
                    </Button>
                </div>
            </div>
        )}
    </div>
  );
}
