import { createBrowserRouter } from 'react-router-dom';
import routes from '../constants/routes';

import Main from '../pages/Main';
import StartPage from '../pages/StartPage/StartPage';
import LoginPage from '../pages/LoginPage/LoginPage';

import App from '../App';
import SignUpPage from '../pages/SignUpPage/SignUpPage';

import Point from '../pages/PointPage/Point';
import MyInfo from '../pages/MyInfoPage/MyInfo';
import FAQ from '../pages/FAQPage/FAQ';
import VolunteerHistory from '../pages/VolunteerHistoryPage/VolunteerHistory';
import VolunteerMap from '../pages/VolMapPage/VolunteerMap';
import VolDetailPage from '../pages/VolDetailPage/VolDetailPage';
import VolHistoryListPage from '../pages/VolHistoryListPage/VolHistoryListPage';
import InfoPage from '../pages/InfoPage/InfoPage';

// 배열을 선언하고 반환해야 합니다 (화살표 함수에서 중괄호를 사용할 때)
const router = createBrowserRouter([
  {
    path: '/', // 루트 경로 수정
    element: <App />,
    children: [
      {
        path: routes.main,
        element: <Main />,
      },
      {
        path: routes.login,
        element: <LoginPage />,
      },
      {
        path: routes.start,
        element: <StartPage />,
      },
      {
        path: routes.signup,
        element: <SignUpPage />,
      },
      {
        path: routes.point,
        element: <Point />,
      },
      {
        path: routes.myinfo,
        element: <MyInfo />,
      },
      {
        path: routes.faq,
        element: <FAQ />,
      },
      {
        path: routes.volapply,
        element: <VolunteerHistory />,
      },
      {
        path: routes.volmap,
        element: <VolunteerMap />,
      },
      {
        path: '/voldetail/:id',
        element: <VolDetailPage />,
      },

      {
        path: routes.info,
        element: <InfoPage />,
      },
      {
        path: routes.infopage,
        element: <InfoPage />,
      },
      {
        path: routes.volhislist,
        element: <VolHistoryListPage/>
      }
    ],
  },
]);

export default router;
