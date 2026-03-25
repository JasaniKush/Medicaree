import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck } from "lucide-react";

export default function MedTrackerPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Medication Tracker</h1>
        </div>
        <Card className="text-center p-12">
          <CardHeader>
            <CardTitle className="flex justify-center items-center gap-3"><ClipboardCheck className="h-8 w-8 text-primary" />Track Your Medication Adherence</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mt-2 mb-4">
              This feature to track your daily medication intake and see your adherence score is coming soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
