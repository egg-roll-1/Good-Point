import "./Header.css"
import bell from "../../assets/bell.png"

const Header = () => {
    return <div className="header-upper-navigator">
        <div className="header-overlap-group">
            <img className="header-img" src={bell} />
            <div className="header-title">Good-Point</div>
            <div className="header-login">로그인/회원가입</div>
        </div>
    </div>
}

export default Header;