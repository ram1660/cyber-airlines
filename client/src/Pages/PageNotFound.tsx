import React from 'react'
import { useNavigate } from 'react-router-dom';
export default function PageNotFound() {
    const redirect = useNavigate();
    redirect('/home');
  return (
    <div>PageNotFound</div>
  )
}
