import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function FamilyPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Family Profiles</h1>
        </div>
        <Card className="text-center p-12">
          <CardHeader>
            <CardTitle className="flex justify-center items-center gap-3"><Users className="h-8 w-8 text-primary" />Manage Family Members</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mt-2 mb-4">
              This feature to manage health records for your family members is coming soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
