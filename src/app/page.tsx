"use client";

import Carousel from "react-material-ui-carousel";

import { Paper } from "@mui/material";

export default function Home() {
  const items = [
    {
      name: "Image 1",
      imageUrl: "/images/banner-image.png"
    },
    {
      name: "Image 2",
      imageUrl: "/images/banner-image2.png"
    }
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Paper key={i}>
          <img
            src={item.imageUrl}
            alt={item.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Paper>
      ))}
    </Carousel>
  );
}
