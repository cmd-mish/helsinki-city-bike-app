import '../map.css'
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'

const Map = ({ x, y }) => {
  return (
    <div className='leaflet-container'>
      <MapContainer center={[y, x]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[y, x]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>

  )
}

export default Map