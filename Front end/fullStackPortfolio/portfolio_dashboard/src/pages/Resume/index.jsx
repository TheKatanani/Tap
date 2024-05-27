import useFirebase from '../../hook/useFirebase'
import { actions } from '../../actions'
import useFirebaseAuth from '../../hook/useFirebaseAuth'
import { Container, Typography } from '@mui/material'
import FormResume from '../../components/views/Forms/Resume'
import { useState } from 'react'
import { initState } from '../../components/views/Forms/Resume/data'
import TablesResume from './Table'
const Resume = () => {
  const { data, loading, error } = useFirebase(actions.GET_ALL, { path: 'resume' })

  const { user, loading: userLoading } = useFirebaseAuth();
  const [update, setUpdate] = useState({
    isUpdate: false,
    data: initState
  })

  if (loading || userLoading) return <p>Loading...</p>
  if (error) return <h1>{error.message}</h1>
  return (
    <Container>
      {/* try to put it in the layout */}
      <Typography variant='h5' component='h1' sx={{ margin: '20px auto', width: "100%", textAlign: 'center' }} >Welcome {user.email}</Typography>
      <FormResume {...{ update, setUpdate }} />
      <TablesResume {...{ data, setUpdate }} />
    </Container>
  )
}

export default Resume