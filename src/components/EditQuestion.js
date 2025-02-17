import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleQuestion,
  faComment,
  faLink,
  faCode,
  faCircleChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import {
  getSingleQuestion,
  editQuestion,
} from '../features/questions/questionsSlice';
import { useSelector, useDispatch } from 'react-redux';

const EditQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const singleQuestion = useSelector((state) => getSingleQuestion(state, id));

  const [question, setQuestion] = useState(singleQuestion?.question);
  const [answer, setAnswer] = useState(singleQuestion?.answer);
  const [codeSnippet, setCodeSnippet] = useState(singleQuestion?.codeSnippet);
  const [domain, setDomain] = useState(singleQuestion?.domain);
  const [referenceUrl, setReferenceUrl] = useState(
    singleQuestion?.referenceUrl
  );

  const handleEdit = async (e) => {
    e.preventDefault();

    if (question && answer) {
      const updatedQuestion = {
        id: id,
        question: question,
        answer: answer,
        codeSnippet: codeSnippet,
        domain: domain,
        referenceUrl: referenceUrl,
        timeStamp: new Date().toISOString(),
      };

      dispatch(editQuestion(updatedQuestion)).unwrap();
      setQuestion('');
      setAnswer('');
      setCodeSnippet('');
      setDomain('');
      setReferenceUrl('');
      navigate(`/question/${id}`);
    }
  };

  return (
    <section>
      <form>
        <label>
          <FontAwesomeIcon icon={faCircleQuestion} /> Question:
        </label>
        <input
          placeholder='Type Question'
          type='text'
          required
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <label>
          <FontAwesomeIcon icon={faComment} /> Answer:
        </label>
        <textarea
          name='answer'
          id='answer'
          required
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <label>
          <FontAwesomeIcon icon={faCode} /> Code Snippet:
        </label>
        <textarea
          placeholder='Please type a code snippet if any'
          name='codeSnippet'
          id='codeSnippet'
          value={codeSnippet}
          onChange={(e) => setCodeSnippet(e.target.value)}
        ></textarea>
        <div className='formHelpers'>
          <div>
            <label>
              <FontAwesomeIcon icon={faCircleChevronDown} /> Domain:
            </label>
            <select
              name='domain'
              id='domain'
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            >
              <option value='' key={0}></option>
              <option value='JavaScript' key={1}>
                JavaScript
              </option>
              <option value='ReactJs' key={2}>
                ReactJs
              </option>
              <option value='HTML' key={3}>
                HTML
              </option>
              <option value='CSS' key={4}>
                CSS
              </option>
              <option value='NodeJs' key={5}>
                NodeJs
              </option>
              <option value='MongoDB' key={6}>
                MongoDB
              </option>
              <option value='SASS' key={7}>
                SASS
              </option>
              <option value='Miscellaneous' key={8}>
                Miscellaneous
              </option>
            </select>
          </div>
          <div>
            <label>
              <FontAwesomeIcon icon={faLink} /> Reference URL:
            </label>
            <input
              placeholder='URL'
              type='text'
              value={referenceUrl}
              onChange={(e) => setReferenceUrl(e.target.value)}
            />
          </div>
        </div>
        <button type='submit' onClick={(e) => handleEdit(e)}>
          Update Question
        </button>
      </form>
    </section>
  );
};
export default EditQuestion;
