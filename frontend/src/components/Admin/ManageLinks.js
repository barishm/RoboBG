import {
  useDeleteLinkMutation,
  useGetRobotsModelQuery,
  useLazyGetRobotsModelLinksByIdQuery,
} from "../../app/apiSlice";
import { useState } from "react";
import AddLink from "./AddLink";
import { useSelector } from "react-redux";

const ManageLinks = () => {
  const { data: allModels } = useGetRobotsModelQuery();
  const [trigger, result] = useLazyGetRobotsModelLinksByIdQuery();
  const { data } = result;
  const [Id, setId] = useState(null);
  const [deleteLink] = useDeleteLinkMutation();
  const { accessToken } = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    const selectedModel = allModels.find(
      (item) => item.model === e.target.value
    );
    if (selectedModel) {
      setId(selectedModel.id);
    } else {
      setId(null);
    }
  };

  const handleSelect = () => {
    if (Id !== null) {
      trigger(Id);
    }
  };

  const deleteHandler = (e) => {
    const id = e.target.value;
    deleteLink({id,accessToken});
  }

  return (
    <div>
      <AddLink Id={Id} />
      <div className="d-flex">
        <input
          className="form-control"
          list="datalistOptions"
          id="exampleDataList"
          placeholder="Select robot from list"
          style={{ maxWidth: "250px" }}
          onChange={handleInputChange}
        />
        <datalist id="datalistOptions">
          {allModels ? (
            <>
              {allModels.map((item) => (
                <option key={item.id} value={item.model} />
              ))}
            </>
          ) : null}
        </datalist>
        <button
          type="button"
          className="btn btn-primary ms-2"
          onClick={handleSelect}
        >
          Select
        </button>
      </div>
      {data ? (
        <>
          <h3 className="mt-3">{data.model}</h3>
          <button
            type="button"
            className="btn btn-success btn-sm mb-1 ml-2 mt-1"
            data-bs-toggle="modal"
            data-bs-target="#addLink"
          >
            Add Link
          </button>
          <table class="table table-success table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Link</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.purchaseLinks.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>
                    <a href={item.link}>link</a>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
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
      ) : null}
    </div>
  );
};

export default ManageLinks;
