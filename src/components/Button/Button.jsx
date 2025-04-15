import {buttonStyles} from"./Button.style"

const Button = ({text, type, onClick}) => {
    //버튼 타입별로 스타일 결정
    const getButtonStyle = () => {
        switch(type) {
          case 'login':
            return buttonStyles.login;
          case 'duplicate':
            return buttonStyles.duplicate;
          case 'action':
            return buttonStyles.action;
          default:
            return buttonStyles.login; // 기본값
        }
    };

    return (
        <button
        style = {getButtonStyle()}
        onClick = {onClick}
        >
            {text}
        </button>
    );
}

export default Button;

// 로그인/ 회원가입 버튼: width: 300px, height: 60px, border-radius: 10px
// 중복 확인 버튼: width: 90px, height: 60px, border-radius: 10px
// 신청하기/ 장바구니 버튼: width: 150px, height: 40px, border-radius: 10px
