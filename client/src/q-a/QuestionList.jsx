/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from "react";
import moment from "moment";
import ImageComponent from "./ImageComponent.jsx";
import axios from "axios";

const answerArray = [];
const QuestionList = function (props) {
  // console.log("this is the props question:", props.question);
  const [answerArr, setAnswerArr] = useState([]);
  const [loading, toogleLoading] = useState(true);
  const [answerReported , setAnswerReported] = useState(false);
  const [answerHelpful , setAnswerHelpful] = useState(false);
  // console.log("answerArr:", answerArr);
  // answerArray = Object.keys(props.question.answers)
  // for(let key in props.question.answers){
  //   answerArray.push(props.question.answers[key])
  //   }
  // // console.log(answerArray)
  // // console.log(props.question)
  // console.log(answerArray)
  // console.log(props.question)
  //result.data.results.length > 1 ? answerArray.push(result.data.results)
  useEffect(() => {
    axios
      .get(`/answers/${props.question.question_id}`)
      .then((result) => {
        if (result.data.results) {
          setAnswerArr(result.data.results);
          toogleLoading(false);
          setAnswerHelpful(false);
        }
      })
      .then()
      .catch((err) => console.log(err));
  }, [props.question.question_id]);

  function reportAnswer() {
    let answerId = answerArr[0].answer_id;
    console.log(answerId);
    axios.put(`/answer/report/${answerId}`)
      .then(setAnswerReported(true))
      .then((res) => console.log('answer reported'))
      .catch((err) => console.log(err));
  }
  function helpfulAnswer(event) {
    let answerId = answerArr[0].answer_id;
    axios.put(`/answer/helpful/${answerId}`)
      .then(setAnswerHelpful(true))
      .then((res) => console.log('answer helpful'))
      .catch((err) => console.log(err));
  }

  const ButtonTitle = (
    <>
      <text style={{ fontSize: "small" }}>Helpful?</text>
      &nbsp;
      <text style={{ textDecoration: "underline", fontSize: "small" }}>
        Yes
      </text>
    </>
  );
  if (!loading) {
    return (
      <div className="qa-main-div">
        &nbsp; &nbsp;
        <div className="question-div">
          <div className="flex-child">
            <b>Q: {props.question.question_body}</b>
          </div>
          <div className="flex-child">
            <button type="button" className="astext-btn">
              {ButtonTitle} ({props.question.question_helpfulness})
            </button>
            &nbsp; &nbsp; | &nbsp; &nbsp;
            <button type="button" className="astext-btn-answer">Add Answer</button>
          </div>
        </div>
        <div>
          <b>A:</b>
          <span className="answer-text">{answerArr[0].body}</span>
        </div>
        &nbsp;
        <div>
          {answerArr[0].photos.map((photo, i) => (
            <ImageComponent key={i} photo={photo} />
          ))}
        </div>
        &nbsp; &nbsp;
        <div>
          <span style={{ fontSize: "small" }}>
            by &nbsp;
            {answerArr[0].answerer_name}
            ,
                  &nbsp;
            {moment(answerArr[0].date.slice(0, 10)).format("MMM Do YY")}
          </span>
          &nbsp; &nbsp; | &nbsp; &nbsp;
          {answerHelpful ? <button type="button" className="astext-btn">This Answer has been marked Helpful</button> : (
            <button type="button" className="astext-btn" onClick={(event) => { helpfulAnswer(event); }}>
              <text style={{ fontSize: 'small' }}>Helpful?</text>
                    &nbsp;
              <mark style={{ textDecoration: 'underline', fontSize: 'small' }}>
                Yes
              </mark>
              (
              {answerArr[0].helpfulness}
              )
            </button>
          )}
          {/* <button type="button" className="astext-btn">
            {ButtonTitle} ({answerArr[0].helpfulness})
          </button> */}
          &nbsp; &nbsp; | &nbsp; &nbsp;
          {answerReported ? <button type="button" className="astext-btn-answer" >This Answer has been Reported</button> : (
            <button type="button" className="astext-btn-answer" onClick= {reportAnswer}>
              Report
            </button>
          )}
        </div>
      </div>
    );
  // eslint-disable-next-line no-else-return
  } else {
    <section>
      <div> Questions Loading...</div>
    </section>;
  }
};
export default QuestionList;
