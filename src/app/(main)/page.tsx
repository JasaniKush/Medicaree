"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Upload, Camera, Loader2, ScanLine, Bot, BarChart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import { Header } from '@/components/header';
import { AnalysisPreviewCard } from '@/components/analysis-preview-card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function HomePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<'upload' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file, 'upload');
    }
    if (fileInputRef.current) {
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
  
  const FADE_IN_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column */}
            <motion.div 
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.div variants={FADE_IN_VARIANTS} className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                 <Badge variant="outline" className="border-primary/50 text-primary">AI Powered</Badge>
                 <Badge variant="outline" className="border-primary/50 text-primary">Instant Analysis</Badge>
                 <Badge variant="outline" className="border-primary/50 text-primary">Secure & Private</Badge>
              </motion.div>

              <motion.h1 
                variants={FADE_IN_VARIANTS}
                className="text-4xl md:text-5xl font-bold tracking-tight font-headline text-foreground"
              >
                Understand Your Prescription. Instantly.
              </motion.h1>

              <motion.p 
                variants={FADE_IN_VARIANTS}
                className="text-lg text-muted-foreground mt-4 max-w-lg mx-auto lg:mx-0"
              >
                Confused by medical terms? Get clear, simple explanations in seconds — powered by AI.
              </motion.p>

              <motion.div 
                 variants={FADE_IN_VARIANTS}
                 className="flex flex-col sm:flex-row gap-4 mt-8 w-full lg:w-auto"
              >
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 102, 255, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Button asChild size="lg" className="w-full sm:w-auto text-base font-semibold py-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                      <Link href="/scan">
                          <Camera className="mr-2 h-5 w-5" />
                          Scan Prescription
                      </Link>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Button variant="outline" size="lg" onClick={handleUploadClick} disabled={!!isLoading} className="w-full sm:w-auto text-base py-6">
                    {isLoading === 'upload' ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <Upload className="mr-2 h-5 w-5" />
                    )}
                    Upload File
                  </Button>
                </motion.div>
              </motion.div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="image/*,application/pdf"
              />
              <motion.p variants={FADE_IN_VARIANTS} className="text-xs text-muted-foreground mt-4 text-center w-full lg:w-auto">
                Secure. Private. No data stored without your permission.
              </motion.p>

              <motion.p variants={FADE_IN_VARIANTS} className="text-sm text-muted-foreground mt-8">
                Used for prescriptions, lab reports, and doctor notes
              </motion.p>
              
               <motion.div variants={FADE_IN_VARIANTS} className="flex gap-6 mt-4 justify-center lg:justify-start">
                 <div className="flex items-center gap-2 text-muted-foreground">
                   <ScanLine className="h-5 w-5 text-primary" />
                   <span className="text-sm">Scan</span>
                 </div>
                 <div className="flex items-center gap-2 text-muted-foreground">
                   <Bot className="h-5 w-5 text-primary" />
                   <span className="text-sm">Analyze</span>
                 </div>
                 <div className="flex items-center gap-2 text-muted-foreground">
                   <BarChart className="h-5 w-5 text-primary" />
                   <span className="text-sm">Understand</span>
                 </div>
               </motion.div>

            </motion.div>
            
            {/* Right Column */}
            <motion.div 
              className="hidden lg:flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div
                whileHover={{ y: -5, boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.1)"}}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AnalysisPreviewCard />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
}
