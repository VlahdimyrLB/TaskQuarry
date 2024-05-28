import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

import { Card, CardBody, Typography } from "@material-tailwind/react";

const FeatureStatusCount = ({ features }) => {
  if (!features) {
    return <p>Loading...</p>;
  }

  const statusCounts = features.reduce((acc, feature) => {
    acc[feature.status] = (acc[feature.status] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom", // Position the legend at the bottom
      },
    },
  };

  return (
    <Card className="h-[380px] mx-5">
      <Typography className="text-center pt-5 font-semibold">
        Feature Status Distribution
      </Typography>
      <CardBody className="flex justify-center items-center h-[380px]">
        <div className="w-full h-full">
          <Pie data={data} options={options} />
        </div>
      </CardBody>
    </Card>
  );
};

export default FeatureStatusCount;
