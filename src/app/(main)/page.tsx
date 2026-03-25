"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Upload, Camera, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState< 'upload' | null>(null);
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

  const processFile = (file: File, type: 'upload') => {
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

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-headline">Understand Your Prescription Instantly</h1>
        <p className="text-lg text-muted-foreground mt-4 mb-8">
          No confusion. Just clear answers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/scan">
                    <Camera className="mr-2 h-5 w-5" />
                    Scan Prescription
                </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={handleUploadClick} disabled={!!isLoading} className="w-full sm:w-auto">
              {isLoading === 'upload' ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Upload className="mr-2 h-5 w-5" />
              )}
              Upload File
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,application/pdf"
            />
        </div>
      </div>
    </div>
  );
}
