import { useSelector } from "react-redux";
import { addRobot,deleteRobotById } from "../../../app/redux/compareSlice";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading";
import { useLazyGetRobotByIdQuery, useGetAllRobotsQuery } from "../../../app/services/robotApiSlice";
import { useState } from "react";

const CompareTable = () => {
  const queryParams = {
    fields: "model"
  };
  const noImage = "images/no-image.jpg";
  const lang = useSelector((state) => state.language.lang);
  const { robots } = useSelector((state) => state.compare);
  const dispatch = useDispatch();
  const { data: allModels } = useGetAllRobotsQuery(queryParams);
  const [Model, setModel] = useState("");
  const [triggerAdd] = useLazyGetRobotByIdQuery();



  const deleteHandler = (e) => {
    const id = parseInt(e.target.dataset.id, 10);
    dispatch(deleteRobotById(id));
  };



  function handleAdd() {
    const foundItem = allModels.content.find((item) => item.model === Model);
    if (foundItem) {
      const id = foundItem.id;
      triggerAdd({id}).then((response) => {
        console.log("Response data:", response.data);
        dispatch(addRobot(response.data));
      });
    }
    setModel("");
  }

  const renderRow = (field) => {
    return robots.map((item) => {
      let value = field.includes('.') ? getFieldByPath(item, field) : item[field];
  
      return (
        <td key={item.id} style={{ height: "80px", verticalAlign: "bottom", textAlign: "left", whiteSpace: "normal" }} className="border">
          {value === null ? (
            <span style={{ color: "grey" }}>N/A</span>
          ) : value === true ? (
            <span style={{ color: "green" }}>YES</span>
          ) : value === false ? (
            <span style={{ color: "red" }}>NO</span>
          ) : (
            value
          )}
        </td>
      );
    });
  };
  function getFieldByPath(obj, path) {
    const keys = path.split('.');
    let value = obj;
  
    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = value[key];
      } else {
        value = null;
        break;
      }
    }
  
    return value;
  }


  return (
    <div className="table-container">
      {robots ? (
        <>
          <div style={{ display: "flex" }} className="mb-1 mt-5" >
                <input
                  className="form-control choose-robot"
                  value={Model}
                  name="Model"
                  list="datalistOptions"
                  id="Model"
                  placeholder="Choose robot from the list"
                  onChange={(e) => setModel(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-dark add-button"
                  onClick={handleAdd}
                >
                  {lang === "en" ? <>Add</> : <>Добави</>}
                </button>
                <datalist id="datalistOptions">
                  {allModels.content.map((item) => (
                    <option key={item.id} value={item.model} />
                  ))}
                </datalist>
              </div>
          <table className="table">
            <thead>
            </thead>
            <tbody>
            <tr>
                <th scope="row"></th>
                {robots.map((item) => (
                    <td key={item.id} className="border" style={{backgroundColor:"#212529",color: "#F5F5F5"}}>{item.model}</td>
                )
                )}
              </tr>
              <tr>
                <th scope="row">
                  
                </th>
                {robots.map((item) => (
                  <td key={item.id} style={{height:"90px",verticalAlign: "bottom", textAlign: "left"}} className="border">
                    <div className="image d-flex">
                      <img className="image-in-table" src={item.image || noImage} alt="..."></img>
                      <div className="image-overlay ms-1">
                        <i
                          className="fa-solid fa-xmark"
                          style={{ color: "#D60000", fontSize: "25px",cursor:"pointer"}}
                          data-id={item.id}
                          onClick={deleteHandler}
                        ></i>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Mapping</span>
                </th>
                {renderRow("mapping")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Mapping Sensor Type</span>
                </th>
                {renderRow("mappingSensorType")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">High Precision Map</span>
                </th>
                {renderRow("highPrecisionMap")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Front Camera</span>
                </th>
                {renderRow("frontCamera")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Recharge Resume</span>
                </th>
                {renderRow("rechargeResume")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Auto Dock And Recharge</span>
                </th>
                {renderRow("autoDockAndRecharge")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Noise Level</span>
                </th>
                {renderRow("noiseLevel")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Display</span>
                </th>
                {renderRow("display")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Side Brushes</span>
                </th>
                {renderRow("sideBrushes")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Voice Prompts</span>
                </th>
                {renderRow("voicePrompts")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Cleaning Features</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Suction Power</span>
                </th>
                {renderRow("cleaningFeatures.suctionPower")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Cleaning Area</span>
                </th>
                {renderRow("cleaningFeatures.cleaningArea")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Dustbin Capacity</span>
                </th>
                {renderRow("cleaningFeatures.dustbinCapacity")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Disposable Dustbag Capacity</span>
                </th>
                {renderRow("cleaningFeatures.disposableDustBagCapacity")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Auto Dirt Disposal</span>
                </th>
                {renderRow("cleaningFeatures.autoDirtDisposal")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Barrier Cross Height</span>
                </th>
                {renderRow("cleaningFeatures.barrierCrossHeight")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Hepa Filter</span>
                </th>
                {renderRow("cleaningFeatures.hepaFilter")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Washable Filter</span>
                </th>
                {renderRow("cleaningFeatures.washableFilter")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Mopping Features</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Wet Mopping</span>
                </th>
                {renderRow("moppingFeatures.wetMopping")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Electric Water Flow Control</span>
                </th>
                {renderRow("moppingFeatures.electricWaterFlowControl")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Water Tank Capacity</span>
                </th>
                {renderRow("moppingFeatures.waterTankCapacity")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Vibrating Mopping Pad</span>
                </th>
                {renderRow("moppingFeatures.vibratingMoppingPad")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Auto Mop Lifting</span>
                </th>
                {renderRow("moppingFeatures.autoMopLifting")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Auto Water Tank Refilling</span>
                </th>
                {renderRow("moppingFeatures.autoWaterTankRefilling")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Auto Mop Washing</span>
                </th>
                {renderRow("moppingFeatures.autoMopWashing")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Battery</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Battery Capacity</span>
                </th>
                {renderRow("battery.batteryCapacity")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Battery Life</span>
                </th>
                {renderRow("battery.batteryLife")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Charging Time</span>
                </th>
                {renderRow("battery.chargingTime")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Rated Power</span>
                </th>
                {renderRow("battery.ratedPower")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Control</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Scheduling</span>
                </th>
                {renderRow("control.scheduling")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Wifi Smartphone App</span>
                </th>
                {renderRow("control.wifiSmartphoneApp")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Wifi Frequency Band</span>
                </th>
                {renderRow("control.wifiFrequencyBand")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Amazon Alexa Support</span>
                </th>
                {renderRow("control.amazonAlexaSupport")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Google Assistant Support</span>
                </th>
                {renderRow("control.googleAssistantSupport")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Magnetic Virtual Walls</span>
                </th>
                {renderRow("control.magneticVirtualWalls")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Ir Rf Remote Control</span>
                </th>
                {renderRow("control.irRfRemoteControl")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>App Features</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Real Time Tracking</span>
                </th>
                {renderRow("appFeatures.realTimeTracking")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Digital Blocked Areas</span>
                </th>
                {renderRow("appFeatures.digitalBlockedAreas")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Zoned Cleaning</span>
                </th>
                {renderRow("appFeatures.zonedCleaning")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Multi Floor Maps</span>
                </th>
                {renderRow("appFeatures.multiFloorMaps")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Manual Movement Control</span>
                </th>
                {renderRow("appFeatures.manualMovementControl")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Selected Room Cleaning</span>
                </th>
                {renderRow("appFeatures.selectedRoomCleaning")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">No Mop Zones</span>
                </th>
                {renderRow("appFeatures.noMopZones")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Sensor</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Carpet Boost</span>
                </th>
                {renderRow("sensor.carpetBoost")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Cliff Sensor</span>
                </th>
                {renderRow("sensor.cliffSensor")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Dirt Sensor</span>
                </th>
                {renderRow("sensor.dirtSensor")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Full Dustbin Sensor</span>
                </th>
                {renderRow("sensor.fullDustbinSensor")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Other Specifications</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Weight</span>
                </th>
                {renderRow("otherSpecifications.weight")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Width</span>
                </th>
                {renderRow("otherSpecifications.width")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Height</span>
                </th>
                {renderRow("otherSpecifications.height")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">In The Box</span>
                </th>
                {robots.map((item) => (
                    <td key={item.id} style={{height:"150px",verticalAlign: "bottom", textAlign: "left",width:"50px"}} className="border text-break">{item.otherSpecifications.inTheBox}</td>
                ))}
                
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Release Date</span>
                </th>
                {renderRow("otherSpecifications.releaseDate")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Warranty</span>
                </th>
                {renderRow("otherSpecifications.warranty")}
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default CompareTable;
