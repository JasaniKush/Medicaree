"use client";

import { useLocalStorage } from '@/hooks/use-local-storage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Search, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import type { StoredReport } from '@/lib/types';

export default function LockerPage() {
  const [locker, setLocker] = useLocalStorage<StoredReport[]>("health-locker", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

  const filteredAndSortedLocker = useMemo(() => {
    return locker
      .filter(report => {
        if (filterType !== 'all' && report.type !== filterType) {
          return false;
        }
        if (searchTerm) {
          const lowerSearchTerm = searchTerm.toLowerCase();
          const inSummary = report.summary?.toLowerCase().includes(lowerSearchTerm) ?? false;
          const inDiagnosis = report.diagnosis?.toLowerCase().includes(lowerSearchTerm) ?? false;
          return inSummary || inDiagnosis;
        }
        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(a.savedAt).getTime();
        const dateB = new Date(b.savedAt).getTime();
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });
  }, [locker, searchTerm, filterType, sortOrder]);


  const clearLocker = () => {
    setLocker([]);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Your Health Records</h1>
          {locker.length > 0 && (
            <Button variant="destructive" onClick={clearLocker}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>
        
        {locker.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 border rounded-lg bg-card">
                <div className="relative md:col-span-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search records..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 md:col-span-2">
                    <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by type..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="prescription">Prescriptions</SelectItem>
                            <SelectItem value="lab">Lab Reports</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger>
                            <SelectValue placeholder="Sort by date..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="desc">Newest First</SelectItem>
                            <SelectItem value="asc">Oldest First</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        )}

        {filteredAndSortedLocker.length === 0 ? (
          <Card className="text-center p-12">
            <CardContent className="flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold">
                {locker.length > 0 ? 'No records match' : 'Your Health Locker is empty'}
              </h3>
              <p className="text-muted-foreground mt-2 mb-4">
                {locker.length > 0 ? 'Try adjusting your search or filters.' : 'Upload and save a prescription analysis to see it here.'}
              </p>
              <Button asChild>
                <Link href="/">Upload Prescription</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedLocker.map((report) => (
              <Link href={`/locker/${report.id || report.savedAt}`} key={report.id || report.savedAt} className="flex">
                <Card className="flex flex-col w-full hover:border-primary transition-colors cursor-pointer">
                    <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="flex items-center gap-3">
                                <FileText className="text-primary"/>
                                Report
                            </CardTitle>
                            <CardDescription className="mt-2">
                                Saved on {new Date(report.savedAt).toLocaleDateString()}
                            </CardDescription>
                        </div>
                        {report.type && (
                            <Badge variant={report.type === 'prescription' ? 'default' : 'secondary'} className="capitalize">
                                {report.type}
                            </Badge>
                        )}
                    </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="font-semibold">{report.summary}</p>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{report.diagnosis}</p>
                    </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
