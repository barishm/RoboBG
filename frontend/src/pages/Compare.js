import { useState } from "react";
import CompareTable from "../components/Compare/CompareTable";
import { useGetRobotsModelQuery } from "../app/apiSlice";
import Loading from "../components/independent/Loading";
const Compare = (props) => {
  const { data: allModels, isLoading: allModelsLoading } =
    useGetRobotsModelQuery();

  const Ids = props.Ids;
  const setIds = props.setIds;
  const [Model, setModel] = useState("");
  const [Model1, setModel1] = useState("");
  const [Model2, setModel2] = useState("");
  const [IdAndModel, setIdAndModel] = useState([]);
  const [Robots, setRobots] = useState([]);

  function handleAdd() {
    setModel("");

    const foundItem = IdAndModel.find((item) => item.model === Model);
    if (foundItem && !Ids.includes(foundItem.id)) {
      setIds([...Ids, foundItem.id]);
      console.log(Ids);
    }
    setModel("");
  }


  function handleCompare() {
    const foundItem1 = allModels.find((item) => item.model === Model1);
    const foundItem2 = allModels.find((item) => item.model === Model2);

    if (foundItem1 && foundItem2 && foundItem1.id !== foundItem2.id) {
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
          {Ids.length < 1 ? (
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
                  className="btn btn-outline-dark btn-md add-button"
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
              <CompareTable
                Robots={Robots}
                setIds={setIds}
                Ids={Ids}
                setRobots={setRobots}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Compare;
