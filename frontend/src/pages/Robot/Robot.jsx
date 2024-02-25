import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RobotDetails from "./components/RobotDetails";
import QnA from "./components/QnA";
import {
  useGetRobotByIdQuery,
  useGetAllRobotsQuery,
  useLazyGetRobotByIdQuery,
} from "../../app/services/robotApiSlice";
import Loading from "../../components/Loading";
import { addRobot } from "../../app/redux/compareSlice";
import { useDispatch } from "react-redux";

const Robot = () => {
  const queryParams = {
    fields: "model",
  };
  const dispatch = useDispatch();

  const [triggerCompare] = useLazyGetRobotByIdQuery();

  const { id } = useParams();
  const [Model, setModel] = useState("");
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetRobotByIdQuery({ id });
  const { data: allModels, isLoading: allModelsIsLoading } =
    useGetAllRobotsQuery(queryParams);
  const noImage = "images/no-image.jpg";

  function select(e) {
    const newModel = e.target.value;
    setModel(newModel);
    const foundItem = allModels.find((item) => item.model === newModel);

    if (foundItem && foundItem.id !== data.id) {
      let id = data.id;
      triggerCompare({id}).then((response) => {
        dispatch(addRobot(response.data));
      });
      id = foundItem.id;
      triggerCompare({id}).then((response) => {
        dispatch(addRobot(response.data));
      });
      navigate("/compare");
    }
    setModel("");
  }

  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>
          <Loading />
        </>
      ) : data ? (
        <>
          <div className="single-robot-container p-4 shadow-sm rounded card">
            <div className="row">
              <div className="col-4">
                <img
                  className="single-robot-image"
                  src={data.image || noImage}
                  alt={data.model}
                />
              </div>
              <div className="col-8">
                <h2 className="fw-border">{data.model}</h2>
                <button
                  type="button"
                  style={{ marginTop: "20px", marginBottom: "10px" }}
                  className="btn btn-dark"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Compare
                </button>
                <button
                  type="button"
                  className="btn btn-warning btn dropdown-toggle"
                  style={{
                    marginTop: "20px",
                    marginBottom: "10px",
                    marginLeft: "20px",
                  }}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Check price
                </button>
                <ul className="dropdown-menu">
                  {data.purchaseLinks &&
                    data.purchaseLinks.map((purchaseLink) => (
                      <li key={purchaseLink.id}>
                        <a className="dropdown-item" href={purchaseLink.link}>
                          {purchaseLink.name}
                        </a>
                      </li>
                    ))}
                </ul>
                <div className="collapse" id="collapseExample">
                  <input
                    className="form-control"
                    value={Model}
                    style={{ maxWidth: "230px" }}
                    name="Model"
                    list="datalistOptions"
                    id="Model"
                    onChange={select}
                    placeholder="Choose robot from the list"
                  />
                  {allModelsIsLoading ? (
                    <>Loading...</>
                  ) : (
                    <>
                      <datalist id="datalistOptions">
                        {allModels.map((item) => (
                          <option key={item.id} value={item.model} />
                        ))}
                      </datalist>
                    </>
                  )}
                </div>
              </div>
            </div>
            <QnA Id={id} />
            <RobotDetails Robot={data} />
          </div>
        </>
      ) : null}
    </div>
  );
};
export default Robot;
