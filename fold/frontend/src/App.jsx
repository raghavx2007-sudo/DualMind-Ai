import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import PersonalAI from "./pages/PersonalAI";
import Dashboard from "./pages/Dashboard";
import Learning from "./pages/Learning";
import Tasks from "./pages/Tasks";
import Reminders from "./pages/Reminders";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        <Route path="/" element={<Dashboard />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/ai" element={<PersonalAI />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </AnimatePresence>
  );
}

export default App;