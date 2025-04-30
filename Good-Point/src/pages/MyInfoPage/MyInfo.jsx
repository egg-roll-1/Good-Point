// src/pages/MyInfo.jsx
import React from 'react';
import './MyInfo.css';

const MyInfo = (id, address, email, phone, area, signupDate) => {

  const infoData = [{
    id: {id },
    address: {address},
    email: {email},
    phone: {phone},
    area: {area},
    signupDate: {signupDate}
}]
  return (
    <div className="myinfo-page">
      <h2 className="myinfo-title">회원 정보 조회</h2>
      <div className="myinfo-list">
        <div>아이디 : {infoData.id}</div>
        <div>주소 : {infoData.address}</div>
        <div>이메일 : {infoData.email}</div>
        <div>연락처 : {infoData.phone}</div>
        <div>거주지역 : {infoData.area}</div>
        <div>회원가입 일자 : {infoData.signupDate}</div>
      </div>
      <div className="myinfo-buttons">
        <button>비밀번호 변경</button>
        <button>회원 탈퇴</button>
      </div>
    </div>
  );
};

export default MyInfo;
