import { styled } from '@mui/material/styles';

const ModalContainer = styled('div')(({ theme }) => ({
  width: '30%',
  maxHeight: '50%',
  padding: theme.spacing(3),
  backgroundColor: 'white',
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

export default ModalContainer;
