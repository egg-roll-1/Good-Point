import React from 'react';
import { useLocation } from 'react-router-dom';

import styles from './VolDetailPage.module.css';

import VolList from '../../components/VolList/VolList';
import Button from '../../components/Button/Button';

const VolDetailPage = () => {
  const location = useLocation();
  const { category, title, date, memberNum, recruitperiod, volperiod, voldetail } =
    location.state || {};

  return (
    <div className={styles.voldetailcontainer}>
      <div className={styles.voldetailheader}>
        <div className={`${styles.volcategory} ${styles[category]}`}>{category}</div>
        <div className={styles.voldetailtitle}>{title}</div>
      </div>
      <div className={styles.voldetaildate}>{date}</div>
      <div className={styles.voldetailinfo}>
        <div className={styles.voldetailitem}>
          <h3>모집 인원</h3>
          <p>{memberNum}</p>
        </div>

        <div className={styles.voldetailitem}>
          <h3>모집 기간</h3>
          <p>{recruitperiod}</p>
        </div>

        <div className={styles.voldetailitem}>
          <h3>봉사 기간</h3>
          <p>{volperiod}</p>
        </div>

        <div className={styles.voldetailitem}>
          <h3>상세 내용</h3>
          <p className={styles.voldetaildescription}>{voldetail}</p>
        </div>
      </div>
      <div className={styles.voldetailbutton}>
        <Button type={'action'} text={'신청하기'} />
        <Button type={'action'} text={'장바구니'} />
      </div>
    </div>
  );
};

export default VolDetailPage;
