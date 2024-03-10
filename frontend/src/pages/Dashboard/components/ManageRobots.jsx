import {
  useDeleteRobotMutation,
  useGetAllRobotsQuery,
  useUploadRobotImageMutation
} from "../../../app/services/robotApiSlice";
import {useCreateLinkMutation,useDeleteLinkMutation} from "../../../app/services/linkApiSlice"
import Loading from "../../../components/Loading";
import CreateRobot from "./CreateRobot";
import { useSelector } from "react-redux";
import UpdateRobot from "./UpdateRobot";
import { useState,useEffect } from "react";
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageRobots = () => {
  const [Page, setPage] = useState(0);
  const [Model, setModel] = useState("");
  const queryParams = {
    fields: "model,image,links",
    page: Page,
    model: Model,
  };
  const { data: allRobots, isLoading: allRobotsLoading } = useGetAllRobotsQuery(queryParams);
  const [robotId,setRobotId] = useState(null);
  const [createLink] = useCreateLinkMutation();
  const [deleteLink] = useDeleteLinkMutation();
  const [deleteRobot] = useDeleteRobotMutation();
  const noImage = "images/no-image.jpg";
  const { accessToken } = useSelector((state) => state.auth);
  const [updateId, setUpdateId] = useState(null);
  const [uploadImageId, setUploadImageId] = useState(null);
  const isLast = allRobots?.last;
  const [file, setFile] = useState(null);
  const [inputKey, setInputKey] = useState(Date.now());
  const [uploadImage, { isSuccess, isError, error }] = useUploadRobotImageMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Image uploaded successfully!");
    } else if (isError) {
      toast.error(`Failed to upload image: ${error?.data?.error || 'Unknown error'}`);
    }
  }, [isSuccess, isError, error]);

  const handleUploadImage = async () => {
    const formData = new FormData();
    let id = Number(uploadImageId);
    if (file && uploadImageId) {
      formData.append("file", file);
      await uploadImage({id,accessToken,formData})
    }
    resetForm();
  };
  const resetForm = () => {
    setFile(null);
    setInputKey(Date.now());
  };

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      robotId: robotId,
      name: "", 
      link: "" 
    },
    onSubmit: values => {
        const json = values;
        createLink({json,accessToken});
        formik.resetForm();
      },
  });

  const deleteRobotHandler = (e) => {
    const id = e.target.value;
    deleteRobot({ id, accessToken });
  };
  const deleteLinkHandler = (e) => {
    const id = e.target.value
    deleteLink({ id, accessToken });
  }

  const nextPage = () => {
    if (!isLast) {
      setPage(Page + 1);
    }
  };
  const prevPage = () => {
    if (Page !== 0) {
      setPage(Page - 1);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          maxWidth: "500px",
        }}
      >
        <CreateRobot />
        <UpdateRobot id={updateId} />
        <input
          className="form-control form-control-sm"
          value={Model}
          onChange={(e) => {
            setModel(e.target.value);
            setPage(0);
          }}
          type="text"
          placeholder="Search by model"
          aria-label=".form-control-sm example"
        ></input>
      </div>

      {allRobotsLoading ? (
        <Loading />
      ) : (
        <>
          <table className="table table-light table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Model</th>
                <th scope="col">Links</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {allRobots &&
                allRobots.content.map((robot) => (
                  <tr key={robot.id}>
                    <th scope="row">{robot.id}</th>
                    <td>
                      <img
                        style={{ height: "50px" }}
                        src={robot.image || noImage}
                        alt="..."
                      ></img>
                      <button
                        className="btn btn-light btn-sm ms-1"
                        value={robot.id}
                        onClick={(e) => {
                          setUploadImageId(e.currentTarget.value);
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#uploadImage"
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                    </td>
                    <td>{robot.model}</td>
                    <td>
                      <div class="dropdown">
                        <button
                          class="btn btn-secondary btn-sm dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Links
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <button class="dropdown-item" type="button" value={robot.id} onClick={(e) => {setRobotId(e.target.value)}} data-bs-toggle="modal" data-bs-target="#addLinkk">
                              Add Link
                            </button>
                          </li>
                          {robot.purchaseLinks.map((link) => (
                            <li>
                              <span className="d-flex">
                              <a class="dropdown-item" href={link.link}>
                                {link.name}
                              </a>
                              <button className="btn btn-light btn-sm m-1" value={link.id} onClick={deleteLinkHandler}>
                                <i className="fa-solid fa-trash mt-2 me-2 ms-2"></i>
                              </button>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        value={robot.id}
                        onClick={(e) => {
                          setUpdateId(e.target.value);
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#update"
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        value={robot.id}
                        onClick={deleteRobotHandler}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}

      {/*pagination*/} 
      <div style={{ display: "flex", justifyContent: "center" }}>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a
                class="page-link"
                href="#"
                aria-label="Previous"
                onClick={prevPage}
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item">
              <span class="page-link" href="#">
                {Page + 1}
              </span>
            </li>
            <li class="page-item">
              <a
                class="page-link"
                href="#"
                aria-label="Next"
                onClick={nextPage}
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>


      {/*add link modal*/} 
      <div
      className="modal fade"
      id="addLinkk"
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

    {/* upload image modal */}
    <div
      className="modal fade"
      id="uploadImage"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Upload Image
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={resetForm}
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-inputs">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Image
                  </label>
                  <input
                    key={inputKey}
                    className="form-control form-control-sm"
                    id="fileInput"
                    type="file"
                    name="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={resetForm}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={handleUploadImage}
              >
                Upload
              </button>
            </div>
          </div>
      </div>
    </div>
    </div>
  );
};

export default ManageRobots;
