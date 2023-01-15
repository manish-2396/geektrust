import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./Conponents/Pages/Cart";
import Home from "./Conponents/Pages/Home";
import Navbar from "./Conponents/Pages/Navbar";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
