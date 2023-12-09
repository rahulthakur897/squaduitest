import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [allData, setAllData] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [searchText, setSearchText] = useState("");

  const loadDataFromJson = async () => {
    const response = await axios.get("../data.json");
    const citydata = await response.data;
    setAllData(citydata);
    setCurrentCity(citydata[0]);
  };

  useEffect(() => {
    loadDataFromJson();
  }, []);

  const activateTab = (tabName) => {
    document.querySelectorAll('.tab-data').forEach(function(el) {
      el.style.display = 'none';
   });
    document.getElementById(tabName).style.display = "flex";
  };

  const filterResult = (val) => {
    setSearchText(val);
    const filtered = allData.filter(p => p.name.toLowerCase().includes(val.toLowerCase()));
    if(filtered.length){
      setCurrentCity(filtered[0]);
    }
  }

  return (
    <div className="App">
      <div
        className="container"
        style={{ backgroundImage: `url(${currentCity?.backgroundUrl})` }}
      >
        <div id="weather-data">
          <img src={currentCity?.weather?.icon} alt="weather-icon" />
          <p>{currentCity?.weather?.temp}</p>
          <p>{currentCity?.weather?.main}</p>
        </div>
        <h4 className="city-name">{currentCity?.name}</h4>
        <div>
          <input id="search-input" name={searchText} onChange={(e) => filterResult(e.target.value)} placeholder="search" />
          <button id="btn-sumbit">Search</button>
        </div>
      </div>
      <div className="tab-container">
        <div id="tabs">
          <button
            className="tablinks"
            onClick={(event) => activateTab("Places")}
          >
            Places
          </button>
          <button
            className="tablinks"
            onClick={(event) => activateTab("Hotels")}
          >
            Hotels
          </button>
          <button
            className="tablinks"
            onClick={(event) => activateTab("Restaurants")}
          >
            Restaurants
          </button>
          <button
            className="tablinks"
            onClick={(event) => activateTab("Offices")}
          >
            Offices
          </button>
        </div>
        <div>
          {currentCity?.categories?.places.map((p) => (
            <div id="Places" className="tab-data" key={p.id}>
              <div className="tabcontent">
                <img style={{ width: "100px" }} src={p.imageUrl} alt={p.name} />
                <div>
                  <div>{p.name}</div>
                  <div>{p.rating}</div>
                  <div>{p.desc}</div>
                </div>
              </div>
              <div className="tabcontent">
                <p>Opens At</p>
                <p>{p.openAt}</p>
              </div>
              <div className="tabcontent">
                <p>Closes At</p>
                <p>{p.closeAt}</p>
              </div>
              <div className="tabcontent">
                <p>Entry Fee</p>
                <p>Rs. {p.entryFee}</p>
              </div>
            </div>
          ))}

          {currentCity?.categories?.hotels.map((p) => (
            <div id="Hotels" className="tab-data" key={p.id}>
              <div className="tabcontent">
                <img style={{ width: "100px" }} src={p.imageUrl} alt={p.name} />
                <div>
                  <div>{p.name}</div>
                  <div>{p.rating}</div>
                  <div>{p.address}</div>
                </div>
              </div>
              <div className="tabcontent">
                <p>Check In</p>
                <p>{p.openAt}</p>
              </div>
              <div className="tabcontent">
                <p>Check Out</p>
                <p>{p.closeAt}</p>
              </div>
              <div className="tabcontent">
                <p>From ${p.price}</p>
                <button>Book Now</button>
                <p>Have a Promo Code?</p>
              </div>
            </div>
          ))}

          {currentCity?.categories?.restaurants.map((p) => (
            <div id="Restaurants" className="tab-data" key={p.id}>
              <div className="tabcontent">
                <img style={{ width: "100px" }} src={p.imageUrl} alt={p.name} />
                <div>
                  <div>{p.name}</div>
                  <div>{p.rating}</div>
                  <div>{p.address}</div>
                </div>
              </div>
              <div className="tabcontent">
              <p>Opens At</p>
              <p>{p.openAt}</p>
              </div>
              <div className="tabcontent">
                <p>Closes At</p>
                <p>{p.closeAt}</p>
              </div>
              <div className="tabcontent">
                <p>${p.price} per person</p>
                <button>Book Now</button>
              </div>
            </div>
          ))}

          {currentCity?.categories?.offices.map((p) => (
            <div id="Offices" className="tab-data" key={p.id}>
              <div className="tabcontent">
                <img style={{ width: "100px" }} src={p.imageUrl} alt={p.name} />
                <div>
                  <div>{p.name}</div>
                  <div>{p.rating}</div>
                  <div>{p.desc}</div>
                </div>
              </div>
              <div className="tabcontent">{p.openAt}</div>
              <div className="tabcontent">{p.closeAt}</div>
              <div className="tabcontent">
                <p>Rs. {p.price}</p>
                <button>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
