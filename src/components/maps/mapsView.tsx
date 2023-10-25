import { useEffect, useState, useMemo } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { LatLngExpression, Icon, LatLng } from 'leaflet'
import ReactDOMServer from 'react-dom/server'
import { Coordinates, FileInput } from 'models'
import MapsUtils from 'utils/MapsUtils'
import { FlagIcon } from 'assets/icons'
import { PinIcon } from 'assets/icons'
import MapsContent from 'components/mapsContent/mapsContent'

const {
  readJSONTrajectories,
  getStartMarkerCoords,
  getEndMarkerCoords,
  getZoomLevel,
  getCenter,
  buildPolylines,
} = MapsUtils

interface MapsViewPropsType {
  currentTrajectory: FileInput | null
}

export default function MapsView({
  currentTrajectory,
}: MapsViewPropsType): JSX.Element {
  const [coordinates, setCoordinates] = useState<Coordinates[] | null>(null)
  const defaultCenter: LatLngExpression = {
    lat: 49.0914,
    lng: 1.4825,
  }
  const [center, setCenter] = useState<LatLngExpression>(defaultCenter)
  const [zoom, setZoom] = useState<number>(15)
  const [polylines, setPolylines] = useState<
    { color: string; positions: LatLngExpression[] }[]
  >([])

  const startIcon = useMemo(
    () =>
      new Icon({
        iconUrl:
          'data:image/svg+xml,' +
          encodeURIComponent(ReactDOMServer.renderToStaticMarkup(<PinIcon />)),
        iconSize: [20, 20],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20],
      }),
    [],
  )

  const endIcon = useMemo(
    () =>
      new Icon({
        iconUrl:
          'data:image/svg+xml,' +
          encodeURIComponent(ReactDOMServer.renderToStaticMarkup(<FlagIcon />)),
        iconSize: [20, 20],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20],
      }),
    [],
  )

  useEffect(() => {
    console.log('currentTrajectory', currentTrajectory)
    if (currentTrajectory) {
      const coords = readJSONTrajectories(currentTrajectory)
      console.log('Parsed coordinates:', coords)
      setCoordinates(coords)
    } else {
      setCoordinates(null)
      setCenter(defaultCenter)
    }
  }, [currentTrajectory])

  useEffect(() => {
    if (coordinates) {
      setCenter(getCenter(coordinates))
      const start = getStartMarkerCoords(coordinates)
      const end = getEndMarkerCoords(coordinates)
      setPolylines(buildPolylines(coordinates))
      if (start && end) {
        const startPoint = new LatLng(start.lat, start.lng)
        const endPoint = new LatLng(end.lat, end.lng)
        const distance = startPoint.distanceTo(endPoint)
        const newZoom = getZoomLevel(distance)
        console.log('Distance:', distance, 'New Zoom:', newZoom)
        setZoom(newZoom)
      }
      console.log('Mes polylines', polylines)
    } else {
      setPolylines([])
    }
  }, [coordinates])

  useEffect(() => {
    console.log('Mes polylines', polylines)
  }, [polylines])

  return (
    <MapContainer
      id='map'
      style={{ width: '100%', height: '100%', zIndex: 2 }}
      placeholder
      center={center as LatLngExpression}
      zoom={zoom}
      scrollWheelZoom={false}
      key={polylines.length}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {coordinates && polylines.length > 0 ? (
        <>
          <Marker
            riseOnHover
            position={{
              lat: getStartMarkerCoords(coordinates).lat,
              lng: getStartMarkerCoords(coordinates).lng,
            }}
            icon={startIcon}
          >
            <Popup>Starting Point</Popup>
          </Marker>
          <Polyline
            positions={[
              [49.0914, 1.4825],
              [49.0924, 1.4835],
            ]}
            color='#ff0000'
            weight={5}
          />
          {polylines.map((poly, index) => (
            <Polyline
              key={index}
              positions={poly.positions}
              color={poly.color}
              weight={5}
            />
          ))}
          <Marker
            position={{
              lat: getEndMarkerCoords(coordinates).lat,
              lng: getEndMarkerCoords(coordinates).lng,
            }}
            icon={endIcon}
          >
            <Popup>Ending Point</Popup>
          </Marker>
        </>
      ) : null}
      <MapsContent center={center} zoom={zoom} />
    </MapContainer>
  )
}
