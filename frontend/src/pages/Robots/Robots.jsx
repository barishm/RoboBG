import { useNavigate } from "react-router-dom";
import { useGetAllRobotsQuery } from "../../app/services/robotApiSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import PopularComparisons from "../Compare/components/PopularComparisons";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const Robots = () => {
  const [Page, setPage] = useState(0);
  const [Model, setModel] = useState("");
  const [Brands, setBrands] = useState([]);
  const queryParams = {
    fields: "model,image,links",
    page: Page,
    model: Model,
    brands: Brands.join(","),
  };

  const lang = useSelector((state) => state.language.lang);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllRobotsQuery(queryParams);
  const noImage = "images/no-image.jpg";
  const isLast = data?.last;

  const nextPage = () => {
    if (!isLast) {
      setPage(Page + 1);
    }
  };
  const prevPage = () => {
    if (Page !== 0) {
      setPage(Page - 1);
    }
  };

  const details = (robotId) => {
    navigate("/robots/" + robotId);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setBrands((prev) => [...prev, value]);
    } else {
      setBrands((prev) => prev.filter((brand) => brand !== value));
    }
    setPage(0);
    console.log(Brands);
  };
  if (isError) {
    return <Error />;
  }

  return (
    <section className="mt-5">
      <div className="container d-flex">
        <div className="col-12 col-md-12 col-lg-9">
          <h3
            className="fw-bolder"
            style={{ marginTop: "10px", textAlign: "center" }}
          >
            {lang === "en" ? "All Robot Vacuum Cleaners" : "Всички роботи"}
            <br></br>
            <button
            className="btn btn-light mt-3 d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            Filters
          </button>
          </h3>


          <div
            class="offcanvas offcanvas-start"
            tabindex="-1"
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasExampleLabel">
                Filters
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
            <form id="filters">
                <div>
                  <label for="id_title" class="form-label">
                    By model name
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={Model}
                    onChange={(e) => {
                      setModel(e.target.value);
                      setPage(0);
                    }}
                    class="textinput textInput form-control"
                    id="id_title"
                  ></input>
                </div>
                <div className="mt-3">
                  <label class="form-label">Brand Name</label>
                  <div className="card p-2">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="brand_name"
                        checked={Brands.includes("360")}
                        value="360"
                        onChange={handleCheckboxChange}
                      ></input>
                      <label for="id_brand_name_0" class="form-check-label">
                        360
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="brand_name"
                        checked={Brands.includes("Xiaomi")}
                        value="Xiaomi"
                        onChange={handleCheckboxChange}
                      ></input>
                      <label for="id_brand_name_0" class="form-check-label">
                        Xiaomi
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="brand_name"
                        checked={Brands.includes("Roborock")}
                        value="Roborock"
                        onChange={handleCheckboxChange}
                      ></input>
                      <label for="id_brand_name_0" class="form-check-label">
                        Roborock
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="brand_name"
                        checked={Brands.includes("SAMSUNG")}
                        value="SAMSUNG"
                        onChange={handleCheckboxChange}
                      ></input>
                      <label for="id_brand_name_0" class="form-check-label">
                        SAMSUNG
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="brand_name"
                        checked={Brands.includes("Eufy")}
                        value="Eufy"
                        onChange={handleCheckboxChange}
                      ></input>
                      <label for="id_brand_name_0" class="form-check-label">
                        Eufy
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="brand_name"
                        checked={Brands.includes("bObsweep")}
                        value="bObsweep"
                        onChange={handleCheckboxChange}
                      ></input>
                      <label for="id_brand_name_0" class="form-check-label">
                        bObsweep
                      </label>
                    </div>
                  </div>
                </div>
              </form>
              <button
                type="button"
                className="btn btn-light mt-3"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >Apply</button>
            </div>
          </div>
          {isLoading ? (
            <>
              <Loading />
            </>
          ) : data.content ? (
            <div className="col-12 d-flex flex-wrap justify-content-evenly">
              {data.content.map((item) => (
                <div
                  className="col-6 col-sm-4 col-md-4 col-lg-3 m-3"
                  style={{}}
                  key={item.id}
                >
                  <div className="card h-100 shadow-sm bg-body-tertiary rounded">
                    <img
                      className="rounded-top"
                      value={item.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => details(item.id)}
                      src={item.image || noImage}
                      alt="..."
                    />
                    <div className="card-body">
                      <div className="text-center">
                        <h5
                          className="fw-bolder"
                          onClick={() => details(item.id)}
                          value={item.id}
                          style={{ cursor: "pointer" }}
                        >
                          {item.model}
                        </h5>
                      </div>
                    </div>
                    <div className="card-footer text-center p-4 pt-0 pb-0 mb-3 border-top-0 bg-transparent">
                      <div className="btn-group text-center">
                        <button
                          type="button"
                          className="btn btn-warning btn-sm dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {lang === "en" ? "Check price" : "Проверка на цена"}
                        </button>
                        <ul className="dropdown-menu">
                          {item.purchaseLinks.length > 0 &&
                            item.purchaseLinks.map((link) => (
                              <li key={link.id}>
                                <a className="dropdown-item" href={link.link}>
                                  {link.name}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <a
                    class="page-link"
                    href="#"
                    aria-label="Previous"
                    onClick={prevPage}
                  >
                    <span aria-hidden="true" style={{ color: "black" }}>
                      &laquo;
                    </span>
                  </a>
                </li>
                <li class="page-item">
                  <span class="page-link" href="#" style={{ color: "black" }}>
                    {Page + 1}
                  </span>
                </li>
                <li class="page-item">
                  <a
                    class="page-link"
                    href="#"
                    aria-label="Next"
                    onClick={nextPage}
                  >
                    <span aria-hidden="true" style={{ color: "black" }}>
                      &raquo;
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div
          className="col-12 col-md-12 col-lg-3"
          style={{ marginTop: "68px" }}
        >
          <div className="card d-none d-lg-block">
            <div class="card-header">Filters</div>
            <div className="card-body p-4">
              <form id="filters">
                <div>
                  <label for="id_title" class="form-label">
                    By model name
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={Model}
                    onChange={(e) => {
                      setModel(e.target.value);
                      setPage(0);
                    }}
                    class="textinput textInput form-control"
                    id="id_title"
                  ></input>
                </div>
                <div className="mt-3">
                  <label class="form-label">Brand Name</label>
                  <div className="card p-2">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="brand_name"
                        checked={Brands.includes("360")}
                        value="360"
                        onChange={handleCheckboxChange}
                      ></input>
                      <label for="id_brand_name_0" class="form-check-label">
                        360
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="brand_name"
                        checked={Brands.includes("Xiaomi")}
                        value="Xiaomi"
                        onChange={handleCheckboxChange}
                      ></input>
                      <label for="id_brand_name_0" class="form-check-label">
                        Xiaomi
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="brand_name"
                        checked={Brands.includes("Roborock")}
                        value="Roborock"
                        onChange={handleCheckboxChange}
                      ></input>
                      <label for="id_brand_name_0" class="form-check-label">
                        Roborock
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="brand_name"
                        checked={Brands.includes("SAMSUNG")}
                        value="SAMSUNG"
                        onChange={handleCheckboxChange}
                      ></input>
                      <label for="id_brand_name_0" class="form-check-label">
                        SAMSUNG
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="brand_name"
                        checked={Brands.includes("Eufy")}
                        value="Eufy"
                        onChange={handleCheckboxChange}
                      ></input>
                      <label for="id_brand_name_0" class="form-check-label">
                        Eufy
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="brand_name"
                        checked={Brands.includes("bObsweep")}
                        value="bObsweep"
                        onChange={handleCheckboxChange}
                      ></input>
                      <label for="id_brand_name_0" class="form-check-label">
                        bObsweep
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="d-none d-lg-block">
            <PopularComparisons />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Robots;
