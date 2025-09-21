import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  Paper,
  IconButton,
  TableSortLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ArrowsIcon } from '../icons/ArrowsIcon';
import { SortingOrderIcon } from '../icons/SortingOrderIcon';

type Column = {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  sortable?: boolean;
};
type Order = 'asc' | 'desc';
type Row = {
  [key: string]: string | number;
};

interface DataTableProps {
  title?: string;
  columns: Column[];
  rows: Row[];
  showActions?: {
    view?: boolean;
    edit?: boolean;
    delete?: boolean;
  };
  onView?: (row: Row) => void;
  onEdit?: (row: Row) => void;
  onDelete?: (row: Row) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  columns,
  rows,
  showActions = { view: false, edit: false, delete: false },
  onView,
  onEdit,
  onDelete,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState<string>('');
  const [order, setOrder] = useState<Order>('asc');

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (columnId: string) => {
    const isAsc = orderBy === columnId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(columnId);
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (!orderBy) return 0;
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredRows = sortedRows.filter((row) =>
    Object.values(row).join(' ').toLowerCase().includes(search.toLowerCase()),
  );
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'red';
      case 'High':
        return 'orange';
      case 'Medium':
        return 'purple';
      case 'Low':
        return 'blue';
      default:
        return 'inherit';
    }
  };

  const getStatusColor = (status: string) => {
    if (status.includes('Inprogress')) return 'orange';
    if (status.includes('New Task')) return 'blue';
    if (status.includes('MSP Review Completed')) return 'green';
    if (status.includes('Under MSP review')) return 'red';
    return 'inherit';
  };

 const renderSortIcons = (): JSX.Element => (
  <Box sx={{ display: "flex", flexDirection: "row", ml: 1 }}>
    <ArrowsIcon />
    <SortingOrderIcon />
  </Box>
);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* 🔹 Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        py={1}
        borderBottom="1px solid #ddd"
      >
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <TextField
            size="small"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: <SearchIcon fontSize="small" color="action" />,
            }}
          />
        </Box>
      </Box>

      {/* 🔹 Table */}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    backgroundColor: '#F9D8D8',
                    padding: '8px 16px',
                    minWidth: column.minWidth || 100,
                    cursor: column.sortable ? 'pointer' : 'default',
                  }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleSort(column.id)}
                      hideSortIcon={false}
                      IconComponent={renderSortIcons}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
              {showActions.view || showActions.edit || showActions.delete ? (
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    backgroundColor: '#F9D8D8',
                    textAlign: 'center',
                    position: 'sticky',
                    right: 0,
                    zIndex: 2,
                  }}
                >
                  Actions
                </TableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => (
                <TableRow key={i} hover>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === 'Severity') {
                      return (
                        <TableCell
                          key={column.id}
                          sx={{
                            color: getSeverityColor(String(value)),
                            fontWeight: 600,
                            padding: '8px',
                          }}
                        >
                          {value}
                        </TableCell>
                      );
                    }
                    if (column.id === 'Status') {
                      return (
                        <TableCell
                          key={column.id}
                          sx={{
                            color: getStatusColor(String(value)),
                            fontWeight: 600,
                            padding: '8px',
                          }}
                        >
                          {value}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={column.id} sx={{ padding: '8px' }}>
                        {value}
                      </TableCell>
                    );
                  })}

                  {/* 🔹 Actions */}
                  {(showActions.view || showActions.edit || showActions.delete) && (
                    <TableCell
                      align="center"
                      sx={(theme) => ({
                        position: 'sticky',
                        right: 0,
                        zIndex: 2,
                        padding: '8px',
                        backgroundColor: theme.palette.background.paper,
                      })}
                    >
                      <Box display="flex" justifyContent="center" gap={1}>
                        {showActions.view && (
                          <IconButton onClick={() => onView?.(row)}>
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        )}
                        {showActions.edit && (
                          <IconButton onClick={() => onEdit?.(row)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        )}
                        {showActions.delete && (
                          <IconButton onClick={() => onDelete?.(row)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 🔹 Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ borderTop: '1px solid #ddd' }}
      />
    </Paper>
  );
};

export default DataTable;
