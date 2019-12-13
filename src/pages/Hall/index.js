import React from 'react';
import fire from '../../utils/firebaseUtils'
import Menucard from '../../components/Menucard'

const Hall = () => {
  fire.collection('Menu').get()
  .then((snap) => {
    // console.log(snap.data());
  })

  return (
    <div>
      <h2>Oiii</h2>
      <Menucard />
    </div>
  )
}
export default Hall