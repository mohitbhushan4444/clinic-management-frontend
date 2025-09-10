import { useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Auth/Login";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={handleLogout} />;
};

export default Index;
