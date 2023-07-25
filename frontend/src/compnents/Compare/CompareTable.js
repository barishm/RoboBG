

const CompareTable = ({props}) => {
    let table = null;
    if(props.length > 0) {
        table = <table className="table compare-table shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <tbody>
            <tr>
                <th scope="row">Image</th>
                {props.map((item) => 
                <td key={item.id}> 
                    <img className="image-in-table" src={item.image}></img>
                </td>
                )}
            </tr>
            <tr>
                <th scope="row">Model</th>
                {props.map((item) => 
                <td key={item.id}>{item.model}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Mapping</th>
                {props.map((item) => 
                <td key={item.id}>{item.mapping}</td>
                )}
            </tr>
            <tr>
                <th scope="row">mappingSensorType</th>
                {props.map((item) => 
                <td key={item.id}>{item.mappingSensorType}</td>
                )}
            </tr>
            <tr>
                <th scope="row">highPrecisionMap</th>
                {props.map((item) => 
                <td key={item.id}>{item.highPrecisionMap}</td>
                )}
            </tr>
            <tr>
                <th scope="row">frontCamera</th>
                {props.map((item) => 
                <td key={item.id}>{item.frontCamera}</td>
                )}
            </tr>
            <tr>
                <th scope="row">rechargeResume</th>
                {props.map((item) => 
                <td key={item.id}>{item.rechargeResume}</td>
                )}
            </tr>
            <tr>
                <th scope="row">autoDockAndRecharge</th>
                {props.map((item) => 
                <td key={item.id}>{item.autoDockAndRecharge}</td>
                )}
            </tr>
            <tr>
                <th scope="row">noiseLevel</th>
                {props.map((item) => 
                <td key={item.id}>{item.noiseLevel}</td>
                )}
            </tr>
            <tr>
                <th scope="row">display</th>
                {props.map((item) => 
                <td key={item.id}>{item.display}</td>
                )}
            </tr>
            <tr>
                <th scope="row">sideBrushes</th>
                {props.map((item) => 
                <td key={item.id}>{item.sideBrushes}</td>
                )}
            </tr>
            <tr>
                <th scope="row">voicePrompts</th>
                {props.map((item) => 
                <td key={item.id}>{item.voicePrompts}</td>
                )}
            </tr>
            <tr>
                <th scope="row">suctionPower</th>
                {props.map((item) => 
                <td key={item.id}>{item.cleaningFeatures.suctionPower}</td>
                )}
            </tr>
            <tr>
                <th scope="row">cleaningArea</th>
                {props.map((item) => 
                <td key={item.id}>{item.cleaningFeatures.cleaningArea}</td>
                )}
            </tr>
            <tr>
                <th scope="row">dustbinCapacity</th>
                {props.map((item) => 
                <td key={item.id}>{item.cleaningFeatures.dustbinCapacity}</td>
                )}
            </tr>
            <tr>
                <th scope="row">disposableDustBagCapacity</th>
                {props.map((item) => 
                <td key={item.id}>{item.cleaningFeatures.disposableDustBagCapacity}</td>
                )}
            </tr>
            <tr>
                <th scope="row">autoDirtDisposal</th>
                {props.map((item) => 
                <td key={item.id}>{item.cleaningFeatures.autoDirtDisposal}</td>
                )}
            </tr>
            <tr>
                <th scope="row">barrierCrossHeight</th>
                {props.map((item) => 
                <td key={item.id}>{item.cleaningFeatures.barrierCrossHeight}</td>
                )}
            </tr>
            <tr>
                <th scope="row">hepaFilter</th>
                {props.map((item) => 
                <td key={item.id}>{item.cleaningFeatures.hepaFilter}</td>
                )}
            </tr>
            <tr>
                <th scope="row">washableFilter</th>
                {props.map((item) => 
                <td key={item.id}>{item.cleaningFeatures.washableFilter}</td>
                )}
            </tr>
            <tr>
                <th scope="row">wetMopping</th>
                {props.map((item) => 
                <td key={item.id}>{item.moppingFeatures.wetMopping}</td>
                )}
            </tr>
            <tr>
                <th scope="row">electricWaterFlowControl</th>
                {props.map((item) => 
                <td key={item.id}>{item.moppingFeatures.electricWaterFlowControl}</td>
                )}
            </tr>
            <tr>
                <th scope="row">waterTankCapacity</th>
                {props.map((item) => 
                <td key={item.id}>{item.moppingFeatures.waterTankCapacity}</td>
                )}
            </tr>
            <tr>
                <th scope="row">vibratingMoppingPad</th>
                {props.map((item) => 
                <td key={item.id}>{item.moppingFeatures.vibratingMoppingPad}</td>
                )}
            </tr>
            <tr>
                <th scope="row">autoMopLifting</th>
                {props.map((item) => 
                <td key={item.id}>{item.moppingFeatures.autoMopLifting}</td>
                )}
            </tr>
            <tr>
                <th scope="row">autoWaterTankRefilling</th>
                {props.map((item) => 
                <td key={item.id}>{item.moppingFeatures.autoWaterTankRefilling}</td>
                )}
            </tr>
            <tr>
                <th scope="row">autoMopWashing</th>
                {props.map((item) => 
                <td key={item.id}>{item.moppingFeatures.autoMopWashing}</td>
                )}
            </tr>
            <tr>
                <th scope="row">batteryCapacity</th>
                {props.map((item) => 
                <td key={item.id}>{item.battery.batteryCapacity}</td>
                )}
            </tr>
            <tr>
                <th scope="row">batteryLife</th>
                {props.map((item) => 
                <td key={item.id}>{item.battery.batteryLife}</td>
                )}
            </tr>
            <tr>
                <th scope="row">chargingTime</th>
                {props.map((item) => 
                <td key={item.id}>{item.battery.chargingTime}</td>
                )}
            </tr>
            <tr>
                <th scope="row">ratedPower</th>
                {props.map((item) => 
                <td key={item.id}>{item.battery.ratedPower}</td>
                )}
            </tr>
            <tr>
                <th scope="row">scheduling</th>
                {props.map((item) => 
                <td key={item.id}>{item.control.scheduling}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Ir_Rf_RemoteControl</th>
                {props.map((item) => 
                <td key={item.id}>{item.control.Ir_Rf_RemoteControl}</td>
                )}
            </tr>
            <tr>
                <th scope="row">wifiSmartphoneApp</th>
                {props.map((item) => 
                <td key={item.id}>{item.control.wifiSmartphoneApp}</td>
                )}
            </tr>
            <tr>
                <th scope="row">wifiFrequencyBand</th>
                {props.map((item) => 
                <td key={item.id}>{item.control.wifiFrequencyBand}</td>
                )}
            </tr>
            <tr>
                <th scope="row">amazonAlexaSupport</th>
                {props.map((item) => 
                <td key={item.id}>{item.control.amazonAlexaSupport}</td>
                )}
            </tr>
            <tr>
                <th scope="row">googleAssistantSupport</th>
                {props.map((item) => 
                <td key={item.id}>{item.control.googleAssistantSupport}</td>
                )}
            </tr>
            <tr>
                <th scope="row">magneticVirtualWalls</th>
                {props.map((item) => 
                <td key={item.id}>{item.control.magneticVirtualWalls}</td>
                )}
            </tr>
            <tr>
                <th scope="row">realTimeTracking</th>
                {props.map((item) => 
                <td key={item.id}>{item.appFeatures.realTimeTracking}</td>
                )}
            </tr>
            <tr>
                <th scope="row">digitalBlockedAreas</th>
                {props.map((item) => 
                <td key={item.id}>{item.appFeatures.digitalBlockedAreas}</td>
                )}
            </tr>
            <tr>
                <th scope="row">zonedCleaning</th>
                {props.map((item) => 
                <td key={item.id}>{item.appFeatures.zonedCleaning}</td>
                )}
            </tr>
            <tr>
                <th scope="row">multiFloorMaps</th>
                {props.map((item) => 
                <td key={item.id}>{item.appFeatures.multiFloorMaps}</td>
                )}
            </tr>
            <tr>
                <th scope="row">manualMovementControl</th>
                {props.map((item) => 
                <td key={item.id}>{item.appFeatures.manualMovementControl}</td>
                )}
            </tr>
            <tr>
                <th scope="row">selectedRoomCleaning</th>
                {props.map((item) => 
                <td key={item.id}>{item.appFeatures.selectedRoomCleaning}</td>
                )}
            </tr>
            <tr>
                <th scope="row">noMopZones</th>
                {props.map((item) => 
                <td key={item.id}>{item.appFeatures.noMopZones}</td>
                )}
            </tr>
            <tr>
                <th scope="row">carpetBoost</th>
                {props.map((item) => 
                <td key={item.id}>{item.sensor.carpetBoost}</td>
                )}
            </tr>
            <tr>
                <th scope="row">cliffSensor</th>
                {props.map((item) => 
                <td key={item.id}>{item.sensor.cliffSensor}</td>
                )}
            </tr>
            <tr>
                <th scope="row">dirtSensor</th>
                {props.map((item) => 
                <td key={item.id}>{item.sensor.dirtSensor}</td>
                )}
            </tr>
            <tr>
                <th scope="row">fullDustbinSensor</th>
                {props.map((item) => 
                <td key={item.id}>{item.sensor.fullDustbinSensor}</td>
                )}
            </tr>
            <tr>
                <th scope="row">weight</th>
                {props.map((item) => 
                <td key={item.id}>{item.otherSpecifications.weight}</td>
                )}
            </tr>
            <tr>
                <th scope="row">width</th>
                {props.map((item) => 
                <td key={item.id}>{item.otherSpecifications.width}</td>
                )}
            </tr>
            <tr>
                <th scope="row">height</th>
                {props.map((item) => 
                <td key={item.id}>{item.otherSpecifications.height}</td>
                )}
            </tr>
            <tr>
                <th scope="row">inTheBox</th>
                {props.map((item) => 
                <td key={item.id} className="itb-col">{item.otherSpecifications.inTheBox}</td>
                )}
            </tr>
            <tr>
                <th scope="row">releaseDate</th>
                {props.map((item) => 
                <td key={item.id}>{item.otherSpecifications.releaseDate}</td>
                )}
            </tr>
            <tr>
                <th scope="row">warranty</th>
                {props.map((item) => 
                <td key={item.id}>{item.otherSpecifications.warranty}</td>
                )}
            </tr>
            <tr>
                <th scope="row">amazon</th>
                {props.map((item) => 
                <td key={item.id}>{item.purchaseLink.amazon}</td>
                )}
            </tr>
            <tr>
                <th scope="row">aliexpress</th>
                {props.map((item) => 
                <td key={item.id}>{item.purchaseLink.aliexpress}</td>
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