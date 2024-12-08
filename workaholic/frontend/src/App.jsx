import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
