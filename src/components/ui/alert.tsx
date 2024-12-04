import { cn } from "@/lib/utils";
import {
  CheckWaves,
  DangerTriangle,
  DangerWaves,
  InfoWaves,
} from "@mynaui/icons-react";

type AlertType = "success" | "error" | "warning" | "info";

type AlertProps = {
  title: string;
  description?: string;
  type?: AlertType;
};

const Alert = ({ title, description, type = "info" }: AlertProps) => {
  const getAlertStyles = (type: AlertType) => {
    switch (type) {
      case "success":
        return "bg-gradient-to-r from-emerald-800 to-transparent border-emerald-200 text-emerald-900";
      case "error":
        return "  bg-gradient-to-r from-red-500 to-transparent border-red-200 text-red-900";
      case "warning":
        return "  bg-gradient-to-r from-amber-50 to-transparent border-amber-200 text-amber-900";
      case "info":
        return "  bg-gradient-to-r from-blue-50 to-transparent border-blue-200 text-blue-900";
    }
  };

  const getIcon = (type: AlertType) => {
    switch (type) {
      case "success":
        return <CheckWaves className="h-5 w-5 text-emerald-500" />;
      case "error":
        return <DangerWaves className="h-5 w-5 text-red-500" />;
      case "warning":
        return <DangerTriangle className="h-5 w-5 text-amber-500" />;
      case "info":
        return <InfoWaves className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-lg border p-4 shadow-sm",
        getAlertStyles(type),
      )}
      role="alert"
    >
      <div className="flex-shrink-0 pt-0.5">{getIcon(type)}</div>
      <div className="flex-1 space-y-1">
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && <p className="text-sm opacity-80">{description}</p>}
      </div>
    </div>
  );
};

export default Alert;
