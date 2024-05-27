import { Container } from '@mui/material'
import React from 'react'
import UploadResume from './UploadResume'
import { Link } from 'react-router-dom'
import useFirebase from '../../hook/useFirebase'
import { actions } from '../../actions'
import styled from 'styled-components'
const StyleP = styled.p`
  padding:50px 0px;
  a{
    color:blue;
  }
`
const ResumeFile = () => {
  const { data, loading, error } = useFirebase(actions.GET_ALL, { path: 'resumeFile' })
  if (loading) return <p>Loading...</p>
  if (error) return <h1>{error.message}</h1>

  return (
    <Container>
      <UploadResume/>
      <StyleP>the current pdf file is: <Link target='_blank' to={data[0].url}>click here</Link></StyleP>
    </Container>
  )
}

export default ResumeFile