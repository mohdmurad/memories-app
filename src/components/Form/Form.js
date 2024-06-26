import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper} from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts';



const Form = ({currentId, setCurrentId}) => {
  const [postData, setPostData] = useState({title: '', message: '', tags: '', selectedFile: '' });
   const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({title: '', message: '', tags: '', selectedFile: '' });
  };
  // creator: ''


  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories like other's memories.
        </Typography>
      </Paper>
    );
  }
  //   if (currentId) {
  //     dispatch(updatePost(currentId, postData));
  //     clear();
  //   } else {
  //     dispatch(createPost(postData));
  //     clear();
  //   }
  // }

  return (

<Paper>
<form style={{padding: "12px", borderRadius: "2px solid gray",}} autoComplete="off" noValidate  onSubmit={handleSubmit}>
  <div>
        <Typography textAlign={'center'} variant="h5">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
        <TextField style={{marginBottom: "10px"}} name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField style={{marginBottom: "10px"}} name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField style={{marginBottom: "10px"}} name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div style={{marginBottom: "10px"}} sx={{width: '97%',margin: '10px 0',}}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button sx={{ marginBottom:1,}} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear}  fullWidth>Clear</Button>
        </div>
      </form>
    </Paper> 
     )
}

export default Form