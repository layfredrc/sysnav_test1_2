import { LatLngExpression } from 'leaflet'
import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

export default function MapsContent({
  center,
  zoom,
}: {
  center: LatLngExpression
  zoom: number
}): null {
  const map = useMap()

  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])

  return null // This component doesn't render anything to the DOM itself
}
