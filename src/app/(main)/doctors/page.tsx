"use client";

import { Header } from "@/components/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageSquare } from "lucide-react";

const doctors = [
    { name: "Dr. Anjali Sharma", specialty: "General Physician", image: "1" },
    { name: "Dr. Rahul Verma", specialty: "Cardiologist", image: "2" },
    { name: "Dr. Priya Singh", specialty: "Dermatologist", image: "3" },
];

export default function DoctorsPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Talk to a Doctor</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map(doctor => (
                <Card key={doctor.name}>
                    <CardHeader className="items-center text-center">
                        <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage src={`https://picsum.photos/seed/${doctor.image}/200/200`} data-ai-hint="person doctor" />
                            <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <CardTitle>{doctor.name}</CardTitle>
                        <CardDescription>{doctor.specialty}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground text-center">Available for chat & video consultation. Next slot: Today, 4:00 PM.</p>
                    </CardContent>
                    <CardFooter>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="w-full">
                                    <MessageSquare className="mr-2 h-4 w-4"/>
                                    Chat Now
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Starting Consultation with {doctor.name}</DialogTitle>
                                    <DialogDescription>
                                      This is a mock consultation window. Here, you could ask questions like "Is this serious?" or "Do I need a follow-up?".
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="aspect-video bg-muted rounded-md flex items-center justify-center mt-4">
                                    <p className="text-muted-foreground">Mock chat/video interface</p>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </div>
    </>
  );
}
