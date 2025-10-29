import { AlertCircle, CheckCircle2, Info } from "lucide-react";

export type ValidationMessageType = "error" | "success" | "info" | "warning";

interface ValidationMessageProps {
  message: string;
  type?: ValidationMessageType;
  id?: string;
  className?: string;
}

/**
 * Displays validation messages for form fields with appropriate styling and icons
 * Includes ARIA live region for screen reader announcements
 */
export function ValidationMessage({
  message,
  type = "error",
  id,
  className = "",
}: ValidationMessageProps) {
  const styles = {
    error: {
      container: "text-red-600 dark:text-red-400",
      icon: <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />,
      ariaRole: "alert" as const,
    },
    success: {
      container: "text-green-600 dark:text-green-400",
      icon: <CheckCircle2 className="h-4 w-4 flex-shrink-0" aria-hidden="true" />,
      ariaRole: "status" as const,
    },
    info: {
      container: "text-blue-600 dark:text-blue-400",
      icon: <Info className="h-4 w-4 flex-shrink-0" aria-hidden="true" />,
      ariaRole: "status" as const,
    },
    warning: {
      container: "text-yellow-600 dark:text-yellow-400",
      icon: <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />,
      ariaRole: "alert" as const,
    },
  };

  const style = styles[type];

  return (
    <div
      id={id}
      role={style.ariaRole}
      aria-live={type === "error" ? "assertive" : "polite"}
      aria-atomic="true"
      className={`flex items-start gap-2 text-sm ${style.container} ${className}`}
    >
      {style.icon}
      <span>{message}</span>
    </div>
  );
}

interface PasswordRequirementsProps {
  password: string;
  requirements: Array<{
    label: string;
    test: (password: string) => boolean;
  }>;
  className?: string;
}

/**
 * Displays password requirements with visual indicators of which are met
 */
export function PasswordRequirements({
  password,
  requirements,
  className = "",
}: PasswordRequirementsProps) {
  return (
    <div
      className={`space-y-1 text-sm ${className}`}
      role="group"
      aria-label="Password requirements"
    >
      <p className="font-medium text-muted-foreground mb-2">
        Password must contain:
      </p>
      {requirements.map((req, index) => {
        const isMet = password ? req.test(password) : false;
        return (
          <div
            key={index}
            className={`flex items-center gap-2 ${
              isMet
                ? "text-green-600 dark:text-green-400"
                : "text-muted-foreground"
            }`}
          >
            {isMet ? (
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            ) : (
              <div
                className="h-4 w-4 rounded-full border-2 border-current flex-shrink-0"
                aria-hidden="true"
              />
            )}
            <span>{req.label}</span>
          </div>
        );
      })}
    </div>
  );
}
