import { BrowserRouter } from "react-router-dom";
import RouterPage from "./routes/Route";
import "./scss/main.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import "antd/dist/reset.css";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RouterPage />
          <Toaster position="top-right" closeButton richColors />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
