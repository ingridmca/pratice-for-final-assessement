import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { showMessageWithTimeout } from "../../store/appState/actions";
import { selectToken } from "../../store/data/selector";
import { postStory } from "../../store/data/thunk";
import "./styles.css";

const PostStory = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectToken);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const spaceId = props.spaceId;

  function subimitStory(event) {
    event.preventDefault();
    const token = userInfo ? userInfo.token : false;
    if (name.length === 0) {
      return dispatch(
        showMessageWithTimeout(
          "fail",
          false,
          "Your Story need to have a Name",
          1500
        )
      );
    } else {
      props.setPostButton(false);
      dispatch(postStory(name, description, imageUrl, token, spaceId));
      dispatch(showMessageWithTimeout("success", false, "Story Posted", 1500));
      setDescription("");
      setImageUrl("");
      setName("");
    }
  }

  return (
    <div className="form-popup">
      <form>
        <h1>Story</h1>
        <div>
          <label className="form-story-label">
            <b>Name:</b>
          </label>
          <input
            type="text"
            name="Name"
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-story-label">
            <b>Description:</b>
          </label>
          <input
            type="text"
            name="Description"
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-story-label">
            <b>Image:</b>
          </label>
          <input
            type="text"
            name="Image"
            onChange={(event) => setImageUrl(event.target.value)}
            required
          ></input>
          <div>
            {imageUrl && (
              <img src={imageUrl} alt={name} height={200} width={200} />
            )}
          </div>
        </div>
        <button type="submit" style={{ marginTop: 20 }} onClick={subimitStory}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostStory;
