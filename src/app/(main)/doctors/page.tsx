import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";

export default function DoctorsPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Connect with Doctors</h1>
        </div>
        <Card className="text-center p-12">
          <CardHeader>
            <CardTitle className="flex justify-center items-center gap-3"><Stethoscope className="h-8 w-8 text-primary" />Find and Connect with Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mt-2 mb-4">
              This feature to find nearby doctors and start a consultation is coming soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
