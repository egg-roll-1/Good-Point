import React from 'react';
import { useLocation } from 'react-router-dom';
import "./VolDetailPage.css"
import VolList from "../../components/VolList/VolList"
import Button from "../../components/Button/Button"

const VolDetailPage = () => {
    const location = useLocation();
    const { category, title, date, memberNum, recruitperiod, volperiod, voldetail } = location.state || {};

    return  <div className="vol-detail-container">
    <div className="vol-detail-header">
    <div className={`vol-category ${category}`}>{category}</div>
        <div className="vol-detail-title">{title}</div>
    </div>
    <div className="vol-detail-date">{date}</div>
    <div className="vol-detail-info">
        <div className="vol-detail-item">
            <h3>모집 인원</h3>
            <p>{memberNum}</p>
        </div>
        
        <div className="vol-detail-item">
            <h3>모집 기간</h3>
            <p>{recruitperiod}</p>
        </div>
        
        <div className="vol-detail-item">
            <h3>봉사 기간</h3>
            <p>{volperiod}</p>
        </div>
        
        <div className="vol-detail-item">
            <h3>상세 내용</h3>
            <p className="vol-detail-description">{voldetail}</p>
        </div>
    </div>
    <div className='vol-detail-button'>
    <Button type={'action'} text={"신청하기"} />
    <Button type={'action'} text={"장바구니"} />
    </div>      
</div>
}

export default VolDetailPage;