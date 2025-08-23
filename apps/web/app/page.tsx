import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Badge } from '@repo/ui/components/badge';
import { Input } from '@repo/ui/components/input';
import { Github, Zap, Database, Globe } from 'lucide-react';

export default function Page() {
  return (
    <div className='min-h-screen bg-white'>
      {/* Simple Hero */}
      <div className='container mx-auto px-6 py-24'>
        <div className='mx-auto max-w-3xl text-center'>
          <Badge variant='outline' className='mb-6'>
            <Zap className='mr-1 h-3 w-3' />
            Turborepo Template
          </Badge>

          <h1 className='mb-6 text-5xl font-bold text-gray-900'>Next.js + NestJS + ShadCN</h1>

          <p className='mb-8 text-lg leading-relaxed text-gray-600'>
            A modern monorepo template with everything you need to build full-stack applications.
          </p>

          <div className='flex justify-center gap-3'>
            <Button size='lg'>Get Started</Button>
            <Button variant='outline' size='lg'>
              <Github className='mr-2 h-4 w-4' />
              GitHub
            </Button>
            <Button variant='outline' size='lg' asChild>
              <a href='/admin'>Admin Panel</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Simple Features */}
      <div className='bg-gray-50 py-20'>
        <div className='container mx-auto px-6'>
          <div className='grid gap-8 md:grid-cols-3'>
            <Card className='border-0 shadow-sm'>
              <CardHeader>
                <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100'>
                  <Globe className='h-5 w-5 text-blue-600' />
                </div>
                <CardTitle>Next.js Frontend</CardTitle>
                <CardDescription>Modern React with App Router and TypeScript</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  <Badge variant='secondary'>App Router</Badge>
                  <Badge variant='secondary'>TypeScript</Badge>
                  <Badge variant='secondary'>Tailwind</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className='border-0 shadow-sm'>
              <CardHeader>
                <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-100'>
                  <Database className='h-5 w-5 text-red-600' />
                </div>
                <CardTitle>NestJS Backend</CardTitle>
                <CardDescription>Scalable Node.js framework with TypeScript</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  <Badge variant='secondary'>TypeScript</Badge>
                  <Badge variant='secondary'>Decorators</Badge>
                  <Badge variant='secondary'>OpenAPI</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className='border-0 shadow-sm'>
              <CardHeader>
                <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100'>
                  <Zap className='h-5 w-5 text-purple-600' />
                </div>
                <CardTitle>Turborepo</CardTitle>
                <CardDescription>High-performance build system for monorepos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  <Badge variant='secondary'>Caching</Badge>
                  <Badge variant='secondary'>Parallel</Badge>
                  <Badge variant='secondary'>Incremental</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Simple Demo */}
      <div className='py-20'>
        <div className='container mx-auto px-6'>
          <div className='mx-auto max-w-2xl'>
            <div className='mb-12 text-center'>
              <h2 className='mb-4 text-3xl font-bold text-gray-900'>UI Components</h2>
              <p className='text-gray-600'>Built with ShadCN UI and Tailwind CSS</p>
            </div>

            <Card className='border shadow-sm'>
              <CardHeader>
                <CardTitle>Component Examples</CardTitle>
                <CardDescription>Try the available components</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div>
                  <label className='mb-2 block text-sm font-medium'>Input</label>
                  <Input placeholder='Type something...' />
                </div>

                <div>
                  <label className='mb-2 block text-sm font-medium'>Buttons</label>
                  <div className='flex flex-wrap gap-2'>
                    <Button>Primary</Button>
                    <Button variant='secondary'>Secondary</Button>
                    <Button variant='outline'>Outline</Button>
                  </div>
                </div>

                <div>
                  <label className='mb-2 block text-sm font-medium'>Badges</label>
                  <div className='flex flex-wrap gap-2'>
                    <Badge>Default</Badge>
                    <Badge variant='secondary'>Secondary</Badge>
                    <Badge variant='outline'>Outline</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <div className='border-t py-12'>
        <div className='container mx-auto px-6 text-center'>
          <p className='mb-4 text-gray-600'>Ready to build something amazing?</p>
          <Button>Start Building</Button>
        </div>
      </div>
    </div>
  );
}
