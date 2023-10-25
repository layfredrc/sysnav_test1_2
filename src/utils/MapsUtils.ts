import { FileInput } from 'models'
import { Coordinates } from 'models'

const readJSONTrajectories = (file: FileInput): Coordinates[] | null => {
  try {
    const content = JSON.parse(file.content)
    return content
  } catch (error) {
    return []
  }
}

const getCenter = (coordinates: Coordinates[]) => {
  const totalPoints = coordinates.length
  const totalLat = coordinates.reduce((acc, curr) => acc + curr.lat, 0)
  const totalLatLng = coordinates.reduce((acc, curr) => acc + curr.lng, 0)

  return {
    lat: totalLat / totalPoints,
    lng: totalLatLng / totalPoints,
  }
}

const getConfidenceColor = (confidence: number) => {
  const colorDanger = '#e70d5d'
  const colorGood = '#38d98a'
  const colorMedium = '#fdad41'
  const colorBad = '#ff5c5c'

  if (confidence > 80) {
    return colorGood
  } else if (confidence >= 60 && confidence <= 80) {
    return colorMedium
  } else if (confidence < 60 && confidence >= 40) {
    return colorBad
  }
  return colorDanger
}

const getStartMarkerCoords = (coordinates: Coordinates[]): Coordinates => {
  return coordinates[0]
}

const getEndMarkerCoords = (coordinates: Coordinates[]): Coordinates => {
  return coordinates[coordinates.length - 1]
}
type LatLngExpression = [number, number]

const buildPolylines = (
  coordinates: Coordinates[],
): { color: string; positions: LatLngExpression[] }[] => {
  let pathSegment: LatLngExpression[] = []
  const polylines = []

  for (let i = 0; i < coordinates.length; i++) {
    // Convert the coordinate to the format expected by Polyline
    const latLng: LatLngExpression = [coordinates[i].lat, coordinates[i].lng]
    pathSegment.push(latLng)

    if (
      i === coordinates.length - 1 ||
      getConfidenceColor(coordinates[i].confidence) !==
        getConfidenceColor(coordinates[i + 1].confidence)
    ) {
      polylines.push({
        positions: [...pathSegment], // copy the pathSegment to ensure no references are retained
        color: getConfidenceColor(coordinates[i].confidence),
      })
      pathSegment = []
    }
  }

  return polylines
}

const getZoomLevel = (distance: number): number => {
  if (distance < 1000) return 14 // Less than 1km, zoom in close
  if (distance < 5000) return 13 // Between 1km and 5km
  if (distance < 10000) return 12 // Between 5km and 10km
  // Add more thresholds as needed

  return 10 // Default for larger distances
}

const MapsUtils = {
  readJSONTrajectories,
  getCenter,
  getConfidenceColor,
  getStartMarkerCoords,
  getEndMarkerCoords,
  buildPolylines,
  getZoomLevel,
}

export default MapsUtils
