import { Frown } from "lucide-react";

const NotAvailable = () => {
  return (
    <div className="text-center min-h-[70dvh] flex flex-col items-center justify-center space-y-4">
      <Frown className="h-16 w-16 text-gray-500" />
      <h1 className="text-2xl font-bold mb-4">No disponible</h1>
      <p className="text-gray-600">
        Es requerido el uso del navegador Google Chrome en su versión 138 o
        superior.
      </p>
    </div>
  );
};

export default NotAvailable;
