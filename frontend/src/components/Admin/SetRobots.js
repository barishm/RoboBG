import { useState,useEffect,useRef } from "react";



const  SetRobots = () => {
    const [IdAndModel , setIdAndModel] = useState([]);
    const [Id , setId] = useState(null);
    const modelInputRef = useRef(null);
    const [Model,setModel] = useState("");
    const [CreateButton,setCreateButton] = useState(false);
    const [UpdateBtn,setUpdateBtn] = useState(false);
    const [DeleteBtn,setDeleteBtn] = useState(false);
    const [ConfirmUpdateBtn,setUpdateButton] = useState(true);
    const [CancelButton,setCancelButton] = useState(true);
    const [robotJson,setrobotJson] = useState({
      brand: "",
      model: "",
      bests: "",
      mapping: null,
      mappingSensorType: "",
      highPrecisionMap: null,
      frontCamera: null,
      rechargeResume: null,
      autoDockAndRecharge: null,
      noiseLevel: "",
      display: null,
      sideBrushes: "",
      voicePrompts: null,
      cleaningFeatures: {
          suctionPower: "",
          cleaningArea: "",
          dustbinCapacity: "",
          disposableDustBagCapacity: "",
          autoDirtDisposal: null,
          barrierCrossHeight: "",
          hepaFilter: null,
          washableFilter: null
      },
      moppingFeatures: {
          wetMopping: null,
          electricWaterFlowControl: null,
          waterTankCapacity: "",
          vibratingMoppingPad: null,
          autoMopLifting: null,
          autoWaterTankRefilling: null,
          autoMopWashing: null
      },
      battery: {
          batteryCapacity: "",
          batteryLife: "",
          chargingTime: "",
          ratedPower: ""
      },
      control: {
          scheduling: null,
          wifiSmartphoneApp: null,
          wifiFrequencyBand: null,
          amazonAlexaSupport: null,
          googleAssistantSupport: null,
          magneticVirtualWalls: null,
          irRfRemoteControl: null
      },
      appFeatures: {
          realTimeTracking: null,
          digitalBlockedAreas: null,
          zonedCleaning: null,
          multiFloorMaps: null,
          manualMovementControl: null,
          selectedRoomCleaning: null,
          noMopZones: null
      },
      sensor: {
          carpetBoost: null,
          cliffSensor: null,
          dirtSensor: null,
          fullDustbinSensor: null
      },
      otherSpecifications: {
          weight: "",
          width: "",
          height: "",
          inTheBox: "",
          releaseDate: "",
          warranty: ""
      }
    })
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
    const file = event.target.files[0];

    setSelectedFile(file);
    };


    function resetrobotJson() {
      const emptyrobotJson = resetObjectValues(robotJson);
      setrobotJson(emptyrobotJson);
  }
  function resetObjectValues(obj) {
      const newObj = {};
      for (const key in obj) {
        if (typeof obj[key] === 'object') {
          newObj[key] = resetObjectValues(obj[key]);
        } else {
          newObj[key] = '';
        }
      }
      return newObj;
  }
    function setNullFieldsToEmptyString(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    setNullFieldsToEmptyString(obj[key]); // Recursively check nested objects
                } else if (obj[key] === null) {
                    obj[key] = ''; // Set null field to an empty string
                }
            }
        }
    }
    function setEmptyStringsToNull(obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            setEmptyStringsToNull(obj[key]); // Recursively check nested objects
          } else if (typeof obj[key] === 'string' && obj[key].trim() === '') {
            obj[key] = null; // Set empty string field to null
          }
        }
      }
    }

    //Get all robots ids and model names
    useEffect(() => {
        fetchIdAndModel();
    }, []);
    const fetchIdAndModel = async () => {
        try {
            const response = await fetch('http://localhost:8000/v1/robots/model-image');
            const jsonData = await response.json();
            setIdAndModel(jsonData);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };


    // Deleting Robot
    const DeleteRobot = async () => {
      try {
        const response = await fetch(`http://localhost:8000/v1/admin/robots/${Id}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer `
          }
        });
    
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        setId(null);
        // Assuming fetchIdAndModel returns a Promise, you can await it here
        await fetchIdAndModel();
      } catch (e) {
        console.error(e);
      }
    };
    useEffect(() => {
        if (Id) {
            DeleteRobot();
        }
      }, );
      function handleDelete() {
        const foundItem = IdAndModel.find(item => item.model === Model);
        if(foundItem){
            setId(foundItem.id);
        }
        setModel("");
        modelInputRef.current.value = "";
    }

    
    // Creating new robot
    const CreateRobot = async () => {
      setEmptyStringsToNull(robotJson);
      const formData = new FormData();
      formData.append('robotJson', JSON.stringify(robotJson));
      formData.append('image', selectedFile);
  
      try {
        const response = await fetch('http://localhost:8000/v1/admin/robots', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer`
          },
          body: formData,
        });
  
        if (response.ok) {
          console.log('Robot created successfully');
          setNullFieldsToEmptyString(robotJson);
          resetrobotJson();
          setModel("");
          await fetchIdAndModel();
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    function createHandler() {
        CreateRobot();
        setModel("");
    }

    function handleUpdate () {
        const foundItem = IdAndModel.find(item => item.model === Model);
        if(foundItem){
            setCreateButton(true);
            setUpdateBtn(true);
            setDeleteBtn(true);
            setUpdateButton(false);
            setCancelButton(false);
            const fetchRobotById = async () => {
                try {
                    const url = `http://localhost:8000/v1/robots/no-links/${foundItem.id}`;
                    const response = await fetch(url);
                    const jsonData = await response.json();
                    setNullFieldsToEmptyString(jsonData);
                    setrobotJson(jsonData);
                } catch (error) {
                    console.log('Error fetching data:', error);
                }
            };
            fetchRobotById();
        }
      }
      const UpdateRobot = async () => {
        setEmptyStringsToNull(robotJson);
        try {
          const response = await fetch('http://localhost:8000/v1/admin/robots', {
            method: 'PUT',
            headers: {
              "Content-type": "application/json",
              'Authorization': `Bearer `
            },
            body: JSON.stringify(robotJson)
          });
      
          if (response.ok) {
            console.log('robot updated');
          } else {
            console.log('Error: ' + response.status);
            // Handle the error case if needed
          }
          setCreateButton(false);
          setUpdateBtn(false);
          setDeleteBtn(false);
          setUpdateButton(true);
          setCancelButton(true);
          fetchIdAndModel();
        } catch (error) {
          console.log('Error:', error);
          // Handle the error case if needed
        }
      };
      function confirmUpdate() {
        UpdateRobot();
        setNullFieldsToEmptyString(robotJson);
        resetrobotJson();
        setModel("");
        console.log(robotJson);
      }
      function CancelHandle() {
            resetrobotJson();
            setModel("");
            setCreateButton(false);
            setUpdateBtn(false);
            setDeleteBtn(false);
            setUpdateButton(true);
            setCancelButton(true);
      }


      function handleChange(event) {
        const { name, value } = event.target;
      
        const updateNestedField = (nestedObject, fieldName) => ({
          ...nestedObject,
          [fieldName]: value === 'null' ? null : value === 'true' ? true : value === 'false' ? false : value,
        });
      
        if (name.includes('.')) {
          const [objectName, fieldName] = name.split('.');
          setrobotJson((prevrobotJson) => ({
            ...prevrobotJson,
            [objectName]: updateNestedField(prevrobotJson[objectName], fieldName),
          }));
        } else {
          setrobotJson((prevrobotJson) => ({
            ...prevrobotJson,
            [name]: value,
          }));
        }
      }


    return(
        <div className="cdu-container shadow-sm p-3 mb-5 bg-body-tertiary rounded">
            <div className="select-div" style={{ display: "flex" }}>
                <input ref={modelInputRef} className="form-control choose-robot" list="datalistOptions5" id="exampleDataList5" value={Model} name="Model" placeholder="Choose robot from the list" onChange={(e)=>setModel(e.target.value)}/>
                <button type="button" className="btn btn-secondary update-button" disabled={UpdateBtn} onClick={handleUpdate}>Update</button>
                <button type="button" className="btn btn-secondary cancel-update-button" disabled={CancelButton} onClick={CancelHandle}>Cancel</button>
                <button type="button" className="btn btn-danger delete-button" disabled={DeleteBtn} onClick={handleDelete}>Delete</button>
                <datalist id="datalistOptions5">
            {IdAndModel.map((item) => (
                    <option key={item.id} value={item.model} />
                ))}
            </datalist>
            </div>
            <div className="form-inputs">
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Brand</label>
            <input className="form-control form-control-sm" type="text" name="brand" onChange={handleChange} value={robotJson.brand}></input>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Model</label>
            <input className="form-control form-control-sm" type="text" name="model" onChange={handleChange} value={robotJson.model}></input>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Bests</label>
            <input className="form-control form-control-sm" type="number" name="bests" onChange={handleChange} value={robotJson.bests} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Mapping</label>
            <select className="form-control form-control-sm" name="mapping" onChange={handleChange} value={robotJson.mapping === null ? 'null' : robotJson.mapping.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Mapping Sensor Type</label>
            <input className="form-control form-control-sm" type="text" name="mappingSensorType" onChange={handleChange} value={robotJson.mappingSensorType} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">High Precision Map</label>
            <select className="form-control form-control-sm" name="highPrecisionMap" onChange={handleChange} value={robotJson.highPrecisionMap === null ? 'null' : robotJson.highPrecisionMap.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Front Camera</label>
            <select className="form-control form-control-sm" name="frontCamera" onChange={handleChange} value={robotJson.frontCamera === null ? 'null' : robotJson.frontCamera.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Recharge Resume</label>
            <select className="form-control form-control-sm" name="rechargeResume" onChange={handleChange} value={robotJson.rechargeResume === null ? 'null' : robotJson.rechargeResume.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Auto Dock And Recharge</label>
            <select className="form-control form-control-sm" name="autoDockAndRecharge" onChange={handleChange} value={robotJson.autoDockAndRecharge === null ? 'null' : robotJson.autoDockAndRecharge.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Noise Level</label>
            <input className="form-control form-control-sm" type="text" name="noiseLevel" onChange={handleChange} value={robotJson.noiseLevel} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Display</label>
            <select className="form-control form-control-sm" name="display" onChange={handleChange} value={robotJson.display === null ? 'null' : robotJson.display.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Side Brushes</label>
            <input className="form-control form-control-sm" type="text" name="sideBrushes" onChange={handleChange} value={robotJson.sideBrushes} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Voice Prompts</label>
            <select className="form-control form-control-sm" name="voicePrompts" onChange={handleChange} value={robotJson.voicePrompts === null ? 'null' : robotJson.voicePrompts.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Suction Power</label>
            <input className="form-control form-control-sm" type="text" name="cleaningFeatures.suctionPower" onChange={handleChange} value={robotJson.cleaningFeatures.suctionPower} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Cleaning Area</label>
            <input className="form-control form-control-sm" type="text" name="cleaningFeatures.cleaningArea" onChange={handleChange} value={robotJson.cleaningFeatures.cleaningArea} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Dustbin Capacity</label>
            <input className="form-control form-control-sm" type="text" name="cleaningFeatures.dustbinCapacity" onChange={handleChange} value={robotJson.cleaningFeatures.dustbinCapacity} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Disposable Dust Bag Capacity</label>
            <input className="form-control form-control-sm" type="text" name="cleaningFeatures.disposableDustBagCapacity" onChange={handleChange} value={robotJson.cleaningFeatures.disposableDustBagCapacity} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Auto Dirt Disposal</label>
            <select className="form-control form-control-sm" name="cleaningFeatures.autoDirtDisposal" onChange={handleChange} value={robotJson.cleaningFeatures.autoDirtDisposal === null ? 'null' : robotJson.cleaningFeatures.autoDirtDisposal.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Barrier Cross Height</label>
            <input className="form-control form-control-sm" type="text" name="cleaningFeatures.barrierCrossHeight" onChange={handleChange} value={robotJson.cleaningFeatures.barrierCrossHeight} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Hepa Filter</label>
            <select className="form-control form-control-sm" name="cleaningFeatures.hepaFilter" onChange={handleChange} value={robotJson.cleaningFeatures.hepaFilter === null ? 'null' : robotJson.cleaningFeatures.hepaFilter.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Washable Filter</label>
            <select className="form-control form-control-sm" name="cleaningFeatures.washableFilter" onChange={handleChange} value={robotJson.cleaningFeatures.washableFilter === null ? 'null' : robotJson.cleaningFeatures.washableFilter.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Wet Mopping</label>
            <select className="form-control form-control-sm" name="moppingFeatures.wetMopping" onChange={handleChange} value={robotJson.moppingFeatures.wetMopping === null ? 'null' : robotJson.moppingFeatures.wetMopping.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Electric Water Flow Control</label>
            <select className="form-control form-control-sm" name="moppingFeatures.electricWaterFlowControl" onChange={handleChange} value={robotJson.moppingFeatures.electricWaterFlowControl === null ? 'null' : robotJson.moppingFeatures.electricWaterFlowControl.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Water Tank Capacity</label>
            <input className="form-control form-control-sm" type="text" name="moppingFeatures.waterTankCapacity" onChange={handleChange} value={robotJson.moppingFeatures.waterTankCapacity} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Vibrating Mopping Pad</label>
            <select className="form-control form-control-sm" name="moppingFeatures.vibratingMoppingPad" onChange={handleChange} value={robotJson.moppingFeatures.vibratingMoppingPad}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>

            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Auto Mop Lifting</label>
            <select className="form-control form-control-sm" name="moppingFeatures.autoMopLifting" onChange={handleChange} value={robotJson.moppingFeatures.autoMopLifting === null ? 'null' : robotJson.moppingFeatures.autoMopLifting.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Auto Water Tank Refilling</label>
            <select className="form-control form-control-sm" name="moppingFeatures.autoWaterTankRefilling" onChange={handleChange} value={robotJson.moppingFeatures.autoWaterTankRefilling === null ? 'null' : robotJson.moppingFeatures.autoWaterTankRefilling.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            <label htmlFor="exampleFormControlInput1" className="form-label">Auto Mop Washing</label>
            <select className="form-control form-control-sm" name="moppingFeatures.autoMopWashing" onChange={handleChange} value={robotJson.moppingFeatures.autoMopWashing === null ? 'null' : robotJson.moppingFeatures.autoMopWashing.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Battery Capacity</label>
            <input className="form-control form-control-sm" type="text" name="battery.batteryCapacity" onChange={handleChange} value={robotJson.battery.batteryCapacity} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Battery Life</label>
            <input className="form-control form-control-sm" type="text" name="battery.batteryLife" onChange={handleChange} value={robotJson.battery.batteryLife} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Charging Time</label>
            <input className="form-control form-control-sm" type="text" name="battery.chargingTime" onChange={handleChange} value={robotJson.battery.chargingTime} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Rated Power</label>
            <input className="form-control form-control-sm" type="text" name="battery.ratedPower" onChange={handleChange} value={robotJson.battery.ratedPower} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Scheduling</label>
            <select className="form-control form-control-sm" name="control.scheduling" onChange={handleChange} value={robotJson.control.scheduling === null ? 'null' : robotJson.control.scheduling.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Ir Rf RemoteControl</label>
            <select className="form-control form-control-sm" name="control.irRfRemoteControl" onChange={handleChange} value={robotJson.control.irRfRemoteControl === null ? 'null' : robotJson.control.irRfRemoteControl.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Wifi Smartphone App</label>
            <select className="form-control form-control-sm" name="control.wifiSmartphoneApp" onChange={handleChange} value={robotJson.control.wifiSmartphoneApp === null ? 'null' : robotJson.control.wifiSmartphoneApp.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Wifi Frequency Band</label>
            <select className="form-control form-control-sm" name="control.wifiFrequencyBand" onChange={handleChange} value={robotJson.control.wifiFrequencyBand === null ? 'null' : robotJson.control.wifiFrequencyBand.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Amazon Alexa Support</label>
            <select className="form-control form-control-sm" name="control.amazonAlexaSupport" onChange={handleChange} value={robotJson.control.amazonAlexaSupport === null ? 'null' : robotJson.control.amazonAlexaSupport.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Google Assistant Support</label>
            <select className="form-control form-control-sm" name="control.googleAssistantSupport" onChange={handleChange} value={robotJson.control.googleAssistantSupport === null ? 'null' : robotJson.control.googleAssistantSupport.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Magnetic Virtual Walls</label>
            <select className="form-control form-control-sm" name="control.magneticVirtualWalls" onChange={handleChange} value={robotJson.control.magneticVirtualWalls === null ? 'null' : robotJson.control.magneticVirtualWalls.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Real Time Tracking</label>
            <select className="form-control form-control-sm" name="appFeatures.realTimeTracking" onChange={handleChange} value={robotJson.appFeatures.realTimeTracking === null ? 'null' : robotJson.appFeatures.realTimeTracking.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Digital Blocked Areas</label>
            <select className="form-control form-control-sm" name="appFeatures.digitalBlockedAreas" onChange={handleChange} value={robotJson.appFeatures.digitalBlockedAreas === null ? 'null' : robotJson.appFeatures.digitalBlockedAreas.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Zoned Cleaning</label>
            <select className="form-control form-control-sm" name="appFeatures.zonedCleaning" onChange={handleChange} value={robotJson.appFeatures.zonedCleaning === null ? 'null' : robotJson.appFeatures.zonedCleaning.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Multi Floor Maps</label>
            <select className="form-control form-control-sm" name="appFeatures.multiFloorMaps" onChange={handleChange} value={robotJson.appFeatures.multiFloorMaps === null ? 'null' : robotJson.appFeatures.multiFloorMaps.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Manual Movement Control</label>
            <select className="form-control form-control-sm" name="appFeatures.manualMovementControl" onChange={handleChange} value={robotJson.appFeatures.manualMovementControl === null ? 'null' : robotJson.appFeatures.manualMovementControl.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Selected Room Cleaning</label>
            <select className="form-control form-control-sm" name="appFeatures.selectedRoomCleaning" onChange={handleChange} value={robotJson.appFeatures.selectedRoomCleaning === null ? 'null' : robotJson.appFeatures.selectedRoomCleaning.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">No Mop Zones</label>
            <select className="form-control form-control-sm" name="appFeatures.noMopZones" onChange={handleChange} value={robotJson.appFeatures.noMopZones === null ? 'null' : robotJson.appFeatures.noMopZones.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Carpet Boost</label>
            <select className="form-control form-control-sm" name="sensor.carpetBoost" onChange={handleChange} value={robotJson.sensor.carpetBoost === null ? 'null' : robotJson.sensor.carpetBoost.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Cliff Sensor</label>
            <select className="form-control form-control-sm" name="sensor.cliffSensor" onChange={handleChange} value={robotJson.sensor.cliffSensor === null ? 'null' : robotJson.sensor.cliffSensor.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Dirt Sensor</label>
            <select className="form-control form-control-sm" name="sensor.dirtSensor" onChange={handleChange} value={robotJson.sensor.dirtSensor === null ? 'null' : robotJson.sensor.dirtSensor.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Full Dustbin Sensor</label>
            <select className="form-control form-control-sm" name="sensor.fullDustbinSensor" onChange={handleChange} value={robotJson.sensor.fullDustbinSensor === null ? 'null' : robotJson.sensor.fullDustbinSensor.toString()}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Weight</label>
            <input className="form-control form-control-sm" type="text" name="otherSpecifications.weight" onChange={handleChange} value={robotJson.otherSpecifications.weight} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Width</label>
            <input className="form-control form-control-sm" type="text" name="otherSpecifications.width" onChange={handleChange} value={robotJson.otherSpecifications.width} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Height</label>
            <input className="form-control form-control-sm" type="text" name="otherSpecifications.height" onChange={handleChange} value={robotJson.otherSpecifications.height} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">In The Box</label>
            <textarea className="form-control form-control-sm" type="text" name="otherSpecifications.inTheBox" onChange={handleChange} value={robotJson.otherSpecifications.inTheBox} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Release Date</label>
            <input className="form-control form-control-sm" type="text" name="otherSpecifications.releaseDate" onChange={handleChange} value={robotJson.otherSpecifications.releaseDate} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Warranty</label>
            <input className="form-control form-control-sm" type="text" name="otherSpecifications.  warranty" onChange={handleChange} value={robotJson.otherSpecifications.warranty} aria-label=".form-control-sm example"/>
            </div>
            </div>
            <div className="two-buttons">
                <button type="button" className="btn btn-success create-button"disabled={CreateButton} onClick={createHandler}>Create</button>
                <button type="button" className="btn btn-secondary confirm-update-button" disabled={ConfirmUpdateBtn} onClick={confirmUpdate}>Confirm Update</button>
            </div>
        </div>
    );
}
export default SetRobots;