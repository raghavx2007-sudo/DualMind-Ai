import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0f172a] text-black dark:text-white transition-colors duration-300">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <Topbar />
        <div className="p-6">{children}</div>
      </div>

    </div>
  );
}