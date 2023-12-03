import {  useRouteError } from 'react-router-dom';

function NotFound() {
  const err=useRouteError() //gets the error 
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{err.data || err.message}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;
