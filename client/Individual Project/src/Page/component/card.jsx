import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Card({ album, onClick }) {
  // console.log(album);

  return (
    <section>
    <div className="col-12 mb-4"> 
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top"
          src={album.imageUrl}
          alt="Card image cap"
        />
        <div className="card-body">
          <h3 className="card-title">{album.albumTitle}</h3>
          <h4>{album.artistName}</h4>
          
          <Link onClick={() => onClick(album.id)} className="btn btn-primary">Buy</Link>
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
