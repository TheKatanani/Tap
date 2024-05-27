import React, { useState } from 'react';
import { colRef } from '../../../../hook/useFirebase';
import { addDoc, doc , deleteDoc} from 'firebase/firestore';
import { Button, Container, Input } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { SyledCategories } from './SyledCategories';

const FormCategories = ({ data }) => {
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(colRef('categories'), {
      type,
    }).then(() => {
      setType('');
      alert('Category added successfully');
    });
  };

  const handleDelete = (el) => {
    const categoryId = el.id;
    deleteDoc(doc(colRef('categories'), categoryId))
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };

  return (
    <Container>
      <SyledCategories>
        {data.map((el) => (
          <div className='category' key={el.id}>
            <p>{el.type}</p>
            <span
              className='delete'
              style={{ color: 'red' }}
              onClick={() => handleDelete(el)}
            >
              <DeleteIcon />
            </span>
            <br />
          </div>
        ))}
      </SyledCategories>
      <form onSubmit={handleSubmit}>
        <Input
          onChange={(e) => setType(e.target.value)}
          type='text'
          label='type'
          name='type'
          id='type'
          value={type}
        />
        <Button type='submit'>Add</Button>
      </form>
    </Container>
  );
};

export default FormCategories;