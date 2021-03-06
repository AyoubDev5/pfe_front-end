import "./chart.css";
import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,

  BarElement,
  CategoryScale, 
  BarController,
  LinearScale

} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import axios from "axios";
import { useParams } from "react-router-dom";

ChartJS.register(
  BarElement,
  CategoryScale,
  BarController, 
  LinearScale,
);

export default function Chart(props) {

  const URL_NODE_API = "https://node-server-construction.herokuapp.com";
  const [rowData, setRowData] = useState([]);
  const [chart, setChart] = useState({});

  const {idTache}=useParams();

  useEffect(() => {
    var apiurl = URL_NODE_API + `/materiels/${idTache}`;
    axios
      .get(apiurl)
      .then((response) => {
      
          // console.log("chart", response);
          setChart(response)
      })
  }, []);
  
  var data = {
    labels: chart?.data?.map(x=>x.type_materiel),
    datasets: [{
      label: `Type des Materiels avec le Prix`,
      data: chart?.data?.map(x=>x.prix_unitaire * x.quantite),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };
  
  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }
  


  return (
    <div className="chart">
      <Bar
        data={data}
        height={400}
        options={options}
      />
    </div>
  );
}