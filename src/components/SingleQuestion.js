import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleQuestion,
  faComment,
  faLink,
  faTrashCan,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';

const SingleQuestion = ({ questionsList, setQuestionsList }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const singleQuestion = questionsList.find((question) => question._id === id);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`questions/${id}`);
      console.log(response?.data);
      const filteredList = questionsList.filter(
        (question) => question._id !== id
      );
      setQuestionsList(filteredList);
      navigate('/');
    } catch (err) {
      console.log(err?.response?.data?.message);
      console.log(err?.response);
    }
  };

  return (
    <section>
      <article>
        <div className='questionSet'>
          <h3>
            <FontAwesomeIcon icon={faCircleQuestion} />{' '}
            {singleQuestion?.question}
          </h3>
        </div>
        <div className='answerSet'>
          <div className='mainAnswer'>
            <p>
              <FontAwesomeIcon icon={faComment} /> {singleQuestion?.answer}
            </p>
            <div
              className={`snippet ${
                singleQuestion?.codeSnippet?.length ? 'visible' : 'hideSnippet'
              }`}
            >
              <SyntaxHighlighter
                language='javascript'
                style={atomDark}
                showLineNumbers={true}
                wrapLines={true}
              >
                {singleQuestion?.codeSnippet}
              </SyntaxHighlighter>
            </div>
          </div>
          <div className='helpers'>
            <p>
              <i>
                {singleQuestion?.timeStamp
                  ? `${formatDistanceToNow(
                      parseISO(singleQuestion?.timeStamp)
                    )} ago`
                  : ''}
              </i>
            </p>
            <p>{singleQuestion?.domain}</p>
            <p>
              <FontAwesomeIcon icon={faLink} /> {singleQuestion?.referenceUrl}
            </p>
          </div>
        </div>
      </article>
      <article>
        <ul>
          <li>
            <Link to={`/question/edit/${singleQuestion?._id}`}>
              <button>
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            </Link>
          </li>
          <li>
            <Link>
              <button onClick={() => handleDelete()}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </Link>
          </li>
        </ul>
      </article>
    </section>
  );
};

export default SingleQuestion;
