// src/pages/MyInfo.jsx
import React from 'react';
import './MyInfo.css';

const MyInfo = () => {
  return (
    <div className="myinfo-page">
      <h2 className="myinfo-title">회원 정보 조회</h2>
      <ul className="myinfo-list">
        <li>아이디</li>
        <li>주소</li>
        <li>이메일</li>
        <li>연락처</li>
        <li>거주 지역</li>
        <li>회원가입 일자</li>
      </ul>
      <div className="myinfo-buttons">
        <button>비밀번호 변경</button>
        <button>회원 탈퇴</button>
      </div>
    </div>
  );
};

export default MyInfo;
