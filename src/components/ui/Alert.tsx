import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "../../lib/utils";

interface AlertProps {
  variant?: "success" | "error" | "warning" | "info";
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertCircle,
  info: Info,
};

const variants = {
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
};

const iconColors = {
  success: "text-green-400",
  error: "text-red-400",
  warning: "text-yellow-400",
  info: "text-blue-400",
};

export function Alert({
  variant = "info",
  title,
  children,
  onClose,
  className,
}: AlertProps) {
  const Icon = icons[variant];

  return (
    <div
      className={cn(
        "relative rounded-lg border p-4",
        variants[variant],
        className
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={cn("h-5 w-5", iconColors[variant])} />
        </div>
        <div className="ml-3 flex-1">
          {title && <h3 className="text-sm font-medium mb-1">{title}</h3>}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className="inline-flex rounded-md p-1.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={onClose}
              >
                <span className="sr-only">Dismiss</span>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
