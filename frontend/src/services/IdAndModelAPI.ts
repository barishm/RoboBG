const IdAndModel = async () => {
    try {
      const response = await fetch('http://localhost:8000/');
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.log('Error fetching data:', error);
      throw error;
    }
  };
  
  export { IdAndModel };