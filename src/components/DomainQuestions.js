import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/axios';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faLink } from '@fortawesome/free-solid-svg-icons';

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
      {domianQuestions?.length ? (
        <ul>
          {domianQuestions.map((question) => {
            return (
              <li key={question?._id}>
                <article key={question?._id}>
                  <div className='questionSet'>
                    <Link to={`/question/${question._id}`}>
                      <h3>
                        <FontAwesomeIcon icon={faCircleQuestion} />{' '}
                        {question?.question}
                      </h3>
                    </Link>
                  </div>
                  <div className='answerSet'>
                    <div className='mainAnswer'>
                      <div>
                        <SyntaxHighlighter
                          lineProps={{
                            style: {
                              wordBreak: 'break-all',
                              whiteSpace: 'pre-wrap',
                            },
                          }}
                          customStyle={{
                            backgroundColor: 'rgb(40, 40, 40)',
                            margin: 0,
                            padding: 0,
                            fontFamily: 'Nunito',
                          }}
                          wrapLines={true}
                          language='xml'
                          style={atomDark}
                        >
                          {question?.answer}
                        </SyntaxHighlighter>
                      </div>
                      <div
                        className={`snippet ${
                          question?.codeSnippet?.length
                            ? 'visible'
                            : 'hideSnippet'
                        }`}
                      >
                        <Link to={`/question/${question._id}`}>
                          <SyntaxHighlighter
                            language='javascript'
                            style={atomDark}
                            wrapLines={true}
                            customStyle={{
                              backgroundColor: '#082c08',
                              margin: 0,
                              borderRadius: '0.5rem',
                            }}
                          >
                            {`<Code Snippet Available>`}
                          </SyntaxHighlighter>
                        </Link>
                      </div>
                    </div>
                    <div className='helpers'>
                      <p>
                        <i>
                          {question?.timeStamp
                            ? `${formatDistanceToNow(
                                parseISO(question?.timeStamp)
                              )} ago`
                            : ''}
                        </i>
                      </p>
                      <p>{question.domain}</p>
                      <p>
                        <FontAwesomeIcon icon={faLink} />{' '}
                        {question.referenceUrl
                          ? question.referenceUrl
                          : 'No Reference'}
                      </p>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <article className='noItemsToDisplay'>
          <h2>No questions to display.</h2>
          <br />
          <p>
            <Link to='/question'>Let's create one! </Link>
          </p>
        </article>
      )}
    </section>
  );
};

export default DomainQuestions;
