import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Card({ album, onClick }) {
  console.log(album);

  return (
    <section>
      <div className="container mt-5">
      <div className="col-md-3 mb-4 col-sm-6 mb-4">
        <div className="card" style={{ width: "100%" }}>
          <img
            className="card-img-top "
            src={album.imageUrl}
            alt="Card image cap"
          />
          <div className="card-body">
            <h3 className="card-title">{album.albumTitle}</h3>
            <h4>{album.artistName}</h4>
            <h5>{album.price}</h5>
            <Link onClick={() => onClick(album.id)}>buy</Link>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
Card.prototype = {
  album: PropTypes.exact({
    id: PropTypes.number,
    imageUrl: PropTypes.string,
    albumTitle: PropTypes.string,
    artistName: PropTypes.string,
    price: PropTypes.number
  }),
};
