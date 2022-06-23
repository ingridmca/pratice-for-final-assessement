import "./styles.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HeroBanner from "../../components/HeroBanner";
import { selectDetails } from "../../store/data/selector";
import { fetchStoriesData } from "../../store/data/thunk";

const DetailsPage = () => {
  const dispatch = useDispatch();
  const routeParameters = useParams();
  const detailsStories = useSelector(selectDetails);

  useEffect(() => {
    dispatch(fetchStoriesData(routeParameters));
  }, [dispatch, routeParameters]);

  return (
    <div
      style={{
        backgroundColor: detailsStories
          ? detailsStories.backgroundColor
          : "#F0FFFF",
        color: detailsStories ? detailsStories.color : "#F0FFFF",
      }}
    >
      <HeroBanner>
        <h1 className="storiesHeader">
          {!detailsStories ? "Loading" : detailsStories.title}
        </h1>
        <div className="storiesHeaderDetails">
          {!detailsStories ? "Loading" : detailsStories.description}
        </div>
      </HeroBanner>
      {!detailsStories ? (
        "Loading"
      ) : (
        <div className="stories">
          {[...detailsStories.stories]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((story) => (
              <div key={story.id}>
                <div className="story">{story.name}</div>
                <div className="story">{story.content}</div>
                <div className="story">
                  <img
                    src={story.imageUrl}
                    alt={story.name}
                    height={200}
                    width={300}
                  />
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
