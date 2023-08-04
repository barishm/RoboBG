

const CompareTable = (props) => {
    const Robots = props.Robots;
    const setRobots = props.setRobots;
    const setIds = props.setIds;
    const Ids = props.Ids;
    let table = null;
    const deleteRobot = (e) => {
        const idToDelete = parseInt(e.target.getAttribute('value'), 10);
        const updatedRobots = Robots.filter((robot) => robot.id !== idToDelete);
        setIds(updatedRobots.map((robot) => robot.id)); // Assuming you need to update the Ids state as well
        setRobots(updatedRobots); // Update the Robots state directly
    }
    if(Robots.length > 0) {
        table = <table className="table compare-table shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <tbody>
            <tr>
                <th scope="row">Image</th>
                {Robots.map((item) => 
                <td key={item.id}> 
                    <div className="image">
                    <img className="image-in-table" src={item.image}></img>
                    <div className="image-overlay">
                        <i className="fa-solid fa-xmark fa-fade" style={{color: "#ff0505"}} value={item.id} onClick={deleteRobot}></i>
                    </div>
                    </div>
                </td>
                )}
            </tr>
            <tr>
                <th scope="row">Model</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.model}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Mapping</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.mapping !== null ? item.mapping : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">mapping Sensor Type</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.mappingSensorType !== null ? item.mappingSensorType : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">High Precision Map</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.highPrecisionMap !== null ? item.highPrecisionMap : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Front Camera</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.frontCamera !== null ? item.frontCamera : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Recharge And Resume</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.rechargeResume !== null ? item.rechargeResume : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Auto Dock And Recharge</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.autoDockAndRecharge !== null ? item.autoDockAndRecharge : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Noise Level</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.noiseLevel !== null ? item.noiseLevel : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Display</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.display !== null ? item.display : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Side Brushes</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.sideBrushes !== null ? item.sideBrushes : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Voice Prompts</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.voicePrompts !== null ? item.voicePrompts : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Suction Power</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.cleaningFeatures.suctionPower !== null ? item.cleaningFeatures.suctionPower : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Cleaning Area</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.cleaningFeatures.cleaningArea !== null ? item.cleaningFeatures.cleaningArea : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Dustbin Capacity</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.cleaningFeatures.dustbinCapacity !== null ? item.cleaningFeatures.dustbinCapacity : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Disposable DustBag Capacity</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.cleaningFeatures.disposableDustBagCapacity !== null ? item.cleaningFeatures.disposableDustBagCapacity : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Auto Dirt Disposal</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.cleaningFeatures.autoDirtDisposal !== null ? item.cleaningFeatures.autoDirtDisposal : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Barrier Cross Height</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.cleaningFeatures.barrierCrossHeight !== null ? item.cleaningFeatures.barrierCrossHeight : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Hepa Filter</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.cleaningFeatures.hepaFilter !== null ? item.cleaningFeatures.hepaFilter : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Washable Filter</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.cleaningFeatures.washableFilter !== null ? item.cleaningFeatures.washableFilter : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Wet Mopping</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.moppingFeatures.wetMopping !== null ? item.moppingFeatures.wetMopping : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Electric Waterflow Control</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.moppingFeatures.electricWaterFlowControl !== null ? item.moppingFeatures.electricWaterFlowControl : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Water Tank Capacity</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.moppingFeatures.waterTankCapacity !== null ? item.moppingFeatures.waterTankCapacity : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Vibrating Mopping Pad</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.moppingFeatures.vibratingMoppingPad !== null ? item.moppingFeatures.vibratingMoppingPad : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Auto Mop Lifting</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.moppingFeatures.autoMopLifting !== null ? item.moppingFeatures.autoMopLifting : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Auto Water Tank Refilling</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.moppingFeatures.autoWaterTankRefilling !== null ? item.moppingFeatures.autoWaterTankRefilling : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Auto Mop Washing</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.moppingFeatures.autoMopWashing !== null ? item.moppingFeatures.autoMopWashing : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Battery Capacity</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.battery.batteryCapacity !== null ? item.battery.batteryCapacity : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Battery Life</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.battery.batteryLife !== null ? item.battery.batteryLife : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Charging Time</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.battery.chargingTime !== null ? item.battery.chargingTime : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Rated Power</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.battery.ratedPower !== null ? item.battery.ratedPower : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Scheduling</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.control.scheduling !== null ? item.control.scheduling : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Ir Rf RemoteControl</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.control.Ir_Rf_RemoteControl !== null ? item.control.Ir_Rf_RemoteControl : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Wifi Smartphone App</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.control.wifiSmartphoneApp !== null ? item.control.wifiSmartphoneApp : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Wifi Frequency Band</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.control.wifiFrequencyBand !== null ? item.control.wifiFrequencyBand : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Amazon Alexa Support</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.control.amazonAlexaSupport !== null ? item.control.amazonAlexaSupport : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Google Assistant Support</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.control.googleAssistantSupport !== null ? item.control.googleAssistantSupport : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Magnetic Virtual Walls</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.control.magneticVirtualWalls !== null ? item.control.magneticVirtualWalls : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Real Time Tracking</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.appFeatures.realTimeTracking !== null ? item.appFeatures.realTimeTracking : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Digital Blocked Areas</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.appFeatures.digitalBlockedAreas !== null ? item.appFeatures.digitalBlockedAreas : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Zoned Cleaning</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.appFeatures.zonedCleaning !== null ? item.appFeatures.zonedCleaning : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Multi Floor Maps</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.appFeatures.multiFloorMaps !== null ? item.appFeatures.multiFloorMaps : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Manual Movement Control</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.appFeatures.manualMovementControl !== null ? item.appFeatures.manualMovementControl : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Selected Room Cleaning</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.appFeatures.selectedRoomCleaning !== null ? item.appFeatures.selectedRoomCleaning : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">No Mop Zones</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.appFeatures.noMopZones !== null ? item.appFeatures.noMopZones : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Carpet Boost</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.sensor.carpetBoost !== null ? item.sensor.carpetBoost : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Cliff Sensor</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.sensor.cliffSensor !== null ? item.sensor.cliffSensor : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Dirt Sensor</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.sensor.dirtSensor !== null ? item.sensor.dirtSensor : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Full Dustbin Sensor</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.sensor.fullDustbinSensor !== null ? item.sensor.fullDustbinSensor : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Weight</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.otherSpecifications.weight !== null ? item.otherSpecifications.weight : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Width</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.otherSpecifications.width !== null ? item.otherSpecifications.width : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Height</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.otherSpecifications.height !== null ? item.otherSpecifications.height : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">In The Box</th>
                {Robots.map((item) => 
                <td key={item.id} className="itb-col">{item.otherSpecifications.inTheBox !== null ? item.otherSpecifications.inTheBox : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Release Date</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.otherSpecifications.releaseDate !== null ? item.otherSpecifications.releaseDate : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Warranty</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.otherSpecifications.warranty !== null ? item.otherSpecifications.warranty : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Amazon</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.purchaseLink.amazon !== null ? item.purchaseLink.amazon : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Aliexpress</th>
                {Robots.map((item) => 
                <td key={item.id}>{item.purchaseLink.aliexpress !== null ? item.purchaseLink.aliexpress : <span style={{color:"grey"}}>N/A</span>}</td>
                )}
            </tr>
        </tbody>
    </table>
    }

    return (
        <div className="table-container">
            {table}
        </div>
    );

}
export default CompareTable;