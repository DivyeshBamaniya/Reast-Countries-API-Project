import React from 'react'
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const Error = useRouteError();
    console.log(Error);
    
  return (
    <div>
      <h2>Something Went Wrong! </h2>
      <h2>{Error.status} : {Error.statusText}</h2>
    </div>
  )
}
