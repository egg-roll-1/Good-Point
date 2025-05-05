import { useNavigate } from 'react-router-dom';
import PageNum from '../../components/PageNum/PageNum';
import styles from './VolList.module.css';

const VolList = () => {
  const navigate = useNavigate();

  const volData = [
    {
      category: '보건',
      title: '[보건 의료] 이용정보가 안내',
      date: '2023.04.08',
      memberNum: '20명',
      recruitperiod: '2025년 4월 30일 ~ 2025년 5월 7일',
      volperiod: '2025년 5월 8일 ~ 2025년 5월 10일',
      voldetail:
        '상세설명 :  ★2025. 3. 28.(금) 긴급공지★산불이 주불진화가 됨에 따라 많은분들이 자원봉사 참여를 희망하고 있습니다.현재 자원봉사 참여를 희망하시는 분들은 1365자원봉사포털을 통해 사전활동신청을 받고있으니 신청하신 분들에게는 추후 해당 지역 자원봉사센터에서 안내드겠습니다.',
    },
    {
      category: '생활',
      title: '[생활 편의] 이용정보가 안내',
      date: '2023.04.07',
      memberNum: '20명',
      recruitperiod: '2025년 4월 30일 ~ 2025년 5월 7일',
      volperiod: '2025년 5월 8일 ~ 2025년 5월 10일',
      voldetail:
        '상세설명 :  ★2025. 3. 28.(금) 긴급공지★산불이 주불진화가 됨에 따라 많은분들이 자원봉사 참여를 희망하고 있습니다.현재 자원봉사 참여를 희망하시는 분들은 1365자원봉사포털을 통해 사전활동신청을 받고있으니 신청하신 분들에게는 추후 해당 지역 자원봉사센터에서 안내드겠습니다.',
    },
    {
      category: '재난',
      title: '[재난 재해] 이용정보가 안내',
      date: '2023.04.06',
      memberNum: '20명',
      recruitperiod: '2025년 4월 30일 ~ 2025년 5월 7일',
      volperiod: '2025년 5월 8일 ~ 2025년 5월 10일',
      voldetail:
        '상세설명 :  ★2025. 3. 28.(금) 긴급공지★산불이 주불진화가 됨에 따라 많은분들이 자원봉사 참여를 희망하고 있습니다.현재 자원봉사 참여를 희망하시는 분들은 1365자원봉사포털을 통해 사전활동신청을 받고있으니 신청하신 분들에게는 추후 해당 지역 자원봉사센터에서 안내드겠습니다.',
    },
    {
      category: '보건',
      title: '[보건 의료] 이용정보가 안내',
      date: '2023.04.05',
      memberNum: '20명',
      recruitperiod: '2025년 4월 30일 ~ 2025년 5월 7일',
      volperiod: '2025년 5월 8일 ~ 2025년 5월 10일',
      voldetail:
        '상세설명 :  ★2025. 3. 28.(금) 긴급공지★산불이 주불진화가 됨에 따라 많은분들이 자원봉사 참여를 희망하고 있습니다.현재 자원봉사 참여를 희망하시는 분들은 1365자원봉사포털을 통해 사전활동신청을 받고있으니 신청하신 분들에게는 추후 해당 지역 자원봉사센터에서 안내드겠습니다.',
    },
  ];

  const handleItemClick = (item) => {
    // 라우터를 통해 상세 페이지로 이동하면서 데이터 전달
    navigate('/voldetail', {
      state: {
        category: item.category,
        title: item.title,
        date: item.date,
        memberNum: item.memberNum,
        recruitperiod: item.recruitperiod,
        volperiod: item.volperiod,
        voldetail: item.voldetail,
      },
    });
  };

  return (
    <div>
      <div className={styles.vllist}>
        {volData.map((item, index) => (
          <div
            className={styles.vlitem}
            key={index}
            onClick={() => handleItemClick(item)}
            style={{ cursor: 'pointer' }}
          >
            <div className={`${styles.vlcategory} ${styles[item.category.toLowerCase()]}`}>
              {item.category}
            </div>
            <div className={styles.vlinfo}>
              <p className={styles.vltitleline}>{item.title}</p>
              <p className={styles.vldate}>{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolList;
