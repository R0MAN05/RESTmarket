import { Routes, Route } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";

import NavBar from "./components/NavBar"

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <ThemeProvider>
      <div style={{ maxHeight: "100vh" }}>
        <NavBar />
        <Routes>
          <Route index="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;