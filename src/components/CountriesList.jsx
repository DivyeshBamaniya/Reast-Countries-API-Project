import React, { useEffect, useState } from 'react'
import CountryCard from './CountryCard'
import CountriesListShimmer from './CountriesListShimmer';

export default function CountriesList({query}) {
  const [countriesData, setcountriesData] = useState([])  
  
  useEffect(()=>{
    fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then((data) => {
        setcountriesData(data);
    }
  )
  }, []);

  // Shimmer Effect
 if(!countriesData.length){
    return <CountriesListShimmer />
  }

  return (
    <>
    <div className='countries-container'>
      {countriesData
          // Renders filtered Country but includes empty String & empty
          // string is always true, hencecan be used to show all the
          // countries on UI

          .filter(country =>
            country.name.common.toLowerCase().includes(query) || country.region.toLowerCase().includes(query)
          )
          //Renders all country Cards on UI
           .map( country => {
            return (
              <CountryCard
                key={country.name.common}
                name={country.name.common}
                flag={country.flags.svg}
                population={country.population.toLocaleString("en-IN")}
                region={country.region}
                capital={country.capital ? country.capital.join(", ") : "--"}
                data = {country}
              />
            )
          })}
    </div>

    </>
  )
}