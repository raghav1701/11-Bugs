// import logo from "./logo.svg";
import "./App.css";
import MainComponent from "./components/MainComponent";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers";

// App
const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <MainComponent />
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
