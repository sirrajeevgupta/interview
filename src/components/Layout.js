import Header from './Header';
import Footer from './Footer';

import { Outlet } from 'react-router-dom';

const Layout = ({ search, setSearch }) => {
  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <main className='App'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
