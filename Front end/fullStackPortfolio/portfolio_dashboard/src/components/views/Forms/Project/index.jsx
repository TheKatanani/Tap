import React, { useEffect, useState } from 'react';
import { updateDoc, addDoc, collection, doc } from 'firebase/firestore';
import { StyleProject, VisuallyHiddenInput } from './style';
import { Autocomplete, Button, Chip, Container, FormControlLabel, Switch, TextField } from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../../../firebase/config';
import { v4 } from 'uuid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { initState, initialDescriptionData, programmingTechnologies } from './data.js';
import UnstyledSelectBasic from '../../../ui/Select/index.jsx';
import useFirebase, { colRef } from '../../../../hook/useFirebase.jsx';
import { actions } from '../../../../actions.js';
import Description from './Description.jsx';


const FormProject = ({ update, setUpdate }) => {
  const [formData, setFormData] = useState(update.data);
  const [descriptionData, setDescriptionData] = useState(update.data.description || initialDescriptionData);
  const [changedImage, setChangedImage] = useState(false);
  const [file, setFile] = useState({});
  const { data, loading, error } = useFirebase(actions.GET_ALL, { path: 'categories' })


  const [isLoading, setLoading] = useState(false);

  const handleSelectChange = (_, newValue) => setFormData(preve => ({ ...preve, 'category': newValue }));

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleTechnologiesChange = (_, values) => {
    setFormData(preve => ({ ...preve, 'technologies': values }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFile((prev) => ({ ...prev, [name]: files[0] }));
    // Use URL.createObjectURL to create a URL for the selected file
    const imageUrl = URL.createObjectURL(files[0]);
    setFormData((prev) => ({ ...prev, [name]: imageUrl }));
    setChangedImage(true)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectDocRef = collection(db, 'project');
    try {
      setLoading(true);

      let updatedFormData = { ...formData }; // Create a copy of the form data

      if (file && changedImage) {
        const imageRef = ref(storage, `images/${file?.image?.name + v4()}`);
        const mockupRef = ref(storage, `images/${file?.mockup?.name + v4()}`);

        const [imageSnapshot, mockupSnapshot] = await Promise.all([
          uploadBytes(imageRef, file?.image),
          uploadBytes(mockupRef, file?.mockup),
        ]);

        const imageURL = await getDownloadURL(imageSnapshot.ref);
        const mockupURL = await getDownloadURL(mockupSnapshot.ref);

        // Update the copied form data synchronously
        updatedFormData = { ...updatedFormData, 'image': imageURL, 'mockup': mockupURL };
      }
      if (update.isUpdate) {
        const projectDocUpdateRef = doc(colRef('project'), formData.id);
        await updateDoc(projectDocUpdateRef, { ...updatedFormData, description: descriptionData });
        setDescriptionData(initialDescriptionData)
        setUpdate({ isUpdate: false, data: initState })
        setFormData(initState);
        setFile({})
        alert('Updated successfully');
      } else {
        // Perform the Firestore operation using the updated state
        await addDoc(projectDocRef, { ...updatedFormData, description: descriptionData, id: v4() });
        setDescriptionData(initialDescriptionData)
        setFormData(initState);
        setFile({})
        alert('Added successfully');
      }
    } catch (error) {
      console.error('Error adding document:', error);
    } finally {
      setChangedImage(false)
      setLoading(false);
    }
  };


  // Log the state after it has been updated in a useEffect
  useEffect(() => {
    setFormData(update.data);
    setDescriptionData(update.data?.description || initialDescriptionData);
  }, [update]);
  return (
    <StyleProject>
      <Container>
        <form onSubmit={handleSubmit}>
          <div className="title">
            <TextField onChange={handleInputChange}
              variant="outlined"
              label="Title"
              name="tilte"
              id="title"
              value={formData?.title}
              required
              style={{ marginBottom: '10px', width: '100%' }} />
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              label="Sub Title"
              name="subTitle"
              id="subTitle"
              value={formData?.subTitle}
              style={{ marginBottom: '10px', width: '100%' }}
            />
          </div>
          <div className="links">
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              label="Demo"
              name="demo"
              id="demo"
              value={formData?.demo}
              style={{ marginBottom: '10px', width: '100%' }}
            />
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              label="Repo"
              name="repo"
              id="repo"
              value={formData?.repo}
              style={{ marginBottom: '10px', width: '100%' }}
            />
          </div>
          <Autocomplete
            multiple
            id="technologies"
            options={programmingTechnologies.map((option) => option?.title)}
            value={formData?.technologies}
            onChange={handleTechnologiesChange}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="technologies"
                placeholder="Favorites"
              />
            )}
          />
          <div className="selects">

            <UnstyledSelectBasic options={data} {...{ loading, error, handleSelectChange, }} defultValue='Select The Project Category' category={formData.category} />
            <FormControlLabel control={<Switch
              checked={formData.isMainProject}
              value={formData.isMainProject}
              id='switch'
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, isMainProject: e.target.checked }));
              }} />} label="Is Main Project:" />
          </div>
          {/* <TextareaAutosize placeholder='description' style={{ height: '100px' }} name='description' id='description' value={formData.description} onChange={handleInputChange} ></TextareaAutosize> */}
          <Description data={descriptionData} setData={setDescriptionData} />
          <div className="images">
            <div className="image">
              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload Image
                <VisuallyHiddenInput type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  id="image"
                  name="image"
                />
              </Button>
              <div className="imageArea">
                {formData.image ? <img src={formData.image} alt="Img" /> : <p>no image yet</p>}
              </div>
            </div>
            <div className="mockup">
              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload Mockup
                <VisuallyHiddenInput type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  id="mockup"
                  name="mockup"
                />
              </Button>
              <div className="imageArea">
                {formData.mockup ? <img src={formData.mockup} alt="Img" /> : <p>no image yet</p>}
              </div>
            </div>
          </div>
          <br />

          <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
            {isLoading ? "Loading..." : (update.isUpdate ? "UPDATE" : "ADD")}
          </Button>
        </form>
        {update.isUpdate && <Button onClick={() => {
          setUpdate({ isUpdate: false, data: initState })
        }}>Add New Porduct insted</Button>}
      </Container>
    </StyleProject>
  );
};

export default FormProject;
