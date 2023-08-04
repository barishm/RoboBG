import { useState,useEffect,useRef } from "react";

const  Admin = () => {
    const [IdAndModel , setIdAndModel] = useState([]);
    const [Id , setId] = useState(null);
    const modelInputRef = useRef(null);
    const [Model,setModel] = useState("");
    const [CreateButton,setCreateButton] = useState(false);
    const [UpdateButton,setUpdateButton] = useState(true);
    const [CancelButton,setCancelButton] = useState(true);
    const [FormData,setFormData] = useState({
      model: "",
      image: "",
      mostPopular: "",
      mostCompared: "",
      mapping: "",
      mappingSensorType: "",
      highPrecisionMap: "",
      frontCamera: "",
      rechargeResume: "",
      autoDockAndRecharge: "",
      noiseLevel: "",
      display: "",
      sideBrushes: "",
      voicePrompts: "",
      cleaningFeatures: {
          suctionPower: "",
          cleaningArea: "",
          dustbinCapacity: "",
          disposableDustBagCapacity: "",
          autoDirtDisposal: "",
          barrierCrossHeight: "",
          hepaFilter: "",
          washableFilter: ""
      },
      moppingFeatures: {
          wetMopping: "",
          electricWaterFlowControl: "",
          waterTankCapacity: "",
          vibratingMoppingPad: "",
          autoMopLifting: "",
          autoWaterTankRefilling: "",
          autoMopWashing: ""
      },
      battery: {
          batteryCapacity: "",
          batteryLife: "",
          chargingTime: "",
          ratedPower: ""
      },
      control: {
          scheduling: "",
          wifiSmartphoneApp: "",
          wifiFrequencyBand: "",
          amazonAlexaSupport: "",
          googleAssistantSupport: "",
          magneticVirtualWalls: "",
          ir_Rf_RemoteControl: ""
      },
      appFeatures: {
          realTimeTracking: "",
          digitalBlockedAreas: "",
          zonedCleaning: "",
          multiFloorMaps: "",
          manualMovementControl: "",
          selectedRoomCleaning: "",
          noMopZones: ""
      },
      sensor: {
          carpetBoost: "",
          cliffSensor: "",
          dirtSensor: "",
          fullDustbinSensor: ""
      },
      otherSpecifications: {
          weight: "",
          width: "",
          height: "",
          inTheBox: "",
          releaseDate: "",
          warranty: ""
      },
      purchaseLink: {
          amazon: "",
          aliexpress: ""
      }
    })


    function resetFormData() {
      const emptyFormData = resetObjectValues(FormData);
      setFormData(emptyFormData);
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
            const response = await fetch('http://localhost:8000/get');
            const jsonData = await response.json();
            setIdAndModel(jsonData);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };


    // Deleting Robot
    const DeleteRobot = async () => {
        fetch(`http://localhost:8000/admin/delete?id=${Id}`,{method: 'DELETE',
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${sessionStorage.getItem("token")}`
        }})
        .then((response) => {
            if(!response.ok) {
                throw new Error('Something went wrong');
            }
            fetchIdAndModel();
        })
        .catch((e) => {
            console.log(e);
        });
    }
    useEffect(() => {
        if (Id) {
            DeleteRobot();
        }
      }, [Id]);
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
        setEmptyStringsToNull(FormData);
        fetch('http://localhost:8000/admin/create',{method: 'POST',
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify(FormData)
        }).then(() => {
            setNullFieldsToEmptyString(FormData);
            resetFormData();
            fetchIdAndModel();
        })
    }
    function createHandler() {
        CreateRobot();
        setModel("");
    }

    // Update Robot
    function handleUpdate () {
        const foundItem = IdAndModel.find(item => item.model === Model);
        if(foundItem){
            setCreateButton(true);
            setUpdateButton(false);
            setCancelButton(false);
            const fetchRobotById = async () => {
                try {
                    const url = `http://localhost:8000/get/robot?id=${foundItem.id}`;
                    const response = await fetch(url);
                    const jsonData = await response.json();
                    setNullFieldsToEmptyString(jsonData);
                    setFormData(jsonData);

                } catch (error) {
                    console.log('Error fetching data:', error);
                }
            };
            fetchRobotById();
        }
      }
      const UpdateRobot = async () => {
        setEmptyStringsToNull(FormData);
        try {
          const response = await fetch('http://localhost:8000/admin/update', {
            method: 'PUT',
            headers: {
              "Content-type": "application/json",
              'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(FormData)
          });
      
          if (response.ok) {
            console.log('robot updated');
          } else {
            console.log('Error: ' + response.status);
            // Handle the error case if needed
          }
          setCreateButton(false);
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
        setNullFieldsToEmptyString(FormData);
        resetFormData();
        setModel("");
        console.log(FormData);
      }
      function CancelHandle() {
            resetFormData();
            setModel("");
            setCreateButton(false);
            setUpdateButton(true);
            setCancelButton(true);
      }


    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
          cleaningFeatures: {
            ...prevFormData.cleaningFeatures,
            [name]: value,
          },
          moppingFeatures: {
            ...prevFormData.moppingFeatures,
            [name]: value,
          },
          battery: {
            ...prevFormData.battery,
            [name]: value,
          },
          control: {
            ...prevFormData.control,
            [name]: value,
          },
          appFeatures: {
            ...prevFormData.appFeatures,
            [name]: value,
          },
          sensor: {
            ...prevFormData.sensor,
            [name]: value,
          },
          otherSpecifications: {
            ...prevFormData.otherSpecifications,
            [name]: value,
          },
          purchaseLink: {
            ...prevFormData.purchaseLink,
            [name]: value,
          },
        }));
      }


    return(
        <div className="cdu-container shadow-sm p-3 mb-5 bg-body-tertiary rounded">
            <div className="select-div" style={{ display: "flex" }}>
                <input ref={modelInputRef} className="form-control choose-robot" list="datalistOptions" id="exampleDataList" value={Model} name="Model" placeholder="Choose robot from the list" onChange={(e)=>setModel(e.target.value)}/>
                <button type="button" className="btn btn-secondary update-button" onClick={handleUpdate}>Update</button>
                <button type="button" className="btn btn-secondary cancel-update-button" disabled={CancelButton} onClick={CancelHandle}>Cancel</button>
                <button type="button" className="btn btn-danger delete-button" onClick={handleDelete}>Delete</button>
                <datalist id="datalistOptions">
            {IdAndModel.map((item) => (
                    <option key={item.id} value={item.model} />
                ))}
            </datalist>
            </div>
            <div className="form-inputs">
            <input className="form-control form-control-sm" type="text" name="model" onChange={handleChange} value={FormData.model} placeholder="Model" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="image" onChange={handleChange} value={FormData.image} placeholder="Image" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="number" name="mostPopular" onChange={handleChange} value={FormData.mostPopular} placeholder="Most Popular" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="number" name="mostCompared" onChange={handleChange} value={FormData.mostCompared} placeholder="Most Compared" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="mapping" onChange={handleChange} value={FormData.mapping} placeholder="Mapping" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="mappingSensorType" onChange={handleChange} value={FormData.mappingSensorType} placeholder="Mapping Sensor Type" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="highPrecisionMap" onChange={handleChange} value={FormData.highPrecisionMap} placeholder="High Precision Map" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="frontCamera" onChange={handleChange} value={FormData.frontCamera} placeholder="Front Camera" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="rechargeResume" onChange={handleChange} value={FormData.rechargeResume} placeholder="Recharge Resume" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="autoDockAndRecharge" onChange={handleChange} value={FormData.autoDockAndRecharge} placeholder="Auto Dock And Recharge" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="noiseLevel" onChange={handleChange} value={FormData.noiseLevel} placeholder="Noise Level" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="display" onChange={handleChange} value={FormData.display} placeholder="Display" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="sideBrushes" onChange={handleChange} value={FormData.sideBrushes} placeholder="Side Brushes" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="voicePrompts" onChange={handleChange} value={FormData.voicePrompts} placeholder="Voice Prompts" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="suctionPower" onChange={handleChange} value={FormData.cleaningFeatures.suctionPower} placeholder="Suction Power" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="cleaningArea" onChange={handleChange} value={FormData.cleaningFeatures.cleaningArea} placeholder="Cleaning Area" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="dustbinCapacity" onChange={handleChange} value={FormData.cleaningFeatures.dustbinCapacity} placeholder="Dustbin Capacity" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="disposableDustBagCapacity" onChange={handleChange} value={FormData.cleaningFeatures.disposableDustBagCapacity} placeholder="Disposable Dust Bag Capacity" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="autoDirtDisposal" onChange={handleChange} value={FormData.cleaningFeatures.autoDirtDisposal} placeholder="Auto Dirt Disposal" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="barrierCrossHeight" onChange={handleChange} value={FormData.cleaningFeatures.barrierCrossHeight} placeholder="Barrier Cross Height" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="hepaFilter" onChange={handleChange} value={FormData.cleaningFeatures.hepaFilter} placeholder="Hepa Filter" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="washableFilter" onChange={handleChange} value={FormData.cleaningFeatures.washableFilter} placeholder="Washable Filter" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="wetMopping" onChange={handleChange} value={FormData.moppingFeatures.wetMopping} placeholder="Wet Mopping" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="electricWaterFlowControl" onChange={handleChange} value={FormData.moppingFeatures.electricWaterFlowControl} placeholder="Electric Water Flow Control" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="waterTankCapacity" onChange={handleChange} value={FormData.moppingFeatures.waterTankCapacity} placeholder="Water Tank Capacity" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="vibratingMoppingPad" onChange={handleChange} value={FormData.moppingFeatures.vibratingMoppingPad} placeholder="Vibrating Mopping Pad" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="autoMopLifting" onChange={handleChange} value={FormData.moppingFeatures.autoMopLifting} placeholder="Auto Mop Lifting" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="autoWaterTankRefilling" onChange={handleChange} value={FormData.moppingFeatures.autoWaterTankRefilling} placeholder="Auto Water Tank Refilling" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="autoMopWashing" onChange={handleChange} value={FormData.moppingFeatures.autoMopWashing} placeholder="Auto Mop Washing" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="batteryCapacity" onChange={handleChange} value={FormData.battery.batteryCapacity} placeholder="Battery Capacity" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="batteryLife" onChange={handleChange} value={FormData.battery.batteryLife} placeholder="Battery Life" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="chargingTime" onChange={handleChange} value={FormData.battery.chargingTime} placeholder="Charging Time" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="ratedPower" onChange={handleChange} value={FormData.battery.ratedPower} placeholder="Rated Power" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="scheduling" onChange={handleChange} value={FormData.control.scheduling} placeholder="Scheduling" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="ir_Rf_RemoteControl" onChange={handleChange} value={FormData.control.ir_Rf_RemoteControl} placeholder="Ir Rf RemoteControl" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="wifiSmartphoneApp" onChange={handleChange} value={FormData.control.wifiSmartphoneApp} placeholder="Wifi Smartphone App" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="wifiFrequencyBand" onChange={handleChange} value={FormData.control.wifiFrequencyBand} placeholder="Wifi Frequency Band" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="amazonAlexaSupport" onChange={handleChange} value={FormData.control.amazonAlexaSupport} placeholder="Amazon Alexa Support" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="googleAssistantSupport" onChange={handleChange} value={FormData.control.googleAssistantSupport} placeholder="Google Assistant Support" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="magneticVirtualWalls" onChange={handleChange} value={FormData.control.magneticVirtualWalls} placeholder="Magnetic Virtual Walls" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="realTimeTracking" onChange={handleChange} value={FormData.appFeatures.realTimeTracking} placeholder="Real Time Tracking" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="digitalBlockedAreas" onChange={handleChange} value={FormData.appFeatures.digitalBlockedAreas} placeholder="Digital Blocked Areas" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="zonedCleaning" onChange={handleChange} value={FormData.appFeatures.zonedCleaning} placeholder="Zoned Cleaning" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="multiFloorMaps" onChange={handleChange} value={FormData.appFeatures.multiFloorMaps} placeholder="Multi Floor Maps" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="manualMovementControl" onChange={handleChange} value={FormData.appFeatures.manualMovementControl} placeholder="Manual Movement Control" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="selectedRoomCleaning" onChange={handleChange} value={FormData.appFeatures.selectedRoomCleaning} placeholder="Selected Room Cleaning" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="noMopZones" onChange={handleChange} value={FormData.appFeatures.noMopZones} placeholder="No Mop Zones" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="carpetBoost" onChange={handleChange} value={FormData.sensor.carpetBoost} placeholder="Carpet Boost" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="cliffSensor" onChange={handleChange} value={FormData.sensor.cliffSensor} placeholder="Cliff Sensor" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="dirtSensor" onChange={handleChange} value={FormData.sensor.dirtSensor} placeholder="Dirt Sensor" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="fullDustbinSensor" onChange={handleChange} value={FormData.sensor.fullDustbinSensor} placeholder="Full Dustbin Sensor" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="weight" onChange={handleChange} value={FormData.otherSpecifications.weight} placeholder="Weight" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="width" onChange={handleChange} value={FormData.otherSpecifications.width} placeholder="Width" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="height" onChange={handleChange} value={FormData.otherSpecifications.height} placeholder="Height" aria-label=".form-control-sm example"/>
            <textarea className="form-control form-control-sm" type="text" name="inTheBox" onChange={handleChange} value={FormData.otherSpecifications.inTheBox} placeholder="In The Box" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="releaseDate" onChange={handleChange} value={FormData.otherSpecifications.releaseDate} placeholder="Release Date" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="warranty" onChange={handleChange} value={FormData.otherSpecifications.warranty} placeholder="Warranty" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="amazon" onChange={handleChange} value={FormData.purchaseLink.amazon} placeholder="Amazon" aria-label=".form-control-sm example"/>
            <input className="form-control form-control-sm" type="text" name="aliexpress" onChange={handleChange} value={FormData.purchaseLink.aliexpress} placeholder="Aliexpress" aria-label=".form-control-sm example"/>
            </div>
            <div className="two-buttons">
                <button type="button" className="btn btn-success create-button"disabled={CreateButton} onClick={createHandler}>Create</button>
                <button type="button" className="btn btn-secondary confirm-update-button" disabled={UpdateButton} onClick={confirmUpdate}>Confirm Update</button>
            </div>
        </div>
    );
}
export default Admin;