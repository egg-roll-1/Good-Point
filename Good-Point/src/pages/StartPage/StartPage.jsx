import { useNavigate } from "react-router-dom";
import routes from "../../constants/routes"

import Button from "../../components/Button/Button"

import "./StartPage.css"

const StartPage = () => {

    const navigate = useNavigate(); 

    const onClickLoginButton = () => {
        navigate(routes.login);
    };
    return <div className="start-frame">
       <div className="start-title">Good-Point</div>
       <div className="start-div">
        <div className="start-overlap">
            <div className="start-findid">아이디 찾기</div>
            <div className="start-findpw">비밀번호 찾기</div>
        </div>
        <div className="start-div2">
        <div className="start-btn">
            <Button text={"로그인"} type={"login"} onClick={onClickLoginButton}/>
        </div>
        <div className="start-pwbtn">
            <Button text={"회원가입"} type={"login"}/>
        </div>
           
        </div>
       </div>
    </div>
}

export default StartPage;

