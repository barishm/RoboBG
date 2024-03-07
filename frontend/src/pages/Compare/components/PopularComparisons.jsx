import { useGetAllMostComparesQuery } from "../../../app/services/mostComparesApiSlice";
import Loading from "../../../components/Loading";
import { useSelector } from "react-redux";

const PopularComparisons = () => {
    const lang = useSelector((state) => state.language.lang);
    const { data: allCompares, isLoading: allComparesIsLoading } = useGetAllMostComparesQuery();

    return (
        <div style={{ marginTop: "40px",marginBottom:"50px", marginRight: "auto", marginLeft: "auto", textAlign: "center" }}>
            <h4 className="mb-3">{lang === "en" ? <>Popular Comparisons</> : <>Популярни сравнения</>}</h4>
            {allComparesIsLoading ? <Loading /> :
                <div>
                    {allCompares.map((item) => (
                        <div key={item.id} data-id1={item.robot1?.id} data-id2={item.robot2?.id} data-id3={item.robot3?.id} className="card p-4 mt-3" style={{minHeight:"50px",maxWidth:"450px", marginRight:"auto",marginLeft:"auto",border:"none"}}>
                            <h6 className="card-title">{item.robot1?.model} <span style={{color:"gray"}}>vs.</span> {item.robot2?.model} {item.robot3 && (<span style={{color:"gray"}}>vs.</span>)} {item.robot3?.model}</h6>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default PopularComparisons;