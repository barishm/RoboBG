import { useState,useEffect } from "react";
import { useSelector } from 'react-redux'

const AddPurchaseLinks = () => {
    const [IdAndModel, setIdAndModel] = useState([]);
    const [Model, setModel] = useState("");
    const [FormData, setFormData] = useState({
      robotId: "",
      name: "",
      link: "",
    });
    const [Links, setLinks] = useState([]);
    const [SelectedRobot, setSelectedRobot] = useState("");
    const {accessToken} = useSelector((state) => state.authToken);
  
    useEffect(() => {
      fetchIdAndModel();
    }, []);
  
    const fetchIdAndModel = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/v1/robots/model-image"
        );
        const jsonData = await response.json();
        setIdAndModel(jsonData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
  
    const handleSelect = async () => {
      const foundItem = IdAndModel.find((item) => item.model === Model);
      if (foundItem) {
        const url = `http://localhost:8000/v1/links/${foundItem.id}`;
        const response = await fetch(url);
        const jsonData = await response.json();
        setLinks(jsonData);
        setFormData((prevFormData) => ({
          ...prevFormData,
          robotId: foundItem.id,
        }));
        setSelectedRobot(foundItem.model);
      }
  
      setModel("");
    };
  
    const fetchAndSetLinks = async () => {
      try {
        const url = `http://localhost:8000/v1/links/${FormData.robotId}`;
        const response = await fetch(url);
        const jsonData = await response.json();
        setLinks(jsonData);
      } catch (error) {
        console.log("Error fetching links:", error);
      }
    };
  
    const handleAddLink = async () => {
      try {
        const response = await fetch("http://localhost:8000/v1/admin/links", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer `+ accessToken
          },
          body: JSON.stringify({
            robotId: FormData.robotId,
            name: FormData.name,
            link: FormData.link,
          }),
        });
  
        if (response.ok) {
          fetchAndSetLinks();
          setFormData({
            robotId: FormData.robotId,
            name: "",
            link: "",
          });
        } else {
          console.log("Failed to add link:", response.statusText);
        }
      } catch (error) {
        console.log("Error adding link:", error);
      }
    };
  
    const handleDeleteLink = async (linkId) => {
        try {
          const response = await fetch(
            `http://localhost:8000/v1/admin/links/${linkId}`,
            {
              method: "DELETE",
              headers: {
                'Authorization': `Bearer `+ accessToken
              },
            }
          );
      
          if (response.ok) {
            fetchAndSetLinks();
          } else {
            console.log("Failed to delete link:", response.statusText);
          }
        } catch (error) {
          console.log("Error deleting link:", error);
        }
      };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  
    return (
      <div className="cdu-container shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <div className="select-div" style={{ display: "flex" }}>
          <input
            className="form-control choose-robot"
            list="datalistOptions5"
            id="exampleDataList5"
            value={Model}
            name="Model"
            placeholder="Choose robot from the list"
            onChange={(e) => setModel(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleSelect}
          >
            Select
          </button>
          <datalist id="datalistOptions5">
            {IdAndModel.map((item) => (
              <option key={item.id} value={item.model} />
            ))}
          </datalist>
        </div>
        {FormData.robotId && (
          <>
            <h4>{SelectedRobot}</h4>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label"
              >
                Name
              </label>
              <input
                className="form-control form-control-sm"
                type="text"
                name="name"
                onChange={handleChange}
                value={FormData.name || ""}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label"
              >
                Link
              </label>
              <input
                className="form-control form-control-sm"
                type="text"
                name="link"
                onChange={handleChange}
                value={FormData.link || ""}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={handleAddLink}
            >
              Add Link
            </button>
            <div>
            {Links.length > 0 && (
  <table className="table mt-4">
    <thead>
      <tr>
        <th className="text-center" scope="col">Name</th>
        <th className="text-center" scope="col">Link</th>
        <th className="text-center" scope="col">Delete</th>
      </tr>
    </thead>
    <tbody>
      {Links.map((link) => (
        <tr key={link.id}>
          <td>{link.name}</td>
          <td><a href={link.link}>link</a></td>
          <td>
            <button
              onClick={() => handleDeleteLink(link.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}
        </div>
          </>
        )}
      </div>
    );
  };
  
  export default AddPurchaseLinks;