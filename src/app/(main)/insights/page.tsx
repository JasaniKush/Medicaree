"use client";

import { Header } from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Lightbulb, LineChart as LineChartIcon } from "lucide-react";

const chartData = [
  { month: "January", reports: 2 },
  { month: "February", reports: 1 },
  { month: "March", reports: 3 },
  { month: "April", reports: 1 },
  { month: "May", reports: 2 },
  { month: "June", reports: 0 },
];

const chartConfig = {
  reports: {
    label: "Reports",
    color: "hsl(var(--primary))",
  },
} as const;

export default function InsightsPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Health Insights</h1>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <LineChartIcon className="h-6 w-6 text-primary" />
                    Analysis Frequency
                </CardTitle>
                <CardDescription>Number of prescription reports analyzed per month.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            stroke="#888888"
                            fontSize={12}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Bar dataKey="reports" fill="var(--color-reports)" radius={4} />
                    </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    AI-Powered Risk Insights
                </CardTitle>
                <CardDescription>Patterns and observations from your health data.</CardDescription>
              </CardHeader>
              <CardContent className="text-center p-8 flex items-center justify-center min-h-[250px]">
                 <p className="text-muted-foreground">
                    Not enough data yet. After you save a few more reports, AI will look for health patterns here.
                </p>
              </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
