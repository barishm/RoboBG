import { useState } from "react";
import ManageRobots from "../components/Admin/ManageRobots"
import ManageLinks from "../components/Admin/ManageLinks";
import ManageUsers from "../components/Admin/ManageUsers";
import ManageMostCompared from "../components/Admin/ManageMostCompared";

const  Admin = () => {
  const [activeComponent, setActiveComponent] = useState("Robots");

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Robots":
        return <ManageRobots />;
      case "Users":
        return <ManageUsers />;
      case "Links":
        return <ManageLinks />;
      case "Most Compared":
        return <ManageMostCompared/>;
      default:
        return null;
    }
  };

  return (
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col-auto col-md-auto col-xl-2 px-sm-2 px-0 bg-body-tertiary">
          <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
            <ul
              class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li class="nav-item">
                <a href="#" class="nav-link align-middle px-0" onClick={() => {setActiveComponent("Robots")}}>
                  <i class="fa-solid fa-broom" style={{ color: "#000000" }}></i>{" "}
                  <span class="ms-1 d-none d-md-inline text-bg-light">
                    Manage Robots
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#submenu1"
                  data-bs-toggle="collapse"
                  class="nav-link px-0 align-middle"
                  onClick={() => {setActiveComponent("Links")}}
                >
                  <i class="fa-solid fa-link" style={{ color: "#000000" }}></i>{" "}
                  <span class="ms-1 d-none d-md-inline text-bg-light">
                    Manage Links
                  </span>{" "}
                </a>
              </li>
              <li>
                <a href="#" class="nav-link px-0 align-middle" onClick={() => {setActiveComponent("Users")}}>
                  <i class="fa-solid fa-user" style={{ color: "#000000" }}></i>{" "}
                  <span class="ms-1 d-none d-md-inline text-bg-light">
                    Manage Users
                  </span>
                </a>
              </li>
              <li>
                <a href="#" class="nav-link px-0 align-middle" onClick={() => {setActiveComponent("Most Compared")}}>
                    <i class="fa-solid fa-star" style={{ color: "#000000" }}></i>{" "}
                    <span class="ms-1 d-none d-md-inline text-bg-light">
                    Manage Most Compares
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col py-3">
          {renderActiveComponent()}
          </div>
      </div>
    </div>
  );
}
export default Admin;