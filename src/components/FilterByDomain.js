import React from 'react';
import { Link } from 'react-router-dom';

const FilterByDomain = () => {
  return (
    <section>
      <ul className='domains'>
        <li>
          <Link to='/domains/JavaScript'>JavaScript</Link>
        </li>
        <li>
          <Link to='/domains/ReactJs'>ReactJs</Link>
        </li>
        <li>
          <Link to='/domains/NodeJs'>NodeJs</Link>
        </li>
        <li>
          <Link to='/domains/HTML'>HTML</Link>
        </li>
        <li>
          <Link to='/domains/CSS'>CSS</Link>
        </li>
        <li>
          <Link to='/domains/SASS'>SASS</Link>
        </li>
        <li>
          <Link to='/domains/Miscellaneous'>Miscellaneous</Link>
        </li>
      </ul>
    </section>
  );
};

export default FilterByDomain;
