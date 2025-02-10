import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import QuestionsList from './QuestionsList';

const DomainQuestions = () => {
  const { domain } = useParams();

  const [domianQuestions, setDomainQuestions] = useState([]);

  useEffect(() => {
    const getQuestionsByDomain = async () => {
      try {
        const response = await axios.get(`questions/domains/${domain}`);
        console.log(response.data);
        setDomainQuestions(response.data);
      } catch (err) {
        console.log(err?.response?.data?.message);
      }
    };

    getQuestionsByDomain();
  }, [domain]);

  return (
    <section>
      <QuestionsList questionsList={domianQuestions} />
    </section>
  );
};

export default DomainQuestions;
