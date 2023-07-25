import MostCompared from "./MostCompared";
import MostPopular from "./MostPopular";

const Home = (props) => {
    const setIds = props.setIds;
    const Ids = props.Ids;
    return (
    <div>
        <MostPopular setIds={setIds} Ids={Ids}/>
    </div>);
}
export default Home;