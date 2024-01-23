import { useSelector } from "react-redux";
import { deleteRobotById } from "../../app/compareSlice";
import { useDispatch } from 'react-redux'

const CompareTable = () => {
    const { robots } = useSelector((state) => state.compare);
    let table = null;
    const dispatch = useDispatch();

    const deleteHandler = (e) => {
        const id = parseInt(e.target.dataset.id, 10);
        dispatch(deleteRobotById(id));
    };



    const renderTableRow = (attribute, label) => {
        return (
            <tr>
                <th><span className="stickycell">{label}</span></th>
                {robots.map((item) => {
                    let value = attribute.split('.').reduce((o, i) => (o && o[i] !== null) ? o[i] : null, item);
                    return (
                        <td key={item.id}>
                        {value === null ? (
                            <span style={{ color: "grey" }}>N/A</span>
                        ) : value === true ? (
                            <span style={{ color: "green" }}>YES</span>
                        ) : value === false ? (
                            <span style={{ color: "red" }}>NO</span>
                        ) : typeof value === 'string' && value.includes('^') ? (
                            <span dangerouslySetInnerHTML={{ __html: value.replace(/\^(\d+)/, '<sup>$1</sup>') }} />
                        ) : (
                        value
            )}
          </td>
                    );
                })}
            </tr>
        );
    };

    const robotAttributes = [
        { attribute: 'mapping', label: 'Mapping' },
        { attribute: 'mappingSensorType', label: 'Mapping Sensor Type' },
        { attribute: 'highPrecisionMap', label: 'High Precision Map' },
        { attribute: 'frontCamera', label: 'Front Camera' },
        { attribute: 'rechargeResume', label: 'Recharge And Resume' },
        { attribute: 'autoDockAndRecharge', label: 'Auto Dock And Recharge' },
        { attribute: 'noiseLevel', label: 'Noise Level' },
        { attribute: 'display', label: 'Display' },
        { attribute: 'sideBrushes', label: 'Side Brushes' },
        { attribute: 'voicePrompts', label: 'Voice Prompts' },
    ];
    const cleaningFeaturesAttributes = [
        { attribute: 'suctionPower', label: 'Suction Power' },
        { attribute: 'cleaningArea', label: 'Cleaning Area' },
        { attribute: 'dustbinCapacity', label: 'Dustbin Capacity' },
        { attribute: 'disposableDustBagCapacity', label: 'Disposable DustBag Capacity' },
        { attribute: 'autoDirtDisposal', label: 'Auto Dirt Disposal' },
        { attribute: 'barrierCrossHeight', label: 'Barrier Cross Height' },
        { attribute: 'hepaFilter', label: 'Hepa Filter' },
        { attribute: 'washableFilter', label: 'Washable Filter' },
    ];
    const moppingFeaturesAttributes = [
        {attribute: 'wetMopping', label: 'Wet Mopping'},
        {attribute: 'electricWaterFlowControl', label: 'Electric Waterflow Control'},
        {attribute: 'waterTankCapacity', label: 'Water Tank Capacity'},
        {attribute: 'vibratingMoppingPad', label: 'Vibrating Mopping Pad'},
        {attribute: 'autoMopLifting', label: 'Auto Mop Lifting'},
        {attribute: 'autoWaterTankRefilling', label: 'Auto Water Tank Refilling'},
        {attribute: 'autoMopWashing', label: 'Auto Mop Washing'},
    ];
    const batteryAttributes = [
        {attribute: 'batteryCapacity', label: 'Battery Capacity'},
        {attribute: 'batteryLife', label: 'Battery Life'},
        {attribute: 'chargingTime', label: 'Charging Time'},
        {attribute: 'ratedPower', label: 'Rated Power'},
    ];
    const controlAttributes = [
        {attribute: 'scheduling', label: 'Scheduling'},
        {attribute: 'wifiSmartphoneApp', label: 'Wifi Smartphone App'},
        {attribute: 'wifiFrequencyBand', label: 'Wifi Frequency Band'},
        {attribute: 'amazonAlexaSupport', label: 'Amazon Alexa Support'},
        {attribute: 'googleAssistantSupport', label: 'Google Assistant Support'},
        {attribute: 'magneticVirtualWalls', label: 'Magnetic Virtual Walls'},
        {attribute: 'irRfRemoteControl', label: 'Ir Rf Remote Control'},
    ];
    const appFeaturesAttributes = [
        {attribute: 'realTimeTracking', label: 'Real Time Tracking'},
        {attribute: 'digitalBlockedAreas', label: 'Digital Blocked Areas'},
        {attribute: 'zonedCleaning', label: 'Zoned Cleaning'},
        {attribute: 'multiFloorMaps', label: 'Multi Floor Maps'},
        {attribute: 'manualMovementControl', label: 'Manual Movement Control'},
        {attribute: 'selectedRoomCleaning', label: 'Selected Room Cleaning'},
        {attribute: 'noMopZones', label: 'No Mop Zones'},
    ];
    const sensorsAttributes = [
        {attribute: 'carpetBoost', label: 'Carpet Boost'},
        {attribute: 'cliffSensor', label: 'Cliff Sensor'},
        {attribute: 'dirtSensor', label: 'Dirt Sensor'},
        {attribute: 'fullDustbinSensor', label: 'Full Dustbin Sensor'},
    ];
    const otherSpecificationsAttributes = [
        {attribute: 'weight', label: 'Weight'},
        {attribute: 'width', label: 'Width'},
        {attribute: 'height', label: 'Height'},
        {attribute: 'inTheBox', label: 'In The Box'},
        {attribute: 'releaseDate', label: 'Release Date'},
        {attribute: 'warranty', label: 'Warranty'},
    ];


    const backgroundColor = 'rgb(230, 230, 230)';
    if(robots) {
        table = <div className="mb-5"><table className="table table-hover">
            <tbody>
                <tr>
                    <th></th>
                    {robots.map((item) => <td key={item.id} style={{ backgroundColor: backgroundColor }}>{item.model}</td>
                    )}
                </tr>
                <tr>
                    <th></th>
                    {robots.map((item) => <td key={item.id}>
                        <div className="image d-flex">
                            <img className="image-in-table" src={item.image}></img>
                            <div className="image-overlay">
                                <i className="fa-solid fa-xmark" style={{ color: "#ff0505",fontSize:"25px" }} data-id={item.id} onClick={deleteHandler}></i>
                            </div>
                        </div>
                    </td>
                    )}
                </tr>
                    {robotAttributes.map(attr => renderTableRow(attr.attribute, attr.label))}
                    <tr>
                        <th><span className="stickycell">Cleaning Features</span></th>
                        {robots.map((item) => <td key={item.id} style={{ backgroundColor: backgroundColor }}></td>)}
                    </tr>
                    {cleaningFeaturesAttributes.map(attr => renderTableRow(`cleaningFeatures.${attr.attribute}`, attr.label))}
                    <tr>
                        <th><span className="stickycell">Mopping Features</span></th>
                        {robots.map((item) => <td key={item.id} style={{ backgroundColor: backgroundColor }}></td>)}
                    </tr>
                    {moppingFeaturesAttributes.map(attr => renderTableRow(`moppingFeatures.${attr.attribute}`, attr.label))}
                    <tr>
                        <th><span className="stickycell">Battery</span></th>
                        {robots.map((item) => <td key={item.id} style={{ backgroundColor: backgroundColor }}></td>)}
                    </tr>
                    {batteryAttributes.map(attr => renderTableRow(`battery.${attr.attribute}`, attr.label))}
                    <tr>
                        <th><span className="stickycell">Control</span></th>
                        {robots.map((item) => <td key={item.id} style={{ backgroundColor: backgroundColor }}></td>)}
                    </tr>
                    {controlAttributes.map(attr => renderTableRow(`control.${attr.attribute}`, attr.label))}
                    <tr>
                        <th><span className="stickycell">App Features</span></th>
                        {robots.map((item) => <td key={item.id} style={{ backgroundColor: backgroundColor }}></td>)}
                    </tr>
                    {appFeaturesAttributes.map(attr => renderTableRow(`appFeatures.${attr.attribute}`, attr.label))}
                    <tr>
                        <th><span className="stickycell">Sensor</span></th>
                        {robots.map((item) => <td key={item.id} style={{ backgroundColor: backgroundColor }}></td>)}
                    </tr>
                    {sensorsAttributes.map(attr => renderTableRow(`sensor.${attr.attribute}`, attr.label))}
                    <tr>
                        <th><span className="stickycell">Other Specifications</span></th>
                        {robots.map((item) => <td key={item.id} style={{ backgroundColor: backgroundColor }}></td>)}
                    </tr>
                    {otherSpecificationsAttributes.map(attr => renderTableRow(`otherSpecifications.${attr.attribute}`, attr.label))}
                </tbody>
                </table>
            </div>
    }

    return (
        <div className="table-container">
            {table}
        </div>
    );

}
export default CompareTable;