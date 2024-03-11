import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetBestRobotsQuery } from "../../../app/services/robotApiSlice";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";

const Bests = () => {
  const lang = useSelector((state) => state.language.lang);
  const navigate = useNavigate();
  const noImage = "images/no-image.jpg";

  const { data, isLoading } = useGetBestRobotsQuery();

  const details = (robotId) => {
    navigate("/robots/" + robotId);
  };

  return (
    <div>
      <h3
        className="fw-bolder"
        style={{ marginTop: "10px", textAlign: "center" }}
      >
        {lang === "en" ? (
          "Best Robot Vacuum Cleaners"
        ) : (
          "Най-добри роботи"
        )}
      </h3>
      {isLoading ? (
        <><Loading/></>
      ) : data ? (
        <div className="col-12 d-flex flex-wrap justify-content-evenly">
          {data.map((item) => (
            <div
              className="col-6 col-sm-4 col-md-4 col-lg-3 m-3"
              style={{ maxWidth: "200px" }}
              key={item.id}
            >
              <div className="card h-100 shadow-sm bg-body-tertiary rounded">
                <img
                  className="rounded-top"
                  value={item.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => details(item.id)}
                  src={item.image || noImage}
                  alt="..."
                />
                <div className="card-body">
                  <div className="text-center">
                    <h5
                      className="fw-bolder"
                      onClick={() => details(item.id)}
                      value={item.id}
                      style={{ cursor: "pointer" }}
                    >
                      {item.model}
                    </h5>
                  </div>
                </div>
                <div className="card-footer text-center p-4 pt-0 pb-0 mb-3 border-top-0 bg-transparent">
                  <div className="btn-group text-center">
                    <button
                      type="button"
                      className="btn btn-warning btn-sm dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {lang === "en" ? ("Check price") : ("Проверка на цена")}
                    </button>
                    <ul className="dropdown-menu">
                      {item.purchaseLinks.length > 0 &&
                        item.purchaseLinks.map((link) => (
                          <li key={link.id}>
                            <a className="dropdown-item" href={link.link}>
                              {link.name}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default Bests;
