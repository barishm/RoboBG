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
  const queryParams = {
    fields: "model,image",
  };
  const { data: allRobots, isLoading: allRobotsLoading } =
    useGetAllRobotsQuery(queryParams);

  const [deleteRobot] = useDeleteRobotMutation();
  const noImage = "images/no-image.jpg";
  const { accessToken } = useSelector((state) => state.auth);
  const [updateId, setUpdateId] = useState(null);
  const [uploadImageId, setUploadImageId] = useState(null);

  const deleteHandler = (e) => {
    const id = e.target.value;
    deleteRobot({ id, accessToken });
  };

  return (
    <div>
      <CreateRobot />
      <UpdateRobot id={updateId} />
      <UploadRobotImage id={uploadImageId} />

      {allRobotsLoading ? (
        <Loading />
      ) : (
        <>
          <table className="table table-success table-hover">
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
                allRobots.map((robot) => (
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
    </div>
  );
};

export default ManageRobots;
