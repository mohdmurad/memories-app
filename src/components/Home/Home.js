import React, {useEffect, useState} from 'react'
import { Container, Grow, Grid, Box } from '@mui/material';
 import Posts from '../Posts/Posts';
 import Form from '../Form/Form';
 import { useDispatch } from 'react-redux';
 import {getPosts} from '../../actions/posts'

const Home = () => {
    const dispatch = useDispatch()
const [currentId, setCurrentId] = useState(0);

useEffect(()=>{
  dispatch(getPosts())
  // eslint-disable-next-line 
}, [currentId, dispatch])
{/* <Grid item xs={12} sm={8} order={{xs:2,sm:1}}> */}
{/* <Grid item xs={12} sm={4} order={{xs:1,sm:2}}> */}

  return (
<Grow in>
        <Container>
          <Grid container  justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={8}  order={{xs:2,sm:1}}>
              <Posts setCurrentId = {setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}  order={{xs:1,sm:2}}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>   )
}

export default Home