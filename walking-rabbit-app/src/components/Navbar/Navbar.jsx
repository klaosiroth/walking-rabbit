import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="Navbar">
      <div className="container">
        <div className="Navbar__logo">
          <Link to="/">Walking Rabbit</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
