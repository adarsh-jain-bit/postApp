import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Grid, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch } from 'react-redux';
import { deletedPost } from '../utils/dataSlice';

export default function SingleCard({ data }) {
  const dispatch = useDispatch();

  if (!Array.isArray(data)) return null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const deletePost = (id) => {
    dispatch(deletedPost(id)); // Use the unique URL to delete the post
  };

  return (
    <Grid container spacing={2}>
      {data.map(({ id,source, content, title, urlToImage, publishedAt, url }) => (
        <Grid item xs={12} sm={6} md={4} key={id}>
          <Card sx={{ maxWidth: 345, marginBottom: 3, position: 'relative' }}>
            <Box sx={{ position: 'absolute', right: '0px', top: '0px', zIndex: 10 }}>
              <CancelIcon fontSize='large' onClick={() => deletePost(id)} />
            </Box>
            <CardActionArea sx={{ padding: '8px' }}>
              <CardContent>
                <CardMedia
                  component="img"
                  height="140"
                  image={urlToImage || '/assets/img1.png'}
                  alt={title || 'News Image'}
                  sx={{ paddingBottom: '8px' }}
                />
                <Typography gutterBottom variant="h6" component="div" textAlign="left">
                  {title ? `${title.slice(0, 25)}...` : 'No title available'}
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'left' }} color="text.secondary">
                  {content ? `${content.slice(0, 170)}...` : 'No content available'}{' '}
                <Typography component="div">
                <a href={url} target="_blank" rel="noopener noreferrer" >
                    Read more
                  </a>
                </Typography>
                </Typography>
                <Divider sx={{ marginY: 1 }} />
                <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle2" component="div" sx={{ marginTop: 1 }}>
                    {source.name || 'Unknown Author'}
                  </Typography>
                  <Typography variant="caption" component="div" color="text.secondary">
                    {publishedAt ? formatDate(publishedAt) : 'Unknown Date'}
                  </Typography>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
