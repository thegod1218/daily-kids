import ParentDashboard from "./pages/parent/ParentDashboard";
import { useAppStore } from "./store";
import { useEffect } from "react";

export default function App() {
  const { checkDailyReset } = useAppStore();
  
  useEffect(() => {
    checkDailyReset();
  }, []);

  return <ParentDashboard />;
}
