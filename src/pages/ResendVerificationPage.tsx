import { ResendVerification } from "../components/auth/ResendVerification";
import { Layout } from "../components/layout";

export function ResendVerificationPage() {
  return (
    <Layout showHeader={false}>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <ResendVerification onBack={() => window.history.back()} />
      </div>
    </Layout>
  );
}
