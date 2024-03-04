import {
    useDeleteLinkMutation,
  } from "../../../app/services/linkApiSlice";
  import { useGetAllRobotsQuery, useGetRobotByIdQuery } from "../../../app/services/robotApiSlice";
  import { useState } from "react";
  import AddLink from "./AddLink";
  import { useSelector } from "react-redux";
  
  const ManageLinks = () => {
    const queryParams = {
      fields: "model,links"
    }
    const [id,setId] = useState(null);
    const { data: allModels } = useGetAllRobotsQuery(queryParams);
    const [selectedModel, setSelectedModel] = useState(null);
    const { data } = useGetRobotByIdQuery( {id, queryParams}, { skip: Boolean(!id) });
    const [deleteLink] = useDeleteLinkMutation();
    const { accessToken } = useSelector((state) => state.auth);
  
    const handleInputChange = (e) => {
      const model = allModels.content.find((item) => item.model === e.target.value);
      setSelectedModel(model);
      if(model?.id) {
        setId(model.id);
      }
    };
  
  
    const deleteHandler = (id) => {
      deleteLink({ id, accessToken });
    };
  
    return (
      <div>
        <AddLink Id={selectedModel?.id} />
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
            {allModels && (
              <>
                {allModels.content.map((item) => (
                  <option key={item.id} value={item.model} />
                ))}
              </>
            )}
          </datalist>
        </div>
        {data && (
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
            <table className="table table-success table-hover">
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
                        onClick={() => deleteHandler(item.id)}
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
  
  export default ManageLinks;