import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';




function Graph (props) {
  let lab = [];
  let dat = [];
  for(let i=0; i<10; i++){
  lab[i] = i+1;
  dat[i] = Math.random()*200
}
  const state = {
      labels:lab,
      datasets: [
          {
              label: 'Price',
              data: dat,
              borderColor: ['white'],
              backgroundColor: ['blue'],
              pointBackgroundColor: 'green',
              borderWidth: 2,
              fill: true,
              lineTension: 0.55,
          }
      ]
  }
  return( <Line 
            data={state}
            options={{
            title:{
              display:true,
              text:'Average stock price over 10 days',
              fontSize:20
            }
          }} />

          
  )
}

export default Graph;




