import React,{ useState} from 'react';
import Image from 'next/image';
import IndexBackground from '@/public/img-record/index-background.png';
import IndexButton from '@/public/img-record/index-button.png';
import IndexChart from '@/public/img-record/index-chart.png';
import IndexTdee from '@/public/img-record/index-tdee.png';
import Line from '@/public/img-record/line.png';

export default function RecordIndex2() {
  const [isClick, setIsClick] = useState(false)
const handleTitleClick = () => {setIsClick(!isClick)}
  return (
    <>
      <div className='record-img background'>
      <div>
      <Image src={Line} style={{position:'absolute', top:'160px', left:'320px', display: isClick ? 'none' : 'block'}}/>
      <h3 style={{position: 'absolute', top: '100px', left:'320px'}} className={isClick ? 'sub-title' : 'sub-title-click'} onClick={handleTitleClick}>推薦專屬的運動項目</h3>
      </div>
      <div>
      {/* <Image src={Line} style={{position:'absolute', top:'305px', left:'426px', display: isClick ? 'none' : 'block'}}/> */}
      <h3 style={{position: 'absolute', top: '250px', left:'440px'}} className={isClick ? 'sub-title' : 'sub-title-click'} onClick={handleTitleClick}>專屬的圖表分析</h3>
      </div>
      <div>
      {/* <Image src={Line} style={{position:'absolute', top:'450px', left:'467px', display: isClick ? 'none' : 'block'}}/> */}
      <h3 style={{position: 'absolute', top: '400px', left:'490px'}} className={isClick ? 'sub-title' : 'sub-title-click'} onClick={handleTitleClick}>記錄每日運動</h3>
      </div>
      <div>
      {/* <Image src={Line} style={{position:'absolute', top:'450px', left:'467px', display: isClick ? 'none' : 'block'}}/> */}
      <h3 style={{position: 'absolute', top: '550px', left:'492px'}} className={isClick ? 'sub-title' : 'sub-title-click'} onClick={handleTitleClick}>記錄每日飲食</h3>
      </div>
      <div>
      {/* <Image src={Line} style={{position:'absolute', top:'305px', left:'426px', display: isClick ? 'none' : 'block'}}/> */}
      <h3 style={{position: 'absolute', top: '700px', left:'450px'}} className={isClick ? 'sub-title' : 'sub-title-click'} onClick={handleTitleClick}>TDEE計算機</h3>
      </div>
      <div>
      {/* <Image src={Line} style={{position:'absolute', top:'305px', left:'426px', display: isClick ? 'none' : 'block'}}/> */}
      <h3 style={{position: 'absolute', top: '850px', left:'350px'}} className={isClick ? 'sub-title' : 'sub-title-click'} onClick={handleTitleClick}>FFMI計算機</h3>
      </div>
      <p className='title'>會員專屬服務</p>
      <Image style={{position: 'absolute', bottom:'0px', right: '50px'}} src={IndexChart} />
      </div>

      <style jsx>{`
        .background {
          position: relative;
        }
        .title {
          font-size:60px;
          font-weight: bold;
          color: #86909C;
          position: absolute;
          top: 250px;
          left: 1300px;
          cursor: pointer;
        }

        .sub-title-click {
          padding:20px 30px;
          color:#86909C;
          background-color: white;
          border-radius: 50px;
          font-weight: bold;
          cursor: pointer;
        }
        .sub-title {
          padding:20px 30px;
          color:#86909C;
          border-radius: 50px;
          font-weight: bold;
          cursor: pointer;
        }
        
      `}</style>
    </>
  );
}
