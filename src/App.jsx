import Header from './components/Header/Header';
import BottomNavigation from './components/BottomNavigation/BottomNavigation';
import { Outlet } from 'react-router-dom';

import './App.css';
import './styles/global.css';

function App() {
  return <Outlet />;
}

export default App;
