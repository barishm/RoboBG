import { useFormik } from "formik";
import { cleanFormValues } from "../independent/utils";
import {
  useUpdateRobotMutation,
  useGetRobotByIdQuery,
  useLazyGetRobotByIdQuery
} from "../../app/apis/robotApiSlice";
import Loading from "../independent/Loading";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const UpdateRobot = (props) => {
  const id = props.id;
  const [updateRobot] = useUpdateRobotMutation();
  //const { data, isLoading, error } = useGetRobotByIdQuery({ id });
  const [trigger,result] = useLazyGetRobotByIdQuery();
  const { accessToken } = useSelector((state) => state.auth);
  const {data, isLoading, error} = result;


  useEffect(() => {
    if (id !== null) {
      trigger(id);
    }
  }, [id, trigger]);

  
  const update = async (robotBody) => {
    await updateRobot({robotBody,accessToken}).unwrap()
    formikUpdate.resetForm();
  }

  const formikUpdate = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id,
      brand: data?.brand,
      model: data?.model,
      bests: data?.bests,
      mapping: data?.mapping,
      mappingSensorType: data?.mappingSensorType,
      highPrecisionMap: data?.highPrecisionMap,
      frontCamera: data?.frontCamera,
      rechargeResume: data?.rechargeResume,
      autoDockAndRecharge: data?.autoDockAndRecharge,
      noiseLevel: data?.noiseLevel,
      display: data?.display,
      sideBrushes: data?.sideBrushes,
      voicePrompts: data?.voicePrompts,
      cleaningFeatures: {
        suctionPower: data?.cleaningFeatures.suctionPower,
        cleaningArea: data?.cleaningFeatures.cleaningArea,
        dustbinCapacity: data?.cleaningFeatures.dustbinCapacity,
        disposableDustBagCapacity:
          data?.cleaningFeatures.disposableDustBagCapacity,
        autoDirtDisposal: data?.cleaningFeatures.autoDirtDisposal,
        barrierCrossHeight: data?.cleaningFeatures.barrierCrossHeight,
        hepaFilter: data?.cleaningFeatures.hepaFilter,
        washableFilter: data?.cleaningFeatures.washableFilter,
      },
      moppingFeatures: {
        wetMopping: data?.moppingFeatures.wetMopping,
        electricWaterFlowControl:
          data?.moppingFeatures.electricWaterFlowControl,
        waterTankCapacity: data?.moppingFeatures.waterTankCapacity,
        vibratingMoppingPad: data?.moppingFeatures.vibratingMoppingPad,
        autoMopLifting: data?.moppingFeatures.autoMopLifting,
        autoWaterTankRefilling: data?.moppingFeatures.autoWaterTankRefilling,
        autoMopWashing: data?.moppingFeatures.autoMopWashing,
      },
      battery: {
        batteryCapacity: data?.battery.batteryCapacity,
        batteryLife: data?.battery.batteryLife,
        chargingTime: data?.battery.chargingTime,
        ratedPower: data?.battery.ratedPower,
      },
      control: {
        scheduling: data?.control.scheduling,
        wifiSmartphoneApp: data?.control.wifiSmartphoneApp,
        wifiFrequencyBand: data?.control.wifiFrequencyBand,
        amazonAlexaSupport: data?.control.amazonAlexaSupport,
        googleAssistantSupport: data?.control.googleAssistantSupport,
        magneticVirtualWalls: data?.control.magneticVirtualWalls,
        irRfRemoteControl: data?.control.irRfRemoteControl,
      },
      appFeatures: {
        realTimeTracking: data?.appFeatures.realTimeTracking,
        digitalBlockedAreas: data?.appFeatures.digitalBlockedAreas,
        zonedCleaning: data?.appFeatures.zonedCleaning,
        multiFloorMaps: data?.appFeatures.multiFloorMaps,
        manualMovementControl: data?.appFeatures.manualMovementControl,
        selectedRoomCleaning: data?.appFeatures.selectedRoomCleaning,
        noMopZones: data?.appFeatures.noMopZones,
      },
      sensor: {
        carpetBoost: data?.sensor.carpetBoost,
        cliffSensor: data?.sensor.cliffSensor,
        dirtSensor: data?.sensor.dirtSensor,
        fullDustbinSensor: data?.sensor.fullDustbinSensor,
      },
      otherSpecifications: {
        weight: data?.otherSpecifications.weight,
        width: data?.otherSpecifications.width,
        height: data?.otherSpecifications.height,
        inTheBox: data?.otherSpecifications.inTheBox,
        releaseDate: data?.otherSpecifications.releaseDate,
        warranty: data?.otherSpecifications.warranty,
      },
    },
    onSubmit: (values) => {
      const robotBody = cleanFormValues(values);
      update(robotBody);
    },
  });

  return (
    <div
      className="modal fade"
      id="update"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
        <form onSubmit={formikUpdate.handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">Update Robot</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {isLoading ? (
              <>
                <Loading />
              </>
            ) : error ? (
              <>Something went wrong</>
            ) : data ? (
              <>
               <div className="form-inputs">
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Brand</label>
            <input className="form-control form-control-sm" type="text" name="brand" onChange={formikUpdate.handleChange} value={formikUpdate.values.brand}></input>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Model</label>
            <input className="form-control form-control-sm" type="text" name="model" onChange={formikUpdate.handleChange} value={formikUpdate.values.model}></input>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">One of bests</label>
            <select className="form-control form-control-sm" name="bests" onChange={formikUpdate.handleChange} value={formikUpdate.values.bests}>
              <option value="false">NO</option>
              <option value="true">YES</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Mapping</label>
            <select className="form-control form-control-sm" name="mapping" onChange={formikUpdate.handleChange} value={formikUpdate.values.mapping}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Mapping Sensor Type</label>
            <input className="form-control form-control-sm" type="text" name="mappingSensorType" onChange={formikUpdate.handleChange} value={formikUpdate.values.mappingSensorType} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">High Precision Map</label>
            <select className="form-control form-control-sm" name="highPrecisionMap" onChange={formikUpdate.handleChange} value={formikUpdate.values.highPrecisionMap}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Front Camera</label>
            <select className="form-control form-control-sm" name="frontCamera" onChange={formikUpdate.handleChange} value={formikUpdate.values.frontCamera}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Recharge Resume</label>
            <select className="form-control form-control-sm" name="rechargeResume" onChange={formikUpdate.handleChange} value={formikUpdate.values.rechargeResume}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Auto Dock And Recharge</label>
            <select className="form-control form-control-sm" name="autoDockAndRecharge" onChange={formikUpdate.handleChange} value={formikUpdate.values.autoDockAndRecharge}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Noise Level</label>
            <input className="form-control form-control-sm" type="text" name="noiseLevel" onChange={formikUpdate.handleChange} value={formikUpdate.values.noiseLevel} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Display</label>
            <select className="form-control form-control-sm" name="display" onChange={formikUpdate.handleChange} value={formikUpdate.values.display}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Side Brushes</label>
            <input className="form-control form-control-sm" type="text" name="sideBrushes" onChange={formikUpdate.handleChange} value={formikUpdate.values.sideBrushes} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Voice Prompts</label>
            <select className="form-control form-control-sm" name="voicePrompts" onChange={formikUpdate.handleChange} value={formikUpdate.values.voicePrompts}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Suction Power</label>
            <input className="form-control form-control-sm" type="text" name="cleaningFeatures.suctionPower" onChange={formikUpdate.handleChange} value={formikUpdate.values.cleaningFeatures.suctionPower} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Cleaning Area</label>
            <input className="form-control form-control-sm" type="text" name="cleaningFeatures.cleaningArea" onChange={formikUpdate.handleChange} value={formikUpdate.values.cleaningFeatures.cleaningArea} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Dustbin Capacity</label>
            <input className="form-control form-control-sm" type="text" name="cleaningFeatures.dustbinCapacity" onChange={formikUpdate.handleChange} value={formikUpdate.values.cleaningFeatures.dustbinCapacity} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Disposable Dust Bag Capacity</label>
            <input className="form-control form-control-sm" type="text" name="cleaningFeatures.disposableDustBagCapacity" onChange={formikUpdate.handleChange} value={formikUpdate.values.cleaningFeatures.disposableDustBagCapacity} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Auto Dirt Disposal</label>
            <select className="form-control form-control-sm" name="cleaningFeatures.autoDirtDisposal" onChange={formikUpdate.handleChange} value={formikUpdate.values.cleaningFeatures.autoDirtDisposal}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Barrier Cross Height</label>
            <input className="form-control form-control-sm" type="text" name="cleaningFeatures.barrierCrossHeight" onChange={formikUpdate.handleChange} value={formikUpdate.values.cleaningFeatures.barrierCrossHeight} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Hepa Filter</label>
            <select className="form-control form-control-sm" name="cleaningFeatures.hepaFilter" onChange={formikUpdate.handleChange} value={formikUpdate.values.cleaningFeatures.hepaFilter}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Washable Filter</label>
            <select className="form-control form-control-sm" name="cleaningFeatures.washableFilter" onChange={formikUpdate.handleChange} value={formikUpdate.values.cleaningFeatures.washableFilter}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Wet Mopping</label>
            <select className="form-control form-control-sm" name="moppingFeatures.wetMopping" onChange={formikUpdate.handleChange} value={formikUpdate.values.moppingFeatures.wetMopping}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Electric Water Flow Control</label>
            <select className="form-control form-control-sm" name="moppingFeatures.electricWaterFlowControl" onChange={formikUpdate.handleChange} value={formikUpdate.values.moppingFeatures.electricWaterFlowControl}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Water Tank Capacity</label>
            <input className="form-control form-control-sm" type="text" name="moppingFeatures.waterTankCapacity" onChange={formikUpdate.handleChange} value={formikUpdate.values.moppingFeatures.waterTankCapacity} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Vibrating Mopping Pad</label>
            <select className="form-control form-control-sm" name="moppingFeatures.vibratingMoppingPad" onChange={formikUpdate.handleChange} value={formikUpdate.values.moppingFeatures.vibratingMoppingPad}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>

            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Auto Mop Lifting</label>
            <select className="form-control form-control-sm" name="moppingFeatures.autoMopLifting" onChange={formikUpdate.handleChange} value={formikUpdate.values.moppingFeatures.autoMopLifting}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Auto Water Tank Refilling</label>
            <select className="form-control form-control-sm" name="moppingFeatures.autoWaterTankRefilling" onChange={formikUpdate.handleChange} value={formikUpdate.values.moppingFeatures.autoWaterTankRefilling}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            <label htmlFor="exampleFormControlInput1" className="form-label">Auto Mop Washing</label>
            <select className="form-control form-control-sm" name="moppingFeatures.autoMopWashing" onChange={formikUpdate.handleChange} value={formikUpdate.values.moppingFeatures.autoMopWashing}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Battery Capacity</label>
            <input className="form-control form-control-sm" type="text" name="battery.batteryCapacity" onChange={formikUpdate.handleChange} value={formikUpdate.values.battery.batteryCapacity} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Battery Life</label>
            <input className="form-control form-control-sm" type="text" name="battery.batteryLife" onChange={formikUpdate.handleChange} value={formikUpdate.values.battery.batteryLife} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Charging Time</label>
            <input className="form-control form-control-sm" type="text" name="battery.chargingTime" onChange={formikUpdate.handleChange} value={formikUpdate.values.battery.chargingTime} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Rated Power</label>
            <input className="form-control form-control-sm" type="text" name="battery.ratedPower" onChange={formikUpdate.handleChange} value={formikUpdate.values.battery.ratedPower} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Scheduling</label>
            <select className="form-control form-control-sm" name="control.scheduling" onChange={formikUpdate.handleChange} value={formikUpdate.values.control.scheduling}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Ir Rf RemoteControl</label>
            <select className="form-control form-control-sm" name="control.irRfRemoteControl" onChange={formikUpdate.handleChange} value={formikUpdate.values.control.irRfRemoteControl}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Wifi Smartphone App</label>
            <select className="form-control form-control-sm" name="control.wifiSmartphoneApp" onChange={formikUpdate.handleChange} value={formikUpdate.values.control.wifiSmartphoneApp}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Wifi Frequency Band</label>
            <select className="form-control form-control-sm" name="control.wifiFrequencyBand" onChange={formikUpdate.handleChange} value={formikUpdate.values.control.wifiFrequencyBand}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Amazon Alexa Support</label>
            <select className="form-control form-control-sm" name="control.amazonAlexaSupport" onChange={formikUpdate.handleChange} value={formikUpdate.values.control.amazonAlexaSupport}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Google Assistant Support</label>
            <select className="form-control form-control-sm" name="control.googleAssistantSupport" onChange={formikUpdate.handleChange} value={formikUpdate.values.control.googleAssistantSupport}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Magnetic Virtual Walls</label>
            <select className="form-control form-control-sm" name="control.magneticVirtualWalls" onChange={formikUpdate.handleChange} value={formikUpdate.values.control.magneticVirtualWalls}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Real Time Tracking</label>
            <select className="form-control form-control-sm" name="appFeatures.realTimeTracking" onChange={formikUpdate.handleChange} value={formikUpdate.values.appFeatures.realTimeTracking}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Digital Blocked Areas</label>
            <select className="form-control form-control-sm" name="appFeatures.digitalBlockedAreas" onChange={formikUpdate.handleChange} value={formikUpdate.values.appFeatures.digitalBlockedAreas}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Zoned Cleaning</label>
            <select className="form-control form-control-sm" name="appFeatures.zonedCleaning" onChange={formikUpdate.handleChange} value={formikUpdate.values.appFeatures.zonedCleaning}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Multi Floor Maps</label>
            <select className="form-control form-control-sm" name="appFeatures.multiFloorMaps" onChange={formikUpdate.handleChange} value={formikUpdate.values.appFeatures.multiFloorMaps}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Manual Movement Control</label>
            <select className="form-control form-control-sm" name="appFeatures.manualMovementControl" onChange={formikUpdate.handleChange} value={formikUpdate.values.appFeatures.manualMovementControl}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Selected Room Cleaning</label>
            <select className="form-control form-control-sm" name="appFeatures.selectedRoomCleaning" onChange={formikUpdate.handleChange} value={formikUpdate.values.appFeatures.selectedRoomCleaning}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">No Mop Zones</label>
            <select className="form-control form-control-sm" name="appFeatures.noMopZones" onChange={formikUpdate.handleChange} value={formikUpdate.values.appFeatures.noMopZones}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Carpet Boost</label>
            <select className="form-control form-control-sm" name="sensor.carpetBoost" onChange={formikUpdate.handleChange} value={formikUpdate.values.sensor.carpetBoost}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Cliff Sensor</label>
            <select className="form-control form-control-sm" name="sensor.cliffSensor" onChange={formikUpdate.handleChange} value={formikUpdate.values.sensor.cliffSensor}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Dirt Sensor</label>
            <select className="form-control form-control-sm" name="sensor.dirtSensor" onChange={formikUpdate.handleChange} value={formikUpdate.values.sensor.dirtSensor}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Full Dustbin Sensor</label>
            <select className="form-control form-control-sm" name="sensor.fullDustbinSensor" onChange={formikUpdate.handleChange} value={formikUpdate.values.sensor.fullDustbinSensor}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Weight</label>
            <input className="form-control form-control-sm" type="text" name="otherSpecifications.weight" onChange={formikUpdate.handleChange} value={formikUpdate.values.otherSpecifications.weight} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Width</label>
            <input className="form-control form-control-sm" type="text" name="otherSpecifications.width" onChange={formikUpdate.handleChange} value={formikUpdate.values.otherSpecifications.width} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Height</label>
            <input className="form-control form-control-sm" type="text" name="otherSpecifications.height" onChange={formikUpdate.handleChange} value={formikUpdate.values.otherSpecifications.height} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">In The Box</label>
            <textarea className="form-control form-control-sm" type="text" name="otherSpecifications.inTheBox" onChange={formikUpdate.handleChange} value={formikUpdate.values.otherSpecifications.inTheBox} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Release Date</label>
            <input className="form-control form-control-sm" type="text" name="otherSpecifications.releaseDate" onChange={formikUpdate.handleChange} value={formikUpdate.values.otherSpecifications.releaseDate} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Warranty</label>
            <input className="form-control form-control-sm" type="text" name="otherSpecifications.  warranty" onChange={formikUpdate.handleChange} value={formikUpdate.values.otherSpecifications.warranty} aria-label=".form-control-sm example"/>
            </div>
            </div>
              </>
            ) : null}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
              Update
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRobot;
