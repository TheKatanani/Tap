import React, { useEffect, useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { colRef } from '../../../../hook/useFirebase';
import { StyleInfo } from './style';
import { Button, Container, TextField, Typography } from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../../firebase/config';
import { initailFormData } from './data';
import { v4 } from 'uuid';

const socialPlatforms = ['facebook', 'github', 'linkedIn', 'instagram', 'X', 'upwork', 'freelancer', 'mostaql', 'khamsat'];

const FormInfo = ({ data }) => {
  const [formData, setFormData] = useState({ ...initailFormData, ...data });
  const [file, setFile] = useState({});
  const [myUrl, setUrl] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [changedImage, setChangedImage] = useState(false);

  const handleInputChange = ({ target: { id, value } }) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogoChange = async (e) => {
    const { name, files } = e.target;
    const selectedFile = files?.[0];
    setChangedImage(true)
    if (selectedFile) {
      setFile((prev) => ({ ...prev, [name]: selectedFile }));
      setUrl((prev) => ({ ...prev, [name]: URL.createObjectURL(selectedFile) }));

      const imageRef = ref(storage, `images/${selectedFile.name + v4()}`);
      const snapshot = await uploadBytes(imageRef, selectedFile);
      const imageUrl = await getDownloadURL(snapshot.ref);

      setUrl((prev) => ({ ...prev, [name]: imageUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const infoDocRef = doc(colRef('info'), 'yMW3Hm0ECvSdEMYZbgfB');
      let updatedFormData = { ...formData }
      if (file && changedImage) {
        const imageDarkRef = ref(storage, `images/${file.darkLogo.name + v4()}`);
        const imageLightRef = ref(storage, `images/${file.lightLogo.name + v4()}`);
        const imageAvatarRef = ref(storage, `images/${file.avatar.name + v4()}`);
        const darkSnapshot = await uploadBytes(imageDarkRef, file?.darkLogo);
        const darkLogo = await getDownloadURL(darkSnapshot.ref);

        const lightSnapshot = await uploadBytes(imageLightRef, file?.lightLogo);
        const lightLogo = await getDownloadURL(lightSnapshot.ref);

        const avatarSnapshot = await uploadBytes(imageAvatarRef, file?.avatar);
        const avatar = await getDownloadURL(avatarSnapshot.ref);
        setUrl({ darkLogo, lightLogo, avatar });
        setFormData(prev => ({ ...prev, avatar: avatar, logo: { ...prev.logo, dark: darkLogo, light: lightLogo } }));
        updatedFormData = { ...updatedFormData, avatar: avatar, logo: { ...updatedFormData.logo, dark: darkLogo, light: lightLogo } }
      }

      await updateDoc(infoDocRef, updatedFormData);
      alert('Updated successfully');
    } catch (error) {
      console.error('Error updating document:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...data }));
    setUrl({ avatar: data.avatar, darkLogo: data.logo.dark, lightLogo: data.logo.light });
  }, [data]);

  return (
    <StyleInfo>
      <Container>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={handleInputChange}
            type="text"
            label="Name"
            name="name"
            id="name"
            value={formData.name}
            style={{ marginBottom: '10px', width: '100%' }}
          />
          <br />
          <TextField
            onChange={handleInputChange}
            type="text"
            label="Job Title"
            name="jobTitle"
            id="jobTitle"
            value={formData.jobTitle}
            style={{ marginBottom: '10px', width: '100%' }}
          />
          <TextField
            onChange={handleInputChange}
            type="text"
            label="Phone Number"
            name="phone"
            id="phone"
            value={formData.phone}
            style={{ marginBottom: '10px', width: '100%' }}
          />
          <TextField
            onChange={handleInputChange}
            type="text"
            label="Email"
            name="email"
            id="email"
            value={formData.email}
            style={{ marginBottom: '10px', width: '100%' }}
          />
          <div className="social">
            <Typography variant='h3'>Social</Typography>
            <div className="container">
              {socialPlatforms.map((platform) => (
                <TextField
                  key={platform}
                  onChange={handleInputChange}
                  variant="outlined"
                  label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                  name={`social.${platform}`}
                  id={`social.${platform}`}
                  value={formData?.social?.[platform]}
                  style={{ marginBottom: '10px', width: '100%' }}
                />
              ))}
            </div>
          </div>

          <div className="logo">
            <div className="dark">
              <label htmlFor="darkLogo">
                Dark Logo:
                <input
                  id="darkLogo"
                  name="darkLogo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  style={{ marginBottom: '10px', width: '100%' }}
                />
                {myUrl.darkLogo ? <img src={myUrl.darkLogo} alt="Dark Logo" /> : <p>no image yet</p>}
              </label>
            </div>
            <div className="light">
              <label htmlFor="lightLogo">
                Light Logo:
                <input
                  id="lightLogo"
                  name="lightLogo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  style={{ marginBottom: '10px', width: '100%' }}
                />
                {myUrl.lightLogo ? <img src={myUrl.lightLogo} alt="Light Logo" /> : <p>no image yet</p>}
              </label>
            </div>
            <div className="avatar">
              <label htmlFor="avatar">
                Avatar:
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  style={{ marginBottom: '10px', width: '100%' }}
                />
                {myUrl.avatar ? <img src={myUrl.avatar} alt="Avatar" /> : <p>no image yet</p>}
              </label>
            </div>
          </div>

          <Button type="submit" variant="contained" color="primary">
            {isLoading ? "Loading..." : "Update"}
          </Button>
        </form>
      </Container>
    </StyleInfo>
  );
};

export default FormInfo;
