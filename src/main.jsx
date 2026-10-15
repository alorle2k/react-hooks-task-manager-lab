import { StrictMode } from "react"; import { createRoot } from "react-dom/client"; import App from "./components/App"; import { TaskProvider } from "./context/TaskContext"; import "./index.css";

createRoot(document.getElementById("root")).render( <StrictMode> <TaskProvider> <App /> </TaskProvider> </StrictMode> );