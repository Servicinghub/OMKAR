import { useState } from 'react';
import { Grid ,Typography} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
const user = useSelector((state)=>state.user)
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
 <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard {user.name}</Typography>
            </Grid></Grid>
        );
};

export default DashboardDefault;
