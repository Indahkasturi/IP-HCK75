import PropTypes from "prop-types"


export default function Card({album}) {
  return (
    <section>
<div className="card" style={{ width: "18rem" }}>
  <img className="card-img-top" src={album.imageUrl} alt="Card image cap" />
  <div className="card-body">
    <h5 className="card-title">{album.albumTitle}</h5>
    <h3>{album.artistName}</h3>
    <a href="#" className="btn btn-primary">
      Go somewhere
    </a>
  </div>
</div>
</section>
  )
}
