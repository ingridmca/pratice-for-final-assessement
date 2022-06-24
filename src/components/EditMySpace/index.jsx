import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { showMessageWithTimeout } from "../../store/appState/actions";
import { selectDetails, selectToken } from "../../store/data/selector";
import { putSpace } from "../../store/data/thunk";
import "./styles.css";

const EditMySpace = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectToken);
  const spaceDetails = useSelector(selectDetails);
  const [title, setTitle] = useState(spaceDetails.title);
  const [description, setDescription] = useState(spaceDetails.description);
  const [backgroundColor, setbackgroundColor] = useState(
    spaceDetails.backgroundColor
  );
  const [color, setColor] = useState(spaceDetails.color);

  const spaceId = props.spaceId;

  function editSpace(event) {
    event.preventDefault();
    const token = userInfo ? userInfo.token : false;
    if (title.length === 0) {
      return dispatch(
        showMessageWithTimeout(
          "fail",
          false,
          "Your Space need to have a Title",
          1500
        )
      );
    } else {
      props.setEditButton(false);
      dispatch(
        putSpace(title, description, backgroundColor, color, token, spaceId)
      );
      dispatch(showMessageWithTimeout("success", false, "Space Updated", 1500));
    }

    console.log((title, description, backgroundColor, color, token, spaceId));
  }

  return (
    <div className="form-popup">
      <form>
        <h1>My Space</h1>
        <div>
          <label className="form-story-label">
            <b>Title:</b>
          </label>
          <input
            type="text"
            name="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
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
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <label className="form-story-label">
            <b>Background Color</b>
          </label>
          <input
            type="color"
            name="Background Color"
            value={backgroundColor}
            onChange={(event) => setbackgroundColor(event.target.value)}
          ></input>
        </div>
        <div>
          <label className="form-story-label">
            <b>Color</b>
          </label>
          <input
            type="color"
            name="Color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
          ></input>
        </div>
        <button type="submit" style={{ marginTop: 20 }} onClick={editSpace}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditMySpace;
