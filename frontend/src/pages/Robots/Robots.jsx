import { useNavigate } from "react-router-dom";
import { useGetAllRobotsQuery } from "../../app/services/robotApiSlice";
import { useSelector } from "react-redux";
import { useState } from "react";

const Robots = () => {
  const [Page, setPage] = useState(0);
  const [Model, setModel] = useState("");
  const [Brand, setBrand] = useState("");
  const queryParams = {
    fields: "model,image,links",
    page: Page,
    model: Model,
    brand: Brand,
  };

  const lang = useSelector((state) => state.language.lang);
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllRobotsQuery(queryParams);
  const noImage = "images/no-image.jpg";
  const isLast = data?.last;

  const nextPage = () => {
    if(!isLast){
      setPage(Page+1);
    }
  }
  const prevPage = () => {
    if(Page !== 0) {
      setPage(Page-1);
    }
  }

  const details = (robotId) => {
    navigate("/robots/" + robotId);
  };

  return (
    <section className="pt-5">
      <h3
        className="fw-bolder"
        style={{ marginTop: "10px", textAlign: "center" }}
      >
        {lang === "en" ? <>All Robot Vacuum Cleaners</> : <>Всички роботи</>}
      </h3>
      <div className="container px-4 px-lg-5 mt-4">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {isLoading ? (
            <>Loading...</>
          ) : data.content ? (
            <>
              {data.content.map((item) => (
                <div className="col mb-5" key={item.id}>
                  <div className="card h-100 shadow-sm bg-body-tertiary rounded">
                    <img
                      className="card-img-top"
                      value={item.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => details(item.id)}
                      src={item.image || noImage}
                      alt="..."
                    />
                    <div className="card-body" style={{ maxHeight: "80px" }}>
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
            </>
          ) : null}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous" onClick={prevPage}>
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item">
            <span class="page-link" href="#">
              {Page+1}
            </span>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next" onClick={nextPage}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      </div>
    </section>
  );
};
export default Robots;
