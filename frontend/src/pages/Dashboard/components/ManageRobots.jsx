import {
  useDeleteRobotMutation,
  useGetAllRobotsQuery,
} from "../../../app/services/robotApiSlice";
import Loading from "../../../components/Loading";
import CreateRobot from "./CreateRobot";
import { useSelector } from "react-redux";
import UpdateRobot from "./UpdateRobot";
import { useState } from "react";
import UploadRobotImage from "./UploadRobotImage";

const ManageRobots = () => {
  const [Page, setPage] = useState(0);
  const [Model, setModel] = useState("");
  const queryParams = {
    fields: "model,image",
    page: Page,
    model: Model,
  };
  const { data: allRobots, isLoading: allRobotsLoading } =
    useGetAllRobotsQuery(queryParams);

  const [deleteRobot] = useDeleteRobotMutation();
  const noImage = "images/no-image.jpg";
  const { accessToken } = useSelector((state) => state.auth);
  const [updateId, setUpdateId] = useState(null);
  const [uploadImageId, setUploadImageId] = useState(null);
  const isLast = allRobots?.last;

  const deleteHandler = (e) => {
    const id = e.target.value;
    deleteRobot({ id, accessToken });
  };

  const nextPage = () => {
    if(!isLast){
      setPage(Page+1);
    }
  }
  const prevPage = () => {
    if(Page !== 0) {
      setPage(Page-1);
    }
  }

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
        <input
          className="form-control form-control-sm"
          value={Model}
          onChange={(e) => {
            setModel(e.target.value);
          }}
          type="text"
          placeholder="Search by model"
          aria-label=".form-control-sm example"
        ></input>
      </div>
      <UpdateRobot id={updateId} />
      <UploadRobotImage id={uploadImageId} />

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
                          setUploadImageId(e.target.value);
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#uploadImage"
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                    </td>
                    <td>{robot.model}</td>
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
                        onClick={deleteHandler}
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous" onClick={prevPage}>
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item">
            <span class="page-link" href="#">
              {Page+1}
            </span>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next" onClick={nextPage}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      </div>
    </div>
  );
};

export default ManageRobots;
