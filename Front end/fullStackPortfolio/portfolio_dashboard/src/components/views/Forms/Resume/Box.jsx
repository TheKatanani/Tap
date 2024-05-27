import React, { useEffect, useState } from 'react'
import {  initalBoxUpdate, initalLi, initialTemp } from './data';
import { Button, TextField } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { v4 } from 'uuid';
import { buttonMood } from '../../../../assets/data';

const Box = ({ setFormData, boxUpdate, setBoxUpdate }) => {
  const [formTemp, setFormTemp] = useState({ ...boxUpdate?.data });
  const [myLi, setMyLi] = useState(initalLi);
  const [mood, setMood] = useState({
    box: buttonMood.add,
    list: buttonMood.add,
  });

  useEffect(() => {
    setFormTemp(boxUpdate?.data)
    boxUpdate?.isUpdate === true && setMood(prev => ({ ...prev, box: buttonMood.update }))
  }, [boxUpdate])
  return (
    <div className="box">
      <h2>Box</h2>
      <TextField onChange={(e) =>
        // setFormData(prev => ({ ...prev, boxs: [...prev.boxs, { ...box, title: e.target.value }] }))
        setFormTemp(prev => ({ ...prev, title: e.target.value }))
      }
        variant="outlined"
        label="Title Box"
        name="title"
        id="title"
        value={formTemp?.title}
        style={{ marginBottom: '10px', width: '100%' }} />
      <div className="lists">
        {
          formTemp?.lists?.map((el) => (
            <div className='li' key={el.id}>
              <p>{el.data}</p>
              <Edit onClick={() => {
                //put the el li in the input to change it and make the mode to update 
                setMood(prev => ({ ...prev, list: buttonMood.update }))
                setMyLi(el)
              }} />
              <Delete onClick={() => {
                //(Filter the array) delete the item from the array by the ID (map thro the array in the formData)
                setFormTemp(prev => ({ ...prev, lists: prev.lists.filter(li => li.id !== el.id) }))
              }} />
            </div>
          ))
        }
        <TextField onChange={(e) => {
          // setFormTemp(prev => ({ ...prev, li: { ...prev.li, data: e.target.value } }))
          setMyLi(prev => ({ ...prev, data: e.target.value }))
        }
        }
          variant="outlined"
          label="li"
          name="li"
          id="li"
          value={myLi.data}// the new Item just here
          style={{ marginBottom: '10px', width: '100%' }} />
        <Button onClick={() => {
          if (mood.list === buttonMood.add && myLi.data) {
            // add li
            setFormTemp(prev => ({ ...prev, lists: [...prev.lists, { ...myLi, id: v4() }] }))
          } else if (mood.list === buttonMood.update && myLi.data) {
            setFormTemp(prev => ({ ...prev, lists: prev.lists.map(prevLi => prevLi.id === myLi.id ? myLi : prevLi) }))
            setMood(prev => ({ ...prev, list: buttonMood.add }))
          }
          setMyLi(initalLi)
        }}>{mood.list === buttonMood.update ? "UPDATE Li" : "ADD Li"}</Button>
        {/* make the button add and update depend on the  */}
        {mood.list === buttonMood.update &&
          <Button
            onClick={() => setMood(prev => ({ ...prev, list: buttonMood.add }))}
          >add li new insted</Button>
        }
      </div>
      <Button onClick={() => {
        // do the add box functianality here
        if (mood.box === buttonMood.add && formTemp?.title) {
          setFormData(prev => ({ ...prev, boxs: [...prev.boxs, { ...formTemp, id: v4() }] }))
          setFormTemp(initialTemp)
        } else if (mood.box === buttonMood.update && formTemp?.title) {
          setFormData(prev => ({ ...prev, boxs: prev.boxs.map(prevBox => prevBox.id === formTemp.id ? formTemp : prevBox) }))
          setMood(prev => ({ ...prev, box: buttonMood.add }))
          setFormTemp(initialTemp)
          setBoxUpdate(initalBoxUpdate)
        }else{
          alert('You must add the title')
        }
      }}>{mood.box === buttonMood.update ? "UPDATE box" : "ADD box"}</Button>
    </div>
  )
}

export default Box