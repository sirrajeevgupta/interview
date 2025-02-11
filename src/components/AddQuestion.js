import { useState, useRef, useEffect, useContext } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleQuestion,
  faComment,
  faLink,
  faCode,
  faCircleChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import DataContext from '../context/DataContext';

const AddQuestion = () => {
  const { questionsList, setQuestionsList } = useContext(DataContext);

  const navigate = useNavigate();
  const quesRef = useRef();

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [domain, setDomain] = useState('');
  const [referenceUrl, setReferenceUrl] = useState('');

  useEffect(() => {
    quesRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (question && answer) {
      const newQuestion = {
        question: question,
        answer: answer,
        codeSnippet: codeSnippet,
        domain: domain,
        referenceUrl: referenceUrl,
        timeStamp: new Date().toISOString(),
      };
      try {
        const response = await axios.post('questions', newQuestion);
        console.log(response.data);
        console.log(response);
        setQuestion('');
        setAnswer('');
        setCodeSnippet('');
        setDomain('');
        setReferenceUrl('');
        const newQuestionList = [...questionsList, response.data];
        setQuestionsList(newQuestionList);
        navigate('/');
      } catch (err) {
        console.log(err.response?.data);
      }
    }
  };

  return (
    <section>
      <form>
        <label>
          <FontAwesomeIcon icon={faCircleQuestion} /> Question:
        </label>
        <input
          ref={quesRef}
          placeholder='Question'
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
            {/*             <input
              placeholder='Domain'
              type='text'
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            /> */}
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
        <button type='submit' onClick={(e) => handleSubmit(e)}>
          Add Question
        </button>
      </form>
    </section>
  );
};

export default AddQuestion;
