import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import { Button, Card, CardHeader, CardContent, CardTitle } from "../ui";
import { authService } from "../../services/auth";

export function EmailVerification() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await authService.verifyEmail(token);
        setStatus("success");
        setMessage(response.message || "Email verified successfully!");
      } catch (err) {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : "Verification failed");
      }
    };

    verifyEmail();
  }, [token]);

  const handleContinue = () => {
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4">
            {status === "loading" && (
              <Loader className="h-8 w-8 text-blue-600 animate-spin" />
            )}
            {status === "success" && (
              <CheckCircle className="h-8 w-8 text-green-600" />
            )}
            {status === "error" && <XCircle className="h-8 w-8 text-red-600" />}
          </div>
          <CardTitle>
            {status === "loading" && "Verifying Email..."}
            {status === "success" && "Email Verified!"}
            {status === "error" && "Verification Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-6">{message}</p>

          {status !== "loading" && (
            <Button onClick={handleContinue} className="w-full">
              {status === "success" ? "Continue to Login" : "Back to Login"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
