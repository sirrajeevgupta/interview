import { Link } from 'react-router-dom';

const EmptyQuestionList = () => {
  return (
    <article className='noItemsToDisplay'>
      <h2>No questions to display.</h2>
      <br />
      <p>
        <Link to='/question'>Let's create one! </Link>
      </p>
    </article>
  );
};

export default EmptyQuestionList;
