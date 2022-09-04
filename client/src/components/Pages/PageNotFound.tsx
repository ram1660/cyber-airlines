import React from 'react'
import { useNavigate } from 'react-router-dom';
export default function PageNotFound() {
    const redirect = useNavigate();
    setTimeout(() => {
        redirect('/home');
    }, 5000);
  return (
    <div></div>
  )
}
