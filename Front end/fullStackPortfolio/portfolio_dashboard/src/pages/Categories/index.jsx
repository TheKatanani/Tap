import { Container } from '@mui/material'
import FormCategories from '../../components/views/Forms/Catefories'
import useFirebase from '../../hook/useFirebase'
import { actions } from '../../actions'

const Categories = () => {
  const {data, loading, error} = useFirebase(actions.GET_ALL,{path:'categories'}) 
  if(loading) return <p>Loading...</p>
  if(error) return <h1>{error.message}</h1>
  return (
    <Container>
      <FormCategories {...{data}}/>
    </Container>
  )
}

export default Categories