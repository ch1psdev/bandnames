import { useContext, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { SocketContext } from '../context/SocketContext';

ChartJS.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

export const BandChart = () => {

  const { socket } = useContext( SocketContext );
  const chartRef = useRef(null);

  useEffect(() => {
    socket.on('current-bandList', (bands) => {
      crearGrafica( bands )
    })
  }, [ socket ])
  

    const crearGrafica = ( bands = []) => {
      

        const ctx = document.getElementById('myChart');

        // Destruye el gráfico anterior si existe
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        chartRef.current = new ChartJS(ctx, {
            type: 'bar',
            data: {
            labels: bands.map( band => band.name),
            datasets: [{
                label: '# of Votes',
                data: bands.map( band => band.votes),
                backgroundColor: [
              'rgba(255, 99, 132, 0.2)',   // rojo
              'rgba(255, 206, 86, 0.2)',   // amarillo
              'rgba(75, 192, 192, 0.2)',   // verde agua
              'rgba(54, 162, 235, 0.2)',   // azul
              'rgba(153, 102, 255, 0.2)',  // morado
              'rgba(201, 203, 207, 0.2)',  // gris
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(201, 203, 207, 1)',
            ],
                borderWidth: 1
            }]
            },
            options: {
              animation: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                indexAxis: 'y',
            }
        });
    }
    

    

  return (
     <canvas id="myChart"></canvas>
  )
}
