import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell, StyledTableRow } from './style';
import Delete from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import { deleteDoc, doc } from 'firebase/firestore';
import { colRef } from '../../../hook/useFirebase';


export default function TablesResume({ data, setUpdate }) {
  const handleUpdate = (data) => {
    setUpdate({ isUpdate: true, data })
  }
  const handleDelete = (id) => {
    deleteDoc(doc(colRef('resume'), id))
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
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="right">box length</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                  <StyledTableCell align="right">{row.title}</StyledTableCell>
                  <StyledTableCell align="right">{row?.boxs?.length}</StyledTableCell>

                  <StyledTableCell align="right">
                    <Edit sx={{ cursor: 'pointer' }}
                      onClick={() => handleUpdate(row)}
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