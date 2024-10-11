import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Card({ album, onClick }) {
  console.log(album);
  // const album = useSelector((state) => state.albums.albums);

  return (
  
<section style={{ display: "flex", flexWrap: "wrap" }}>
  <div className="col-lg-6">
    <div className="card" style={{ width: "248%" }}>
      <img
        className="card-img-top"
        src={album.imageUrl}
        alt="Card image cap"
      />
      <div className="card-body">
        <h3 className="card-title">{album.albumTitle}</h3>
        <h4>{album.artistName}</h4>
        <Link onClick={() => onClick(album.id)} className="btn btn-primary">
          Buy
        </Link>
      </div>
    </div>
  </div>
</section>
  );
}
Card.propTypes = {
  album: PropTypes.exact({
    id: PropTypes.number,
    imageUrl: PropTypes.string,
    artistName: PropTypes.string,
    albumTitle: PropTypes.string,
    genre: PropTypes.string,
    price: PropTypes.number,
    onClick: PropTypes.func
  }),
};
// Card.propTypes = {
//   albumId: PropTypes.number.isRequired, // Expect albumId to be passed
//      // Expect onClick function to be passed
// };
