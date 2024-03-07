import Bests from "./components/Bests";
import PopularComparisons from "../Compare/components/PopularComparisons";

const Home = (props) => {
  const setIds = props.setIds;
  const Ids = props.Ids;

  return (
    <div>
      <section className="mt-5">
        <div className="container d-flex">
          <div className="col-12 col-md-12 col-lg-9">
            <Bests setIds={setIds} Ids={Ids} />
          </div>
          <div className="col-12 col-md-12 col-lg-3" style={{marginTop:"66px"}}>
             <div className="card d-none d-lg-block">
              <div className="card-body p-4">
                  <form>
                    
                  </form>
              </div>
             </div>
             <div className="d-none d-lg-block">
             <PopularComparisons/>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
