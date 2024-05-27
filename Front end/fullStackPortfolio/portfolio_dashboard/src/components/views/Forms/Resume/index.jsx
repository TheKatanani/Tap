import React, { useEffect, useState } from 'react';
import { updateDoc, addDoc, collection, doc } from 'firebase/firestore';
import { StyleResume } from './style.js';
import { Button, Container, TextField } from '@mui/material';
import {  initState, initalBoxUpdate } from './data.js';
import { db } from '../../../../firebase/config.js';
import Box from './Box.jsx';
import TableBoxs from './TableBoxs.jsx';
import { colRef } from '../../../../hook/useFirebase.jsx';
import { v4 } from 'uuid';

const FormResume = ({ update, setUpdate }) => {
  // update = { ...update, data: update.data[0] }
  const [formData, setFormData] = useState(update.data);
  const [isLoading, setLoading] = useState(false);
  const [boxUpdate, setBoxUpdate] = useState(initalBoxUpdate);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resumeDocRef = collection(db, 'resume');
    try {
      setLoading(true);
      if (update.isUpdate) {
        const resumeDocUpdateRef = doc(colRef('resume'), formData.id);
        await updateDoc(resumeDocUpdateRef, formData);
        setUpdate({ isUpdate: false, data: initState })
        setFormData(initState);
        alert('Updated successfully');
      } else {
        // Perform the Firestore operation using the updated state
        await addDoc(resumeDocRef, formData);
        setFormData(initState);
        alert('Added successfully');
      }
    } catch (error) {
      console.error('Error adding document:', error);
    } finally {
      setLoading(false);
    }
  };
  // Log the state after it has been updated in a useEffect
  useEffect(() => {
    !update.isUpdate && setFormData({ ...update.data, id: v4() });
    update.isUpdate && setFormData({ ...update.data });
  }, [update]);
  return (
    <StyleResume>
      <Container>
        <form onSubmit={handleSubmit}>
          <TextField onChange={handleInputChange}
            variant="outlined"
            label="Title"
            name="title"
            id="title"
            value={formData?.title}
            required
            style={{ marginBottom: '10px', width: '100%' }} />
          <Box {...{ setFormData, boxUpdate, setBoxUpdate }} />
          <TableBoxs data={formData.boxs} {...{ setBoxUpdate, setFormData }} />
          <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
            {isLoading ? "Loading..." : (update.isUpdate ? "UPDATE" : "ADD")}
          </Button>
        </form>
        {update.isUpdate && <Button onClick={() => {
          setUpdate({ isUpdate: false, data: initState })
        }}>Add New Porduct insted</Button>}
      </Container>
    </StyleResume >
  );
};

export default FormResume;
