import { CartProvider } from "./Components/cart";
import CheckOut from "./Components/CheckOut/CheckOut";
import Header from "./Components/Header";
import Order from "./Components/Order/Order";
import Index from "./Components/product";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { DeliveryProvider } from "./Components/CheckOut/delivery";

function App() {
  return (
    <Router basename="/Amazon-Clone" >
      <CartProvider>
        <DeliveryProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </DeliveryProvider>

      </CartProvider>
    </Router>
  );
}

export default App;
