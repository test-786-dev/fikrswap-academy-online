
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Get the URL hash
      const hash = window.location.hash;

      if (hash && hash.includes("error")) {
        // Extract error from hash
        const errorMatch = hash.match(/error=([^&]*)/);
        const errorDescMatch = hash.match(/error_description=([^&]*)/);
        const error = errorMatch ? decodeURIComponent(errorMatch[1]) : "Unknown error";
        const errorDesc = errorDescMatch ? decodeURIComponent(errorDescMatch[1]) : "";

        console.error("Auth callback error:", error, errorDesc);
        toast({
          title: "Authentication error",
          description: errorDesc || "There was a problem with your authentication.",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      if (loading) return;

      if (session) {
        console.log("Auth successful, session exists:", !!session);
        toast({
          title: "Login successful",
          description: "You have been successfully logged in.",
        });
        navigate("/");
      } else {
        // This can happen if there was an issue with the OAuth flow
        console.log("No session found in callback");
        toast({
          title: "Authentication error",
          description: "There was a problem with your authentication. Provider might not be enabled.",
          variant: "destructive",
        });
        navigate("/login");
      }
    };

    handleAuthCallback();
  }, [session, loading, navigate, toast]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-yellow"></div>
      <p className="mt-4 text-lg">Completing authentication...</p>
    </div>
  );
};

export default AuthCallbackPage;
