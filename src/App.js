import { Route, Routes } from 'react-router-dom';
import QuestionsList from './components/QuestionsList';
import AddQuestion from './components/AddQuestion';
import EditQuestion from './components/EditQuestion';
import SingleQuestion from './components/SingleQuestion';
import Missing from './components/Missing';
import Layout from './components/Layout';
import FilterByDomain from './components/FilterByDomain';
import DomainQuestions from './components/DomainQuestions';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<QuestionsList />} />
          <Route path='question'>
            <Route index element={<AddQuestion />} />
            <Route path=':id' element={<SingleQuestion />} />
            <Route path='edit/:id' element={<EditQuestion />} />
          </Route>
          <Route path='domains'>
            <Route index element={<FilterByDomain />} />
            <Route path=':domain' element={<DomainQuestions />} />
          </Route>
        </Route>
        <Route path='*' element={<Missing />} />
      </Routes>
    </DataProvider>
  );
}

export default App;
