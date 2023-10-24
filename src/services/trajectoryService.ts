// trajectoryService.ts

const BASE_URL = 'https://api.yourwebsite.com' // Replace with your API base URL

export const fetchTrajectoryData = async (trajectoryJson: any) => {
  try {
    const response = await fetch(`${BASE_URL}/trajectory-endpoint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trajectoryJson),
    })

    if (!response.ok) {
      throw new Error('API call failed')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch trajectory data:', error)
    throw error
  }
}
