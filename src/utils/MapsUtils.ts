import { FileInput } from 'models'
import { Coordinates } from 'models'

const readJSONTrajectories = (file: FileInput): Coordinates[] | null => {
  try {
    const content = JSON.parse(file.content)
    return content
  } catch (error) {
    console.log(error)
    return null
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
  const defaultColor = '#2967C4'
  const greenColor = '#00FF00'
  const redColor = '#FF0000'

  if (confidence > 80) {
    return greenColor
  } else if (confidence < 40) {
    return redColor
  } else {
    return defaultColor
  }
}

const MapsUtils = {
  readJSONTrajectories,
  getCenter,
  getConfidenceColor,
}

export default MapsUtils
