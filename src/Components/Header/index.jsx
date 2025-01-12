import './amazon-header.css';
import Search from "../../images/icons/search-icon.png"
import CartIcon from "../../images/icons/cart-icon.png"
import Logo from "../../images/amazon-logo-white.png"
import LogoMobile from "../../images/amazon-mobile-logo-white.png"
import { Link } from 'react-router-dom';
import { useCart } from '../cart';
import { useInput } from './Input';


export default function Header() {
    const{quantity}=useCart()
    const {input,updateInput}=useInput()
  
   
  return (
    <div>
      <div className="amazon-header">
        <div className="amazon-header-left-section">
          <Link to='/' className="header-link">
            <img className="amazon-logo" src={Logo} alt="Amazon Logo" />
            <img className="amazon-mobile-logo" src={LogoMobile} alt="Amazon Mobile Logo" />
          </Link>
        </div>

        <div className="amazon-header-middle-section">
          <input className="search-bar" type="text" placeholder="Search" value={input} onChange={(e)=>updateInput(e.target.value)}/>

          <button className="search-button">
            <img className="search-icon" src={Search} alt="Search Icon" />
          </button>
        </div>

        <div className="amazon-header-right-section">
          <Link className="orders-link header-link" to="/order">
            <span className="returns-text">Returns</span>
            <span className="orders-text">& Orders</span>
          </Link>

          <Link  className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={CartIcon} alt="Cart Icon" />
            <div className="cart-quantity">{quantity}</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    </div>

  );
}
