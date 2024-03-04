import { useNavigate } from "react-router-dom";
import { useGetAllRobotsQuery } from "../../app/services/robotApiSlice";
import { useSelector } from "react-redux";
import { useState } from "react";

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
  const { data, isLoading } = useGetAllRobotsQuery(queryParams);
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
      setBrands(prev => [...prev, value]);
    } else {
      setBrands(prev => prev.filter(brand => brand !== value));
    }
    setPage(0);
    console.log(Brands);
  };

  return (
    <section className="pt-5">
      <div className="container d-flex">
        <div className="col-12 col-md-8 col-lg-9">
          <h3
            className="fw-bolder"
            style={{ marginTop: "10px", textAlign: "center" }}
          >
            {lang === "en" ? (
              <>All Robot Vacuum Cleaners</>
            ) : (
              <>Всички роботи</>
            )}
          </h3>
          {isLoading ? (
            <>Loading...</>
          ) : data.content ? (
            <div className="col-12 d-flex flex-wrap justify-content-center">
              {data.content.map((item) => (
                <div
                  className="col-6 col-sm-4 col-md-4 col-lg-3 m-3"
                  style={{maxWidth:"200px"}}
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
                          Check price
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
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li class="page-item">
                  <span class="page-link" href="#">
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
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-3" style={{marginTop:"65px"}}>
          <div className="accordion d-none d-md-block mb-3">
             <div className="card">
              <div class="card-header">
                Filters
              </div>
              <div  className="card-body p-2">
                <div className="accordion-body">
                  <form id="filters">
                    <div>
                    <label for="id_title" class="form-label">
                      By model name
                    </label>
                    <input type="text" name="title" value={Model} onChange={(e) => {setModel(e.target.value); setPage(0)}} class="textinput textInput form-control" id="id_title"></input>
                    </div>
                    <div className="mt-3">
                      <label class="form-label">
                        Brand Name
                      </label>
                      <div className="card p-2">
                      <div className="form-check">
                      <input type="checkbox" className="form-check-input" name="brand_name" value="360" onChange={handleCheckboxChange} ></input>
                        <label for="id_brand_name_0" class="form-check-label">
                        360
                        </label>
                      </div>
                      <div className="form-check">
                      <input type="checkbox" className="form-check-input" name="brand_name" value="Xiaomi" onChange={handleCheckboxChange} ></input>
                        <label for="id_brand_name_0" class="form-check-label">
                        Xiaomi
                        </label>
                      </div>
                      <div className="form-check">
                      <input type="checkbox" className="form-check-input" name="brand_name" value="Roborock" onChange={handleCheckboxChange} ></input>
                        <label for="id_brand_name_0" class="form-check-label">
                        Roborock
                        </label>
                      </div>
                      <div className="form-check">
                      <input type="checkbox" className="form-check-input" name="brand_name" value="SAMSUNG" onChange={handleCheckboxChange} ></input>
                        <label for="id_brand_name_0" class="form-check-label">
                        SAMSUNG
                        </label>
                      </div>
                      <div className="form-check">
                      <input type="checkbox" className="form-check-input" name="brand_name" value="Eufy" onChange={handleCheckboxChange} ></input>
                        <label for="id_brand_name_0" class="form-check-label">
                        Eufy
                        </label>
                      </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Robots;
