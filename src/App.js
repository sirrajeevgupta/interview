import { Route, Routes } from 'react-router-dom';
import QuestionsList from './components/QuestionsList';
import AddQuestion from './components/AddQuestion';
import UpdateQuestion from './components/UpdateQuestion';
import SingleQuestion from './components/SingleQuestion';
import Missing from './components/Missing';
import Layout from './components/Layout';
import { useState, useEffect } from 'react';
import axios from './api/axios';

function App() {
  const [questionsList, setQuestionsList] = useState([]);

  useEffect(() => {
    const getAllQuestions = async () => {
      try {
        const response = await axios.get('/questions');
        console.log(response.data);
        if (response?.data) setQuestionsList(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getAllQuestions();
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route
          index
          element={<QuestionsList questionsList={questionsList} />}
        />
        <Route path='question'>
          <Route
            index
            element={<AddQuestion questionsList={questionsList} />}
          />
          <Route path=':questionId' element={<SingleQuestion />} />
          <Route path='edit/:questionId' element={<UpdateQuestion />} />
        </Route>
      </Route>
      <Route path='*' element={<Missing />} />
    </Routes>
  );
}

export default App;
