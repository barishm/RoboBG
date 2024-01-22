import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RobotDetails from "../components/Robot/RobotDetails";
import QnA from '../components/Robot/QnA'
import { useGetRobotByIdQuery, useGetRobotsModelQuery } from "../app/apis/robotApiSlice";
import Loading from "../components/independent/Loading";

const Robot = (props) => {
    const setIds = props.setIds;
    const Ids = props.Ids;
    const { id } = useParams();
    const [IdAndModel , setIdAndModel] = useState([]);
    const [Model,setModel] = useState("");
    const navigate = useNavigate();
    const {data,isLoading,error} = useGetRobotByIdQuery({id});
    const {data: allModels,isLoading: allModelsIsLoading} = useGetRobotsModelQuery();
    const noImage = "images/no-image.jpg";

    function select(e) {
        const newModel = e.target.value;
        setModel(newModel);
        console.log(newModel);
        const foundItem = IdAndModel.find(item => item.model === newModel);
    
        if(!Ids.includes(foundItem.id)){
            setIds(prevIds => [...prevIds, id]);
        }
        if (foundItem && !Ids.includes(foundItem.id)) {
            setIds(prevIds => [...prevIds, foundItem.id]);
            console.log(Ids);
        }
        setModel("");
        navigate("/compare");
    }



    return (
        <div>
          {error ? (
            <>Oh no, there was an error</>
          ) : isLoading ? (
          <><Loading/></>
          ) : data ? (
          <>
          <div className="single-robot-container p-4 shadow-sm rounded card">
            <div className="row">
              <div className="col-4">
                <img className="single-robot-image" src={data.image || noImage} alt={data.model} />
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
                  style={{ marginTop: "20px", marginBottom: "10px", marginLeft: "20px" }}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Check price
                </button>
                <ul className="dropdown-menu">
                  {data.purchaseLinks && data.purchaseLinks.map((purchaseLink) => (
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
                  {allModelsIsLoading ? 
                  <>Loading...</> : (
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
}
export default Robot;