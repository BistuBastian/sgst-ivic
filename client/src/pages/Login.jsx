import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginRequest } from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginRequest(form);
      if (data.success && data.user) {
        login(data.user);
      } else {
        alert("Acceso denegado: Credenciales incorrectas");
      }
    } catch (error) {
      alert("Error de conexión con el servidor local");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-end bg-[url('./assets/images/Técnicos_01.png')] bg-cover">

      {/* Caja del formulario - Estilo estándar */}
      <div className="w-full max-w-sm mr-64 py-12 px-8 bg-background rounded-lg shadow-2xl">

        {/* Encabezado Institucional */}
        <div className="mb-6 border-b border-primary/50 pb-4">
          <h2 className="text-3xl font-jost font-bold text-primary uppercase text-center">
            SGST - IVIC
          </h2>
          <p className="text-xs text-text/50 text-center mt-1 mb-2">
            Control de Acceso OTIC
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Usuario */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-1">
              Nombre de Usuario:
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-primary/50 focus:border-primary focus:outline-none text-primary rounded-lg"
              placeholder="usuario"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          {/* Campo Contraseña */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-1">
              Contraseña:
            </label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 border border-primary/50 focus:border-primary focus:outline-none text-primary rounded-lg"
              placeholder="********"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Botón de Acción */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-primary hover:bg-background text-background hover:text-primary font-bold py-2 px-4 border-2 border-primary rounded-lg active:scale-95 transition-all duration-75 uppercase text-sm"
          >
            {loading ? "Procesando..." : "Entrar al Sistema"}
          </button>
        </form>

        {/* Pie de página del formulario */}
        <div className="w-full mt-8 pt-4 border-t border-primary/50 text-center">
          <p className="text-[10px] text-gray-400">
            Instituto Venezolano de Investigaciones Científicas (IVIC)
          </p>
        </div>
      </div>
    </div>
  );
}
