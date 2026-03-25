"use client";

import { Header } from "@/components/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {familyMembers.map(member => (
                <Card key={member.name} className="h-full flex flex-col hover:border-primary transition-colors cursor-pointer">
                    <CardHeader className="items-center text-center">
                        <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage src={`https://picsum.photos/seed/${member.image}/200/200`} data-ai-hint="person family member" />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <CardTitle>{member.name}</CardTitle>
                        <CardDescription>{member.relation}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow text-center">
                        <p className="text-sm text-muted-foreground">View health records and insights for {member.name}.</p>
                    </CardContent>
                     <CardFooter className="justify-center">
                        {/* In a real app, clicking the card would navigate to this member's locker page */}
                        <p className="text-sm text-primary font-semibold">View Records</p>
                    </CardFooter>
                </Card>
            ))}
            <Card className="h-full flex flex-col items-center justify-center border-dashed border-2 hover:border-primary transition-colors cursor-pointer min-h-[300px] bg-background/50">
                <Button variant="ghost" className="h-auto p-8 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary">
                    <UserPlus className="h-10 w-10" />
                    <span>Add New Member</span>
                </Button>
            </Card>
        </div>
      </div>
    </>
  );
}
