import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Main from './pages/Main';
import Point from './pages/Point';
import MyInfo from './pages/MyInfo'; 

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/point" element={<Point />} />
            <Route path="/myinfo" element={<MyInfo />} /> {/* ✅ 추가 */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
