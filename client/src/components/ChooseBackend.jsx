import { useNavigate } from "react-router-dom";
import { FaDatabase } from "react-icons/fa"; // MERN logo placeholder
import { SiFirebase } from "react-icons/si"; // Firebase logo

export default function ChooseBackend() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 flex flex-col items-center animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Choose Your Backend
        </h2>
        <p className="text-gray-600 text-center mb-6">
          If you are hosting this app on Netlify, please choose <span className="font-semibold text-orange-500">Firebase</span>. <br />
          If you downloaded this repository and are running it locally, choose <span className="font-semibold text-green-600">MERN Stack</span>.
        </p>

        <div className="flex gap-6">
          {/* Firebase Button */}
          <button
            onClick={() => navigate("/login/firebase")}
            className="flex flex-col items-center bg-orange-100 hover:bg-orange-200 transition rounded-2xl p-6 w-40 justify-center"
          >
            <SiFirebase className="text-orange-500 w-12 h-12 mb-2" />
            <span className="font-semibold text-orange-700">Firebase</span>
          </button>

          {/* MERN Button */}
          <button
            onClick={() => navigate("/login/mern")}
            className="flex flex-col items-center bg-green-100 hover:bg-green-200 transition rounded-2xl p-6 w-40 justify-center"
          >
            <FaDatabase className="text-green-600 w-12 h-12 mb-2" />
            <span className="font-semibold text-green-700">MERN Stack</span>
          </button>
        </div>
      </div>

      {/* Animation style */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.5s ease-out; }
        `}
      </style>
    </div>
  );
}
