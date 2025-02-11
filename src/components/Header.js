import { Link } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';
import { FaLaptop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa';
import { useContext } from 'react';
import DataContext from '../context/DataContext';

const Header = () => {
  const { search, setSearch } = useContext(DataContext);
  const { width } = useWindowSize();

  return (
    <header>
      <nav>
        <input
          type='text'
          placeholder='Search for a question...'
          id='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/question'>Add Question</Link>
          </li>
          <li>
            <Link to='/domains'>Search by Domains</Link>
          </li>
        </ul>
        <span className='headerIcon'>
          {width > 992 ? (
            <FaLaptop />
          ) : width < 762 ? (
            <FaMobileAlt />
          ) : (
            <FaTabletAlt />
          )}
        </span>
      </nav>
    </header>
  );
};

export default Header;
