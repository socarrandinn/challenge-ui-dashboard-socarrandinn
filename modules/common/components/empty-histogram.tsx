import { BarChart3 } from "lucide-react";

const EmptyHistogram = ({
  title = "Sin datos disponibles",
  description = "No hay información para mostrar en este momento",
  icon: Icon = BarChart3,
  height = "250px",
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg p-8"
      style={{ height }}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
          <Icon className="h-12 w-12 text-gray-400 dark:text-gray-200" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-300 max-w-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyHistogram;
