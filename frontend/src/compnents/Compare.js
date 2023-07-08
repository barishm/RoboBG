import { useState,useEffect,useRef } from "react";

const Compare = () => {
    const [Ids , setIds] = useState([]);
    const [Model,setModel] = useState(null)
    const [IdAndModel , setIdAndModel] = useState([]);
    const [Robots,setRobots] = useState([{
        "id": "1",
        "model": "xiomi",
        "mapping": "asdasd",
        "mappingSensorType": "asda",
        "highPrecisionMap": "sdasd",
        "frontCamera": "asdasd",
        "rechargeResume": "asdasd",
        "autoDockAndRecharge": "dasd",
        "noiseLevel": "asdas",
        "display": "dasd",
        "sideBrushes": "asdasd",
        "voicePrompts": null,
        "cleaningFeatures": {
            "suctionPower": "asdas",
            "cleaningArea": "dasd",
            "dustbinCapacity": "asdasd",
            "disposableDustBagCapacity": "asd",
            "autoDirtDisposal": "asd",
            "barrierCrossHeight": "asd",
            "hepaFilter": "asd",
            "washableFilter": "asdasd"
        },
        "moppingFeatures": {
            "wetMopping": "asd",
            "electricWaterFlowControl": "asd",
            "waterTankCapacity": "asd",
            "vibratingMoppingPad": "asdasd",
            "autoMopLifting": "asda",
            "autoWaterTankRefilling": "sdasd",
            "autoMopWashing": "asda"
        },
        "battery": {
            "batteryCapacity": "asd",
            "batteryLife": "asd",
            "chargingTime": "qqsd",
            "ratedPower": "qasd"
        },
        "control": {
            "scheduling": "qasd",
            "wifiSmartphoneApp": "asd",
            "wifiFrequencyBand": "qwasd",
            "amazonAlexaSupport": "qwsd",
            "googleAssistantSupport": "sdaf",
            "magneticVirtualWalls": "qwasdf",
            "ir_Rf_RemoteControl": "qasqd"
        },
        "appFeatures": {
            "realTimeTracking": "qwwdf",
            "digitalBlockedAreas": "fasdas",
            "zonedCleaning": "wsdf",
            "multiFloorMaps": "asdf",
            "manualMovementControl": "sdf",
            "selectedRoomCleaning": "oyfgu",
            "noMopZones": "oyugf"
        },
        "sensor": {
            "carpetBoost": "youf",
            "cliffSensor": "outf",
            "dirtSensor": "out",
            "fullDustbinSensor": "fou"
        },
        "otherSpecifications": {
            "weight": "fgu",
            "width": "ofou",
            "height": "yfg",
            "inTheBox": "ougouy",
            "releaseDate": "ou",
            "warranty": "gou"
        },
        "purchaseLink": {
        "amazon": "amazon link",
            "aliexpress": "aeling",
        }
    },{
        "id": "2",
        "model": "iphone",
        "mapping": "asdasd",
        "mappingSensorType": "asda",
        "highPrecisionMap": "sdasd",
        "frontCamera": "asdasd",
        "rechargeResume": "asdasd",
        "autoDockAndRecharge": "dasd",
        "noiseLevel": "asdas",
        "display": "dasd",
        "sideBrushes": "asdasd",
        "voicePrompts": null,
        "cleaningFeatures": {
            "suctionPower": "asdas",
            "cleaningArea": "dasd",
            "dustbinCapacity": "asdasd",
            "disposableDustBagCapacity": "asd",
            "autoDirtDisposal": "asd",
            "barrierCrossHeight": "asd",
            "hepaFilter": "asd",
            "washableFilter": "asdasd"
        },
        "moppingFeatures": {
            "wetMopping": "asd",
            "electricWaterFlowControl": "asd",
            "waterTankCapacity": "asd",
            "vibratingMoppingPad": "asdasd",
            "autoMopLifting": "asda",
            "autoWaterTankRefilling": "sdasd",
            "autoMopWashing": "asda"
        },
        "battery": {
            "batteryCapacity": "asd",
            "batteryLife": "asd",
            "chargingTime": "qqsd",
            "ratedPower": "qasd"
        },
        "control": {
            "scheduling": "qasd",
            "wifiSmartphoneApp": "asd",
            "wifiFrequencyBand": "qwasd",
            "amazonAlexaSupport": "qwsd",
            "googleAssistantSupport": "sdaf",
            "magneticVirtualWalls": "qwasdf",
            "ir_Rf_RemoteControl": "qasqd"
        },
        "appFeatures": {
            "realTimeTracking": "qwwdf",
            "digitalBlockedAreas": "fasdas",
            "zonedCleaning": "wsdf",
            "multiFloorMaps": "asdf",
            "manualMovementControl": "sdf",
            "selectedRoomCleaning": "oyfgu",
            "noMopZones": "oyugf"
        },
        "sensor": {
            "carpetBoost": "youf",
            "cliffSensor": "outf",
            "dirtSensor": "out",
            "fullDustbinSensor": "fou"
        },
        "otherSpecifications": {
            "weight": "fgu",
            "width": "ofou",
            "height": "yfg",
            "inTheBox": "ougouy",
            "releaseDate": "ou",
            "warranty": "gou"
        },
        "purchaseLink": {
        "amazon": "amazon link",
            "aliexpress": "aeling",
        }
    },{
        "id": "3",
        "model": "samsung",
        "mapping": "asdasd",
        "mappingSensorType": "asda",
        "highPrecisionMap": "sdasd",
        "frontCamera": "asdasd",
        "rechargeResume": "asdasd",
        "autoDockAndRecharge": "dasd",
        "noiseLevel": "asdas",
        "display": "dasd",
        "sideBrushes": "asdasd",
        "voicePrompts": null,
        "cleaningFeatures": {
            "suctionPower": "asdas",
            "cleaningArea": "dasd",
            "dustbinCapacity": "asdasd",
            "disposableDustBagCapacity": "asd",
            "autoDirtDisposal": "asd",
            "barrierCrossHeight": "asd",
            "hepaFilter": "asd",
            "washableFilter": "asdasd"
        },
        "moppingFeatures": {
            "wetMopping": "asd",
            "electricWaterFlowControl": "asd",
            "waterTankCapacity": "asd",
            "vibratingMoppingPad": "asdasd",
            "autoMopLifting": "asda",
            "autoWaterTankRefilling": "sdasd",
            "autoMopWashing": "asda"
        },
        "battery": {
            "batteryCapacity": "asd",
            "batteryLife": "asd",
            "chargingTime": "qqsd",
            "ratedPower": "qasd"
        },
        "control": {
            "scheduling": "qasd",
            "wifiSmartphoneApp": "asd",
            "wifiFrequencyBand": "qwasd",
            "amazonAlexaSupport": "qwsd",
            "googleAssistantSupport": "sdaf",
            "magneticVirtualWalls": "qwasdf",
            "ir_Rf_RemoteControl": "qasqd"
        },
        "appFeatures": {
            "realTimeTracking": "qwwdf",
            "digitalBlockedAreas": "fasdas",
            "zonedCleaning": "wsdf",
            "multiFloorMaps": "asdf",
            "manualMovementControl": "sdf",
            "selectedRoomCleaning": "oyfgu",
            "noMopZones": "oyugf"
        },
        "sensor": {
            "carpetBoost": "youf",
            "cliffSensor": "outf",
            "dirtSensor": "out",
            "fullDustbinSensor": "fou"
        },
        "otherSpecifications": {
            "weight": "fgu",
            "width": "ofou",
            "height": "yfg",
            "inTheBox": "ougouyasdasdasdasdafasdasdfasdsadsadsadfasdsad",
            "releaseDate": "ou",
            "warranty": "gou"
        },
        "purchaseLink": {
        "amazon": "amazon link",
            "aliexpress": "aeling",
        }
    }]);
    const modelInputRef = useRef(null);
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
            setNullFieldsToEmptyString(jsonData);
            setRobots(jsonData);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    




    function handleAdd() {
        
        const foundItem = IdAndModel.find(item => item.model === Model);
        if (foundItem && !Ids.includes(foundItem.id)) {
            setIds([...Ids, foundItem.id]);
        }
        setModel("");
        modelInputRef.current.value = "";
    }
    useEffect(() => {
        if (Ids.length > 0) {
          fetchRobotsByIds();
        }
      }, [Ids]);
    let tbl = null;  
    if (Robots.length > 0) {
        tbl = <div className="compare-container">
              {Robots.map((item) => (
              <div key={item.id} className="compare-robot">
                  <div className="compare-fields">{item.model}</div>
                  <div className="compare-fields">{item.mapping}</div>
                  <div className="compare-fields">{item.mappingSensorType}</div>
                  <div className="compare-fields">{item.highPrecisionMap}</div>
                  <div className="compare-fields">{item.frontCamera}</div>
                  <div className="compare-fields">{item.rechargeResume}</div>
                  <div className="compare-fields">{item.autoDockAndRecharge}</div>
                  <div className="compare-fields">{item.noiseLevel}</div>
                  <div className="compare-fields">{item.display}</div>
                  <div className="compare-fields">{item.sideBrushes}</div>
                  <div className="compare-fields">{item.voicePrompts}</div>
                  <div className="compare-fields">{item.cleaningFeatures.suctionPower}</div>
                  <div className="compare-fields">{item.cleaningFeatures.cleaningArea}</div>
                  <div className="compare-fields">{item.cleaningFeatures.dustbinCapacity}</div>
                  <div className="compare-fields">{item.cleaningFeatures.disposableDustBagCapacity}</div>
                  <div className="compare-fields">{item.cleaningFeatures.autoDirtDisposal}</div>
                  <div className="compare-fields">{item.cleaningFeatures.barrierCrossHeight}</div>
                  <div className="compare-fields">{item.cleaningFeatures.hepaFilter}</div>
                  <div className="compare-fields">{item.cleaningFeatures.washableFilter}</div>
                  <div className="compare-fields">{item.moppingFeatures.electricWaterFlowControl}</div>
                  <div className="compare-fields">{item.moppingFeatures.waterTankCapacity}</div>
                  <div className="compare-fields">{item.moppingFeatures.vibratingMoppingPad}</div>
                  <div className="compare-fields">{item.moppingFeatures.autoMopLifting}</div>
                  <div className="compare-fields">{item.moppingFeatures.autoWaterTankRefilling}</div>
                  <div className="compare-fields">{item.moppingFeatures.autoMopWashing}</div>
                  <div className="compare-fields">{item.moppingFeatures.wetMopping}</div>
                  <div className="compare-fields">{item.battery.batteryCapacity}</div>
                  <div className="compare-fields">{item.battery.batteryLife}</div>
                  <div className="compare-fields">{item.battery.chargingTime}</div>
                  <div className="compare-fields">{item.battery.ratedPower}</div>
                  <div className="compare-fields">{item.control.scheduling}</div>
                  <div className="compare-fields">{item.control.Ir_Rf_RemoteControl}</div>
                  <div className="compare-fields">{item.control.wifiSmartphoneApp}</div>
                  <div className="compare-fields">{item.control.wifiFrequencyBand}</div>
                  <div className="compare-fields">{item.control.amazonAlexaSupport}</div>
                  <div className="compare-fields">{item.control.googleAssistantSupport}</div>
                  <div className="compare-fields">{item.control.magneticVirtualWalls}</div>
                  <div className="compare-fields">{item.appFeatures.realTimeTracking}</div>
                  <div className="compare-fields">{item.appFeatures.digitalBlockedAreas}</div>
                  <div className="compare-fields">{item.appFeatures.zonedCleaning}</div>
                  <div className="compare-fields">{item.appFeatures.multiFloorMaps}</div>
                  <div className="compare-fields">{item.appFeatures.manualMovementControl}</div>
                  <div className="compare-fields">{item.appFeatures.selectedRoomCleaning}</div>
                  <div className="compare-fields">{item.appFeatures.noMopZones}</div>
                  <div className="compare-fields">{item.sensor.carpetBoost}</div>
                  <div className="compare-fields">{item.sensor.cliffSensor}</div>
                  <div className="compare-fields">{item.sensor.dirtSensor}</div>
                  <div className="compare-fields">{item.sensor.fullDustbinSensor}</div>
                  <div className="compare-fields">{item.otherSpecifications.weight}</div>
                  <div className="compare-fields">{item.otherSpecifications.width}</div>
                  <div className="compare-fields">{item.otherSpecifications.height}</div>
                  <div className="compare-fields">{item.otherSpecifications.inTheBox}</div>
                  <div className="compare-fields">{item.otherSpecifications.releaseDate}</div>
                  <div className="compare-fields">{item.otherSpecifications.warranty}</div>
                  <div className="compare-fields">{item.purchaseLink.amazon}</div>
                  <div className="compare-fields">{item.purchaseLink.aliexpress}</div>
              </div>
              ))}
              </div>
        
      }  
    return (
        <div>
            <div style={{ display: "flex" }}>
                <input ref={modelInputRef} className="form-control choose-robot" list="datalistOptions" id="exampleDataList" placeholder="Choose robot from the list" onChange={(e)=>setModel(e.target.value)}/>
                <button type="button" className="btn btn-secondary add-button" onClick={handleAdd}>Add</button>
            </div>
            <datalist id="datalistOptions">
            {IdAndModel.map((item) => (
                    <option key={item.id} value={item.model} />
                ))}
            </datalist>
            {tbl}
        </div>
    );
}
export default Compare;