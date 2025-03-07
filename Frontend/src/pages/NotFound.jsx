import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background p-4 space-y-8">
      <AlertCircle className="w-16 h-16 text-destructive" />
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          404
        </h1>
        <h2 className="text-2xl font-semibold tracking-tight text-muted-foreground">
          Page not found
        </h2>
      </div>
      <p className="text-center text-muted-foreground max-w-[42rem]">
        We're sorry, but the page you're looking for doesn't exist or has been
        moved. Please check the URL or try navigating back to our homepage.
      </p>
      <Button asChild size="lg">
        <a href="/">Go back home</a>
      </Button>
    </div>
  );
}
