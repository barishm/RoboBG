import {
    useGetAllUsersQuery,
    useUpdateUserMutation,
  } from "../../../app/services/userApiSlice";
  import Loading from "../../../components/Loading";
  import { useSelector } from "react-redux";
  import { useState } from "react";
  import { useFormik } from "formik";
  
  const ManageUsers = () => {
    const { accessToken } = useSelector((state) => state.auth);
    const { data, isLoading, isError } = useGetAllUsersQuery(accessToken);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updateRole] = useUpdateUserMutation();
  
    let initialValues = {
      id: selectedUser?.id,
      username: selectedUser?.username,
      role: selectedUser?.role,
    };
    const formik = useFormik({
      enableReinitialize: true,
      initialValues,
      onSubmit: (values) => {
        const Userbody = values;
        let str = Userbody.role.slice(5);
        Userbody.role  = str;
        updateRole({Userbody,accessToken});
        document.getElementById("exampleDataList").value = "";
        setSelectedUser(null);
        formik.resetForm();
      },
    });
  
    const handleInputChange = (e) => {
      const user = data.find((item) => item.username === e.target.value);
      setSelectedUser(user);
    };
  
    if (isError) return <div>An error has occurred!</div>;
  
    if (isLoading) return <Loading />;
  
    return (
      <div>
        <div className="d-flex">
          <input
            className="form-control"
            list="datalistOptions"
            id="exampleDataList"
            placeholder="Select user from list"
            style={{ maxWidth: "250px" }}
            onChange={handleInputChange}
          />
          <datalist id="datalistOptions">
            {data && (
              <>
                {data.map((item) => (
                  <option key={item.id} value={item.username} />
                ))}
              </>
            )}
          </datalist>
        </div>
        {selectedUser && (
          <>
            <h3 className="mt-3">{selectedUser.username}</h3>
            <form className="mt-3" onSubmit={formik.handleSubmit}>
              <input
                type="radio"
                className="btn-check"
                name="options-base"
                id="option5"
                autocomplete="off"
                onChange={() => formik.setFieldValue('role', 'ROLE_ADMIN')}
                checked={formik.values.role === "ROLE_ADMIN"}
              ></input>
              <label className="btn me-2" for="option5">
                Admin
              </label>
              <input
                type="radio"
                className="btn-check"
                name="options-base"
                id="option7"
                autocomplete="off"
                onChange={() => formik.setFieldValue('role', 'ROLE_MODERATOR')}
                checked={formik.values.role === "ROLE_MODERATOR"}
              ></input>
              <label className="btn me-2" for="option7">
                Moderator
              </label>
  
              <input
                type="radio"
                className="btn-check"
                name="options-base"
                id="option6"
                autocomplete="off"
                onChange={() => formik.setFieldValue('role', 'ROLE_USER')}
                checked={formik.values.role === "ROLE_USER"}
              ></input>
              <label className="btn me-2" for="option6">
                User
              </label>
              <br></br>
              <button
              type="submit"
              className="btn btn-dark mt-3"
              >
                Set new role
              </button>
            </form>
          </>
        )}
      </div>
    );
  };
  
  export default ManageUsers;