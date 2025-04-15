import { createBrowserRouter } from "react-router-dom";
import routes from "../constants/routes";
import Main from "../pages/Main"
import LoginPage from "../pages/LoginPage/LoginPage";
import App from "../App";

// 배열을 선언하고 반환해야 합니다 (화살표 함수에서 중괄호를 사용할 때)
const router = createBrowserRouter([
  {
    path: "/",  // 루트 경로 수정
    element: <App />,
    children: [
      {
        path: routes.main,
        element: <Main />
      },
      {
        path: routes.login,
        element: <LoginPage />
      },
    ],
  },
]);

export default router;