import { useGetRobotsModelImageQuery, useDeleteRobotMutation } from "../../app/apis/robotApiSlice";
import Loading from "../independent/Loading";
import CreateRobot from "./CreateRobot";
import { useSelector } from "react-redux";
import UpdateRobot from "./UpdateRobot";
import { useState } from "react";


const ManageRobots = () => {
  const { data: allRobots, isLoading: allRobotsLoading } =
  useGetRobotsModelImageQuery();
  const [deleteRobot] = useDeleteRobotMutation() 
  const noImage = "images/no-image.jpg";
  const { accessToken } = useSelector((state) => state.auth);
  const [updateId,setUpdateId] = useState(null);


  const deleteHandler = (e) => {
    const id = e.target.value;
    deleteRobot({id,accessToken});
  }


  return (
    <div>
      <button
        type="button"
        className="btn btn-success btn-sm mb-1 ml-2 mt-3"
        data-bs-toggle="modal"
        data-bs-target="#create"
      >
        Create
      </button>
      <CreateRobot/>
      <UpdateRobot id={updateId} />
      



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
                      <i className="fa-regular fa-pen-to-square ms-1"></i>
                    </td>
                    <td>{robot.model}</td>
                    <td>
                      <button type="button" className="btn btn-primary btn-sm" value={robot.id} onClick={(e) => {setUpdateId(e.target.value)}} data-bs-toggle="modal" data-bs-target="#update">
                        Update
                      </button>
                    </td>
                    <td>
                      <button type="button" className="btn btn-danger btn-sm" value={robot.id} onClick={deleteHandler}>
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
