

const CompareTable = (props) => {
    const Robots = props.Robots;
    const setRobots = props.setRobots;
    const setIds = props.setIds;
    let table = null;


    const renderTableRow = (attribute, label) => {
        return (
            <tr>
                <th scope="row">{label}</th>
                {Robots.map((item) => {
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

    const deleteRobot = (e) => {
        const idToDelete = parseInt(e.target.getAttribute('value'), 10);
        const updatedRobots = Robots.filter((robot) => robot.id !== idToDelete);
        setIds(updatedRobots.map((robot) => robot.id)); // Assuming you need to update the Ids state as well
        setRobots(updatedRobots); // Update the Robots state directly
    }

    const backgroundColor = 'rgb(230, 230, 230)';
    if(Robots.length > 0) {
        table = <div className="card mb-5"><table className="table">
            <tbody>
                <tr>
                    <th scope="row" style={{ backgroundColor: backgroundColor }}>Model</th>
                    {Robots.map((item) => <td key={item.id} style={{ backgroundColor: backgroundColor }}>{item.model}</td>
                    )}
                </tr>
                <tr>
                    <th scope="row">Image</th>
                    {Robots.map((item) => <td key={item.id}>
                        <div className="image">
                            <img className="image-in-table" src={item.image}></img>
                            <div className="image-overlay">
                                <i className="fa-solid fa-xmark fa-fade" style={{ color: "#ff0505" }} value={item.id} onClick={deleteRobot}></i>
                            </div>
                        </div>
                    </td>
                    )}
                </tr>
                    {robotAttributes.map(attr => renderTableRow(attr.attribute, attr.label))}
                    <tr>
                        <th scope="row" style={{ backgroundColor: backgroundColor }}>Cleaning Features</th>
                        {Robots.map((item) => <td key={item.id} style={{ backgroundColor: backgroundColor }}></td>)}
                    </tr>
                    {cleaningFeaturesAttributes.map(attr => renderTableRow(`cleaningFeatures.${attr.attribute}`, attr.label))}
                    <tr>
                        <th scope="row" style={{ backgroundColor: backgroundColor }}>Mopping Features</th>
                        {Robots.map((item) => <td key={item.id} style={{ backgroundColor: backgroundColor }}></td>)}
                    </tr>
                    {moppingFeaturesAttributes.map(attr => renderTableRow(`moppingFeatures.${attr.attribute}`, attr.label))}
                    <tr>
                        <th scope="row" style={{ backgroundColor: backgroundColor }}>Battery</th>
                        {Robots.map((item) => <td key={item.id} style={{ backgroundColor: backgroundColor }}></td>)}
                    </tr>
                    {batteryAttributes.map(attr => renderTableRow(`battery.${attr.attribute}`, attr.label))}
                    <tr>
                        <th scope="row" style={{ backgroundColor: backgroundColor }}>Control</th>
                        {Robots.map((item) => <td key={item.id} style={{ backgroundColor: backgroundColor }}></td>)}
                    </tr>
                    {controlAttributes.map(attr => renderTableRow(`control.${attr.attribute}`, attr.label))}
                    <tr>
                        <th scope="row" style={{ backgroundColor: backgroundColor }}>App Features</th>
                        {Robots.map((item) => <td key={item.id} style={{ backgroundColor: backgroundColor }}></td>)}
                    </tr>
                    {appFeaturesAttributes.map(attr => renderTableRow(`appFeatures.${attr.attribute}`, attr.label))}
                    <tr>
                        <th scope="row" style={{ backgroundColor: backgroundColor }}>Sensor</th>
                        {Robots.map((item) => <td key={item.id} style={{ backgroundColor: backgroundColor }}></td>)}
                    </tr>
                    {sensorsAttributes.map(attr => renderTableRow(`sensor.${attr.attribute}`, attr.label))}
                    <tr>
                        <th scope="row" style={{ backgroundColor: backgroundColor }}>Other Specifications</th>
                        {Robots.map((item) => <td key={item.id} style={{ backgroundColor: backgroundColor }}></td>)}
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