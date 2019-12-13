import React from 'react'
import fire from '../../utils/firebaseUtils'
// import Button from '../Button'

const Menucard = () => {
  fire.collection('Menu').get()
  .then((snap) => {    
    snap.forEach((item) => {
      console.log(item.id)
    })
  })

  return (
    <h2>menuzinho</h2>
  )
}

export default Menucard