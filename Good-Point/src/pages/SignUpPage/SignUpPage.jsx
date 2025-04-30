import Button from "../../components/Button/Button"
import "./SignUpPage.css"

const SignUpPage = () => {
    return <div className="signup-frame">
        <div className="signup-text">회원가입</div>
        <div className="signup-group">
            <input className="signup-nickname" placeholder="닉네임"/>
            <div className="signup-checkbtn"><Button text={"중복확인"} type ={"duplicate"}/></div>
        </div>
        <div className="signup-group">
            <input className = "signup-id" placeholder="아이디"/>
            <div className="signup-checkbtn"><Button text={"중복확인"} type ={"duplicate"}/></div>
        </div>
        <input className = "signup-pw" placeholder="비밀번호"/>
        <input className = "signup-checkpw" placeholder="비밀번호 확인"/>
        <div className="signup-checkbox">
            <input type="checkbox" id="agree-checkbox" className="signup-checkbox" />
            <label htmlFor="agree-checkbox">이용약관 및 개인정보처리방침에 동의합니다</label>
        </div>
        <Button text={"가입하기"} type={"login"} />
        
    </div>
}

export default SignUpPage;