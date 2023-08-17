import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import './layout.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { BbsWrite, BbsDetail, BbsAnswer, BbsModify, BbsList } from './components/bbs';
import SummerNote from './components/SummerNote';
import PostCode from './components/PostCode';
import "react-summernote/dist/react-summernote.css"; // import style
import "bootstrap/js/dist/tooltip.js";
import "bootstrap/js/dist/dropdown.js";
import "bootstrap/js/dist/modal.js";
import "bootstrap/dist/css/bootstrap.css";
import "jquery";
import "popper.js";
import Csr from './components/naver/Csr';
import Cfr from './components/naver/Cfr';
import AxiosTest from './components/AxiosTest';

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
                <li className='nav-item'><Link className='nav-link' to='/axios'>axios Test</Link></li>
                <li className='nav-item'><Link className='nav-link' to='/Bbslist'>게시판</Link></li>
                <li className='nav-item'><Link className='nav-link' to='/summer'>써머노트 연습</Link></li>
                <li className='nav-item'><Link className='nav-link' to='/post'>POST CODE</Link></li>
                <li className='nav-item'><Link className='nav-link' to='/csr'>CSR(stt)</Link></li>
                <li className='nav-item'><Link className='nav-link' to='/cfr'>CFR</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <main className="container">
          <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/axios' element={<AxiosTest />} />

            <Route path='/bbslist' element={<BbsList />} />
            <Route path='/bbswrite' element={<BbsWrite />} />
            <Route path='/bbsdetail/:seq' element={<BbsDetail />} />
            <Route path='/bbsanswer/:seq' element={<BbsAnswer />} />
            <Route path='/bbsmodify/:seq' element={<BbsModify />} />

            <Route path='/summer' element={<SummerNote />} />
            <Route path='/post' element={<PostCode />} />

            <Route path='/csr' element={<Csr />} />
            <Route path='/cfr' element={<Cfr />} />
            
            <Route path='*' element={<h1>404 Not Found</h1>} />
          </Routes>
        </main>
      </Router>
      <Footer />
    </div>
  );
}

export default App; 