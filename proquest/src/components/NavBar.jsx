import { NavLink } from 'react-router-dom';
import { FaCrosshairs } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const NavBar = () => {
  const APPNAME = 'ProQuest';
  const location = useLocation();

      // const HLink = ({className, to,label}) =>{
    //     const isActive = false
    //     return(
    //         <a href={to} className={`${className} ${isActive && "bg-black"}`}>
    //             {label}
    //         </a>
    //     )
    // }

  const NLink = ({ className, to, label }) => {
    const isActive = location.pathname === to;
    const shouldHighlight = label !== APPNAME && isActive; // Highlight active link except for APPNAME, // dont hight the appname part

    return (
      <NavLink
        to={to}
        className={`${className} ${shouldHighlight ? 'bg-black' : ''}`}
        activeClassName="bg-black"
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
        <div className="flex space-x-4">
          {navelems.map((elem, index) => (
            <NLink
              key={index}
              to={elem.link}
              label={elem.label}
              className="p-1 rounded-md text-white hover:text-gray-900 hover:bg-gray-100"
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
