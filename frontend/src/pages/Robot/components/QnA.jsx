import { useState } from "react";
import TimeAgo from "./TimeAgo";
import {
  useGetQnaQuery,
  useAskQuestionMutation,
  useAnswerQuestionMutation,
  useDeleteQuestionMutation,
  useDeleteAnswerMutation,
} from "../../../app/services/qnaApiSlice";
import { useSelector } from "react-redux";

const QnA = (props) => {
  const id = props.Id;
  const [questionText, setQuestionText] = useState("");
  const [answerTexts, setAnswerTexts] = useState({});
  const { data: allQuestions, isLoading: allQuestionsLoading } =
    useGetQnaQuery(id);
  const [askQuestion] =
    useAskQuestionMutation();
  const [answerQuestion] =
    useAnswerQuestionMutation();
  const [deleteQuestionn] = useDeleteQuestionMutation();
  const [deleteAnswerr] = useDeleteAnswerMutation();
  const { username, role, accessToken } = useSelector((state) => state.auth);


  const [showAnswerInputs, setShowAnswerInputs] = useState({});
  const toggleAnswerInput = (commentId) => {
    setShowAnswerInputs((prevShowAnswerInputs) => ({
      ...prevShowAnswerInputs,
      [commentId]: !prevShowAnswerInputs[commentId],
    }));
  };

  const handleAnswerTextChange = (commentId, text) => {
    setAnswerTexts((prevTexts) => ({
      ...prevTexts,
      [commentId]: text,
    }));
  };

  const hideAllAnswerInputs = () => {
    setShowAnswerInputs((prevShowAnswerInputs) =>
      Object.keys(prevShowAnswerInputs).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {})
    );
  };

  const handleAnswer = async (questionId) => {
    const answerBody = {
      questionId: questionId,
      authorUsername: username,
      text: answerTexts[questionId]
    }
    if (!answerBody.text) {
      console.error("Answer text is empty");
      return;
    }
    try {
      await answerQuestion({answerBody, accessToken: accessToken})
      setAnswerTexts("");
      hideAllAnswerInputs();
    } catch (error) {
      console.error("Error creating answer:", error);
    }
  };

  const handleQuestion = async () => {
    const questionBody = {
      robotId: id,
      authorUsername: username,
      text: questionText
    }
    try {
      await askQuestion({questionBody, accessToken: accessToken})
      setQuestionText("");
      hideAllAnswerInputs();
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  function deleteQuestion(event) {
    const id = event.target.getAttribute("value");
    deleteQuestionn({id,accessToken})
  }
  function deleteAnswer(event) {
    const id = event.target.getAttribute("value");
    deleteAnswerr({id,accessToken})
  }

  return (
    <div>
      <div className="comments-list mt-5">
        {username !== null && (
          <>
            <h3
              className="fw-bolder"
              style={{ marginTop: "10px", textAlign: "center" }}
            >
              Q&A
            </h3>
            <textarea
              className="form-control"
              aria-label="With textarea"
              value={questionText}
              onChange={(event) => setQuestionText(event.target.value)}
            ></textarea>
            <button
              type="button"
              class="btn btn-outline-dark btn-sm mt-2 mb-4"
              onClick={handleQuestion}
            >
              Ask Question
            </button>
          </>
        )}
        {allQuestionsLoading ? (
          <>Loading...</>
        ) : (
          <>
            <h4
              className="fw-bolder"
              style={{ marginTop: "10px", textAlign: "center" }}
            >
              Questions
            </h4>
            {allQuestions.map((comment) => (
              <div className="comment card mb-3" key={comment.id}>
                <div className="card-body">
                  <p className="card-text">
                    <strong>@{comment.author.username}</strong>
                    <TimeAgo createTime={comment.createTime} />
                  </p>
                  <p className="card-text">{comment.text}</p>
                  {username && (role === 'ADMIN' || username === comment.author.username) && (
                    <i
                      value={comment.id}
                      onClick={deleteQuestion}
                      className="fa-solid fa-trash fa-sm position-custom"
                      style={{ color: "#000000", cursor: "pointer" }}
                    ></i>
                  )}
                  {username && (
                    <p
                      className="mb-0 fw-bold"
                      onClick={() => toggleAnswerInput(comment.id)}
                    >
                      <span className="text-pointer-on-hover">Answer</span>
                    </p>
                  )}
                  {showAnswerInputs[comment.id] && (
                    <div>
                      <textarea
                        className="form-control"
                        aria-label="With textarea"
                        value={answerTexts[comment.id] || ""}
                        onChange={(event) =>
                          handleAnswerTextChange(comment.id, event.target.value)
                        }
                      ></textarea>
                      <button
                        type="button"
                        className="btn btn-outline-dark btn-sm mt-2"
                        onClick={() => handleAnswer(comment.id)}
                      >
                        Answer
                      </button>
                    </div>
                  )}
                </div>
                {comment.answers.length > 0 && (
                  <div className="card-footer">
                    <small className="text-muted">Replies:</small>
                    {comment.answers.map((answer) => (
                      <div key={answer.id} className="card bg-light mb-2 mt-2">
                        <div className="card-body">
                          <p className="card-text">
                            <strong>@{answer.author.username}</strong>
                            <TimeAgo createTime={answer.createTime} />
                          </p>
                          <p className="card-text">{answer.text}</p>
                          {username && (role === 'ADMIN' || username === comment.author.username) && (
                            <i
                              value={answer.id}
                              onClick={deleteAnswer}
                              className="fa-solid fa-trash fa-sm position-custom"
                              style={{ color: "#000000", cursor: "pointer" }}
                            ></i>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default QnA;