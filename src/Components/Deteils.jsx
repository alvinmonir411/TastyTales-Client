import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import DeteilsCard from './DeteilsCard'

const Deteils = () => {
  const { id } = useParams()
  const [recipe, setrecipe] = useState([]);
  useEffect(() => {
    
    axios.get(`${import.meta.env.VITE_URL}recipedetails/${id}`).then((data) => {
      setrecipe(data.data);
    });

  },[id])
  return (
    <div>
      <DeteilsCard key={recipe._id} recipe={recipe} />
    </div>
  );
}

export default Deteils
