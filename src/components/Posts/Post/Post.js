import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';

import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deletePost, likePost } from '../../../actions/posts';

const Post = ({post, setCurrentId}) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (post.likes?.length > 0) {
      // (user?.result?.googleId ||
      return post.likes.find((like) => like ===  user?.result?._id)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };






  return (
    
    <Card sx={{
    display: 'flex',flexDirection: 'column',justifyContent: 'space-between',borderRadius: '15px',height: '100%',position: 'relative',    height: '100%',
    border: 'solid',
  }}>
    <CardMedia sx={{height: 0,paddingTop: '56.25%',backgroundColor: 'rgba(0, 0, 0, 0.5)',backgroundBlendMode: 'darken',}} image={post.selectedFile} title={post.title} />
    <div sx={{position: 'absolute',top: '20px',left: '20px',color: 'white',}}>
      <Typography sx={{padding: '0 16px',}} variant="h6">{post.name}</Typography>
      <Typography sx={{padding: '0 16px',}}   variant="body2">{moment(post.createdAt).fromNow()}</Typography>
    </div>
    {( user?.result?._id === post?.creator) && (

    <div sx={{position: 'absolute',top: '20px',right: '20px',color: 'white',}}>
    <Button size="large" onClick={()=>setCurrentId(post._id)}><EditIcon fontSize="default" />Edit</Button>
    </div>
    )}
    <div sx={{display: 'flex',justifyContent: 'space-between',margin: '20px',}}>
      <Typography sx={{padding: '0 16px',}} variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
    </div>
    <Typography sx={{padding: '0 16px',}} gutterBottom variant="h5" component="h2">{post.title}</Typography>
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
    </CardContent>
    <CardActions sx={{padding: '0 16px 8px 16px',display: 'flex',justifyContent: 'space-between',}}>

      <Button size="small" color="primary" disabled={!user?.result} onClick={()=>dispatch(likePost(post._id))}>
        <Likes/> </Button>


        {(user?.result?._id === post?.creator) && (
        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
        )}
      {/* <Button size="small" color="primary"onClick={()=>dispatch(deletePost(post._id))} >
        <DeleteIcon fontSize="small" /> Delete</Button> */}
    </CardActions>
  </Card>  )
}

export default Post