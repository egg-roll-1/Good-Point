import Button from "../../components/Button/Button"

import "./LoginPage.css"

const LoginPage = () => {
    return <div className="login-frame">
       <div className="login-title">Good-Point</div>
       <div className="login-div">
        <div className="login-overlap">
            <div className="login-findid">아이디 찾기</div>
            <div className="login-findpw">비밀번호 찾기</div>
        </div>
        <div className="login-div2">
        <div className="login-btn">
            <Button text={"로그인"} type={"login"}/>
        </div>
        <div className="login-pwbtn">
            <Button text={"회원가입"} type={"login"}/>
        </div>
           
        </div>
       </div>
    </div>
}

export default LoginPage;

