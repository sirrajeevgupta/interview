import { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
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
    <DataContext.Provider
      value={{
        search,
        setSearch,
        orderedList,
        questionsList,
        setQuestionsList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
