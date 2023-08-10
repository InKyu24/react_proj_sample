import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import './main.css';
import Bbslist from './components/bbs/BbsList';
import Header from './layout/Header';
import Footer from './layout/Footer';
import BbsWrite from './components/bbs/BbsWrite';
import BbsDetail from './components/bbs/BbsDetail';

function App() {
  return (
    <div>
      <Header />

      <Router>
        <nav className='navbar navbar-expand-md navbar-dark bg-info sticky-top'>
          <div className='container'>
            <div className="collapse navbar-collapse" id="navbar-content">
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item'><Link className='nav-link' to='/'>Home</Link></li>
                <li className='nav-item'><Link className='nav-link' to='/bbslist'>게시판</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <main>
          <div className='py-4'>
            <div className='container'>
              <Routes>
                <Route path='/' element={<Home />} />

                <Route path='/bbslist' element={<Bbslist />} />
                <Route path='/bbswrite' element={<BbsWrite />} />
                <Route path='/bbsdetail/:seq' element={<BbsDetail />} />

                <Route path='*' element={<h1>404 Not Found</h1>} />
              </Routes>
            </div>
          </div>
        </main>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
