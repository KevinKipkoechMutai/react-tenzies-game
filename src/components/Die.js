import React from 'react'

const Die = ({value, isHeld, holdDie}) => {
  return (
    <div className={isHeld ? 'die-face green' : 'die-face'} onClick={holdDie}>
        <h2 className='die-num'>{value}</h2>
    </div>
  )
}

export default Die