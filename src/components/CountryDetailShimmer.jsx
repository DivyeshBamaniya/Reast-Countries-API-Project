import React from 'react'
import "./CountryDetailShimmer.css";

function CountryDetailShimmer() {
  
  return (
    <div className="country-details-container country-details-shimmer">
    <div className='country-details'>
      <div className="img"></div>
      <div className="details-text-div">
          <div className="countryName"></div>
          <div className='countryDetails'>
            <div className="detail"></div>
            <div className="detail"></div>
            <div className="detail"></div>
            <div className="detail"></div>
            <div className="detail"></div>
            <div className="detail"></div>
          </div>
      </div>
    </div>

    </div>
  )
}

export default CountryDetailShimmer
