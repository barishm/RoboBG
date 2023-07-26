import MostCompared from "./MostCompared";
import MostPopular from "./MostPopular";
import Footer from "../Footer";
import YoutubeVideos from "./YoutubeVideos";

const Home = (props) => {
    const setIds = props.setIds;
    const Ids = props.Ids;
    return (
    <div>
        <header className="bg-dark py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="text-center text-white">
                    <h1 className="display-4 fw-bolder">RoboBG</h1>
                    <p className="lead fw-normal text-white-50 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
            </div>
        </header>
        <MostPopular setIds={setIds} Ids={Ids}/>
        <MostCompared setIds={setIds} Ids={Ids}/>
        <YoutubeVideos/>
        <Footer/>
    </div>);
}
export default Home;