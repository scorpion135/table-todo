import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers } from './../../redux/slices/users';
import { fetchTasks } from './../../redux/slices/tasks';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { RootState, useAppDispatch } from "../../redux/store";
import styles from './UserTable.module.css'

const UserTable: React.FC = () => {
  const dispatch = useAppDispatch();

  const {users, status: usersStatus} = useSelector((state: RootState) => state.users);
  const {tasks, status: tasksStatus} = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTasks());
  }, []);

  const getTaskCountForUser = (userId: number) => {
    return tasks.filter(task => task.userId === userId).length;
  };

  if (usersStatus === 'loading' || tasksStatus === 'loading') {
    return <div style={{ display: 'flex', justifyContent: 'start',  marginTop: '20px', height: '822px' }}>
      <CircularProgress />
    </div>
  }

  return (
    
    <TableContainer component={Paper} elevation={0} sx={{borderRadius: '10px', borderCollapse:'collapse'}}>
      <Table>
        <TableHead>
          <TableRow >
            <TableCell sx={{ fontWeight: '600', backgroundColor: '#464E54', color: '#80858C', fontSize: '10px', padding: '3px 0 3px 0', border: '1.5px solid #464E54', width:'47px', textAlign:'center', '@media (max-width: 670px)': { fontSize: '8px'} }}>#</TableCell>
            <TableCell sx={{ fontWeight: '600', backgroundColor: '#464E54', color: '#80858C', fontSize: '12px', padding: '3px 0 3px 12px', border: '1.5px solid #464E54', '@media (max-width: 670px)': {fontSize: '8px'} }}>USERNAME</TableCell>
            <TableCell sx={{ fontWeight: '600', backgroundColor: '#464E54', color: '#80858C', fontSize: '12px', padding: '3px 0 3px 12px',  border: '1.5px solid #464E54', width:'168px', '@media (max-width: 670px)': {width: '86px', fontSize: '8px', textAlign: 'center'} }}>TO-DO COUNT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{backgroundColor: '#373e45'}}>
          {users.map((user) => (
            <TableRow key={user.id} sx={{height: '56px'}}>
              <TableCell sx={{color: '#fff', border: '1.5px solid #464E54', fontSize:'16px', width:'47px', textAlign:'center', height: '80px', padding: 0, margin: 0, borderRight: 'none', '@media (max-width: 670px)': {fontSize: '12px', height: '56px'}}}>{user.id}</TableCell>
              <TableCell sx={{color: '#fff', border: '1.5px solid #464E54', fontSize:'16px', borderLeft:'none', padding: '0 0 0 12px', height: '80px', margin: 0, borderRight: 'none', '@media (max-width: 670px)': {height: '56px'}}}>
                <div className={styles.user}>
                    <div className={styles.user__avatar}>
                        <img src="./Shape.png" alt="avatar" style={{height: '16.67px', width: '18.23px'}}/>
                    </div>
                    <div>
                        <h3 className={styles.user__name}>{user.name}</h3>
                        <p className={styles.user__email}>{user.email}</p>
                    </div>
                </div>
              </TableCell>
              <TableCell sx={{color: '#fff', border: '1.5px solid #464E54', fontSize:'16px', borderLeft:'none', height: '80px', padding: '0 0 0 12px', margin: 0, '@media (max-width: 670px)': {fontSize: '12px',  textAlign: 'center', padding: '0 11.5px 0 11.5px', height: '56px'}}}>{getTaskCountForUser(user.id)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;