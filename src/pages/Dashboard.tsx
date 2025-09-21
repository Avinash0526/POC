import React from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import DataTable from '../components/DataTable';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import MainLayout from '../components/MainLayout';
import { UserInfoHeader } from './user-info-header/UserInfoHeader';

const Dashboard: React.FC = () => {
  const columns = [
    { id: 'ESLID', label: 'ESL ID', sortable: true, minWidth: 150 },
    { id: 'Severity', label: 'Severity' },
    { id: 'AssignedDate', label: 'Assigned Date' },
    { id: 'BusinessTeam', label: 'Business Team', sortable: true, minWidth: 200 },
    { id: 'DueInDays', label: 'Due in Days' },
    { id: 'Unit', label: 'Unit' },
    { id: 'EquipmentType', label: 'Equipment Type' },
    { id: 'Status', label: 'Status' },
    { id: 'ProcessDescription', label: 'Process Description', minWidth: 300 },
  ];

  const rows = [
    {
      ESLID: '107011',
      Severity: 'Critical',
      AssignedDate: '30/07/2025',
      BusinessTeam: 'CDCC',
      DueInDays: '2 days',
      Unit: 'PS3',
      EquipmentType: 'Piping',
      Status: 'Inprogress',
      ProcessDescription: 'Product Manifold System',
    },
    {
      ESLID: '107012',
      Severity: 'High',
      AssignedDate: '30/07/2025',
      BusinessTeam: 'CLEU5',
      DueInDays: '2 days',
      Unit: 'WLFS',
      EquipmentType: 'Piping',
      Status: 'Under MSP review',
      ProcessDescription: 'SOUR Water System',
    },
  ];

  // Chart data
  const chartData = [
    { name: 'Week 1', value: 10 },
    { name: 'Week 2', value: 15 },
    { name: 'Week 3', value: 20 },
    { name: 'Week 4', value: 30 },
  ];

  
  return (
    <MainLayout>
      <Box sx={{ p: 3, paddingTop: '5rem' }}>
        <UserInfoHeader />
        <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
          {/* Data Table */}
          <DataTable
            title="Recent ESL Task"
            columns={columns}
            rows={rows}
            showActions={{ view: true }}
          />

          {/* Chart */}
          <Box
            sx={{
              mt: 4,
              width: '100%',
              maxWidth: 800,
              borderRadius: '10px',
              boxShadow: 3,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ backgroundColor: '#FDF3F3', padding: 1, mb: 2, fontWeight: 600 }}
            >
              Work Report
            </Typography>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart  data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#1976d2"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Dashboard;
