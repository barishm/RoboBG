import React from 'react';
import { useNavigate } from "react-router-dom";
import { useGetBestRobotsQuery } from "../../../app/services/robotApiSlice";

const Bests = () => {
    const navigate = useNavigate();
    const noImage = "images/no-image.jpg";

    const { data, isLoading } = useGetBestRobotsQuery()


    const details = (robotId) => {
        navigate('/robots/'+robotId);
    }
   
    return (
        <section className="pt-5">
          <h3 className="fw-bolder" style={{ marginTop: "10px", textAlign: "center" }}>Best Robot Vacuum Cleaners</h3>
          <div className="container px-4 px-lg-5 mt-4">
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              {isLoading ? (<>Loading...</>) : data ? (
                <>
                  {data.map((item) => (
                <div className="col mb-5" key={item.id}>
                  <div className="card h-100 shadow-sm bg-body-tertiary rounded">
                    <img className="card-img-top" value={item.id} style={{ cursor: 'pointer' }} onClick={() => details(item.id)} src={item.image || noImage} alt="..." />
                    <div className="card-body" style={{ maxHeight: "80px" }}>
                      <div className="text-center">
                        <h5 className="fw-bolder" onClick={() => details(item.id)} value={item.id} style={{ cursor: 'pointer' }}>{item.model}</h5>
                      </div>
                    </div>
                    <div className="card-footer text-center p-4 pt-0 pb-0 mb-3 border-top-0 bg-transparent">
                      <div className="btn-group text-center">
                        <button type="button" className="btn btn-warning btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          Check price
                        </button>
                        <ul className="dropdown-menu">
                          {item.purchaseLinks.length > 0 && (
                            item.purchaseLinks.map((link) => (
                              <li key={link.id}><a className="dropdown-item" href={link.link}>{link.name}</a></li>
                            ))
                          )}
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
        </section>
    );
}
export default Bests