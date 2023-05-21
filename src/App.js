import "./App.css";
import Layout from "./Layout/Layout";
import LoginScreen from "./screens/LoginScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout screen={"dashboard"} />} />
        <Route path="/login" element={<LoginScreen/> } />
        <Route path="/products" element={<Layout screen={"products"} />} />
        <Route path="/category" element={<Layout screen={"category"} />} />
        <Route path="/orders" element={<Layout screen={"orders"} />} />
        <Route path="/coupons" element={<Layout screen={"coupons"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
