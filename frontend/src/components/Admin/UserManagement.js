import { useState, useEffect } from "react";

const UserManagement = () => {
  const [Users, setUsers] = useState([]);

  const [FormData,setFormData] = useState({
    id: "",
    username: "",
    role: "",
  });

  useEffect(() => {
    fetchIdAndTitle();
  }, []);

  const fetchIdAndTitle = async () => {
    try {
      const response = await fetch('http://localhost:8000/v1/admin/users',{method: 'GET',
      headers: {
        'Authorization': 'Bearer ',
      },
    });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      if (Array.isArray(jsonData)) {
        setUsers(jsonData);
      } else {
        console.error('API response is not an array:', jsonData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const setRoleHandle = async () => {
    try {
        const response = await fetch('http://localhost:8000/v1/admin/users',{method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ',
        },
        body: JSON.stringify(FormData)
      });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      resetFormData();
      fetchIdAndTitle();
  }
  function handleChangeUsername(event) {
    const { name, value } = event.target;
    const selectedUser = Users.find((user) => user.username === value);
  
    if (selectedUser) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        username: value,
        id: selectedUser.id,
        role: mapRole(selectedUser.role),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        username: value,
        id: null,
        role: null,
      }));
    }
    console.log(FormData);
  }
  
  function handleChangeRole(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function mapRole(role) {
    if (role === 'ROLE_ADMIN') {
      return 'ADMIN';
    } else if (role === 'ROLE_USER') {
      return 'USER';
    }
    return role; 
  }

  function resetFormData() {
    setFormData(initialFormData);
  }
  const initialFormData = {
    username: '',
    id: '',
    role: 'USER',
  };


  return (
    <div className="cdu-container shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <div className="select-div" style={{ display: "flex" }}>
        <input className="form-control choose-robot" list="datalistOptions5" id="exampleDataList5" value={FormData.username} name="username" placeholder="Choose User" onChange={handleChangeUsername}/>
        <datalist id="datalistOptions5">
        {Users.map((item) => (
          <option key={item.id} value={item.username} />
        ))}
      </datalist>
      <select className="form-control choose-robot" value={FormData.role} name="role" placeholder="Choose Role" onChange={handleChangeRole}>
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
      </select>
      </div>
      <div className="d-flex justify-content-center">
      <button type="button" className="btn btn-secondary update-button" onClick={setRoleHandle}>Set role</button>
      </div>
    </div>
  );
};

export default UserManagement;