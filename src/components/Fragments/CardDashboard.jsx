import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import cardimg from "../../assets/images/Data.jpeg";

const CardDashboard = () => {
  return (
    <Card sx={{ maxWidth: 250, maxHeight: 500 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="80px"
        image={cardimg}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

const CardList = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <CardDashboard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardDashboard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardDashboard />
      </Grid>
    </Grid>
  );
};

export default CardList;
