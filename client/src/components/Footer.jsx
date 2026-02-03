import { LuScanEye } from "react-icons/lu";
import { SiMongodb, SiReact, SiTailwindcss, SiExpress, SiNodedotjs } from "react-icons/si";
import { SiFirebase } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-[#2a2a2a] bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
        {/* Left: Logo + Name */}
        <div className="flex items-center gap-2">
          <LuScanEye className="text-green-500 text-lg" />
          <span>
            Built by <span className="text-white font-medium">Matthew John</span>
          </span>
        </div>

        {/* Right: Tech stack */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">Built with</span>

          <SiFirebase
            title="Firebase"
            className="text-yellow-400 text-lg hover:scale-110 transition"
          />
          <SiMongodb
            title="MongoDB"
            className="text-green-500 text-lg hover:scale-110 transition"
          />
          <SiReact
            title="React"
            className="text-sky-400 text-lg hover:scale-110 transition"
          />
          <SiTailwindcss
            title="Tailwind CSS"
            className="text-cyan-400 text-lg hover:scale-110 transition"
          />
          <SiExpress
            title="Express.js"
            className="text-gray-300 text-lg hover:scale-110 transition"
          />
          <SiNodedotjs
            title="Node.js"
            className="text-green-600 text-lg hover:scale-110 transition"
          />
        </div>
      </div>
    </footer>
  );
}
