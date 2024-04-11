import { useSelector } from "react-redux";
import { addRobot,deleteRobotById } from "../../../app/redux/compareSlice";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading";
import { useLazyGetRobotByIdQuery, useGetAllRobotsQuery } from "../../../app/services/robotApiSlice";
import { useState, useEffect } from "react";
import ReleaseDateDisplay from "../../../components/ReleaseDateDisplay";

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

  useEffect(() => {
        // Initialize popovers when the component mounts
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new window.bootstrap.Popover(popoverTriggerEl);
        });
  }, []);



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
                  <span className="stickycell">Mapping <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000",cursor:"pointer"}} data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" data-bs-content="A technology that can be based on a camera sensor, Laser Direct Structuring (LDS) laser or a gyroscope. The robot scans out a room and creates a map. The robots with mapping provide better performance by building the most efficient path of cleaning without missing a spot"></i></span>
                </th>
                {renderRow("mapping")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Mapping Sensor Type <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}} data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" data-bs-content="Top popover"></i></span>
                </th>
                {renderRow("mappingSensorType")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">High Precision Map <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("highPrecisionMap")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Front Camera <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("frontCamera")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Recharge Resume <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("rechargeResume")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Auto Dock And Recharge <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("autoDockAndRecharge")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Noise Level <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("noiseLevel")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Display <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("display")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Side Brushes <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("sideBrushes")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Voice Prompts <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("voicePrompts")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Cleaning Features</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Suction Power <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("cleaningFeatures.suctionPower")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Cleaning Area <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("cleaningFeatures.cleaningArea")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Dustbin Capacity <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("cleaningFeatures.dustbinCapacity")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Disposable Dustbag Capacity <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("cleaningFeatures.disposableDustBagCapacity")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Auto Dirt Disposal <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("cleaningFeatures.autoDirtDisposal")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Barrier Cross Height <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("cleaningFeatures.barrierCrossHeight")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Hepa Filter <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("cleaningFeatures.hepaFilter")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Washable Filter <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("cleaningFeatures.washableFilter")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Mopping Features</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Wet Mopping <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("moppingFeatures.wetMopping")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Electric Water Flow Control <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("moppingFeatures.electricWaterFlowControl")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Water Tank Capacity <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("moppingFeatures.waterTankCapacity")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Vibrating Mopping Pad <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("moppingFeatures.vibratingMoppingPad")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Auto Mop Lifting <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("moppingFeatures.autoMopLifting")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Auto Water Tank Refilling <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("moppingFeatures.autoWaterTankRefilling")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Auto Mop Washing <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("moppingFeatures.autoMopWashing")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Battery</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Battery Capacity <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("battery.batteryCapacity")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Battery Life <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("battery.batteryLife")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Charging Time <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("battery.chargingTime")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Rated Power <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("battery.ratedPower")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Control</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Scheduling <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("control.scheduling")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Wifi Smartphone App <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("control.wifiSmartphoneApp")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Wifi Frequency Band <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("control.wifiFrequencyBand")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Amazon Alexa Support <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("control.amazonAlexaSupport")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Google Assistant Support <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("control.googleAssistantSupport")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Magnetic Virtual Walls <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("control.magneticVirtualWalls")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Ir Rf Remote Control <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("control.irRfRemoteControl")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>App Features</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Real Time Tracking <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("appFeatures.realTimeTracking")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Digital Blocked Areas <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("appFeatures.digitalBlockedAreas")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Zoned Cleaning <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("appFeatures.zonedCleaning")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Multi Floor Maps <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("appFeatures.multiFloorMaps")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Manual Movement Control <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("appFeatures.manualMovementControl")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Selected Room Cleaning <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("appFeatures.selectedRoomCleaning")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">No Mop Zones <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("appFeatures.noMopZones")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Sensor</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Carpet Boost <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("sensor.carpetBoost")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Cliff Sensor <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("sensor.cliffSensor")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Dirt Sensor <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("sensor.dirtSensor")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Full Dustbin Sensor <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("sensor.fullDustbinSensor")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Other Specifications</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Weight <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("otherSpecifications.weight")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Width <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("otherSpecifications.width")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Height <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {renderRow("otherSpecifications.height")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">In The Box <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {robots.map((item) => (
                    <td key={item.id} style={{height:"150px",verticalAlign: "bottom", textAlign: "left",width:"50px"}} className="border text-break">{item.otherSpecifications.inTheBox}</td>
                ))}
                
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Release Date <i className="fa-regular fa-circle-question fa-xs" style={{color:"#000000"}}></i></span>
                </th>
                {robots.map((item) => (
                  <td key={item.id} style={{ height: "80px", verticalAlign: "bottom", textAlign: "left", whiteSpace: "normal" }} className="border"><ReleaseDateDisplay releaseDate={item.otherSpecifications.releaseDate} /></td>
                ))}
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
