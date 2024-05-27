import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell, StyledTableRow } from './styleTable';
import Delete from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';


export default function TableBoxs({ data, setBoxUpdate  , setFormData}) {
  const handleUpdate = (data) => {
    setBoxUpdate({ isUpdate: true, data })
  }
  const handleDelete = (id) => {
    // this delete form the state not from firebase becous I wanna display the form data items then save all the table as a new item in the array and hase an id  
    setFormData(prev => ({ ...prev, boxs: prev.boxs.filter(box => box.id !== id) }))
  };
  if (data?.length) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="right">lists</StyledTableCell>
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
                  <StyledTableCell align="right">{row.lists.map(li => (
                    <p key={li.id}>{li.data}</p>
                  ))
                  }</StyledTableCell>

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
  else{
    return <p>no boxs yet</p>
  }
}