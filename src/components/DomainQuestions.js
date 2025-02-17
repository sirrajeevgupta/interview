import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchDomainQuestions,
  getAllQuestions,
  getQuestionsError,
  getQuestionsStatus,
} from '../features/questions/questionsSlice';
import QuestionExcerpt from '../features/questions/QuestionExcerpt';
import EmptyQuestionList from './EmptyQuestionList';

const DomainQuestions = () => {
  const { domain } = useParams();
  const dispatch = useDispatch();

  const questions = useSelector(getAllQuestions);
  const status = useSelector(getQuestionsStatus);
  const error = useSelector(getQuestionsError);

  useEffect(() => {
    dispatch(fetchDomainQuestions(domain));
  }, [dispatch, domain]);

  let content;

  if (status === 'loading') {
    content = 'Loading Questions...';
  } else if (status === 'success') {
    content = questions?.length ? (
      <ul>
        {questions.map((question) => {
          return <QuestionExcerpt key={question._id} question={question} />;
        })}
      </ul>
    ) : (
      <EmptyQuestionList />
    );
  } else if (status === 'failed') {
    content = error;
  }

  return <section>{content}</section>;
};

export default DomainQuestions;
