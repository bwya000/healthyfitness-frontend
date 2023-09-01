import { v4 as uuidv4 } from 'uuid'
export default function ProductFeedback({ feedback }) {
  // 計算總評分和評分的總數
  let totalScore = 0
  let totalFeedbackCount = 0

  feedback.forEach((item) => {
    totalScore += item.score
    totalFeedbackCount++
  })

  // 計算平均評分
  const averageScore =
    totalFeedbackCount > 0 ? totalScore / totalFeedbackCount : 0

  // console.log(feedback.length)
  return (
    <div className="feedbackdesc mt-4 mb-4">
      <h5>商品回饋</h5>
      <h4 className="score mt-3 mb-4">
        {averageScore.toFixed(1)}/5 <i className="bi bi-star-fill"></i>
      </h4>
      {feedback.length === 0 ? (
        <p>沒有商品回饋</p>
      ) : (
        <div>
          {feedback.map((item) => (
            <div key={item.member_name}>
              <p>
                {item.member_name}{' '}
                {Array.from({ length: item.score }).map((_, starIndex) => (
                  <i key={starIndex} className="bi bi-star-fill"></i>
                ))}
                <span style={{ fontSize: 'x-small', color: '#4e4e4e' }}>
                  {item.date}
                </span>
              </p>
              <p>{item.feedback_text}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
      <style jsx>
        {`
          h5 {
            color: #f36f36;
            font-weight: bold;
          }

          .feedbackdesc {
            background-color: #f7f7f7;
            padding: 10px;
            border-radius: 10px;
          }

          .score {
            font-weight: bold;
            font-size: 1.5rem; /* 調整字體大小 */
            margin-bottom: 10px; /* 添加一些底部間距 */
          }
        `}
      </style>
    </div>
  )
}
