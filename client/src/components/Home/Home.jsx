import React from 'react'
import UserCard from '../UserCard/UserCard'

const HomeStyle = {
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
}

const Home = () => {
  return (
    <div style={HomeStyle}>
      <UserCard />
    </div>
  )
}

export default Home