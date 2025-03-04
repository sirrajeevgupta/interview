import { Link } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';
import { FaLaptop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllQuestions,
  searchedQuestions,
} from '../features/questions/questionsSlice';

const Header = () => {
  const dispatch = useDispatch();

  const questions = useSelector(getAllQuestions);
  const [search, setSearch] = useState('');
  const { width } = useWindowSize();

  useEffect(() => {
    const filteredResults = questions.filter((question) =>
      question.question.toLowerCase().includes(search.toLowerCase())
    );
    dispatch(searchedQuestions(filteredResults));
  }, [search, questions, dispatch]);

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
