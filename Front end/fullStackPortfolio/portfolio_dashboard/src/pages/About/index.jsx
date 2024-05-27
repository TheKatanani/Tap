import React from 'react'
import useFirebase from '../../hook/useFirebase'
import { actions } from '../../actions'
import FormAbout from '../../components/views/Forms/About'
import useFirebaseAuth from '../../hook/useFirebaseAuth'
import { Container, Typography } from '@mui/material'
const About = () => {
  const {data, loading, error} = useFirebase(actions.GET_ALL,{path:'about'}) 
  //  try to put it in the layout 
  const { user, loading: userLoading } = useFirebaseAuth();
  if(loading || userLoading) return <p>Loading...</p>
  if(error) return <h1>{error.message}</h1>
  return (
    <Container>
      {/* try to put it in the layout */}
        <Typography variant='h5' component='h1' sx={{margin:'20px auto',width:"100%",textAlign:'center'}} >Welcome {user.email}</Typography>
          {/* {data?.map((el) => (
            <div key={el.id}>
              <h2>{el?.title}</h2>
              <p>{el?.subTitle}</p>
              <p>{el?.description}</p>
            </div>
          ))} */}
          <FormAbout data={data[0]}/>
    </Container>
  )
}

export default About