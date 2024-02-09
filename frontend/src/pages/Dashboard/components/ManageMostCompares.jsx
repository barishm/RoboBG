import { useGetAllMostComparesQuery, useDeleteMostComparesMutation } from "../../../app/services/mostComparesApiSlice";
import Loading from "../../../components/Loading";
import CreateMostCompared from "./CreateMostCompared";
import { useSelector } from "react-redux";
import UpdateMostCompared from "./UpdateMostCompared";
import { useState } from "react";

const ManageMostCompares = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const { data: allCompares, isLoading: allComparesIsLoading } =
    useGetAllMostComparesQuery();
  const [deleteMC] = useDeleteMostComparesMutation();
  const [MostComparedForUpdate, SetMostComparedForUpdate] = useState(null);

  const deleteHandler = (e) => {
    const id = e.target.value;
    deleteMC({ id, accessToken });
  };

  const updateHandler = (e) => {
    const id = e.target.value;
    const mostComparedToUpdate = allCompares.find((item) => item.id === parseInt(id));
    if(mostComparedToUpdate){
      SetMostComparedForUpdate(mostComparedToUpdate);
    }
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
      <CreateMostCompared />
      <UpdateMostCompared updateEntity={MostComparedForUpdate} setUpdateEntity={SetMostComparedForUpdate}/>


      {allComparesIsLoading ? (
        <Loading />
      ) : (
        <>
          <table className="table table-success table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Order</th>
                <th scope="col">Models</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {allCompares &&
                allCompares.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.order}</td>
                    <td>
                      {item.robot1?.model}
                      <br />
                      {item.robot2 ? (
                        <>
                          <hr />
                        </>
                      ) : (
                        <></>
                      )}
                      {item.robot2?.model}
                      <br />
                      {item.robot3 ? (
                        <>
                          <hr />
                        </>
                      ) : (
                        <></>
                      )}
                      {item.robot3?.model}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary "
                        value={item.id}
                        data-bs-toggle="modal"
                        data-bs-target="#update"
                        onClick={updateHandler}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        value={item.id}
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

export default ManageMostCompares;
