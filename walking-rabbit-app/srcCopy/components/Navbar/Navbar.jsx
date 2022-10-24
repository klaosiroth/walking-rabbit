import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="Navbar">
      <div className="container">
        <div className="Navbar__logo">
          <Link to="/">React</Link>
        </div>
        <ul className="Navbar__nav">
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
