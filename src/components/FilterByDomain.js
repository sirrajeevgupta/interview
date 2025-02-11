import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNode,
  faHtml5,
  faCss3,
  faReact,
  faJsSquare,
  faSass,
} from '@fortawesome/free-brands-svg-icons';

const FilterByDomain = () => {
  return (
    <section className='domainsPage'>
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
      <div className='stage-cube-cont'>
        <div className='cubespinner'>
          <div className='face1'>
            <FontAwesomeIcon icon={faNode} color='#4f9b43' />
          </div>
          <div className='face2'>
            <FontAwesomeIcon icon={faHtml5} color='#F06529' />
          </div>
          <div className='face3'>
            <FontAwesomeIcon icon={faCss3} color='#28A4D9' />
          </div>
          <div className='face4'>
            <FontAwesomeIcon icon={faReact} color='#5ED4F4' />
          </div>
          <div className='face5'>
            <FontAwesomeIcon icon={faJsSquare} color='#EFD81D' />
          </div>
          <div className='face6'>
            <FontAwesomeIcon icon={faSass} color='#de0a17' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterByDomain;
