import { Search, MoreHorizontal } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "../ui";

interface TrendingItem {
  category: string;
  title: string;
  posts: string;
}

interface SuggestedUser {
  name: string;
  username: string;
  bio: string;
  isFollowing: boolean;
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

function SuggestedFollowsCard() {
  const suggestions: SuggestedUser[] = [
    {
      name: "React",
      username: "reactjs",
      bio: "The library for web and native user interfaces",
      isFollowing: false,
    },
    {
      name: "Vercel",
      username: "vercel",
      bio: "Develop. Preview. Ship. For the best frontend teams",
      isFollowing: false,
    },
    {
      name: "TypeScript",
      username: "typescript",
      bio: "TypeScript is a language for application scale JavaScript development",
      isFollowing: false,
    },
  ];

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Who to follow</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {suggestions.map((user, index) => (
          <div key={index} className="p-3 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">
                      {user.name}
                    </p>
                    <p className="text-gray-500 text-sm">@{user.username}</p>
                  </div>
                  <button className="bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                    Follow
                  </button>
                </div>
                <p className="text-gray-500 text-sm mt-1">{user.bio}</p>
              </div>
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
