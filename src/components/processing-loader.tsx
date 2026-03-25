"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const steps = [
  "Reading prescription...",
  "Identifying medical terms...",
  "Analyzing dosage and frequency...",
  "Checking for potential side effects...",
  "Structuring your report...",
  "Almost ready...",
];

export function ProcessingLoader() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => {
        if (prevStep < steps.length - 1) {
          return prevStep + 1;
        }
        clearInterval(interval);
        return prevStep; // Stay on the last step
      });
    }, 2500); // Change step every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 h-full min-h-[60vh] text-center">
      <div className="relative">
        <Loader2 className="h-24 w-24 animate-spin text-primary" />
      </div>
      <h2 className="text-2xl font-semibold text-foreground">
        AI is analyzing your prescription
      </h2>
      <p className="text-muted-foreground transition-opacity duration-500">
        {steps[currentStep]}
      </p>
    </div>
  );
}
