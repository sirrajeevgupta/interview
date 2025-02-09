import { Link } from 'react-router-dom';

const Header = ({ search, setSearch }) => {
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
      </nav>
    </header>
  );
};

export default Header;
