import "./styles.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpaceData } from "../../store/data/thunk";
import { selectSpaces } from "../../store/data/selector";
import HeroBanner from "../../components/HeroBanner";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const spaces = useSelector(selectSpaces);

  useEffect(() => {
    dispatch(fetchSpaceData());
  }, [dispatch]);

  //Checking if I have the data!
  if (spaces.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <HeroBanner>
        <h1 className="spaceHeader">Spaces</h1>
      </HeroBanner>
      (
      <div className="spacesGroup">
        {spaces.map((space) => (
          <div
            key={space.id}
            style={{
              backgroundColor: space.backgroundColor,
              color: space.color,
              marginBottom: "15px",
            }}
          >
            <div className="spaces">{space.title}</div>
            <div className="spaces">{space.description}</div>
            <div>
              <Link to={`/detail/${space.id}`}>
                <button className="button">Visit space</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      )
    </div>
  );
};
export default HomePage;
