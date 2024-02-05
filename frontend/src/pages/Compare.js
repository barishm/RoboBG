import { useState } from "react";
import CompareTable from "../components/Compare/CompareTable";
import { useGetRobotsModelQuery,useLazyGetRobotByIdQuery,useLazyGetRobotsByIdsQuery } from "../app/services/robotApiSlice";
import Loading from "../components/independent/Loading";
import { useDispatch } from 'react-redux'
import { addRobot,deleteRobotById, compareTwoRobots } from "../app/compareSlice";
import { useSelector } from "react-redux";

const Compare = () => {
  const { data: allModels, isLoading: allModelsLoading } =
    useGetRobotsModelQuery();
  const dispatch = useDispatch();
  const [triggerAdd] = useLazyGetRobotByIdQuery();  
  const [triggerCompare] = useLazyGetRobotsByIdsQuery();
  const { robots } = useSelector((state) => state.compare);
  const [Model, setModel] = useState("");
  const [Model1, setModel1] = useState("");
  const [Model2, setModel2] = useState("");

  function handleAdd() {
    const foundItem = allModels.find((item) => item.model === Model);
    if (foundItem) {
      triggerAdd(foundItem.id).then((response) => {
        console.log("Response data:", response.data);
        dispatch(addRobot(response.data));
      });
    }
    setModel("");
  }
 

  function handleCompare() {
    const foundItem1 = allModels.find((item) => item.model === Model1);
    const foundItem2 = allModels.find((item) => item.model === Model2);

    if (foundItem1 && foundItem2 && foundItem1.id !== foundItem2.id) {
      triggerCompare([foundItem1.id, foundItem2.id]).then((response) => {
        dispatch(compareTwoRobots(response.data));
      });
    } else {
      console.error(
        "Invalid selection for comparison. Please select two different robots."
      );
    }
    setModel1("");
    setModel2("");
  }

  return (
    <div>
      {allModelsLoading ? (
        <>
          <Loading/>
        </>
      ) : (
        <>
          {robots.length < 1 ? (
            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
              <h4>Robot vacuums to compare:</h4>
              <div className="d-flex flex-column align-items-center p-3 w-100">
                <input
                  className="form-control mb-2"
                  style={{ maxWidth: "350px" }}
                  value={Model1}
                  name="Model1"
                  list="datalistOptions1"
                  id="Model1"
                  placeholder="Choose robot from the list"
                  onChange={(e) => setModel1(e.target.value)}
                />
                <datalist id="datalistOptions1">
                  {allModels.map((item) => (
                    <option key={item.id} value={item.model} />
                  ))}
                </datalist>
                <span className="fw-bold mx-2 mb-2">VS.</span>
                <input
                  className="form-control"
                  style={{ maxWidth: "350px" }}
                  value={Model2}
                  name="Model2"
                  list="datalistOptions2"
                  id="Model2"
                  placeholder="Choose robot from the list"
                  onChange={(e) => setModel2(e.target.value)}
                />
                <datalist id="datalistOptions2">
                  {allModels.map((item) => (
                    <option key={item.id} value={item.model} />
                  ))}
                </datalist>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={handleCompare}
                  className="btn btn-dark text-center"
                >
                  Compare
                </button>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: "flex" }} className="add-div">
                <input
                  className="form-control choose-robot "
                  value={Model}
                  name="Model"
                  list="datalistOptions"
                  id="Model"
                  placeholder="Choose robot from the list"
                  onChange={(e) => setModel(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-dark btn-md add-button"
                  onClick={handleAdd}
                >
                  Add
                </button>
                <datalist id="datalistOptions">
                  {allModels.map((item) => (
                    <option key={item.id} value={item.model} />
                  ))}
                </datalist>
              </div>
              <CompareTable/>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Compare;
