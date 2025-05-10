
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading) {
      if (session) {
        toast({
          title: "Login successful",
          description: "You have been successfully logged in.",
        });
        navigate("/");
      } else {
        toast({
          title: "Authentication error",
          description: "There was a problem with your authentication.",
          variant: "destructive",
        });
        navigate("/login");
      }
    }
  }, [session, loading, navigate, toast]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-yellow"></div>
      <p className="mt-4 text-lg">Completing authentication...</p>
    </div>
  );
};

export default AuthCallbackPage;
