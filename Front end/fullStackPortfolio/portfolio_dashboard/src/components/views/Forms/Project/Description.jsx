import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { buttonMood } from '../../../../assets/data'
import { Delete, Edit } from '@mui/icons-material'
import { v4 } from 'uuid'
const initialFeature= {
  id: '',
  data: ''
}
const Description = ({ data, setData }) => {
  // const [data, setData] = useState(initialDescriptionData)
  const [featureInput, setFeatureInput] = useState(initialFeature)
  const [mood, setMood] = useState(buttonMood.add)

  return (
    <div className='description'>
      <Typography variant='h6'>description</Typography>
      <TextField onChange={(e) =>
        // setFormData(prev => ({ ...prev, boxs: [...prev.boxs, { ...box, title: e.target.value }] }))
        setData(prev => ({ ...prev, header: e.target.value }))
      }
        variant="outlined"
        label="Header"
        name="header"
        id="header"
        value={data?.header}
        style={{ marginBottom: '10px', width: '100%' }} />
      <div className="features">

        <TextField onChange={(e) => {
          // setFormTemp(prev => ({ ...prev, li: { ...prev.li, data: e.target.value } }))
          setFeatureInput(prev => ({ ...prev, data: e.target.value }))
        }
        }
          variant="outlined"
          label="feature"
          name="feature"
          id="feature"
          value={featureInput.data}// the new Item just here
          style={{ marginBottom: '10px', width: '100%' }} />
        {
          data?.features?.map((feature) => (
            <div className='feature' key={feature.id}>
              <p>{feature.data}</p>
              <div>
                <Edit onClick={() => {
                  //put the feature li in the input to change it and make the mode to update 
                  setMood(buttonMood.update)
                  setFeatureInput(feature)
                }} />
                <Delete onClick={() => {
                  console.log(data)
                  //(Filter the array) delete the item from the array by the ID (map thro the array in the formData)
                  setData(prev => ({ ...prev, features: prev?.features.filter(feature => feature.id !== featureInput.id) }))
                }} />
              </div>
            </div>
          ))
        }
        <Button onClick={() => {
          if (mood === buttonMood.add && featureInput.data) {
            setData(prev => ({ ...prev, features: [...prev?.features, { ...featureInput, id: v4() }] }))
          } else if (mood === buttonMood.update && featureInput.data) {
            setData(prev => ({ ...prev, features: prev.features.map(prev => prev.id === featureInput.id ? featureInput : prev) }))
            setMood(buttonMood.add)
          }
          setFeatureInput(initialFeature)
        }}>{mood === buttonMood.update ? "UPDATE FEATURE" : "ADD FEATURE"}</Button>
        {/* make the button add and update depend on the  */}
        {mood === buttonMood.update &&
          <Button
            onClick={() => setMood( buttonMood.add )}
          >add new feature insted</Button>
        }
      </div>
      <TextField onChange={(e) => {
        // setFormTemp(prev => ({ ...prev, li: { ...prev.li, data: e.target.value } }))
        setData(prev => ({ ...prev, footer: e.target.value }))
      }
      }
        variant="outlined"
        label="footer"
        name="footer"
        id="footer"
        value={data.footer}// the new Item just here
        style={{ marginBottom: '10px', width: '100%' }} />
    </div>
  )
}

export default Description