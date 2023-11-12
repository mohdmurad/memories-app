import React, {useEffect, useState} from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button,Box} from '@mui/material';
import memories from '../../images/memories.png';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { deepOrange } from '@mui/material/colors';
import { jwtDecode } from "jwt-decode";

const Navbar = () => {


const [user, setUser]  = useState(JSON.parse(localStorage.getItem('profile')))
const dispatch = useDispatch()
const navigate = useNavigate();
const location = useLocation()


const logout = ()=>{
dispatch({type: 'LOGOUT'})
navigate('/')
setUser(null)
}

useEffect(() => {
  const token = user?.token;

  if (token) {
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < new Date().getTime()) logout();
  }

  setUser(JSON.parse(localStorage.getItem('profile')));
}, [location]);


//  useEffect(()=>{
//  const token  = user?.token
//  setUser(JSON.parse(localStorage.getItem('profile')))

//  },[location])

  return (
    <>
  

       <Box color="success.main" sx={{ flexGrow: 1, marginBottom: 15, backgroundColor: "red" }}>
      <AppBar position="fixed" >
        <Toolbar>
          <IconButton
            size="medium"
            edge="start"
            color="primary"
            aria-label="menu"
            
          >
            {/* <MenuIcon /> */}
            <img src={memories} alt="memories"  height="60"/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MEMORIES
          </Typography>
          {user?.result ? (
             <div >
     {/* <Avatar alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar> */}
              <Button variant='h6'>{user?.result.name.slice(0, 4)}..</Button>
              <Button variant="contained"  color="secondary" onClick={logout}>Logout</Button>
            </div>
          ) : (
            <Button style={{textAlign: "end"}} component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>



       </>
 )
}

export default Navbar