import React, {useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import CountryDetailShimmer from './CountryDetailShimmer';
import useTheme from '../contexts/ThemeContext';
import './CountryDetail.css';

function CountryDetail() {
  const [isDark] = useTheme();

  const { country } = useParams();
  const {state} = useLocation();
  const countryName = country;
  let Error = null;

  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // Function to set Country Data
  function setcountryData(data){
    setCountryData({
      flag: data.flags.svg,
      name: data.name.common,
      nativeName: Object.values(data.name.nativeName)[0].common,
      population: data.population.toLocaleString("en-IN"),
      region: data.region,
      subregion: data.subergion ? data.subergion : "--",
      capital: data.capital ? data.capital.join(", ") : "--",
      tld: data.tld,
      currencies: data.currencies ? Object.values(data.currencies).map(currency => currency.name).join(", ") : "--",
      languages: data.languages ? Object.values(data.languages).map(lang => lang).join(", ") : "--",
      borders: []
    }
    )

    //Condition for country Card that isn't having any border Country
    if(!data.borders){
      data.borders =[]
    }

    data.borders.map( border=>{
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then(response=> response.json())
        .then(([borderCountry])=>{
          setCountryData(prevState => ({...prevState, borders:[...prevState.borders, borderCountry.name.common] }));
        }
      )
    }
  )
  }

  useEffect(() => {
    if(state){
      setcountryData(state)
      return
    }
    
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then(response => response.json())
      .then(([data]) => {

        setcountryData(data);   
      }
      )
      .catch(err => {
        setNotFound(true)
      }
      )
  }, [countryName])
  
  if (notFound) {
    return <div className='detailsCNotFound'>Country Not Found... </div>
  }

  // Shimmer Effect
  if(!countryData){
    return <CountryDetailShimmer  /> 
  }

  return (
    <main className={`${isDark? 'dark': ''}`}>
      <div className="country-details-container">

        {/* Back Button */}
        <span className="back-button" onClick={() => history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>

        {/* Main Data Container */}
        <div className="country-details">

          {/* Flag Images */}
          <img src={countryData?.flag} alt={countryData.name + 'flag'} />

          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p><b>Native Name: </b><span className="native-name">{countryData.name}</span></p>
              <p><b>Population: </b><span className="population">{countryData.population}</span></p>
              <p><b>Region: </b><span className="region"></span>{countryData.region}</p>
              <p><b>Sub Region: </b><span className="sub-region">{countryData.subregion}</span></p>
              <p><b>Capital: </b><span className="capital">{countryData.capital}</span></p>
              <p>
                <b>Top Level Domain: </b><span className="top-level-domain">{countryData.tld}</span>
              </p>
              <p><b>Currencies: </b><span className="currencies">{countryData.currencies}</span></p>
              <p><b>Languages: </b><span className="languages">{countryData.languages}</span></p>
            </div>

            {/* Borders div */}
            { countryData.borders.length !== 0 &&
              <div className="border-countries"><b>Border Countries: &nbsp;</b>
                { countryData.borders.map((border,i) => <Link key={i} to={`/${border}`}>{border} </Link>) }
              </div>
            }
          </div>
        </div>
      </div>
    </main>
  )
}

export default CountryDetail;