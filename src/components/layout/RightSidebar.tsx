import { useUsers } from "../../hooks/useUsers";
import { Button } from "../ui";
import { Search, MoreHorizontal } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "../ui";
import type { UserProfile } from "../../types/user";

interface TrendingItem {
  category: string;
  title: string;
  posts: string;
}

interface UserCardProps {
  user: UserProfile;
  onFollow: (userId: number) => void;
  onUnfollow: (userId: number) => void;
  isLoading?: boolean;
}

function SearchBar() {
  return (
    <div className="relative mb-4">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search Echo"
        className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-full border-none outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-colors"
      />
    </div>
  );
}

function TrendingCard() {
  const trending: TrendingItem[] = [
    { category: "Technology", title: "React 19", posts: "125K Echoes" },
    { category: "Programming", title: "TypeScript", posts: "89K Echoes" },
    { category: "Web Development", title: "Vite", posts: "45K Echoes" },
    { category: "Trending", title: "AI Revolution", posts: "234K Echoes" },
    { category: "Tech News", title: "Open Source", posts: "67K Echoes" },
  ];

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-xl font-bold">What's happening</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {trending.map((item, index) => (
          <div
            key={index}
            className="p-3 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="font-bold text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500">{item.posts}</p>
              </div>
              <MoreHorizontal className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        ))}
        <div className="p-3">
          <button className="text-blue-500 hover:underline">Show more</button>
        </div>
      </CardContent>
    </Card>
  );
}

function UserCard({ user, onFollow, onUnfollow, isLoading }: UserCardProps) {
  const handleFollowClick = () => {
    if (user.is_following) {
      onUnfollow(user.id);
    } else {
      onFollow(user.id);
    }
  };

  return (
    <div className="p-3 hover:bg-gray-50 transition-colors">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-blue-600 font-semibold text-sm">
            {user.display_name.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900 text-sm">
                {user.display_name}
              </p>
              <p className="text-gray-500 text-sm">@{user.username}</p>
            </div>
            <Button
              onClick={handleFollowClick}
              disabled={isLoading}
              variant={user.is_following ? "secondary" : "primary"}
              className="px-4 py-1.5 text-sm rounded-full"
            >
              {user.is_following ? "Following" : "Follow"}
            </Button>
          </div>
          {user.bio && <p className="text-gray-500 text-sm mt-1">{user.bio}</p>}
        </div>
      </div>
    </div>
  );
}

function SuggestedFollowsCard() {
  const { suggestedUsers, loading, followUser, unfollowUser } = useUsers();

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Who to follow</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="p-4 text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-500 text-sm">Loading suggestions...</p>
          </div>
        ) : suggestedUsers.length > 0 ? (
          <>
            {suggestedUsers.slice(0, 3).map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onFollow={followUser}
                onUnfollow={unfollowUser}
              />
            ))}
            <div className="p-3">
              <button className="text-blue-500 hover:underline">
                Show more
              </button>
            </div>
          </>
        ) : (
          <div className="p-3 text-gray-500 text-sm">
            No suggestions available
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function FooterLinks() {
  const links = [
    "Terms of Service",
    "Privacy Policy",
    "Cookie Policy",
    "Accessibility",
    "Ads info",
    "More",
  ];

  return (
    <div className="text-xs text-gray-500 px-4">
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {links.map((link, index) => (
          <button key={index} className="hover:underline">
            {link}
          </button>
        ))}
      </div>
      <p className="mt-2">© 2025 Echo Corp.</p>
    </div>
  );
}

export function RightSidebar() {
  return (
    <div className="w-80 p-4 hidden lg:block">
      <div className="sticky top-4 space-y-4">
        <SearchBar />
        <TrendingCard />
        <SuggestedFollowsCard />
        <FooterLinks />
      </div>
    </div>
  );
}
