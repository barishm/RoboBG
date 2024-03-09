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
  const [askQuestion] = useAskQuestionMutation();
  const [answerQuestion] = useAnswerQuestionMutation();
  const [deleteQuestionn] = useDeleteQuestionMutation();
  const [deleteAnswerr] = useDeleteAnswerMutation();
  const { username, role, accessToken } = useSelector((state) => state.auth);
  const [hoveredAnswerId, setHoveredAnswerId] = useState(null);

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
      text: answerTexts[questionId],
    };
    if (!answerBody.text) {
      console.error("Answer text is empty");
      return;
    }
    try {
      await answerQuestion({ answerBody, accessToken: accessToken });
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
      text: questionText,
    };
    try {
      await askQuestion({ questionBody, accessToken: accessToken });
      setQuestionText("");
      hideAllAnswerInputs();
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  function deleteQuestion(event) {
    const id = event.target.getAttribute("value");
    deleteQuestionn({ id, accessToken });
  }
  function deleteAnswer(event) {
    const id = event.target.getAttribute("value");
    deleteAnswerr({ id, accessToken });
  }

  return (
    <div>
      <div className="comments-list mt-4">
        {username !== null && (
          <>
            <h4 className="fw-bolder" style={{ marginBottom: "20px" }}>
              Questions & answers
            </h4>
            <textarea
              className="form-control"
              aria-label="With textarea"
              value={questionText}
              placeholder="Enter Your question here"
              onChange={(event) => setQuestionText(event.target.value)}
            ></textarea>
            <button
              type="button"
              class="btn btn-dark btn-sm mt-2 mb-4"
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
            {allQuestions.map((comment) => (
              <div
                className="comment mb-3 mt-3"
                style={{ position: "relative" }}
                key={comment.id}
              >
                <h5 className="me-5">
                  <span className="me-2" style={{ color: "grey" }}>
                    Q:
                  </span>
                  <span className="text-break">{comment.text}</span>
                </h5>
                {username &&
                  (role === "ADMIN" ||
                    username === comment.author.username) && (
                    <div className="dropdown top-right">
                      <i
                        className="fa-solid fa-ellipsis-vertical"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ color: "#000000", cursor: "pointer" }}
                      ></i>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            value={comment.id}
                            onClick={deleteQuestion}
                            className="dropdown-item"
                            href="#"
                          >
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                {comment.answers.length > 0 && (
                  <div>
                    {comment.answers.map((answer) => (
                      <div
                        className="p-3"
                        style={{ position: "relative" }}
                        key={answer.id}
                        onMouseEnter={() => setHoveredAnswerId(answer.id)}
                        onMouseLeave={() => setHoveredAnswerId(null)}
                      >
                        <h6 className="me-5">
                          <span className="me-2" style={{ color: "grey" }}>
                            A:
                          </span>
                          <span className="text-break">{answer.text}</span>
                        </h6>
                        {username &&
                          (role === "ADMIN" ||
                            username === comment.author.username) && (
                            <div className="dropdown top-right me-1">
                              {hoveredAnswerId === answer.id && (
                                <i
                                  className="fa-solid fa-ellipsis-vertical"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                  style={{
                                    color: "#000000",
                                    cursor: "pointer",
                                  }}
                                ></i>
                              )}
                              <ul className="dropdown-menu">
                                <li>
                                  <a
                                    value={answer.id}
                                    onClick={deleteAnswer}
                                    className="dropdown-item"
                                    href="#"
                                  >
                                    Delete
                                  </a>
                                </li>
                              </ul>
                            </div>
                          )}
                        <p style={{ marginBottom: "5px" }}>
                          By <strong>{answer.author.username}</strong> ·
                          <TimeAgo createTime={answer.createTime} />
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {username && (
                  <button
                    onClick={() => toggleAnswerInput(comment.id)}
                    className="btn btn-outline-light mb-2"
                    style={{
                      border: "none",
                      color: "black",
                      borderRadius: "15px",
                    }}
                    type="button"
                  >
                    Reply
                  </button>
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
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default QnA;
