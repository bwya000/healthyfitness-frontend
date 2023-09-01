import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function DisclaimerText() {
    return (
        <>
            <div className="container">
                <h2 className="title">免責聲明</h2>
                <h4 className="title-1">DISCLAIMER</h4>
                <div className="text">
                    歡迎您使用我們的運動影音網站「Healthy
                    Fitness」（以下簡稱「本網站」），在使用本網站前，
                    請詳細閱讀以下免責聲明。
                    透過瀏覽或使用本網站，即表示您同意遵守以下免責聲明的所有條款和條件。如果您不同意以下條款，請立即停止使用本網站。
                    <br />
                    <ul>
                        <li className='title-2'> 一、內容免責聲明：</li>
                        <ol>
                            <li>本網站所提供的所有影音、文章、圖片、教程及其他相關內容僅供參考和娛樂之用。我們不對任何內容的準確性、完整性、及時性或適用性作出任何明示或暗示的保證，亦不承擔任何因使用或依賴該等內容所引起的損失或損害。</li>
                            <li>本網站可能包含第三方提供的內容、連結或廣告。這些內容僅為方便用戶而提供，並不代表我們對該等內容的認可或推薦。我們不對第三方內容的準確性、完整性、合法性或可靠性承擔任何責任。
                            </li>
                        </ol>
                        <li className='title-2'>二、健康與安全免責聲明：</li>
                        <ol>
                            <li>在參與任何運動活動之前，我們強烈建議您諮詢專業醫療人員的意見，以確保您的身體狀況適合參與相關活動。</li>
                            <li>在使用本網站上的運動教程、指導和建議之前，請確保您的身體狀況能夠適應相關活動。如果您有任何健康問題或身體不適，請立即停止相關活動並尋求專業醫療協助。</li>
                        </ol>
                        <li className='title-2'> 三、使用風險免責聲明：</li>
                        <ol>
                            <li>使用本網站的所有用戶必須自行承擔相關風險。我們不對因使用本網站或參與本網站所提供的任何活動而引起的任何傷害、損失或損害承擔責任。</li>
                            <li>在參與任何體育或運動活動時，存在可能的身體傷害風險。您應該遵守相關的安全指導和建議，確保您的行為不會危害您自己或他人的安全。</li>
                        </ol>
                        <li className='title-2'>四、知識產權免責聲明：</li>
                        <ol>
                <li>影音課程引用自YouTube 頻道 <a href='https://www.youtube.com/channel/UCXRgJZZ29VevkFR_1Y3hYJQ'>Eugene Wong</a>、<a href='https://www.youtube.com/@chuckmeo'>游書庭-健身有氧</a>，商城之商品圖片引用自<a href='https://decathlon.tw/?utm_source=google&utm_medium=pmax&gclid=Cj0KCQjw3JanBhCPARIsAJpXTx797zVkm_au4OdF4uUlXMZkmOJiMJWH5stoJ1nXTCWF7H9uXH04b8caAlvLEALw_wcB'>迪卡儂</a>。本網站不作為盈利、販售、教學使用，如有侵權可寄信至yiachi2221@gmail.com通知下架。</li>
                            <li>本網站上的所有內容，包括但不限於文字、圖像、影音等，均受到相關的知識產權法律保護。任何未經授權的使用、複製、轉載或分發行為均可能觸犯法律。</li>
                            <li>本網站所包含的任何商標、標誌、圖像及其他標識，均為其相應所有者的財產。未經所有者事先書面同意，不得以任何方式使用、複製或展示相關內容。
                                在使用本網站之前，請您詳細閱讀並理解上述免責聲明。您的使用行為即表示您同意遵守這些免責聲明。如果您不同意這些條款，請不要使用本網站。
                                如有任何疑問或意見，請寄信至yiachi2221@gmail.com與我們聯繫。</li>
                        </ol>
                    </ul>
                </div>
            </div>
            <style jsx>
                {`
          .title {
            font-family: 'Noto Sans TC', sans-serif;
            text-Align:center;
            font-weight: bold;
            font-size: 30px;
            color: #414141;
            letter-spacing:5px;
          }
          .title-1 {
            font-family: 'Noto Sans TC', sans-serif;
            text-Align:center;
            font-size: 30px;
            color: #414141;
            letter-spacing:4px;
            margin-bottom:20px
          }
          .text {
            font-family: 'Noto Sans TC', sans-serif;
            font-size:16px;
            line-height:35px;
          }
          .title-2{
               font-weight: bold;
                 color: #414141;
          }
          a {
            text-decoration:none;
            color:#EA6F2A;
          }
          ul{
            list-style: none;
          }
        `}
            </style>
        </>
    )
}
