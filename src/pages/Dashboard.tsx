import { useAuth } from "../context/AuthContext";
import {
  Layout,
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../components";
import { MessageCircle, Users, Zap } from "lucide-react";

export function Dashboard() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Echo, {user?.display_name}!
          </h1>
          <p className="text-lg text-gray-600">
            Your voice matters. Start sharing your thoughts with the world.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <MessageCircle className="h-4 w-4 ml-auto text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-gray-500">Your echo starts here</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Followers</CardTitle>
              <Users className="h-4 w-4 ml-auto text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-gray-500">Build your community</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              <Zap className="h-4 w-4 ml-auto text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0%</div>
              <p className="text-xs text-gray-500">Connect with others</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>What's on your mind?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <textarea
                    className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Share your thoughts with the world..."
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      0 / 280 characters
                    </span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                      Post Echo
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Echoes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No echoes yet. Be the first to share something!</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-lg">
                        {user?.display_name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{user?.display_name}</p>
                      <p className="text-sm text-gray-500">@{user?.username}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Member since{" "}
                    {new Date(user?.created_at || "").toLocaleDateString()}
                  </p>
                  {user?.email_verified ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✓ Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      ⚠ Unverified
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    Discover what's happening in your community
                  </p>
                  <div className="text-center py-4 text-gray-400">
                    <p>No trending topics yet</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
