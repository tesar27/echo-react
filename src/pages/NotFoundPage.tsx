import { Link } from "react-router-dom";
import { MessageCircle, Home } from "lucide-react";
import { Button } from "../components";

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">404</h2>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Page Not Found
            </h3>
            <p className="text-gray-600 mb-6">
              Sorry, we couldn't find the page you're looking for. The echo
              you're searching for might have been moved or deleted.
            </p>
            <Link to="/" className="inline-flex items-center space-x-2">
              <Button className="inline-flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Go back home</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
