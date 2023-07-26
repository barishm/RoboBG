import { useState,useEffect } from "react";
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { useNavigate } from "react-router-dom";

const MostPopular = (props) => {
    const setIds = props.setIds;
    const Ids = props.Ids;
    const [MostPopular , setMostPopular] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMostPopular = async () => {
            try {
                const response = await fetch('http://localhost:8000/get/allMostPopular');
                const jsonData = await response.json();
                setMostPopular(jsonData);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchMostPopular();
    }, []);
    const Msg = () => (
        <div onClick={pressHandler}>
          Added to the list. Click to view
        </div>
      )
    const add = (e) =>{
        setIds([...Ids, e.target.value]);
        toast.success(<Msg />)

    }
    const pressHandler = () => {
        navigate("/compare");
    }
   
    return (
        <section className="pt-5">
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        transition={Zoom}
        theme="light"/>

        <h3 className="fw-bolder" style={{marginTop:"10px",textAlign:"center"}} >Best Robots</h3>
        <div className="container px-4 px-lg-5 mt-4">   
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {MostPopular.map((item) => (
                    <div className="col mb-5" key={item.id}>
                    <div className="card h-100 shadow-lg bg-body-tertiary rounded">
                    <div className="badge bg-dark text-white position-absolute" style={{top: "0.5rem", right:"0.5rem"}}>{item.mostPopular < 30 ? "Top #"+item.mostPopular : ""}</div>
                        <img className="card-img-top" src={item.image} alt="..." />
                        <div className="card-body" style={{maxHeight: "80px"}}>
                            <div className="text-center">
                                <h5 className="fw-bolder">{item.model}</h5>
                            </div>
                        </div>
                        <div className="card-footer p-4 pt-0 pb-0 mb-3 border-top-0 bg-transparent">
                            <div className="text-center"><button className="btn btn-outline-dark mt-auto" value={item.id} onClick={add}>Add to list</button></div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </section>
    );
}
export default MostPopular;