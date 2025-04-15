import Button from "../../components/Button/Button"
import "./LoginPage.css"

import Line from "../../assets/Line.png"

const LoginPage = () => {
    return <div className="login-frame">
        <div className="login-textlogin">로그인</div>
        <input className = "login-inputid" placeholder="아이디" />
        <input className = "login-inputpw" placeholder="비밀번호"/>
        <Button text={"로그인"} type={"login"} />
        <div className="login-div-wrapper">
            <div className="login-overlap-group">
                <img className="login-line" src={Line} />
                <img className="login-line2" src={Line} />
                <p className="login-p">아이디 찾기 | 비밀번호 찾기</p>
            </div>
        </div>
        <Button text={"회원가입"} type={"brightLogin"}/>
    </div>
}

export default LoginPage;