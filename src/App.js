import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import './layout.css';
import Bbslist from './components/bbs/BbsList';
import Header from './layout/Header';
import Footer from './layout/Footer';
import BbsWrite from './components/bbs/BbsWrite';
import BbsDetail from './components/bbs/BbsDetail';
import BbsAnswer from './components/bbs/BbsAnswer';
import BbsModify from './components/bbs/BbsModify';
import SummerNote from './components/SummerNote';
import PostCode from './components/PostCode';
import "react-summernote/dist/react-summernote.css"; // import style
import "bootstrap/js/dist/tooltip.js";
import "bootstrap/js/dist/dropdown.js";
import "bootstrap/js/dist/modal.js";
import "bootstrap/dist/css/bootstrap.css";
import "jquery";
import "popper.js";
import Stt from './components/naver/Stt';

function App() {
  return (
    <div className="app">
      <Header />
      <Router>
        <nav className='navbar navbar-expand-md navbar-dark bg-info sticky-top'>
          <div className='container'>
            <div className="collapse navbar-collapse" id="navbar-content">
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item'><Link className='nav-link' to='/'>Home</Link></li>
                <li className='nav-item'><Link className='nav-link' to='/bbslist'>게시판</Link></li>
                <li className='nav-item'><Link className='nav-link' to='/summer'>써머노트 연습</Link></li>
                <li className='nav-item'><Link className='nav-link' to='/post'>POST CODE</Link></li>
                <li className='nav-item'><Link className='nav-link' to='/stt'>STT</Link></li>
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
                <Route path='/bbsanswer/:seq' element={<BbsAnswer />} />
                <Route path='/bbsmodify/:seq' element={<BbsModify />} />

                <Route path='/summer' element={<SummerNote />} />
                <Route path='/post' element={<PostCode />} />

                <Route path='/stt' element={<Stt />} />
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
