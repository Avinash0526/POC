import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
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

const Dashboard: React.FC = () => {
  // Stats
  const stats = [
    { label: 'Completed Tasks', value: 27, color: '#4caf50' },
    { label: 'Tasks Rejected', value: 27, color: '#f44336' },
    { label: 'Tasks In Progress', value: 27, color: '#ff9800' },
    { label: 'New Tasks', value: 27, color: '#2196f3' },
  ];

  const columns = [
    { id: 'ESLID', label: 'ESL ID', sortable: true, minWidth: 100 },
    { id: 'Severity', label: 'Severity' },
    { id: 'AssignedDate', label: 'Assigned Date' },
    { id: 'BusinessTeam', label: 'Business Team', sortable: true, minWidth: 200 },
    { id: 'DueInDays', label: 'Due in Days' },
    { id: 'Unit', label: 'Unit' },
    { id: 'EquipmentType', label: 'Equipment Type' },
    { id: 'Status', label: 'Status' },
    { id: 'ProcessDescription', label: 'Process Description' },
    { id: 'ProcessDescription1', label: 'Process Description1' },
    { id: 'ProcessDescription2', label: 'Process Description2' },
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
      ProcessDescription1: 'Product Manifold System',
      ProcessDescription2: 'Product Manifold System',
      ProcessDescription3: 'Product Manifold System',
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
      ProcessDescription1: 'Product Manifold System',
      ProcessDescription2: 'Product Manifold System',
      ProcessDescription3: 'Product Manifold System',
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
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Typography variant="h5" sx={{ mb: 2 }}>
          Welcome, Steven
        </Typography>

        {/* Stats */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {stats.map((stat, i) => (
            <Grid key={i}>
              <Card sx={{ bgcolor: stat.color, color: '#fff' }}>
                <CardContent>
                  <Typography variant="h6">{stat.value}</Typography>
                  <Typography variant="body2">{stat.label}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        
        <DataTable
          title="END OF SERVICE LIFE MANAGEMENT"
          columns={columns}
          rows={rows}
        />

        {/* Chart */}
        <Box sx={{ mt: 4, width: '100%', maxWidth: 800 }}>
          <Typography variant="h6">Work Report</Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
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
    </MainLayout>
  );
};

export default Dashboard;
