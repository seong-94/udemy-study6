export async function fetchAvailablePlaces(params) {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }
  return resData.place;
}
export async function fetchUpdateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "put",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to update places");
  }

  return response.message;
}
