import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail } from "lucide-react";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  Alert,
} from "../ui";
import { authService } from "../../services/auth";
import type { EmailVerificationRequest } from "../../types/auth";

const resendSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

interface ResendVerificationProps {
  onBack?: () => void;
}

export function ResendVerification({ onBack }: ResendVerificationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailVerificationRequest>({
    resolver: zodResolver(resendSchema),
  });

  const onSubmit = async (data: EmailVerificationRequest) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await authService.resendVerification(data);
      setSuccess(response.message || "Verification email sent successfully!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send verification email"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
          <Mail className="h-6 w-6 text-blue-600" />
        </div>
        <CardTitle>Resend Verification Email</CardTitle>
        <p className="text-gray-600">
          Enter your email address and we'll send you a new verification link
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert variant="success" onClose={() => setSuccess(null)}>
              {success}
            </Alert>
          )}

          <Input
            label="Email Address"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            placeholder="your@email.com"
            autoComplete="email"
          />

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Verification Email"}
          </Button>
        </form>

        {onBack && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onBack}
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Back to login
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
