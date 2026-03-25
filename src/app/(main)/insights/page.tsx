import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "lucide-react";

export default function InsightsPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Health Insights</h1>
        </div>
        <Card className="text-center p-12">
          <CardHeader>
            <CardTitle className="flex justify-center items-center gap-3"><LineChart className="h-8 w-8 text-primary" />Health Trends and Risk Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mt-2 mb-4">
              This feature to visualize your health trends and get AI-powered risk insights is coming soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
