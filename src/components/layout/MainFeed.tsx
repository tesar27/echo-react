import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useEchoes } from "../../hooks/useEchoes";
import { Button, Alert } from "../ui";
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
  Trash2,
} from "lucide-react";
import type { Echo } from "../../types/echo";

interface EchoItemProps {
  echo: Echo;
  onLike: (echoId: number) => void;
  onUnlike: (echoId: number) => void;
  onDelete: (echoId: number) => void;
  currentUserId?: number;
}

function EchoItem({
  echo,
  onLike,
  onUnlike,
  onDelete,
  currentUserId,
}: EchoItemProps) {
  const [isLiking, setIsLiking] = useState(false);

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return "now";
  };

  const handleLikeClick = async () => {
    if (isLiking) return;

    setIsLiking(true);
    try {
      if (echo.is_liked) {
        await onUnlike(echo.id);
      } else {
        await onLike(echo.id);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this echo?")) {
      try {
        await onDelete(echo.id);
      } catch (error) {
        console.error("Error deleting echo:", error);
      }
    }
  };

  const isOwner = currentUserId === echo.user_id;

  return (
    <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
      <div className="flex space-x-3">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          {echo.user.avatar_url ? (
            <img
              src={echo.user.avatar_url}
              alt={echo.user.display_name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <span className="text-blue-600 font-semibold">
              {echo.user.display_name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-900">
              {echo.user.display_name}
            </span>
            <span className="text-gray-500">@{echo.user.username}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">
              {formatRelativeTime(echo.created_at)}
            </span>
            <div className="ml-auto flex items-center space-x-2">
              {isOwner && (
                <button
                  onClick={handleDeleteClick}
                  className="p-1 rounded-full hover:bg-red-100 text-red-500 transition-colors"
                  title="Delete echo"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
              <MoreHorizontal className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-700" />
            </div>
          </div>

          <div className="mt-1">
            <p className="text-gray-900 whitespace-pre-wrap">{echo.content}</p>
          </div>

          <div className="flex items-center justify-between mt-3 max-w-md">
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-blue-50">
                <MessageCircle className="h-5 w-5" />
              </div>
              <span className="text-sm">0</span>
            </button>

            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-green-50">
                <Repeat className="h-5 w-5" />
              </div>
              <span className="text-sm">0</span>
            </button>

            <button
              onClick={handleLikeClick}
              disabled={isLiking}
              className={`flex items-center space-x-2 transition-colors group ${
                echo.is_liked
                  ? "text-red-500"
                  : "text-gray-500 hover:text-red-500"
              }`}
            >
              <div className="p-2 rounded-full group-hover:bg-red-50">
                <Heart
                  className={`h-5 w-5 ${echo.is_liked ? "fill-current" : ""}`}
                />
              </div>
              <span className="text-sm">{echo.likes_count}</span>
            </button>

            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-blue-50">
                <Share className="h-5 w-5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComposeEcho() {
  const { user } = useAuth();
  const { createEcho } = useEchoes();
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const maxLength = 280;

  const handleSubmit = async () => {
    if (!content.trim() || content.length > maxLength || isPosting) return;

    setIsPosting(true);
    setError(null);

    try {
      await createEcho({ content: content.trim() });
      setContent("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post echo");
    } finally {
      setIsPosting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="border-b border-gray-200 p-4">
      {error && (
        <div className="mb-4">
          <Alert variant="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </div>
      )}

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
            onKeyDown={handleKeyDown}
            placeholder="What's happening?"
            className="w-full text-xl placeholder-gray-500 bg-transparent border-none resize-none outline-none min-h-[120px]"
            maxLength={maxLength}
            disabled={isPosting}
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
                    ? content.length > maxLength
                      ? "text-red-500"
                      : "text-yellow-500"
                    : "text-gray-500"
                }`}
              >
                {content.length}/{maxLength}
              </span>
              <Button
                onClick={handleSubmit}
                disabled={
                  !content.trim() || content.length > maxLength || isPosting
                }
                isLoading={isPosting}
                className="rounded-full px-6 py-1.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
              >
                {isPosting ? "Posting..." : "Echo"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MainFeed() {
  const { user } = useAuth();
  const { echoes, loading, error, likeEcho, unlikeEcho, deleteEcho } =
    useEchoes();

  if (loading) {
    return (
      <div className="flex-1 max-w-2xl border-x border-gray-200">
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 p-4">
          <h1 className="text-xl font-bold text-gray-900">Home</h1>
        </div>
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading echoes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-2xl border-x border-gray-200">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 z-10">
        <h1 className="text-xl font-bold text-gray-900">Home</h1>
      </div>

      {/* Compose Echo */}
      <ComposeEcho />

      {/* Error Display */}
      {error && (
        <div className="p-4 border-b border-gray-200">
          <Alert variant="error">{error}</Alert>
        </div>
      )}

      {/* Feed */}
      <div>
        {echoes.length > 0 ? (
          echoes.map((echo) => (
            <EchoItem
              key={echo.id}
              echo={echo}
              onLike={likeEcho}
              onUnlike={unlikeEcho}
              onDelete={deleteEcho}
              currentUserId={user?.id ? parseInt(user.id) : undefined}
            />
          ))
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
