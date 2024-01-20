import Bests from "../components/Home/Bests";



const Home = (props) => {
    const setIds = props.setIds;
    const Ids = props.Ids;

    return (
    <div>
        <Bests setIds={setIds} Ids={Ids}/>
    </div>);
}
export default Home;