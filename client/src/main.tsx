import './index.css'
import ReactDOM from "react-dom/client";
import App from './index.tsx';
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
