import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../app/services/userApiSlice";
import Loading from "../independent/Loading";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useFormik } from "formik";

const ManageUsers = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = useGetAllUsersQuery(accessToken);
  const [selectedUser, setSelectedUser] = useState(null);

  let initialValues = {
    id: selectedUser?.id,
    username: selectedUser?.username,
    role: selectedUser?.role,
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {
      const json = values;
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
          <h5 className="mt-3">
            Selected user:{" "}
            <span style={{ color: "rgb(255, 99, 71)" }}>
              {selectedUser.username}
            </span>
          </h5>
          <form className="mt-3">
            <input
              type="radio"
              className="btn-check"
              name="options-base"
              id="option5"
              autocomplete="off"
              onChange={() => formik.setFieldValue('role', 'ROLE_ADMIN')}
              checked={formik.values.role === "ROLE_ADMIN"}
            ></input>
            <label className="btn mx-2" for="option5">
              Admin
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
            <label className="btn" for="option6">
              User
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
            <label className="btn" for="option7">
              Moderator
            </label>
            <button
            type="button"
            className="btn btn-dark ms-2"
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
