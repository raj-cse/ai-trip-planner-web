export const SelectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A solo traveler in exploration",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travelers in tandem",
    icon: "🥂",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "Fun loving family group",
    icon: "🏡",
    people: "3-5",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekers",
    icon: "🍾",
    people: "5-10",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of cost",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don't worry about cost",
    icon: "💳",
  },
];

export const AI_PROMPT = `
Generate Travel Plan for Location: {location}, for {totalDays} Days, for {traveler} travelers with a {budget} budget.

Return ONLY JSON.

{
  "hotels": [
    { "hotelName": "", "hotelAddress": "", "price": "", "rating": "", "description": "" },
    { "hotelName": "", "hotelAddress": "", "price": "", "rating": "", "description": "" },
    { "hotelName": "", "hotelAddress": "", "price": "", "rating": "", "description": "" },
    { "hotelName": "", "hotelAddress": "", "price": "", "rating": "", "description": "" }
  ],
  "itinerary": [
    {
      "day": 1,
      "places": [
        { "time": "9:00 AM - 12:00 PM", "placeName": "", "placeDetails": "", "ticketPricing": "", "travelTime": "" },
        { "time": "12:00 PM - 2:00 PM", "placeName": "", "placeDetails": "Suggest lunch spot", "ticketPricing": "", "travelTime": "" },
        { "time": "2:00 PM - 4:00 PM", "placeName": "", "placeDetails": "", "ticketPricing": "", "travelTime": "" },
        { "time": "4:00 PM - 6:00 PM", "placeName": "", "placeDetails": "", "ticketPricing": "", "travelTime": "" },
        { "time": "6:00 PM - 8:00 PM", "placeName": "", "placeDetails": "", "ticketPricing": "", "travelTime": "" }
      ]
    }
  ]
}
`;