import { Link } from 'react-router-dom';

const QuestionsList = ({ questionsList }) => {
  const list = questionsList;

  return (
    <section>
      {list?.length ? (
        <ul>
          {list.map((question) => {
            return (
              <li key={question?._id}>
                <article>
                  <div className='questionSet'>
                    <Link to={`/questions/${question._id}`}>
                      <h3>{question?.question}</h3>
                    </Link>
                  </div>
                  <div className='answerSet'>
                    <div className='mainAnswer'>
                      <p>{question?.answer}</p>
                      <p>{question.codeSnippet}</p>
                    </div>
                    <div className='helpers'>
                      <p>{question.domain}</p>
                      <p>{question.referenceUrl}</p>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <article>
          <p>No questions to display.</p>
        </article>
      )}
    </section>
  );
};

export default QuestionsList;
