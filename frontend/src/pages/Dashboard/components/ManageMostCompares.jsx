import { useGetAllMostComparesQuery } from "../../../app/services/mostComparesApiSlice";
import Loading from "../../../components/Loading";

const ManageMostCompares = () => {
  const { data: allCompares, isLoading: allComparesIsLoading } =
    useGetAllMostComparesQuery();

  return (
    <div>
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
                    <td>
                        {item.order}
                    </td>
                    <td>{item.robot1.model}<br></br>{item.robot2.model}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        value={item.id}
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
                        value={item.id}
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
