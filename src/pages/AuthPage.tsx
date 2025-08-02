import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginForm, RegisterForm, Layout } from "../components";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleAuthSuccess = () => {
    navigate(from, { replace: true });
  };

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {isLogin ? (
          <LoginForm
            onSuccess={handleAuthSuccess}
            onSwitchToRegister={() => setIsLogin(false)}
          />
        ) : (
          <RegisterForm
            onSuccess={() => {
              setIsLogin(true);
              // Optionally show a success message here
            }}
            onSwitchToLogin={() => setIsLogin(true)}
          />
        )}
      </div>
    </Layout>
  );
}
