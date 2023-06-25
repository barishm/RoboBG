import { useState, useEffect } from "react";
import { IdAndModel } from "../services/IdAndModelAPI";

const RobotAddForm = () => {
  const [data, setData] = useState<any[]>([]);
  const [ids , setIds] = useState<any[]>([]);

  useEffect(() => {
    IdAndModel()
      .then((jsonData: any) => setData(jsonData))
      .catch((error: any) => console.log("Error fetching data:", error));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setIds((prevIds) => [...prevIds, selectedId]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(ids);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="Select Robot"></label>
      <select name="" id="" onChange={handleInputChange}>
        {data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.model}
          </option>
        ))}
      </select>
      <input type="submit" value="Submit"/>
    </form>
  );
};

export default RobotAddForm;
