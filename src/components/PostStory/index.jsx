import { useState } from "react";
import { useDispatch } from "react-redux";
import "./styles.css";

const PostStory = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function subimitStory(event) {
    event.preventDefault();

    // dispatch(thunkW/post request (name, description, imageUrl))
    setDescription("");
    setImageUrl("");
    setName("");
  }

  console.log(imageUrl);

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
        <button type="submit" style={{ marginTop: 20 }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostStory;
