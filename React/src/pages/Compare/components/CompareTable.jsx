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
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
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
  const renderStringRow = (field,addition) => {
    return robots.map((item) => {
      let value = field.includes('.') ? getFieldByPath(item,field) : item[field];
      return(
        <td key={item.id} style={{ height: "80px", verticalAlign: "bottom", textAlign: "left", whiteSpace: "normal" }} className="border">
          {value === null ? (
            <span style={{ color: "grey" }}>N/A</span>
          ) : (
            <>
              {value} {addition === "m²" ? <>m&sup2;</> : addition}
            </>
          )}
        </td>
      )
    });
  }
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
    <div className="table-container" style={{overflowX: "auto",marginBottom:"50px"}}>
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
                  <span className="stickycell">Mapping <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="A technology that can be based on a camera sensor, Laser Direct Structuring (LDS) laser or a gyroscope. The robot scans out a room and creates a map. The robots with mapping provide better performance by building the most efficient path of cleaning without missing a spot" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("mapping")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Mapping Sensor Type <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="There are different types of mapping technologies such as LDS based, camera based, and gyroscope/accelerometer based mapping. Some robot vacuums use combined technologies." 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("mappingSensorType")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">High Precision Map <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="A high-precision map means that it is at least 98% accurate and corresponds to your real home layout" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("highPrecisionMap")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Front Camera <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The robot equipped with a front camera and can see, recognize, and avoid objects on its way." 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("frontCamera")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Recharge Resume <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="If the robot can't finish a job on one charge, it automatically returns to the charging dock. Resuming intends the robot to continue cleaning from the same place it left off after it's done charging. This feature is perfect for big households, when the robot is not able to clean the entire house on one charge" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("rechargeResume")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Auto Dock And Recharge <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="When the robot vacuum finishes the job or runs low on battery, it automatically returns to the dock to recharge" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("autoDockAndRecharge")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Noise Level <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="Note, some robot cleaners have a few power settings, in this field, we specify a noise level claimed by the manufacturer, in lowest power mode." 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("noiseLevel","dB")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Display <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The robot have a display that shows additional information such as battery level, errors, scheduling time, or cleaning status" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("display")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Side Brushes <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="How many side brushes the robot comes equipped with. Side brushes help to reach corners and edges channeling all the dust and dirt to the main central brush where it gets sucked up right into the dustbin" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("sideBrushes")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Voice Prompts <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The robot uses voice prompts to inform you about the
                  current status of the robot vacuum whether it is charging,
                  cleaning, etc." 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("voicePrompts")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Cleaning Features</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Suction Power <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The higher the suction power, the better it performs on carpeted surface removing dust and smaller debris. A high suction power robot vacuum cleaner is more effective in getting rid of dirt hidden away in your carpets" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("cleaningFeatures.suctionPower","Pa")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Cleaning Area <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="How much of a cleaning area the robot covers during one cleaning cycle" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("cleaningFeatures.cleaningArea","m²")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Dustbin Capacity <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The dustbin size matters if you
                  have pets or a big house." 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("cleaningFeatures.dustbinCapacity","ml")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Disposable Dustbag Capacity <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The capacity of the disposable dust bag from the auto-emptying base" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("cleaningFeatures.disposableDustBagCapacity","L")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Auto Dirt Disposal <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The robot vacuum has a special dock that automatically empties the robot's dustbin when it is docked" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("cleaningFeatures.autoDirtDisposal")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Barrier Cross Height <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The height of an obstacle/carpet/threshold the robot can climb." 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("cleaningFeatures.barrierCrossHeight","mm")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Hepa Filter <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="HEPA is an acronym that stands for High-Efficiency Particulate Air. The HEPA filter is a type of mechanical air filter; it works by forcing air through a fine mesh that traps harmful particles such as pollen, pet dander, dust mites, and tobacco smoke. A robot vacuum with HEPA filtration is safer for allergy and asthma sufferers" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("cleaningFeatures.hepaFilter")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Washable Filter <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="This type of filter can be washed, so you don't need to replace it as often." 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("cleaningFeatures.washableFilter")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Mopping Features</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Wet Mopping <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The robot can do mopping and sweeping. Most of the 2-in-1 cleaners come with a water tank and a mop cloth, a few models have a single mop cloth only" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("moppingFeatures.wetMopping")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Electric Water Flow Control <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="An electric water pump inside the robot controls the water output depending on your needs. You can change the water output mode in the app" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("moppingFeatures.electricWaterFlowControl")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Water Tank Capacity <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The more water the water tank holds, the more significant cleaning area it covers before gets dry" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("moppingFeatures.waterTankCapacity","ml")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Vibrating Mopping Pad <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The mopping pad of the robot vibrates which helps to get rid of stains from the floor" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("moppingFeatures.vibratingMoppingPad")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Auto Mop Lifting <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="Ability to automatically lift the mopping pad when a carpet is detected, so you can mop hard floors and vacuum carpets in a single clean" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("moppingFeatures.autoMopLifting")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Auto Water Tank Refilling <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The robot supports a base that refills the water tank inside the robot with water after or during mopping." 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("moppingFeatures.autoWaterTankRefilling")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Auto Mop Washing <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The robot washes automatically the mop during or after mopping" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("moppingFeatures.autoMopWashing")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Battery</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Battery Capacity <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="A larger battery provides a longer running time on one charge." 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("battery.batteryCapacity","mAh")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Battery Life <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="How much time the robot can work before needs to recharge" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("battery.batteryLife","min")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Charging Time <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="How much time the robot needs to recharge" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("battery.chargingTime","min")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Rated Power <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="Rated power is the max power the machine can deliver under normal circumstances" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("battery.ratedPower","W")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Control</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Scheduling <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The feature allows setting the robot to start cleaning automatically at a specific time" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("control.scheduling")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Wifi Smartphone App <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The robot supports Wi-Fi and has a smartphone app; it can be controlled even when you are not at home" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("control.wifiSmartphoneApp")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Wifi Frequency Band <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="Some robot vacuums work only with 2.4 GHz wi-fi band, others can also work in 5 GHz wi-fi network" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("control.wifiFrequencyBand","GHz")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Amazon Alexa Support <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The robot is compatible with Alexa-enabled devices, and can be controlled by voice commands" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("control.amazonAlexaSupport")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Google Assistant Support <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The robot works with Google Home so it can be controlled via simple voice commands" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("control.googleAssistantSupport")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Magnetic Virtual Walls <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="A physical wall barrier can be two types: magnetic tape and a block. They both work the same way by keeping the robot out of the areas you don't want to be cleaned" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("control.magneticVirtualWalls")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Ir Rf Remote Control <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The IR remote control helps to manage the robot's movements, schedule it to work, start, stop, etc" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("control.irRfRemoteControl")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>App Features</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Real Time Tracking <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="Ability to watch in real-time where the robot is located on the map of your house and where it has already cleaned" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("appFeatures.realTimeTracking")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Digital Blocked Areas <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="It means the app supports creating restricted areas the robot can not cross when is vacuuming. Helpful when you don't want the robot to go to certain places" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("appFeatures.digitalBlockedAreas")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Zoned Cleaning <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="You can make the robot clean within a particular area by setting a zone inside the app" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("appFeatures.zonedCleaning")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Multi Floor Maps <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The robot stores more than one map in memory. This feature is useful for people who live in a house with more than one level" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("appFeatures.multiFloorMaps")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Manual Movement Control <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="With this feature, the robot vacuum can be controlled like a radio car through the app" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("appFeatures.manualMovementControl")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Selected Room Cleaning <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="This option allows the robot vacuum to clean a specific room (or a few rooms) by selecting this room in the app." 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("appFeatures.selectedRoomCleaning")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">No Mop Zones <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="You can set virtual no-mop zones in the app to restrict the robot from going to certain places (for example with carpets) and it will avoid these areas in mopping mode" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("appFeatures.noMopZones")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Sensor</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Carpet Boost <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="Thanks to this feature, the robot increases suction power to maximum once its sensors recognize the carpeted surface. It helps to save battery life" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("sensor.carpetBoost")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Cliff Sensor <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="Cliff sensors prevent the robot from falling from stairs" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("sensor.cliffSensor")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Dirt Sensor <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The dirt detect feature helps the robot to provide more thoughtful cleaning by recognizing the dirtiest areas" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("sensor.dirtSensor")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Full Dustbin Sensor <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The robot has a sensor that detects when the dustbin is full and sends a notification to the user." 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("sensor.fullDustbinSensor")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Other Specifications</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Weight <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The total weight of the robot vacuum" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("otherSpecifications.weight","kg")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Width <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="It refers to the robot's diameter (for round shaped robot vacuums) or width. Smaller diameter helps the robot to reach narrow places" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("otherSpecifications.width","cm")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Height <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="If you want to use the robot vacuum under your bed or furniture, check the gap between the floor and furniture and ensure the robot vacuum will fit under it." 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                
                {renderStringRow("otherSpecifications.height","cm")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">In The Box <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="What kind of accessories the package contents" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {robots.map((item) => (
                    <td key={item.id} style={{paddingTop:"30px",verticalAlign: "bottom", textAlign: "left",width:"50px"}} className="border text-break">{item.otherSpecifications.inTheBox ? item.otherSpecifications.inTheBox : 'N/A'}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">Release Date <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content="The date when the robot vacuum was released to the market" 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
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
