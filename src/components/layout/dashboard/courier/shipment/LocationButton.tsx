"use client"
interface locationParams {
  latitude : string;
  longitude : string;
}

const LocationButton = ({latitude, longitude} : locationParams) => {
  return (
    <div>Get Direction</div>
  )
}

export default LocationButton