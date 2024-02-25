import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useUpdateMostComparesMutation } from "../../../app/services/mostComparesApiSlice";
import { useGetAllRobotsQuery } from "../../../app/services/robotApiSlice";

const UpdateMostCompared = (props) => {
  const queryParams = {
    fields: "model,image"
  }
  const { accessToken } = useSelector((state) => state.auth);
  const mostCompared = props.updateEntity;
  const setMostCompared = props.setUpdateEntity;
  const { data: allModels } = useGetAllRobotsQuery(queryParams);
  const [updateMostCompared] = useUpdateMostComparesMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: mostCompared?.id,
      order: mostCompared?.order,
      robot1: mostCompared?.robot1?.model,
      robot2: mostCompared?.robot2?.model,
      robot3: mostCompared?.robot3?.model,
    },
    onSubmit: (values) => {
      const jsonBody = values;
      updateMostCompared({jsonBody,accessToken});
      formik.resetForm();
      setMostCompared(null)
    },
  });

  return (
    <div>
      <div
        className="modal fade"
        id="update"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
        <form onSubmit={formik.handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Most Compared
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {setMostCompared(null)}}
              ></button>
            </div>
            <div className="modal-body">
            <div className="form-inputs">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Order
                </label>
                <input
                  className="form-control form-control-sm"
                  type="number"
                  name="order"
                  onChange={formik.handleChange}
                  value={formik.values.order}
                ></input>
              </div>
              <div className="mb-3">
              <input
            className="form-control"
            list="datalistOptions1"
            id="exampleDataList1"
            placeholder="Select 1st robot from list"
            name="robot1"
            onChange={formik.handleChange}
            value={formik.values.robot1}
          />
          <datalist id="datalistOptions1">
            {allModels && (
              <>
                {allModels.map((item) => (
                  <option key={item.id} value={item.model} />
                ))}
              </>
            )}
          </datalist>
              </div>
              <div className="mb-3">
              <input
            className="form-control"
            list="datalistOptions2"
            id="exampleDataList2"
            placeholder="Select 2nd robot from list"
            name="robot2"
            onChange={formik.handleChange}
            value={formik.values.robot2}
          />
          <datalist id="datalistOptions2">
            {allModels && (
              <>
                {allModels.map((item) => (
                  <option key={item.id} value={item.model} />
                ))}
              </>
            )}
          </datalist>
              </div>
              <div className="mb-3">
              <input
            className="form-control"
            list="datalistOptions3"
            id="exampleDataList3"
            placeholder="Select 3th robot from list"
            name="robot3"
            onChange={formik.handleChange}
            value={formik.values.robot3}
          />
          <datalist id="datalistOptions3">
            {allModels && (
              <>
                {allModels.map((item) => (
                  <option key={item.id} value={item.model} />
                ))}
              </>
            )}
          </datalist>
              </div>
            </div>
          </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {setMostCompared(null)}}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Update
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMostCompared;
