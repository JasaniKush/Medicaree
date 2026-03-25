"use client";
import { Header } from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Pill } from "lucide-react";
import { useState, useMemo } from "react";

const medications = [
  { name: "Amoxicillin 500mg", times: ["Morning", "Evening"] },
  { name: "Ibuprofen 200mg", times: ["Morning"] },
  { name: "Vitamin D3", times: ["Morning"] },
];

export default function MedTrackerPage() {
  // Mock state, this would come from a backend
  const [tracker, setTracker] = useState(() => {
    const initial: { [key: string]: { [key: string]: boolean } } = {};
    medications.forEach(med => {
      initial[med.name] = {};
      med.times.forEach(time => {
        initial[med.name][time] = false;
      });
    });
    return initial;
  });

  const handleCheck = (medName: string, time: string, checked: boolean) => {
    setTracker(prev => ({
      ...prev,
      [medName]: {
        ...prev[medName],
        [time]: checked,
      }
    }));
  };

  const { takenDoses, totalDoses, adherence } = useMemo(() => {
    const totalDoses = medications.reduce((acc, med) => acc + med.times.length, 0);
    const takenDoses = Object.values(tracker).flatMap(Object.values).filter(Boolean).length;
    const adherence = totalDoses > 0 ? (takenDoses / totalDoses) * 100 : 0;
    return { takenDoses, totalDoses, adherence };
  }, [tracker]);


  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Medication Tracker</h1>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Today's Adherence</CardTitle>
            <CardDescription>You've taken {takenDoses} of {totalDoses} doses today.</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={adherence} className="w-full" />
            <p className="text-right text-sm font-bold mt-2 text-primary">{adherence.toFixed(0)}%</p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Today's Schedule</h2>
          {medications.map(med => (
            <Card key={med.name}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Pill className="text-primary" />
                  {med.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                {med.times.map(time => (
                  <div key={time} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`${med.name}-${time}`} 
                      checked={tracker[med.name]?.[time] ?? false}
                      onCheckedChange={(checked) => handleCheck(med.name, time, !!checked)}
                    />
                    <label
                      htmlFor={`${med.name}-${time}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {time}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
