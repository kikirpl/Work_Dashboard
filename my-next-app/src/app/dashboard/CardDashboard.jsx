"use client";

import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useRouter } from "next/navigation";
import kalenderimg from "../../../assets/images/kalender.jpeg";
import worklogimg from "../../../assets/images/worklog.jpeg";
import workorderimg from "../../../assets/images/workorder.jpeg";

const CardDashboard = ({ image, title, buttonText1, path }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(path);
  };

  return (
    <Card className="bg-blue" sx={{ maxWidth: 350, maxHeight: 600 }}>
      {" "}
      <div
        className="border rounded-2xl border-blue-800"
        style={{ position: "relative", height: "200px" }}
      >
        <Image src={image} alt={title} fill style={{ objectFit: "cover" }} />
      </div>
      <CardContent>
        <Typography
          className="text-[#2D60FF]"
          gutterBottom
          variant="h5"
          component="div"
        >
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          className="flex items-center border border-blue-500"
          size="small"
          onClick={handleButtonClick}
        >
          {buttonText1}
        </Button>
      </CardActions>
    </Card>
  );
};

const CardList = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <CardDashboard
          image={worklogimg}
          title="Ingin melihat aktivitas terbaru ?"
          buttonText1="Lihat Aktivitas"
          path="/worklog"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardDashboard
          image={workorderimg}
          title="Ingin melihat tugas kerja terbaru ?"
          buttonText1="Lihat Tugas"
          path="/workorder"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardDashboard
          image={kalenderimg}
          title="Ingin melihat Kalender kerja ?"
          buttonText1="Lihat Kalender"
          path="/kalender"
        />
      </Grid>
    </Grid>
  );
};

export default CardList;
