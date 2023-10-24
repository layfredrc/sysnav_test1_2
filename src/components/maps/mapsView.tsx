import { Coordinates, FileInput } from 'models'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import MapsUtils from 'utils/MapsUtils'
import { useEffect, useState } from 'react'
import { LatLngExpression } from 'leaflet'
const { readJSONTrajectories, getCenter, getConfidenceColor } = MapsUtils

interface MapsViewPropsType {
  currentTrajectory: FileInput | null
}

export default function MapsView({
  currentTrajectory,
}: MapsViewPropsType): JSX.Element {
  const [coordinates, setCoordinates] = useState<Coordinates[] | null>(null)
  const [center, setCenter] = useState<LatLngExpression>({
    lat: 49.0914,
    lng: 1.4825,
  })

  useEffect(() => {
    if (currentTrajectory) {
      setCoordinates(readJSONTrajectories(currentTrajectory))
    }
  }, [currentTrajectory])

  useEffect(() => {
    if (coordinates) {
      setCenter(getCenter(coordinates))
    }
  }, [coordinates])
  return (
    <MapContainer
      id='map'
      style={{ width: '100%', height: '100%' }}
      placeholder
      center={center as LatLngExpression}
      zoom={15}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    </MapContainer>
  )
}
