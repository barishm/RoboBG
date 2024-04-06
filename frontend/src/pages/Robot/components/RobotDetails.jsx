import ReleaseDateDisplay from "../../../components/ReleaseDateDisplay";


const RobotDetails = (props) => {
    const { robot } = props;

    return (
        <div className="mt-4">{robot && <>
            <h5 className="fw-bolder" style={{ marginBottom: "10px" }}>
                {robot.model} Specs & Features
            </h5>
            <table className="table table-bordered" style={{tableLayout:"fixed",width:"100%"}}>
                <thead>
                    <tr> <th colspan="2" style={{backgroundColor:"rgb(240, 240, 240)"}}>🧭 Navigation </th> </tr>
                </thead>
                <tbody>
                    <tr>
                        <th style={{width:"50%"}}>Mapping / Path planning</th>
                        <td style={{width:"50%",color: robot.mapping === true ? 'green' : 'red'}}>{robot.mapping === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Mapping Sensor Type</th>
                        <td>{robot.mappingSensorType}</td>
                    </tr>
                    <tr>
                        <th>High-Precision Map</th>
                        <td style={{color: robot.highPrecisionMap === true ? 'green' : 'red'}}>{robot.highPrecisionMap === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Objects recognition (front camera)</th>
                        <td style={{color: robot.frontCamera === true ? 'green' : 'red'}}>{robot.frontCamera === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Magnetic/Optical Virtual Walls</th>
                        <td style={{color: robot.control.magneticVirtualWalls === true ? 'green' : 'red'}}>{robot.control.magneticVirtualWalls === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Barrier-cross Height</th>
                        <td >{robot.cleaningFeatures.barrierCrossHeight}</td>
                    </tr>
                    <tr>
                        <th>Сleaning Area</th>
                        <td >{robot.cleaningFeatures.cleaningArea} m&sup2;</td>
                    </tr>
                    <tr>
                        <th>Anti-drop / Cliff Sensor</th>
                        <td style={{color: robot.sensor.cliffSensor === true ? 'green' : 'red'}}>{robot.sensor.cliffSensor === true ? "YES" : "NO"}</td>
                    </tr>
                </tbody>
            </table>
            <table className="table table-bordered" style={{tableLayout:"fixed",width:"100%"}}>
                <thead>
                    <tr> <th colspan="2" style={{backgroundColor:"rgb(240, 240, 240)"}}>🧹 Cleaning Features</th> </tr>
                </thead>
                <tbody>
                    <tr>
                        <th style={{width:"50%"}}>Suction Power</th>
                        <td style={{width:"50%"}}>{robot.cleaningFeatures.suctionPower}</td>
                    </tr>
                    <tr>
                        <th>Dustbin Capacity</th>
                        <td>{robot.cleaningFeatures.dustbinCapacity}</td>
                    </tr>
                    <tr>
                        <th>Automatic Dirt Disposal</th>
                        <td style={{color: robot.cleaningFeatures.autoDirtDisposal === true ? 'green' : 'red'}}>{robot.cleaningFeatures.autoDirtDisposal === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Disposable dustbag capacity</th>
                        <td style={{color: robot.cleaningFeatures.disposableDustBagCapacity === true ? 'green' : 'red'}}>{robot.cleaningFeatures.disposableDustBagCapacity === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>HEPA filter</th>
                        <td style={{color: robot.cleaningFeatures.hepaFilter === true ? 'green' : 'red'}}>{robot.cleaningFeatures.hepaFilter === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Washable Filter</th>
                        <td style={{color: robot.cleaningFeatures.washableFilter === true ? 'green' : 'red'}}>{robot.cleaningFeatures.washableFilter === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Side Brushes (one or two)</th>
                        <td>{robot.sideBrushes}</td>
                    </tr>
                    <tr>
                        <th>Carpet Boost </th>
                        <td style={{color: robot.sensor.carpetBoost === true ? 'green' : 'red'}}>{robot.sensor.carpetBoost === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Dirt Sensor</th>
                        <td style={{color: robot.sensor.dirtSensor === true ? 'green' : 'red'}}>{robot.sensor.dirtSensor === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Full Dustbin Sensor</th>
                        <td style={{color: robot.sensor.fullDustbinSensor === true ? 'green' : 'red'}}>{robot.sensor.fullDustbinSensor === true ? "YES" : "NO"}</td>
                    </tr>
                </tbody>
            </table>
            <table className="table table-bordered" style={{tableLayout:"fixed",width:"100%"}}>
                <thead>
                    <tr> <th colspan="2" style={{backgroundColor:"rgb(240, 240, 240)"}}>🧽 Mopping features</th> </tr>
                </thead>
                <tbody>
                    <tr>
                        <th style={{width:"50%"}}>Wet Mopping</th>
                        <td style={{width:"50%",color: robot.moppingFeatures.wetMopping === true ? 'green' : 'red'}}>{robot.moppingFeatures.wetMopping === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Electric water flow control</th>
                        <td style={{width:"50%",color: robot.moppingFeatures.electricWaterFlowControl === true ? 'green' : 'red'}}>{robot.moppingFeatures.electricWaterFlowControl === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Water Tank Capacity</th>
                        <td>{robot.moppingFeatures.waterTankCapacity}</td>
                    </tr>
                    <tr>
                        <th>Vibrating mopping pad</th>
                        <td style={{color: robot.moppingFeatures.vibratingMoppingPad === true ? 'green' : 'red'}}>{robot.moppingFeatures.vibratingMoppingPad === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Automatic mop lifting</th>
                        <td style={{color: robot.moppingFeatures.autoMopLifting === true ? 'green' : 'red'}}>{robot.moppingFeatures.autoMopLifting === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Auto water tank refilling</th>
                        <td style={{color: robot.moppingFeatures.autoWaterTankRefilling === true ? 'green' : 'red'}}>{robot.moppingFeatures.autoWaterTankRefilling === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Auto mop washing</th>
                        <td style={{color: robot.moppingFeatures.autoMopWashing === true ? 'green' : 'red'}}>{robot.moppingFeatures.autoMopWashing === true ? "YES" : "NO"}</td>
                    </tr>
                </tbody>
            </table>
            <table className="table table-bordered" style={{tableLayout:"fixed",width:"100%"}}>
                <thead>
                    <tr> <th colspan="2" style={{backgroundColor:"rgb(240, 240, 240)"}}>🔋 Battery</th> </tr>
                </thead>
                <tbody>
                    <tr>
                        <th style={{width:"50%"}}>Battery Capacity</th>
                        <td>{robot.battery.batteryCapacity}</td>
                    </tr>
                    <tr>
                        <th>Battery life</th>
                        <td>{robot.battery.batteryLife}</td>
                    </tr>
                    <tr>
                        <th>Recharge & Resume</th>
                        <td style={{color: robot.rechargeResume === true ? 'green' : 'red'}}>{robot.rechargeResume === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Charging Time</th>
                        <td>{robot.battery.chargingTime}</td>
                    </tr>
                    <tr>
                        <th>Autocally Docks and Recharges</th>
                        <td style={{color: robot.autoDockAndRecharge === true ? 'green' : 'red'}}>{robot.autoDockAndRecharge === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Rated Power (Watts)</th>
                        <td>{robot.battery.ratedPower}</td>
                    </tr>
                </tbody>
            </table>
            <table className="table table-bordered" style={{tableLayout:"fixed",width:"100%"}}>
                <thead>
                    <tr> <th colspan="2" style={{backgroundColor:"rgb(240, 240, 240)"}}>⚙ Usability & Control</th> </tr>
                </thead>
                <tbody>
                    <tr>
                        <th style={{width:"50%"}}>Wi-Fi / Smartphone App</th>
                        <td style={{width:"50%",color: robot.control.wifiSmartphoneApp === true ? 'green' : 'red'}}>{robot.control.wifiSmartphoneApp === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Scheduling</th>
                        <td style={{color: robot.control.scheduling === true ? 'green' : 'red'}}>{robot.control.scheduling === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>IR/RF Remote Control</th>
                        <td style={{color: robot.control.irRfRemoteControl === true ? 'green' : 'red'}}>{robot.control.irRfRemoteControl === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Wi-Fi Frequency Band</th>
                        <td>{robot.control.wifiFrequencyBand}</td>
                    </tr>
                    <tr>
                        <th>Amazon Alexa Support</th>
                        <td style={{color: robot.control.amazonAlexaSupport === true ? 'green' : 'red'}}>{robot.control.amazonAlexaSupport === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Google Assistant Support</th>
                        <td style={{color: robot.control.googleAssistantSupport === true ? 'green' : 'red'}}>{robot.control.googleAssistantSupport === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Display</th>
                        <td style={{color: robot.display === true ? 'green' : 'red'}}>{robot.display === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Voice Prompts</th>
                        <td style={{color: robot.voicePrompts === true ? 'green' : 'red'}}>{robot.voicePrompts === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Noise Level</th>
                        <td>{robot.noiseLevel}</td>
                    </tr>
                </tbody>
            </table>
            <table className="table table-bordered" style={{tableLayout:"fixed",width:"100%"}}>
                <thead>
                    <tr> <th colspan="2" style={{backgroundColor:"rgb(240, 240, 240)"}}>📱 App Features</th> </tr>
                </thead>
                <tbody>
                    <tr>
                        <th style={{width:"50%"}}>Real-time tracking</th>
                        <td style={{width:"50%",color: robot.appFeatures.realTimeTracking === true ? 'green' : 'red'}}>{robot.appFeatures.realTimeTracking === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Digital Blocked Areas</th>
                        <td style={{width:"50%",color: robot.appFeatures.digitalBlockedAreas === true ? 'green' : 'red'}}>{robot.appFeatures.digitalBlockedAreas === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Zoned cleaning</th>
                        <td style={{color: robot.appFeatures.zonedCleaning === true ? 'green' : 'red'}}>{robot.appFeatures.zonedCleaning === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Multi-floor maps</th>
                        <td style={{color: robot.appFeatures.multiFloorMaps === true ? 'green' : 'red'}}>{robot.appFeatures.multiFloorMaps === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Manual movement control</th>
                        <td style={{color: robot.appFeatures.manualMovementControl === true ? 'green' : 'red'}}>{robot.appFeatures.manualMovementControl === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>Selected Room Cleaning</th>
                        <td style={{color: robot.appFeatures.selectedRoomCleaning === true ? 'green' : 'red'}}>{robot.appFeatures.selectedRoomCleaning === true ? "YES" : "NO"}</td>
                    </tr>
                    <tr>
                        <th>No-mop zones</th>
                        <td style={{color: robot.appFeatures.noMopZones === true ? 'green' : 'red'}}>{robot.appFeatures.noMopZones === true ? "YES" : "NO"}</td>
                    </tr>
                </tbody>
            </table>
            <table className="table table-bordered" style={{tableLayout:"fixed",width:"100%"}}>
                <thead>
                    <tr> <th colspan="2" style={{backgroundColor:"rgb(240, 240, 240)"}}>Other Specifications</th> </tr>
                </thead>
                <tbody>
                    <tr>
                        <th style={{width:"50%"}}>Weight</th>
                        <td>{robot.otherSpecifications.weight}</td>
                    </tr>
                    <tr>
                        <th>Width</th>
                        <td>{robot.otherSpecifications.width}</td>
                    </tr>
                    <tr>
                        <th>Height</th>
                        <td>{robot.otherSpecifications.height}</td>
                    </tr>
                    <tr>
                        <th>In the box</th>
                        <td>{robot.otherSpecifications.inTheBox}</td>
                    </tr>
                    <tr>
                        <th>Release Date</th>
                        <td><ReleaseDateDisplay releaseDate={robot.otherSpecifications.releaseDate}/></td>
                    </tr>
                </tbody>
            </table>
        </>}
        </div>
    );
}


export default RobotDetails;