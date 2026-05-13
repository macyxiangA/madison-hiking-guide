import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import TrailList from './components/TrailList'
import TrailDetail from './components/TrailDetail'
import About from './components/About'
import Account from './components/Account'
import LikedTrailList from './components/LikedTrailList'
import LikedTrailDetail from './components/LikedTrailDetail'
import MyTrails from './components/MyTrails'
import Footer from './components/Footer'
import { ensureUserInfo } from './utils/userInfo'
import picnicPointImg from './assets/picnicpoint.jpg'
import lakeshoreImg from './assets/lakeshoretrail.jpg'
import arboretumImg from './assets/arboretum.jpg'
import capitalSpringsImg from './assets/capitalsprings.jpg'
import olbrichImg from './assets/olbrich.jpg'
import olinParkImg from './assets/olinpark.jpg'
import owenParkImg from './assets/owenpark.webp'
import pheasantBranchImg from './assets/pheasantbranch.jpg'

const trailsData = [
  {
    "id": 1,
    "name": "Picnic Point Trail",
    "location": "University Bay Drive, Madison, WI",
    "difficulty": "Easy",
    "distance": "2 mi",
    "description": "Scenic stroll along Lake Mendota popular among UW students.",
    "image": picnicPointImg,
    "features": ["Lake Views", "Parking Available", "Dog Friendly"],
    "parkingNotes": "Park at UW Lot 130, 2003 University Bay Drive. UW-Madison visitor parking rules apply, and Preserve parking lots are open 4 AM-10 PM.",
    "restroomNotes": "A dedicated public restroom is not listed on the official Lakeshore Nature Preserve pages for Picnic Point. Use nearby campus facilities before arriving, and check entrance kiosks for current amenities.",
    "mapUrl": "https://lakeshorepreserve.wisc.edu/visit/maps-of-the-preserve/",
    "directionsUrl": "https://www.google.com/maps/search/?api=1&query=2003%20University%20Bay%20Drive%2C%20Madison%2C%20WI",
    "sourceUrl": "https://lakeshorepreserve.wisc.edu/visit/getting-here-and-parking/"
  },
  {
    "id": 2,
    "name": "Lakeshore Trail",
    "location": "University Bay Drive, Madison, WI",
    "difficulty": "Medium",
    "distance": "3 mi",
    "description": "Features trails around Lake Mendota through forests, prairies, and gardens.",
    "image": lakeshoreImg,
    "features": ["Lake Views", "Parking Available", "Dog Friendly"],
    "parkingNotes": "For the west end, use Preserve parking such as Lot 130 at Picnic Point, Frautschi Point, or Raymer's Cove. For the campus/east end, use UW visitor parking and check current campus parking rules.",
    "restroomNotes": "The official Preserve pages do not list dedicated public restrooms along the Lakeshore Path. Plan to use campus facilities near your start point before beginning the walk.",
    "mapUrl": "https://lakeshorepreserve.wisc.edu/visit/maps-of-the-preserve/",
    "directionsUrl": "https://www.google.com/maps/search/?api=1&query=Howard%20Temin%20Lakeshore%20Path%2C%20Madison%2C%20WI",
    "sourceUrl": "https://lakeshorepreserve.wisc.edu/visit/getting-here-and-parking/"
  },
  {
    "id": 3,
    "name": "UW-Madison Arboretum",
    "location": "Arboretum Drive, Madison, WI",
    "difficulty": "Hard",
    "distance": "3 mi",
    "description": "Long, winding trails through the forests and marshes around Lake Wingra.",
    "image": arboretumImg,
    "features": ["Lake Views", "Parking Available", "Bike Friendly"],
    "parkingNotes": "Main parking is at the Visitor Center area, about 1 mile from the Seminole Highway entrance. Additional smaller parking areas are located along Arboretum/McCaffrey Drive, with other lots serving Grady Tract, Spring Trail, and Wingra Oak Savanna.",
    "restroomNotes": "Visitor Center restrooms are available year-round during building hours. From May to October, additional restrooms are available northeast of the Visitor Center; in winter, a portable toilet is located in the main parking lot.",
    "mapUrl": "https://arboretum.wisc.edu/visit/trails/",
    "directionsUrl": "https://www.google.com/maps/search/?api=1&query=2880%20Longenecker%20Drive%2C%20Madison%2C%20WI",
    "sourceUrl": "https://arboretum.wisc.edu/visit/"
  },
  {
    "id": 4,
    "name": "Pheasant Branch Conservancy",
    "location": "Pheasant Branch Road, Middleton, WI",
    "difficulty": "Medium",
    "distance": "3 mi",
    "description": "Large semi-forested loop featuring an extensive boardwalk.",
    "image": pheasantBranchImg,
    "features": ["Parking Available", "Dog Friendly", "Bike Friendly"],
    "parkingNotes": "Parking is available at Conservancy lots, including smaller lots along Pheasant Branch Road and the larger Orchid Heights Park lot. Dane County also lists parking and plowed parking as Conservancy amenities.",
    "restroomNotes": "Bathroom locations are shown on the Friends of Pheasant Branch Conservancy interactive and wayfinding maps. Availability can vary, so check the official map before visiting.",
    "mapUrl": "https://pheasantbranch.org/directions-maps/",
    "directionsUrl": "https://www.google.com/maps/search/?api=1&query=Pheasant%20Branch%20Conservancy%2C%20Middleton%2C%20WI",
    "sourceUrl": "https://www.danecountyparks.com/park/PheasantBranchConservancy"
  },
  {
    "id": 5,
    "name": "Olin Park",
    "location": "Olin-Turville Court, Madison, WI",
    "difficulty": "Medium",
    "distance": "3 mi",
    "description": "Peaceful park on Lake Monona with additional wooded trails.",
    "image": olinParkImg,
    "features": ["Lake Views", "Parking Available", "Dog Friendly", "Boat Launch"],
    "parkingNotes": "Use the Olin Park parking lot at 1156 Olin-Turville Court. Madison Parks parking lots are for park use during regular park hours, with no overnight parking and posted limits applying.",
    "restroomNotes": "Madison Parks' current Olin Park page lists drinking water but does not list a public restroom. Check current Madison Parks restroom status before relying on restroom access.",
    "mapUrl": "https://www.cityofmadison.com/parks/olin",
    "directionsUrl": "https://www.google.com/maps/search/?api=1&query=1156%20Olin-Turville%20Court%2C%20Madison%2C%20WI",
    "sourceUrl": "https://www.cityofmadison.com/parks/olin"
  },
  {
    "id": 6,
    "name": "Owen Conservation Park",
    "location": "Old Sauk Road, Madison, WI",
    "difficulty": "Medium",
    "distance": "1 mi",
    "description": "Meandering trails with great lookout points.",
    "image": owenParkImg,
    "features": ["Parking Available", "Dog Friendly"],
    "parkingNotes": "Parking is available at Owen Conservation Park, 6021 Old Sauk Road. Madison Parks parking lots are for park use during regular park hours.",
    "restroomNotes": "Madison Parks lists restrooms and drinking water for Owen Conservation Park, and notes year-round restrooms at Owen among its conservation parks.",
    "mapUrl": "https://www.cityofmadison.com/parks/owen/",
    "directionsUrl": "https://www.google.com/maps/search/?api=1&query=6021%20Old%20Sauk%20Road%2C%20Madison%2C%20WI",
    "sourceUrl": "https://www.cityofmadison.com/parks/owen/"
  },
  {
    "id": 7,
    "name": "Capital Springs State Recreation Area",
    "location": "Lake Farm Road, Madison, WI",
    "difficulty": "Hard",
    "distance": "5 mi",
    "description": "Expansive natural area perfect for a wide range of outdoor activities.",
    "image": capitalSpringsImg,
    "features": ["Lake Views", "Parking Available", "Dog Friendly", "Bike Friendly", "Campsites", "Boat Launch"],
    "parkingNotes": "Parking is available at several access points, including the Lake Farm Road trailhead across from the Lussier Family Heritage Center and the Capital Springs State Park access lot at 4291 Libby Road.",
    "restroomNotes": "Dane County Parks lists flush restrooms, vault/pit restrooms, and campground showers among Capital Springs Recreation Area amenities.",
    "mapUrl": "https://www.danecountyparks.com/Park/CapitalSpringsRecreationArea",
    "directionsUrl": "https://www.google.com/maps/search/?api=1&query=3101%20Lake%20Farm%20Road%2C%20Madison%2C%20WI",
    "sourceUrl": "https://dnr.wisconsin.gov/topic/parks/capsprings/info"
  },
  {
    "id": 8,
    "name": "Olbrich Botanical Gardens",
    "location": "Atwood Avenue, Madison, WI",
    "difficulty": "Easy",
    "distance": "1 mi",
    "description": "Short but dense trails around sculptures and plants.",
    "image": olbrichImg,
    "features": ["Parking Available", "Indoor Area"],
    "parkingNotes": "Parking is free in the public lot around Olbrich Botanical Gardens, with 210 spaces including 12 accessible spaces near the main building entrance. Nearby public and street parking options are listed as alternates when the lot fills.",
    "restroomNotes": "Olbrich lists ADA-compliant, family, and gender-neutral restrooms as available.",
    "mapUrl": "https://www.olbrich.org/garden-map",
    "directionsUrl": "https://www.google.com/maps/search/?api=1&query=3330%20Atwood%20Avenue%2C%20Madison%2C%20WI",
    "sourceUrl": "https://www.olbrich.org/visit/"
  }
]

function App() {
  const [trails, setTrails] = useState([])

  useEffect(() => {
    setTrails(trailsData);
    ensureUserInfo();
  }, [])

  return (
    <BrowserRouter>
      <div className="App d-flex flex-column min-vh-100">
        <Navigation />

        
        <div className="flex-grow-1 main-content">
          
          <div className="container">
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/trails" element={<TrailList trails={trails} />} />
              <Route path="/trail/:id" element={<TrailDetail trails={trails} />} />
              <Route path="/likedtrail/:id" element={<LikedTrailDetail trails={trails} />} />
              <Route path="/likedtrails" element={<LikedTrailList trails={trails} />} />
              <Route path="/my-trails" element={<MyTrails />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </div>
         
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
