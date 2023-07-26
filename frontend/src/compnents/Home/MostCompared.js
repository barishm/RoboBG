import { useState,useEffect } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";

const MostCompared = (props) => {
    const setIds = props.setIds;
    const Ids = props.Ids;
    const [MostCompared , setMostCompared] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchMostCompared = async () => {
            try {
                const response = await fetch('http://localhost:8000/get/allMostCompared');
                const jsonData = await response.json();
                setMostCompared(jsonData);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchMostCompared();
    }, []);
    const compare = (e) =>{
        const firstId = e.target.value[0];
        const secondId = e.target.value[2];
        setIds([...Ids, firstId, secondId]);
        navigate("/compare");
    }

    return (
        <section className="pt-5">
            <h3 className="fw-bolder" style={{marginTop:"10px",textAlign:"center"}}>Most Compared Robots</h3>
            <div className="container px-4 px-lg-5 mt-4">   
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {MostCompared.length > 0 ? (
                        <>
                        <div className="col mb-5">
                        <div className="card h-100 shadow-lg bg-body-tertiary rounded">
                            <div className="card-body p-2">
                                <div className="text-center">
                                    <h5 className="fw-bolder">{MostCompared[0].model}</h5>
                                    <h6 className="fw-bolder" style={{color: "grey"}}>VS</h6>
                                    <h5 className="fw-bolder">{MostCompared[1].model}</h5>
                                </div>
                            </div>
                            <div className="card-footer p-3 pt-0 border-top-0 bg-transparent">
                                <div className="text-center">
                                    <button className="btn btn-outline-dark mt-auto" value={[MostCompared[0].id, MostCompared[1].id]} onClick={compare}>Compare</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-5">
                    <div className="card h-100 shadow-lg bg-body-tertiary rounded">
                        <div className="card-body p-2">
                            <div className="text-center">
                                <h5 className="fw-bolder">{MostCompared[2].model}</h5>
                                <h6 className="fw-bolder" style={{color: "grey"}}>VS</h6>
                                <h5 className="fw-bolder">{MostCompared[3].model}</h5>
                            </div>
                        </div>
                        <div className="card-footer p-3 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                                <button className="btn btn-outline-dark mt-auto" value={[MostCompared[2].id, MostCompared[3].id]} onClick={compare}>Compare</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col mb-5">
                    <div className="card h-100 shadow-lg bg-body-tertiary rounded">
                        <div className="card-body p-2">
                            <div className="text-center">
                                <h5 className="fw-bolder">{MostCompared[4].model}</h5>
                                <h6 className="fw-bolder" style={{color: "grey"}}>VS</h6>
                                <h5 className="fw-bolder">{MostCompared[5].model}</h5>
                            </div>
                        </div>
                        <div className="card-footer p-3 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                                <button className="btn btn-outline-dark mt-auto" value={[MostCompared[4].id, MostCompared[5].id]} onClick={compare}>Compare</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col mb-5">
                    <div className="card h-100 shadow-lg bg-body-tertiary rounded">
                        <div className="card-body p-2">
                            <div className="text-center">
                                <h5 className="fw-bolder">{MostCompared[6].model}</h5>
                                <h6 className="fw-bolder" style={{color: "grey"}}>VS</h6>
                                <h5 className="fw-bolder">{MostCompared[7].model}</h5>
                            </div>
                        </div>
                        <div className="card-footer p-3 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                                <button className="btn btn-outline-dark mt-auto" value={[MostCompared[6].id, MostCompared[7].id]} onClick={compare}>Compare</button>
                            </div>
                        </div>
                    </div>
                </div>
                </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </section>
    );
}
export default MostCompared;