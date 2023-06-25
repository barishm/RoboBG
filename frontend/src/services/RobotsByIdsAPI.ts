
const RobotsByIdsAPI = async () => {
    

    const url = `http://localhost:8000/robots?`;
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.log('Error fetching data:', error);
      throw error;
    }
  };
  
  export { RobotsByIdsAPI };