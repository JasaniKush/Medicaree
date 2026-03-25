"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Loader2, Send } from "lucide-react";
import { prescriptionAssistantQuestions, PrescriptionAssistantQuestionsInput } from "@/ai/flows/prescription-assistant-questions";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from './ui/scroll-area';

type AiAssistantProps = {
  analyzedData: PrescriptionAssistantQuestionsInput['analyzedData'];
}

type Message = {
  role: 'user' | 'assistant';
  content: string;
}

export function AiAssistant({ analyzedData }: AiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();

  const quickQuestions = [
    "When should I take my medication?",
    "What are the side effects?",
    "What is my diagnosis in simple terms?",
  ];

  const handleQuestionSubmit = async (q: string) => {
    if (!q.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: q }];
    setMessages(newMessages);
    setQuestion('');
    setIsLoading(true);

    try {
      const result = await prescriptionAssistantQuestions({ analyzedData, userQuestion: q });
      setMessages([...newMessages, { role: 'assistant', content: result.answer }]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      toast({
        variant: 'destructive',
        title: "Error",
        description: "The AI assistant could not process your request.",
      });
      // remove the user's message on error to allow retry
      setMessages(messages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleQuestionSubmit(question);
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-xl animate-pulse"
        >
          <Bot className="h-8 w-8" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 md:w-96 mr-6 mb-2 p-0" side="top" align="end">
        <div className="flex flex-col h-[60vh]">
          <div className="p-4 border-b">
            <h4 className="font-medium leading-none">AI Prescription Assistant</h4>
            <p className="text-sm text-muted-foreground">Ask questions about your report.</p>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.length === 0 && (
                 <div className="text-center text-sm text-muted-foreground">
                    <p>Try asking something like:</p>
                    <div className="flex flex-wrap gap-2 mt-2 justify-center">
                        {quickQuestions.map(q => (
                            <Button key={q} size="sm" variant="outline" onClick={() => handleQuestionSubmit(q)}>{q}</Button>
                        ))}
                    </div>
                </div>
              )}
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-2 rounded-lg max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                  <div className="flex justify-start">
                       <div className="p-2 rounded-lg bg-muted">
                           <Loader2 className="h-4 w-4 animate-spin"/>
                       </div>
                  </div>
              )}
            </div>
          </ScrollArea>
          <form onSubmit={handleFormSubmit} className="p-4 border-t flex items-center gap-2">
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question..."
              className="min-h-0 h-10"
              rows={1}
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !question.trim()}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
