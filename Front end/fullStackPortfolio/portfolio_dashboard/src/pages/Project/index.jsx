import useFirebase from '../../hook/useFirebase'
import { actions } from '../../actions'
import useFirebaseAuth from '../../hook/useFirebaseAuth'
import { Container, Typography } from '@mui/material'
import FormProject from '../../components/views/Forms/Project'
import TableProjects from './Table'
import { useState } from 'react'
import { initState } from '../../components/views/Forms/Project/data'
const Project = () => {
  const { data, loading, error } = useFirebase(actions.GET_ALL, { path: 'project' })
  const { user, loading: userLoading } = useFirebaseAuth();
  const [update, setUpdate] = useState({
    isUpdate: false,
    data: initState
  })

  // useEffect(() => {
  //   console.log('Updated update:', update);
  // }, [update]);
  if (loading || userLoading) return <p>Loading...</p>
  if (error) return <h1>{error.message}</h1>
  return (
    <Container>
      {/* try to put it in the layout */}
      <Typography variant='h5' component='h1' sx={{ margin: '20px auto', width: "100%", textAlign: 'center' }} >Welcome {user.email}</Typography>
      <FormProject {...{ update, setUpdate }} />
      <TableProjects {...{ data, setUpdate }} />
    </Container>
  )
}

export default Project