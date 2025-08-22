import { useState } from 'react';
import WaitlistForm from '@/components/WaitlistForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function WaitlistPage() {
  return (
    <div className="container mx-auto py-12 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Join the Waitlist</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Be among the first to experience Sushrut when we launch. Get early access and exclusive updates.
      </p>

      <Tabs defaultValue="doctor" className="max-w-xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="doctor">For Doctors</TabsTrigger>
          <TabsTrigger value="student">For Students</TabsTrigger>
        </TabsList>
        <TabsContent value="doctor">
            <div className="mt-8">
                <WaitlistForm userType="doctor" />
            </div>
        </TabsContent>
        <TabsContent value="student">
            <div className="mt-8">
                <WaitlistForm userType="student" />
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
