// import logo from "./logo.svg";
import "./App.css";
import { ThemeChangeProvider } from "./contexts/ThemeChangeContext";
import MainComponent from "./components/MainComponent";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";

// App
function App() {
  return (
    <ThemeChangeProvider>
      <BrowserRouter basename="/app">
        <UserProvider>
          <MainComponent />
        </UserProvider>
      </BrowserRouter>
    </ThemeChangeProvider>
  );
}

export default App;
