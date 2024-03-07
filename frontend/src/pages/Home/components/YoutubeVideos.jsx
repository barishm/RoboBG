import { useGetLatestVideosQuery } from "../../../app/services/youtubeApiSlice";
import { useSelector } from "react-redux";
const YoutubeVideos = () => {
  const { data, isLoading } = useGetLatestVideosQuery();
  const lang = useSelector((state) => state.language.lang);

  return (
    <div style={{ marginBottom: "50px" }}>
      <h3
        className="fw-bolder"
        style={{ marginTop: "40px", textAlign: "center" }}
      >
        {lang === "en" ? (
          <>Latest Youtube Videos</>
        ) : (
          <>Наскоро качени видеоклипове</>
        )}
      </h3>
      {isLoading ? (
        <>Loading...</>
      ) : data ? (
        <div className="row">
          {data.items.map((item) => (
            <div className="col-6 mt-4 d-flex justify-content-center">
              <iframe
                width="400"
                height="225"
                style={{ borderRadius: "10px" }}
                src={`https://www.youtube.com/embed/${item.id.videoId}`}
              ></iframe>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default YoutubeVideos;
