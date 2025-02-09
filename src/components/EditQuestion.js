import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from '../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleQuestion,
  faComment,
  faLink,
  faCode,
  faCircleChevronDown,
} from '@fortawesome/free-solid-svg-icons';

const EditQuestion = ({ questionsList, setQuestionsList }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const singleQuestion = questionsList?.find((question) => question._id === id);

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
      try {
        const response = await axios.put('questions', updatedQuestion);
        console.log(response.data);
        console.log(response);
        setQuestion('');
        setAnswer('');
        setCodeSnippet('');
        setDomain('');
        setReferenceUrl('');
        const filteredList = questionsList.filter(
          (question) => question._id !== id
        );
        setQuestionsList([...filteredList, response.data]);
        navigate(`/question/${id}`);
      } catch (err) {
        console.log(err.response?.data?.message);
        alert(err.response?.data?.message);
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
            <input
              placeholder='Domain'
              type='text'
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
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
