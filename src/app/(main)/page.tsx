"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Upload, Camera, FileText, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState< 'upload' | 'camera' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file, 'upload');
    }
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const processFile = (file: File, type: 'upload' | 'camera') => {
    setIsLoading(type);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target?.result as string;
      if (dataUri) {
        sessionStorage.setItem('prescriptionDataUri', dataUri);
        router.push('/analysis');
      } else {
        toast({
          variant: "destructive",
          title: "File Error",
          description: "Could not read the selected file.",
        });
        setIsLoading(null);
      }
    };
    reader.onerror = () => {
      toast({
        variant: "destructive",
        title: "File Error",
        description: "An error occurred while reading the file.",
      });
      setIsLoading(null);
    };
    reader.readAsDataURL(file);
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    toast({
        title: "Camera Feature",
        description: "The smart camera feature with auto-capture and blur detection is coming soon!",
    });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-12rem)]">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-headline text-primary">Your AI Health Companion</h1>
          <p className="text-lg text-muted-foreground">
            Instantly analyze prescriptions, get emergency guidance, and manage your health records with the power of AI.
          </p>
        </div>
        <Card className="p-2 sm:p-6 shadow-lg border-2 border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <FileText className="h-8 w-8 text-primary" />
              Get Started
            </CardTitle>
            <CardDescription>
              Upload a prescription image or PDF to get an instant AI-powered analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,application/pdf"
            />
            <Button className="w-full" size="lg" onClick={handleUploadClick} disabled={!!isLoading}>
              {isLoading === 'upload' ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Upload className="mr-2 h-5 w-5" />
              )}
              Upload from Device
            </Button>
            <Button className="w-full" variant="outline" size="lg" onClick={handleCameraClick} disabled={!!isLoading}>
              {isLoading === 'camera' ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Camera className="mr-2 h-5 w-5" />
              )}
              Use Smart Scan
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
