import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
const SkeletonData = () => {
    let arr = [1,2,3,4,5,6]
  return (
         <Grid container spacing={2}>
        {arr.map(() => (
<Grid item xs={12} sm={6} md={4}>
<Stack spacing={1} width={345}>
 <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
 <Skeleton variant="circular" width={40} height={40} />
 <Skeleton variant="rectangular" width={210} height={60} />
 <Skeleton variant="rounded" width={210} height={60} />
</Stack>
</Grid>
        ))}
        </Grid>
  )
}

export default SkeletonData