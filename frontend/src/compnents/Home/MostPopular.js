import { useState,useEffect } from "react";

const MostPopular = (props) => {
    const setIds = props.setIds;
    const Ids = props.Ids;
    const [IdAndModel , setIdAndModel] = useState([]);

    useEffect(() => {
        const fetchIdAndModel = async () => {
            try {
                const response = await fetch('http://localhost:8000/get/allMostPopular');
                const jsonData = await response.json();
                setIdAndModel(jsonData);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchIdAndModel();
    }, []);
    return (
        <div style={{textAlign: "center", margin: "50px 0px"}}>
            <h3>Most Popular Robots</h3>
            <div className="most-popular-container row">
                {IdAndModel.map((item) => (
                    <div key={item.id} className="most-popular-child card" style={{width: "15rem"}}> 
                        <img src={item.image} className="card-img-top" alt="..."></img>
                        <div className="card-body">
                        <h5 className="card-title">{item.model}</h5>  
                        <button className="btn btn-outline-dark" value={item.id} onClick={(e)=>setIds([...Ids, e.target.value])}>Add in list</button>
                        </div>
                </div>                    
                ))}
            </div>
        </div>
    );
}
export default MostPopular;