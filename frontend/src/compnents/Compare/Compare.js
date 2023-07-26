import { useState,useEffect } from "react";
import CompareTable from './CompareTable';
const Compare = (props) => {
    
    const Ids = props.Ids;
    const setIds = props.setIds;
    const [Model,setModel] = useState("");
    const [IdAndModel , setIdAndModel] = useState([]);
    const [Robots,setRobots] = useState([]);

    
    useEffect(() => {
        const fetchIdAndModel = async () => {
            try {
                const response = await fetch('http://localhost:8000/get');
                const jsonData = await response.json();
                setIdAndModel(jsonData);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchIdAndModel();
    }, []);

    const fetchRobotsByIds = async () => {
        try {
            const idsQuery = Ids.map(id => `ids=${id}`).join('&');
            const url = `http://localhost:8000/get/robots?${idsQuery}`;
            const response = await fetch(url);
            const jsonData = await response.json();
            setRobots(jsonData);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    




    function handleAdd() {
        setModel("");
        
        const foundItem = IdAndModel.find(item => item.model === Model);
        if (foundItem && !Ids.includes(foundItem.id)) {
            setIds([...Ids, foundItem.id]);
            console.log(Ids);
        }
        setModel("");
    }
    useEffect(() => {
        if (Ids.length > 0) {
          fetchRobotsByIds();
        }
      }, [Ids]);
    
        
        
    return (
        <div>
            <div style={{ display: "flex" }} className="add-div">
                <input className="form-control choose-robot" value={Model} name="Model" list="datalistOptions" id="Model" placeholder="Choose robot from the list" onChange={(e)=>setModel(e.target.value)}/>
                <button type="button" className="btn btn-secondary add-button" onClick={handleAdd}>Add</button>
                <datalist id="datalistOptions">
            {IdAndModel.map((item) => (
                    <option key={item.id} value={item.model} />
                ))}
            </datalist>
            </div>
            <CompareTable Robots={Robots} setIds={setIds} Ids={Ids} setRobots={setRobots}/>
        </div>
    );
}
export default Compare;