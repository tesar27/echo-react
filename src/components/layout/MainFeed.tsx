import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui";
import {
  Image,
  Smile,
  Calendar,
  MapPin,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Repeat,
  Share,
} from "lucide-react";

interface PostProps {
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  replies: number;
}

function PostItem({
  user,
  content,
  timestamp,
  likes,
  retweets,
  replies,
}: PostProps) {
  return (
    <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
      <div className="flex space-x-3">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-blue-600 font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-900">{user.name}</span>
            <span className="text-gray-500">@{user.username}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{timestamp}</span>
            <MoreHorizontal className="h-4 w-4 text-gray-500 ml-auto cursor-pointer hover:text-gray-700" />
          </div>

          <div className="mt-1">
            <p className="text-gray-900 text-sm">{content}</p>
          </div>

          <div className="flex items-center justify-between mt-3 max-w-md">
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">{replies}</span>
            </button>

            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
              <Repeat className="h-5 w-5" />
              <span className="text-sm">{retweets}</span>
            </button>

            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
              <Heart className="h-5 w-5" />
              <span className="text-sm">{likes}</span>
            </button>

            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
              <Share className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComposeEcho() {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const maxLength = 280;

  return (
    <div className="border-b border-gray-200 p-4">
      <div className="flex space-x-3">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-blue-600 font-semibold">
            {user?.display_name?.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="w-full text-xl placeholder-gray-500 bg-transparent border-none resize-none outline-none"
            rows={3}
            maxLength={maxLength}
          />

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-blue-50 text-blue-500 transition-colors">
                <Image className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-blue-50 text-blue-500 transition-colors">
                <Smile className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-blue-50 text-blue-500 transition-colors">
                <Calendar className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-blue-50 text-blue-500 transition-colors">
                <MapPin className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <span
                className={`text-sm ${
                  content.length > maxLength * 0.9
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {content.length}/{maxLength}
              </span>
              <Button
                disabled={!content.trim() || content.length > maxLength}
                className="rounded-full px-6 py-1.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
              >
                Echo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MainFeed() {
  // Sample posts data
  const samplePosts: PostProps[] = [
    {
      user: { name: "John Doe", username: "johndoe", avatar: "" },
      content:
        "Just had an amazing coffee this morning! ☕ Starting the day right with some good vibes and productivity. What's everyone up to today?",
      timestamp: "2h",
      likes: 12,
      retweets: 3,
      replies: 5,
    },
    {
      user: { name: "Jane Smith", username: "janesmith", avatar: "" },
      content:
        "Working on a new project and feeling excited about the possibilities! Technology really is amazing when you think about all the things we can build. #coding #tech",
      timestamp: "4h",
      likes: 28,
      retweets: 8,
      replies: 12,
    },
    {
      user: { name: "Mike Johnson", username: "mikej", avatar: "" },
      content:
        "Beautiful sunset today! 🌅 Sometimes you just need to pause and appreciate the simple things in life.",
      timestamp: "6h",
      likes: 45,
      retweets: 15,
      replies: 8,
    },
  ];

  return (
    <div className="flex-1 max-w-2xl border-x border-gray-200">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 p-4">
        <h1 className="text-xl font-bold text-gray-900">Home</h1>
      </div>

      {/* Compose Echo */}
      <ComposeEcho />

      {/* Feed */}
      <div>
        {samplePosts.length > 0 ? (
          samplePosts.map((post, index) => <PostItem key={index} {...post} />)
        ) : (
          <div className="p-8 text-center text-gray-500">
            <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">No echoes yet</p>
            <p className="text-sm">
              When people you follow share echoes, they'll show up here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
