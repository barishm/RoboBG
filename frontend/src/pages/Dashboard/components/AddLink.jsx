import { useCreateLinkMutation } from "../../../app/services/linkApiSlice";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

const AddLink = (props) => {
  const id = props.Id;
  const { accessToken } = useSelector((state) => state.auth);
  const [createLink] = useCreateLinkMutation();
  const initialValues = id
    ? { robotId: id, name: "", link: "" }
    : { robotId: "", name: "", link: "" };


  const formik = useFormik({
    enableReinitialize:true,
    initialValues,
    onSubmit: values => {
        const json = values;
        createLink({json,accessToken});
        formik.resetForm();
      },
  });

  return (
    <div
      className="modal fade"
      id="addLink"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <form onSubmit={formik.handleSubmit}>
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Add Link
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-inputs">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Name
                </label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                ></input>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Link
                </label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="link"
                  onChange={formik.handleChange}
                  value={formik.values.link}
                ></input>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {formik.resetForm()}}
            >
              Close
            </button>
            <button type="submit" className="btn btn-success" data-bs-dismiss="modal">
              Add
            </button>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};
export default AddLink;