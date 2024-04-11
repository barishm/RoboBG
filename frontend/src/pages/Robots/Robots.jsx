import { useNavigate } from "react-router-dom";
import { useGetAllRobotsQuery } from "../../app/services/robotApiSlice";
import { useGetAvailableBrandsQuery } from "../../app/services/availableBrandsApiSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import PopularComparisons from "../Compare/components/PopularComparisons";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const Robots = () => {
  const [Page, setPage] = useState(0);
  const [Model, setModel] = useState("");
  const [Brands, setBrands] = useState([]);
  const [StartYear, setStartYear] = useState(0);
  const [EndYear, setEndYear] = useState(3000);
  const [MinDustbinCapacity, setMinDustbinCapacity] = useState(0);
  const [MaxDustbinCapacity, setMaxDustbinCapacity] = useState(15000);
  const [MinSuctionPower, setMinSuctionPower] = useState(0);
  const [MaxSuctionPower, setMaxSuctionPower] = useState(15000);

  const handleGoButtonClick = () => {
    if (document.getElementById("startYearInput").value.length > 0) {
      const startYearValue = parseInt(
        document.getElementById("startYearInput").value
      );
      setStartYear(startYearValue);
    } else {
      setStartYear(0);
    }
    if (document.getElementById("endYearInput").value.length > 0) {
      const endYearValue = parseInt(
        document.getElementById("endYearInput").value
      );
      setEndYear(endYearValue);
    } else {
      setEndYear(3000);
    }
    if (document.getElementById("minDustbinCapacityInput").value.length > 0) {
      const minDustbinCapacityValue = parseInt(
        document.getElementById("minDustbinCapacityInput").value
      );
      setMinDustbinCapacity(minDustbinCapacityValue);
    } else {
      setMinDustbinCapacity(0);
    }
    if (document.getElementById("maxDustbinCapacityInput").value.length > 0) {
      const maxDustbinCapacityValue = parseInt(
        document.getElementById("maxDustbinCapacityInput").value
      );
      setMaxDustbinCapacity(maxDustbinCapacityValue);
    } else {
      setMaxDustbinCapacity(15000);
    }
    if (document.getElementById("minSuctionPowerInput").value.length > 0) {
      const minSuctionPowerValue = parseInt(
        document.getElementById("minSuctionPowerInput").value
      );
      setMinSuctionPower(minSuctionPowerValue);
    } else {
      setMinSuctionPower(0);
    }
    if (document.getElementById("maxSuctionPowerInput").value.length > 0) {
      const maxSuctionPowerValue = parseInt(
        document.getElementById("maxSuctionPowerInput").value
      );
      setMaxSuctionPower(maxSuctionPowerValue);
    } else {
      setMaxSuctionPower(15000);
    }
  };

  const queryParams = {
    fields: "model,image,links",
    page: Page,
    model: Model,
    brands: Brands.join(","),
    startYear: StartYear,
    endYear: EndYear,
    minDustbinCapacity: MinDustbinCapacity,
    maxDustbinCapacity: MaxDustbinCapacity,
    minSuctionPower: MinSuctionPower,
    maxSuctionPower: MaxSuctionPower,
  };

  const lang = useSelector((state) => state.language.lang);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllRobotsQuery(queryParams);
  const { data:availableBrands, isLoading:availableBrandsIsLoading } = useGetAvailableBrandsQuery();
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
              className="btn btn-dark mt-3 d-lg-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              <i class="fa-solid fa-filter fa-sm"></i>&nbsp; Filters
            </button>
          </h3>

          {/* Mobile Filters Start */}
          <div
            className="offcanvas offcanvas-start"
            tabindex="-1"
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                Filters
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <form id="filters">
                <div>
                  <label for="id_title" className="form-label">
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
                    className="textinput textInput form-control"
                    id="id_title"
                  ></input>
                </div>
                <div className="mt-3">
                  <label className="form-label">Brand Name</label>
                  <div className="card p-2">
                  {availableBrandsIsLoading ? (
            <>
              <Loading />
            </>
          ) : availableBrands ? (
            <>
              {availableBrands.map((item) => (
                <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="brand_name"
                  checked={Brands.includes(item.brand)}
                  value={item.brand}
                  onChange={handleCheckboxChange}
                ></input>
                <label for="id_brand_name_0" class="form-check-label">
                  {item.brand}
                </label>
              </div>
              ))}
            </>
          ) : null}
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
                className="btn btn-dark mt-3"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                Apply
              </button>
            </div>
          </div>
          {/* Mobile Filters End */}
          {isLoading ? (
            <>
              <Loading />
            </>
          ) : data.content ? (
            <div className="row mt-4">
              {data.content.map((item) => (
                <div
                  className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3"
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
                    <div className="card-footer mb-2 border-top-0 bg-transparent d-flex justify-content-evenly">
                      <div className="btn-group text-center">
                        <button
                          type="button"
                          className="btn btn-warning btn-sm dropdown-toggle rounded-5"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {lang === "en" ? "Check price" : "Провери цена"}
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
                      <div className="mt-1">
                        <i className="fa-regular fa-comments fa-sm"></i>{" "}
                        <span className="">0</span>
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
          style={{ marginTop: "48px", padding: "20px" }}
        >
          <div className="card d-none d-lg-block">
            <div className="card-header p-3">
              {" "}
              <h5 style={{ marginBottom: "0px" }}>
                {" "}
                <i class="fa-solid fa-filter fa-sm"></i> Filters
              </h5>
            </div>
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
                <div className="mb-3 mt-3">
                  <label className="form-label">Release Year</label>
                  <div className="input-group input-group-sm">
                    <input
                      id="startYearInput"
                      type="number"
                      className="form-control"
                      placeholder="From"
                      aria-label="From"
                    ></input>
                    <span className="input-group-text">-</span>
                    <input
                      id="endYearInput"
                      type="number"
                      className="form-control"
                      placeholder="To"
                      aria-label="To"
                    ></input>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      id="button-addon1"
                      onClick={handleGoButtonClick}
                    >
                      Go
                    </button>
                  </div>
                </div>
                <div className="mb-3 mt-3">
                  <label className="form-label">Dustbin Capacity (ml)</label>
                  <div className="input-group input-group-sm">
                    <input
                      id="minDustbinCapacityInput"
                      type="number"
                      className="form-control"
                      placeholder="From"
                      aria-label="From"
                    ></input>
                    <span className="input-group-text">-</span>
                    <input
                      id="maxDustbinCapacityInput"
                      type="number"
                      className="form-control"
                      placeholder="To"
                      aria-label="To"
                    ></input>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      id="button-addon1"
                      onClick={handleGoButtonClick}
                    >
                      Go
                    </button>
                  </div>
                </div>
                <div className="mb-3 mt-3">
                  <label className="form-label">Suction Power (Pa)</label>
                  <div className="input-group input-group-sm">
                    <input
                      id="minSuctionPowerInput"
                      type="number"
                      className="form-control"
                      placeholder="From"
                      aria-label="From"
                    ></input>
                    <span className="input-group-text">-</span>
                    <input
                      id="maxSuctionPowerInput"
                      type="number"
                      className="form-control"
                      placeholder="To"
                      aria-label="To"
                    ></input>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      id="button-addon1"
                      onClick={handleGoButtonClick}
                    >
                      Go
                    </button>
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
