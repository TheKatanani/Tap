import React, { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { colRef } from '../../../../hook/useFirebase';
import { StyleAbout } from './style';
import { Button, Container, Input, TextareaAutosize } from '@mui/material';

const FormAbout = ({ data }) => {
  const [formData, setFormData] = useState(data);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const aboutDocRef = doc(colRef('about'), 'uB4j1FzIwhu2LB16L6qC');

    updateDoc(aboutDocRef, {
      title: formData.title,
      subTitle: formData.subTitle,
      description: formData.description,
    })
      .then(() => {
        alert('Updated successfully');
      })
      .catch((error) => {
        console.log('Error updating document:', error);
      });
  };

  return (
    <StyleAbout>
      <Container>
        <form onSubmit={handleSubmit}>
          <Input
            onChange={handleInputChange}
            type="text"
            label="Title"
            name="title"
            id="title"
            value={formData.title}
            style={{ marginBottom: '10px' ,width:'100%'}}
          />
          <br />
          <Input
            onChange={handleInputChange}
            type="text"
            label="Sub Title"
            name="subTitle"
            id="subTitle"
            value={formData.subTitle}
            style={{ marginBottom: '10px' ,width:'100%'}}
          />
          <br />
          <TextareaAutosize
            onChange={handleInputChange}
            type="text"
            label="Description"
            name="description"
            id="description"
            value={formData.description}
            style={{ marginBottom: '10px' ,width:'100%'}}
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </form>
      </Container>
    </StyleAbout>
  );
};

export default FormAbout;