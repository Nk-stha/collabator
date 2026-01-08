"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Navigation } from "@/components/layout/navigation";
import { LoginForm } from "@/components/forms/login-form";
import { Mail, Plus, Download, Bolt } from "lucide-react";

export default function DesignSystemDemo() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-20">
      <Navigation
        title="Charge Ghar Design System"
        logo={<Bolt className="h-6 w-6 text-primary" />}
        sticky
      />

      <main className="container mx-auto px-4 py-8 space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Buttons</h2>
          <Card>
             <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button disabled>Disabled</Button>
                <Button variant="primary" loading>Loading</Button>
                <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>Add Item</Button>
                <Button variant="secondary" rightIcon={<Download className="h-4 w-4" />}>Export</Button>
             </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Inputs</h2>
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Default Input" placeholder="Type something..." />
              <Input label="With Icon" leftIcon={<Mail className="h-4 w-4" />} placeholder="Email address" />
              <Input label="Password" type="password" placeholder="••••••••" />
              <Input label="Error State" error="This field is required" placeholder="Invalid input" />
              <Input label="Disabled" disabled placeholder="Can't type here" />
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <Card title="Card Title" subtitle="Subtitle here">
                <p className="text-gray-600 dark:text-gray-300">This is a standard card content.</p>
             </Card>
             <Card title="Hoverable Card" hoverable>
                <p className="text-gray-600 dark:text-gray-300">Hover over me to see the effect.</p>
             </Card>
             <Card padding="lg">
                <p className="text-gray-600 dark:text-gray-300">Large padding card without title.</p>
             </Card>
          </div>
        </section>

        <section>
           <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Login Form Composition</h2>
           <div className="max-w-md mx-auto">
              <LoginForm 
                onSubmit={(creds) => alert(JSON.stringify(creds))}
                forgotPasswordLink="#"
                signupLink="#"
              />
           </div>
        </section>
        
        <section>
           <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Spinner</h2>
           <Card>
              <div className="flex gap-4 items-center">
                 <Spinner size="sm" />
                 <Spinner size="md" />
                 <Spinner size="lg" />
              </div>
           </Card>
        </section>
      </main>
    </div>
  );
}
