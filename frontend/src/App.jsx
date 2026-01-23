import { Routes, Route } from "react-router";

import NavBar from "./pageComponents/NavBar";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";

function App() {
  return (
    <div style={{ maxHeight: "100vh" }}>
      <NavBar />
      <Routes>
        <Route index="/" element={<HomePage />}></Route>
        <Route index="/create" element={<CreatePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;