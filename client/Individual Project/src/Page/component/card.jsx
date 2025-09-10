import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Card({ album, onClick }) {
  // Show image fully in a square, with name and Buy button below
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 340,
        margin: '0 auto',
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 12px 0 rgba(94, 123, 129, 0.10)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minHeight: 380,
      }}
    >
      <div style={{ width: '100%', aspectRatio: '1 / 1', background: '#f4f4f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={album.imageUrl}
          alt="Card image cap"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            background: '#f4f4f4',
            maxHeight: '100%',
            maxWidth: '100%',
            display: 'block',
          }}
        />
      </div>
      <div style={{ padding: 18, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: 20, color: '#5E7B81', margin: 0, marginBottom: 8 }}>{album.albumTitle}</h3>
          <h4 style={{ fontSize: 16, color: '#51696E', margin: 0, marginBottom: 12 }}>{album.artistName}</h4>
        </div>
        <Link
          onClick={() => onClick(album.id)}
          className="btn btn-primary"
          style={{
            background: '#7DABB7',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 0',
            fontWeight: 600,
            fontSize: 15,
            width: '100%',
            marginTop: 8,
            textAlign: 'center',
            transition: 'background 0.2s',
            display: 'inline-block',
          }}
          onMouseOver={e => e.currentTarget.style.background = '#51696E'}
          onMouseOut={e => e.currentTarget.style.background = '#7DABB7'}
        >
          Buy
        </Link>
      </div>
    </div>
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
