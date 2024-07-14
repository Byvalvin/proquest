import { NavLink } from 'react-router-dom';
import { FaCrosshairs, FaBars } from 'react-icons/fa'; // Added FaBars for hamburger menu icon
import { useLocation } from 'react-router-dom';
import { useState } from 'react'; // Added useState for managing menu state

const NavBar = () => {
  const APPNAME = 'ProQuest';
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // State for toggling the menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const NLink = ({ className, to, label }) => {
    const isActive = location.pathname === to;
    const shouldHighlight = label !== APPNAME && isActive;

    return (
      <NavLink
        to={to}
        className={`${className} ${shouldHighlight ? 'bg-black' : ''}`}
        activeClassName="bg-black"
        onClick={closeMenu} // Close menu on link click (optional)
      >
        {label}
      </NavLink>
    );
  };

  const navelems = [
    { label: 'Home', link: '/' },
    { label: 'Players', link: '/players' },
    { label: 'Teams', link: '/teams' },
    { label: 'Join Network', link: '/join' },
    { label: 'Planner', link: '/planner' },
  ];

  return (
    <nav className="bg-blue-500 py-5">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-2">
          <FaCrosshairs className="text-white text-3xl" />
          <NLink className="text-white text-xl font-bold" to="/" label={APPNAME} />
        </div>

        {/* Hamburger Menu Button */}
        <div className="flex md:hidden"> {/* Show only on mobile */}
          <button
            onClick={toggleMenu}
            className="text-white text-2xl focus:outline-none"
            aria-label="Toggle navigation"
          >
            <FaBars />
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`md:flex ${isOpen ? 'block' : 'hidden'} md:block space-x-4 mt-4 md:mt-0`}>
          {navelems.map((elem, index) => (
            <NLink
              key={index}
              to={elem.link}
              label={elem.label}
              className="block md:inline-block p-1 rounded-md text-white hover:text-gray-900 hover:bg-gray-100"
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
