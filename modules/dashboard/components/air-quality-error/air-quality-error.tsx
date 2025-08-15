"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { useRouter } from "next/navigation";

type ErrorComponentProps = {
  error?: Error | any;
  title?: string;
  description?: string;
  showRetry?: boolean;
  showHome?: boolean;
  onRetry?: () => void;
  className?: string;
};

export const AirQualityError = ({
  error,
  title = "Error al cargar los datos",
  description,
  showRetry = true,
  showHome = false,
  onRetry,
  className = "",
}: ErrorComponentProps) => {
  const router = useRouter();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const getErrorMessage = () => {
    if (description) return description;

    if (error?.message) return error.message;

    if (typeof error === "string") return error;

    return "Ha ocurrido un error inesperado al cargar la información de calidad del aire.";
  };

  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <Card className="w-full max-w-md">
        <Alert className="border-0">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="mb-2">{title}</AlertTitle>
          <AlertDescription className="mb-4">
            {getErrorMessage()}
          </AlertDescription>

          <div className="flex flex-col sm:flex-row gap-2">
            {showRetry && (
              <Button
                onClick={handleRetry}
                variant="default"
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reintentar
              </Button>
            )}

            {showHome && (
              <Button
                onClick={handleGoHome}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Ir al inicio
              </Button>
            )}
          </div>
        </Alert>
      </Card>
    </div>
  );
};
