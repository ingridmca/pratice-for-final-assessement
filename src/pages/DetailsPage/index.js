import "./styles.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HeroBanner from "../../components/HeroBanner";
import { selectDetails, selectUserProfile } from "../../store/data/selector";
import { deleteStory, fetchStoriesData } from "../../store/data/thunk";
import PostStory from "../../components/PostStory";
import EditMySpace from "../../components/EditMySpace";

const DetailsPage = () => {
  const dispatch = useDispatch();
  const routeParameters = useParams();
  const detailsStories = useSelector(selectDetails);
  const userProfile = useSelector(selectUserProfile);

  const [postButton, setPostButton] = useState(false);
  const [editButton, setEditButton] = useState(false);

  useEffect(() => {
    dispatch(fetchStoriesData(routeParameters));
  }, [dispatch, routeParameters]);

  const userId = userProfile ? userProfile.id : 0;
  const storiesPageId = detailsStories ? detailsStories.id : -1;

  //Checking if all data is fetched
  if (!detailsStories) return <div>Loading...</div>;

  //Sort feature!
  const sortedStories = [...detailsStories.stories].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div
      style={{
        backgroundColor: detailsStories.backgroundColor,
        color: detailsStories.color,
      }}
    >
      <HeroBanner>
        <h1 className="storiesHeader">{detailsStories.title}</h1>
        <div className="storiesHeaderDetails">{detailsStories.description}</div>
      </HeroBanner>
      {userId === storiesPageId && (
        <div>
          <button onClick={() => setPostButton(!postButton)}>
            Post a cool story bro
          </button>
          <button onClick={() => setEditButton(!editButton)}>
            Edit My Space
          </button>
          {postButton && (
            <div>
              <PostStory
                spaceId={storiesPageId}
                setPostButton={setPostButton}
              />
            </div>
          )}
          {editButton && (
            <div>
              <EditMySpace
                spaceId={storiesPageId}
                setEditButton={setEditButton}
              />
            </div>
          )}
        </div>
      )}

      {
        <div className="stories">
          {sortedStories.map((story) => (
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
      }
    </div>
  );
};

export default DetailsPage;
