"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface HandleErrorProps {
  error?: Error;
  title?: string;
  description?: string;
  showRefresh?: boolean;
  onRetry?: () => void;
}

export default function HandleError({
  error,
  title = "Ocurrió un error",
  description = "Ha ocurrido un problema al cargar los datos. Por favor, inténtalo de nuevo.",
  showRefresh = true,
  onRetry,
}: HandleErrorProps) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);

    try {
      if (onRetry) {
        await onRetry();
      } else {
        // Recargar la página actual
        router.refresh();
        // Alternativa: window.location.reload() para recarga completa
      }
    } catch (err) {
      console.error("Error al recargar:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="mx-4 md:mx-6">
      <Alert variant="destructive">
        <AlertCircleIcon className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          <p className="mb-3">{description}</p>

          {/* Mostrar detalles del error en desarrollo */}
          {process.env.NODE_ENV === "development" && error && (
            <details className="mt-2 mb-3">
              <summary className="cursor-pointer text-sm font-medium">
                Detalles del error (solo en desarrollo)
              </summary>
              <pre className="mt-2 text-xs bg-red-50 p-2 rounded overflow-x-auto">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}

          {showRefresh && (
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw
                className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`}
              />
              {isRefreshing ? "Recargando..." : "Reintentar"}
            </button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}
