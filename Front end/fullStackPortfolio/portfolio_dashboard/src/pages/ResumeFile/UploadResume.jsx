import React, { useState } from 'react';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'; // Removed unnecessary import
import { storage } from '../../firebase/config';
import { VisuallyHiddenInput } from '../../components/views/Forms/Project/style';
import { doc, updateDoc } from 'firebase/firestore';
import { colRef } from '../../hook/useFirebase';

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file upload event and update state
  const handleChange = (event) => {
    // setChangedResume(true);
    setFile(event.target.files[0]);
  };

  const handleUpload = async (e) => {
    const resumeUrlRef = doc(colRef('resumeFile'),'Dn9erVKJvLyb5nm870Re' );

    e.preventDefault()
    if (!file) {
      alert("Please upload a PDF file first!");
      return;
    }

    // Adjust the storage path and filename if needed
    const storageRef = ref(storage, `/pdfs/${file.name}`);
    
    try {
      setLoading(true);
      const [fileSnapshot] = await Promise.all([
        uploadBytes(storageRef, file),
      ]);

      const fileURL = await getDownloadURL(fileSnapshot.ref);
      await updateDoc(resumeUrlRef, {url:fileURL});

    } catch (error) {
      console.error('Error uploading file:', error);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        htmlFor="resume" // Use htmlFor to associate the label with the input
      >
        Upload file
        <VisuallyHiddenInput
          type="file"
          onChange={handleChange}
          accept=".pdf" // Set the accepted file type to PDF
          id="resume"
          name="resume"
        />
      </Button>
      <Button type='submit'>{loading?"Loading...":'submit'}</Button>
    </form>
  );
};

export default UploadResume;

