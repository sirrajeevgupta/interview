import { Route, Routes } from 'react-router-dom';
import QuestionsList from './components/QuestionsList';
import AddQuestion from './components/AddQuestion';
import EditQuestion from './components/EditQuestion';
import SingleQuestion from './components/SingleQuestion';
import Missing from './components/Missing';
import Layout from './components/Layout';
import FilterByDomain from './components/FilterByDomain';
import { useState, useEffect } from 'react';
import axios from './api/axios';

function App() {
  const [questionsList, setQuestionsList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState('');

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

  useEffect(() => {
    const filteredResults = questionsList.filter((question) =>
      question.question.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [search, questionsList]);

  const orderedList = searchResults
    .slice()
    .sort((a, b) => b.timeStamp.localeCompare(a.timeStamp));

  return (
    <Routes>
      <Route
        path='/'
        element={
          <Layout
            search={search}
            setSearch={setSearch}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        }
      >
        <Route index element={<QuestionsList questionsList={orderedList} />} />
        <Route path='question'>
          <Route
            index
            element={
              <AddQuestion
                questionsList={questionsList}
                setQuestionsList={setQuestionsList}
              />
            }
          />
          <Route
            path=':id'
            element={
              <SingleQuestion
                questionsList={questionsList}
                setQuestionsList={setQuestionsList}
              />
            }
          />
          <Route
            path='edit/:id'
            element={
              <EditQuestion
                questionsList={questionsList}
                setQuestionsList={setQuestionsList}
              />
            }
          />
        </Route>
        <Route path='domains' element={<FilterByDomain />}></Route>
      </Route>
      <Route path='*' element={<Missing />} />
    </Routes>
  );
}

export default App;
