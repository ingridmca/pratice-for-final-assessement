import "./styles.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HeroBanner from "../../components/HeroBanner";
import { selectDetails, selectUserProfile } from "../../store/data/selector";
import { deleteStory, fetchStoriesData } from "../../store/data/thunk";
import PostStory from "../../components/PostStory";

const DetailsPage = () => {
  const dispatch = useDispatch();
  const routeParameters = useParams();
  const detailsStories = useSelector(selectDetails);
  const userProfile = useSelector(selectUserProfile);

  const [postButton, setPostButton] = useState(false);

  useEffect(() => {
    dispatch(fetchStoriesData(routeParameters));
  }, [dispatch, routeParameters]);

  const userId = userProfile ? userProfile.id : 0;
  const storiesPageId = detailsStories ? detailsStories.id : -1;

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
      {userId === storiesPageId && (
        <div>
          <button onClick={() => setPostButton(!postButton)}>
            Post a cool story bro
          </button>
          {postButton && (
            <div>
              <PostStory />
            </div>
          )}
        </div>
      )}

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
                {userId === storiesPageId && (
                  <div>
                    <button
                      onClick={() =>
                        dispatch(deleteStory(story.id, routeParameters))
                      }
                    >
                      Delete Story
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
