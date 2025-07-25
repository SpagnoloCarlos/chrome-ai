import { Frown } from "lucide-react";

const NotAvailable = () => {
  return (
    <div className="text-center min-h-[70dvh] flex flex-col items-center justify-center space-y-4">
      <Frown className="h-16 w-16 text-gray-500" />
      <h1 className="text-2xl font-bold mb-4">No disponible</h1>
      <p className="text-gray-600">
        Esta funcionalidad requiere Google Chrome versión 138 o superior en
        escritorio. Actualmente, Chrome en dispositivos móviles no es
        compatible.
      </p>
    </div>
  );
};

export default NotAvailable;
