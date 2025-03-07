import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

const Unauthorised = () => {
//   // remove the auth token from local storage
//   localStorage.removeItem("authToken");
//   localStorage.removeItem("user");

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background p-4 space-y-8">
      <TriangleAlert className="w-16 h-16 text-destructive" />
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          401
        </h1>
        <h2 className="text-2xl font-semibold tracking-tight text-muted-foreground">
          Unauthorized
        </h2>
      </div>
      <p className="text-center text-muted-foreground max-w-[42rem]">
        You are not authorised to view this page. 
      </p>
      <Button asChild size="lg">
        <a href="/">Go Back Home</a>
      </Button>
    </div>
  );
};

export default Unauthorised;