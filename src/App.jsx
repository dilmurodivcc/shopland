import { BrowserRouter } from "react-router-dom";
import RouterPage from "./routes/Route";
import "./scss/main.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <RouterPage />
      </BrowserRouter>
    </>
  );
}

export default App;
