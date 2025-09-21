import React from 'react';
import { GridColDef } from '@mui/x-data-grid';

export interface RootState {
  // Define the shape of the root state of your Redux store
}

export interface AppDispatch {
  // Define the type for the dispatch function
}

export interface MainLayoutProps {
  children: React.ReactNode;
}

export interface DataTableProps {
  columns: GridColDef[];
  rows: any[];
  pageSizeOptions?: number[];
}