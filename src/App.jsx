import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  const [isDark, setIsDark] = useState(
    JSON.parse(sessionStorage.getItem("isDarkMode"))
  );

  return (
    <ThemeProvider value={[isDark,setIsDark]}>
      <Header />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
