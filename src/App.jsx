import { useEffect } from "react";
import ParentDashboard from "./pages/parent/ParentDashboard";
import { useAppStore } from "./store";

export default function App() {
  const { checkDailyReset } = useAppStore();

  useEffect(() => {
    checkDailyReset();
  }, []);

  return <ParentDashboard />;
}
