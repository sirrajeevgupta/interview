import EmptyQuestionList from './EmptyQuestionList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuestionExcerpt from '../features/questions/QuestionExcerpt';
import {
  fetchQuestions,
  getAllQuestions,
  getQuestionsStatus,
  getQuestionsError,
} from '../features/questions/questionsSlice';

const QuestionsList = () => {
  const dispatch = useDispatch();

  const questions = useSelector(getAllQuestions);
  const status = useSelector(getQuestionsStatus);
  const error = useSelector(getQuestionsError);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  let content;

  if (status === 'loading') {
    content = 'Loading Questions...';
  } else if (status === 'success') {
    const orderedList = questions
      .slice()
      .sort((a, b) => b.timeStamp.localeCompare(a.timeStamp));

    content = questions?.length ? (
      <ul>
        {orderedList.map((question) => {
          return <QuestionExcerpt key={question?._id} question={question} />;
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

export default QuestionsList;
