import React from 'react';
import { Link } from 'react-router-dom';

const FilterByDomain = () => {
  return (
    <section>
      <ul className='domains'>
        <li>
          <Link>JavaScript</Link>
        </li>
        <li>
          <Link>ReactJs</Link>
        </li>
        <li>
          <Link>NodeJs</Link>
        </li>
        <li>
          <Link>HTML</Link>
        </li>
        <li>
          <Link>CSS</Link>
        </li>
        <li>
          <Link>SASS</Link>
        </li>
        <li>
          <Link>Miscellaneous</Link>
        </li>
      </ul>
    </section>
  );
};

export default FilterByDomain;
