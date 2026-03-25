"use client";

import { Header } from "@/components/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus } from "lucide-react";

const familyMembers = [
  { name: "You", relation: "Self", image: "4" },
  { name: "Father", relation: "Father", image: "5" },
  { name: "Mother", relation: "Mother", image: "6" },
];

export default function FamilyPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Family Profiles</h1>
           <Button variant="outline">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Member
            </Button>
        </div>
        
        <Tabs defaultValue="You" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 h-auto">
                {familyMembers.map(member => (
                    <TabsTrigger key={member.name} value={member.name} className="py-2">{member.name} <span className="hidden sm:inline-block ml-1">({member.relation})</span></TabsTrigger>
                ))}
            </TabsList>

            {familyMembers.map(member => (
                 <TabsContent key={member.name} value={member.name}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                     <AvatarImage src={`https://picsum.photos/seed/${member.image}/200/200`} data-ai-hint="person family member" />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                Health Records for {member.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center p-12 min-h-[200px] flex items-center justify-center">
                             <p className="text-muted-foreground">
                                No health records found for {member.name}.
                                <br/>
                                Saved reports for this profile will appear here.
                            </p>
                        </CardContent>
                    </Card>
                 </TabsContent>
            ))}
        </Tabs>
      </div>
    </>
  );
}
