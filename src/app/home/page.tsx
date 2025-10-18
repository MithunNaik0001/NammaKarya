import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserNav } from '@/components/app/user-nav';
import { Logo } from '@/components/icons';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="size-6" />
            <span className="text-lg font-bold">NammaKarya</span>
          </Link>
          <UserNav />
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold tracking-tight">Welcome to NammaKarya</CardTitle>
              <CardDescription className="text-lg text-muted-foreground pt-2">
                Your trusted platform for connecting with skilled local professionals.
                <br />
                What would you like to do today?
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <div className="flex flex-col items-center gap-4 p-6 border rounded-lg hover:bg-accent/50 transition-colors w-full sm:w-1/2">
                <h3 className="text-xl font-semibold">I want to hire someone</h3>
                <p className="text-muted-foreground text-sm">Find and hire verified professionals for your service needs.</p>
                <Button asChild size="lg" className="w-full">
                  <Link href="#">Hire a Professional</Link>
                </Button>
              </div>
              <div className="flex flex-col items-center gap-4 p-6 border rounded-lg hover:bg-accent/50 transition-colors w-full sm:w-1/2">
                <h3 className="text-xl font-semibold">I am a skilled worker</h3>
                <p className="text-muted-foreground text-sm">Join our network to find job opportunities and grow your business.</p>
                <Button asChild variant="secondary" size="lg" className="w-full">
                  <Link href="#">Join as a Worker</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
