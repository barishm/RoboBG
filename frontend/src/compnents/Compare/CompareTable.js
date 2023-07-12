

const CompareTable = ({Robots}) => {
    console.log(Robots);
    if(!Robots || Robots.length === 0){
        return <div>No data available</div>
    }

    return (
        <table className="table compare-table shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <tbody>
            <tr>
                <th scope="row">Model</th>
                {Robots.map((item) => 
                <td>{item.model}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Mapping</th>
                {Robots.map((item) => 
                <td>{item.mapping}</td>
                )}
            </tr>
            <tr>
                <th scope="row">mappingSensorType</th>
                {Robots.map((item) => 
                <td>{item.mappingSensorType}</td>
                )}
            </tr>
            <tr>
                <th scope="row">highPrecisionMap</th>
                {Robots.map((item) => 
                <td>{item.highPrecisionMap}</td>
                )}
            </tr>
            <tr>
                <th scope="row">frontCamera</th>
                {Robots.map((item) => 
                <td>{item.frontCamera}</td>
                )}
            </tr>
            <tr>
                <th scope="row">rechargeResume</th>
                {Robots.map((item) => 
                <td>{item.rechargeResume}</td>
                )}
            </tr>
            <tr>
                <th scope="row">autoDockAndRecharge</th>
                {Robots.map((item) => 
                <td>{item.autoDockAndRecharge}</td>
                )}
            </tr>
            <tr>
                <th scope="row">noiseLevel</th>
                {Robots.map((item) => 
                <td>{item.noiseLevel}</td>
                )}
            </tr>
            <tr>
                <th scope="row">display</th>
                {Robots.map((item) => 
                <td>{item.display}</td>
                )}
            </tr>
            <tr>
                <th scope="row">sideBrushes</th>
                {Robots.map((item) => 
                <td>{item.sideBrushes}</td>
                )}
            </tr>
            <tr>
                <th scope="row">voicePrompts</th>
                {Robots.map((item) => 
                <td>{item.voicePrompts}</td>
                )}
            </tr>
            <tr>
                <th scope="row">suctionPower</th>
                {Robots.map((item) => 
                <td>{item.cleaningFeatures.suctionPower}</td>
                )}
            </tr>
            <tr>
                <th scope="row">cleaningArea</th>
                {Robots.map((item) => 
                <td>{item.cleaningFeatures.cleaningArea}</td>
                )}
            </tr>
            <tr>
                <th scope="row">dustbinCapacity</th>
                {Robots.map((item) => 
                <td>{item.cleaningFeatures.dustbinCapacity}</td>
                )}
            </tr>
            <tr>
                <th scope="row">disposableDustBagCapacity</th>
                {Robots.map((item) => 
                <td>{item.cleaningFeatures.disposableDustBagCapacity}</td>
                )}
            </tr>
            <tr>
                <th scope="row">autoDirtDisposal</th>
                {Robots.map((item) => 
                <td>{item.cleaningFeatures.autoDirtDisposal}</td>
                )}
            </tr>
            <tr>
                <th scope="row">barrierCrossHeight</th>
                {Robots.map((item) => 
                <td>{item.cleaningFeatures.barrierCrossHeight}</td>
                )}
            </tr>
            <tr>
                <th scope="row">hepaFilter</th>
                {Robots.map((item) => 
                <td>{item.cleaningFeatures.hepaFilter}</td>
                )}
            </tr>
            <tr>
                <th scope="row">washableFilter</th>
                {Robots.map((item) => 
                <td>{item.cleaningFeatures.washableFilter}</td>
                )}
            </tr>
            <tr>
                <th scope="row">wetMopping</th>
                {Robots.map((item) => 
                <td>{item.moppingFeatures.wetMopping}</td>
                )}
            </tr>
            <tr>
                <th scope="row">electricWaterFlowControl</th>
                {Robots.map((item) => 
                <td>{item.moppingFeatures.electricWaterFlowControl}</td>
                )}
            </tr>
            <tr>
                <th scope="row">waterTankCapacity</th>
                {Robots.map((item) => 
                <td>{item.moppingFeatures.waterTankCapacity}</td>
                )}
            </tr>
            <tr>
                <th scope="row">vibratingMoppingPad</th>
                {Robots.map((item) => 
                <td>{item.moppingFeatures.vibratingMoppingPad}</td>
                )}
            </tr>
            <tr>
                <th scope="row">autoMopLifting</th>
                {Robots.map((item) => 
                <td>{item.moppingFeatures.autoMopLifting}</td>
                )}
            </tr>
            <tr>
                <th scope="row">autoWaterTankRefilling</th>
                {Robots.map((item) => 
                <td>{item.moppingFeatures.autoWaterTankRefilling}</td>
                )}
            </tr>
            <tr>
                <th scope="row">autoMopWashing</th>
                {Robots.map((item) => 
                <td>{item.moppingFeatures.autoMopWashing}</td>
                )}
            </tr>
            <tr>
                <th scope="row">batteryCapacity</th>
                {Robots.map((item) => 
                <td>{item.battery.batteryCapacity}</td>
                )}
            </tr>
            <tr>
                <th scope="row">batteryLife</th>
                {Robots.map((item) => 
                <td>{item.battery.batteryLife}</td>
                )}
            </tr>
            <tr>
                <th scope="row">chargingTime</th>
                {Robots.map((item) => 
                <td>{item.battery.chargingTime}</td>
                )}
            </tr>
            <tr>
                <th scope="row">ratedPower</th>
                {Robots.map((item) => 
                <td>{item.battery.ratedPower}</td>
                )}
            </tr>
            <tr>
                <th scope="row">scheduling</th>
                {Robots.map((item) => 
                <td>{item.control.scheduling}</td>
                )}
            </tr>
            <tr>
                <th scope="row">Ir_Rf_RemoteControl</th>
                {Robots.map((item) => 
                <td>{item.control.Ir_Rf_RemoteControl}</td>
                )}
            </tr>
            <tr>
                <th scope="row">wifiSmartphoneApp</th>
                {Robots.map((item) => 
                <td>{item.control.wifiSmartphoneApp}</td>
                )}
            </tr>
            <tr>
                <th scope="row">wifiFrequencyBand</th>
                {Robots.map((item) => 
                <td>{item.control.wifiFrequencyBand}</td>
                )}
            </tr>
            <tr>
                <th scope="row">amazonAlexaSupport</th>
                {Robots.map((item) => 
                <td>{item.control.amazonAlexaSupport}</td>
                )}
            </tr>
            <tr>
                <th scope="row">googleAssistantSupport</th>
                {Robots.map((item) => 
                <td>{item.control.googleAssistantSupport}</td>
                )}
            </tr>
            <tr>
                <th scope="row">magneticVirtualWalls</th>
                {Robots.map((item) => 
                <td>{item.control.magneticVirtualWalls}</td>
                )}
            </tr>
            <tr>
                <th scope="row">realTimeTracking</th>
                {Robots.map((item) => 
                <td>{item.appFeatures.realTimeTracking}</td>
                )}
            </tr>
            <tr>
                <th scope="row">digitalBlockedAreas</th>
                {Robots.map((item) => 
                <td>{item.appFeatures.digitalBlockedAreas}</td>
                )}
            </tr>
            <tr>
                <th scope="row">zonedCleaning</th>
                {Robots.map((item) => 
                <td>{item.appFeatures.zonedCleaning}</td>
                )}
            </tr>
            <tr>
                <th scope="row">multiFloorMaps</th>
                {Robots.map((item) => 
                <td>{item.appFeatures.multiFloorMaps}</td>
                )}
            </tr>
            <tr>
                <th scope="row">manualMovementControl</th>
                {Robots.map((item) => 
                <td>{item.appFeatures.manualMovementControl}</td>
                )}
            </tr>
            <tr>
                <th scope="row">selectedRoomCleaning</th>
                {Robots.map((item) => 
                <td>{item.appFeatures.selectedRoomCleaning}</td>
                )}
            </tr>
            <tr>
                <th scope="row">noMopZones</th>
                {Robots.map((item) => 
                <td>{item.appFeatures.noMopZones}</td>
                )}
            </tr>
            <tr>
                <th scope="row">carpetBoost</th>
                {Robots.map((item) => 
                <td>{item.sensor.carpetBoost}</td>
                )}
            </tr>
            <tr>
                <th scope="row">cliffSensor</th>
                {Robots.map((item) => 
                <td>{item.sensor.cliffSensor}</td>
                )}
            </tr>
            <tr>
                <th scope="row">dirtSensor</th>
                {Robots.map((item) => 
                <td>{item.sensor.dirtSensor}</td>
                )}
            </tr>
            <tr>
                <th scope="row">fullDustbinSensor</th>
                {Robots.map((item) => 
                <td>{item.sensor.fullDustbinSensor}</td>
                )}
            </tr>
            <tr>
                <th scope="row">weight</th>
                {Robots.map((item) => 
                <td>{item.otherSpecifications.weight}</td>
                )}
            </tr>
            <tr>
                <th scope="row">width</th>
                {Robots.map((item) => 
                <td>{item.otherSpecifications.width}</td>
                )}
            </tr>
            <tr>
                <th scope="row">height</th>
                {Robots.map((item) => 
                <td>{item.otherSpecifications.height}</td>
                )}
            </tr>
            <tr>
                <th scope="row">inTheBox</th>
                {Robots.map((item) => 
                <td className="itb-col">{item.otherSpecifications.inTheBox}</td>
                )}
            </tr>
            <tr>
                <th scope="row">releaseDate</th>
                {Robots.map((item) => 
                <td>{item.otherSpecifications.releaseDate}</td>
                )}
            </tr>
            <tr>
                <th scope="row">warranty</th>
                {Robots.map((item) => 
                <td>{item.otherSpecifications.warranty}</td>
                )}
            </tr>
            <tr>
                <th scope="row">amazon</th>
                {Robots.map((item) => 
                <td>{item.purchaseLink.amazon}</td>
                )}
            </tr>
            <tr>
                <th scope="row">aliexpress</th>
                {Robots.map((item) => 
                <td>{item.purchaseLink.aliexpress}</td>
                )}
            </tr>
        </tbody>
    </table>
    );

}
export default CompareTable;