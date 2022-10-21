/* eslint-disable no-unused-vars */
import React from 'react';

import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const TaskSkeletonCard = styled(Card)(() => ({
  width: '100%',
}));

// TODO: Improve Skeleton.

const TaskSkeleton = (): JSX.Element => (
  <TaskSkeletonCard>
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rounded" height={60} />
      <Skeleton variant="rounded" height={40} />
    </Stack>
  </TaskSkeletonCard>
);

export default TaskSkeleton;
