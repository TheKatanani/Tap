import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell, StyledTableRow } from './style';
import { Link } from 'react-router-dom';
import Delete from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import { deleteDoc, doc } from 'firebase/firestore';
import { colRef } from '../../../hook/useFirebase';


export default function TableProjects({ data, setUpdate }) {
  const handleDelete = (id) => {
    deleteDoc(doc(colRef('project'), id))
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };
  if (data) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="right">Sub Title</StyledTableCell>
              <StyledTableCell align="right">Image</StyledTableCell>
              <StyledTableCell align="right">Mockup</StyledTableCell>
              <StyledTableCell align="right">Is Mian Project</StyledTableCell>
              <StyledTableCell align="right">Technologies</StyledTableCell>
              <StyledTableCell align="right">Links</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">Discription</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map((row,i) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">{i+1}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                  <StyledTableCell align="right">{row.title}</StyledTableCell>
                  <StyledTableCell align="right">{row.subTitle}</StyledTableCell>
                  <StyledTableCell align="right">
                    <img src={row.image} alt="img" />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <img src={row.mockup} alt="mockup" />
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.isMainProject ? "True" : "False"}</StyledTableCell>
                  <StyledTableCell align="right">
                    {
                      row.technologies.map((tech,i) => (
                        <span key={i}>{tech}</span>
                      ))
                    }
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Link to={`/${row.demo}`}>demo</Link>
                    <Link to={row.repo}>repo</Link>
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.category}</StyledTableCell>
                  <StyledTableCell align="right">{row.description?.header&&row.description?.header.slice(0, 20)}...</StyledTableCell>
                  <StyledTableCell align="right">
                    <Edit sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        setUpdate({ isUpdate: true, data: row })
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right"
                  ><Delete sx={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(row.id)}
                    /></StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}