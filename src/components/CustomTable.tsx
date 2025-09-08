import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import type { Column, RowData } from '../../types/ComponentTypes';

interface Props {
  columns: Column[]
  rows: RowData[]
  ariaLabel?: string
}

const CustomTable = ({
  columns,
  rows,
  ariaLabel,
}: Props) => {
  
  return (
    <Box
      sx={{
        padding: '10px',
        borderRadius: '10px',
        backgroundColor: '#f0f0f0'
      }}
    >
      <TableContainer component={Paper}>
        <Table
          stickyHeader
          sx={{ minWidth: 650 }}
          aria-label={ariaLabel}
        >
          <TableHead>
            <TableRow>
              {
                columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      backgroundColor: '#fff'
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                {
                  columns.map((column) => (
                    <TableCell
                      key={column.id}
                    >
                      {row[column.id]}
                    </TableCell>
                  ))
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CustomTable