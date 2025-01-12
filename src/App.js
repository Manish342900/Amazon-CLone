import { CartProvider } from "./Components/cart";
import CheckOut from "./Components/CheckOut/CheckOut";
import Header from "./Components/Header";
import Order from "./Components/Order/Order";
import Index from "./Components/product";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { DeliveryProvider } from "./Components/CheckOut/delivery";
import { InputProvider } from "./Components/Header/Input";

function App() {
  return (
    <Router basename="/Amazon-Clone" >
      <CartProvider>
        <DeliveryProvider>
          <InputProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/order" element={<Order />} />
            </Routes>
          </InputProvider>
        </DeliveryProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
