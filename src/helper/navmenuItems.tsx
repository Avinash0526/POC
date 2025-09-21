import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import ReportIcon from '@mui/icons-material/Assessment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';

interface MenuItemProps {
    text: string;
    icon: React.ReactNode;
}

export const MenuItem: React.FC<MenuItemProps> = ({ text, icon }) => {
    return (
        <div className="menu-item">
            {icon}
            <span>{text}</span>
        </div>
    );
};

export const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'T-Min', icon: <SchoolIcon /> },
    { text: 'Trainings', icon: <AssignmentIcon /> },
    { text: 'Reports', icon: <ReportIcon /> },
    { text: 'Tickets Status', icon: <AssignmentIcon /> },
    { text: 'Alerts', icon: <NotificationsIcon /> },
    { text: 'Profile', icon: <PersonIcon /> },
    { text: 'Setting', icon: <SettingsIcon /> },
];

// Example usage of MenuItem component
export const MenuList: React.FC = () => {
    return (
        <div>
            {menuItems.map((item, index) => (
                <MenuItem key={index} text={item.text} icon={item.icon} />
            ))}
        </div>
    );
};