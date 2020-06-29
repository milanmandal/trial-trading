import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import './layout.css'





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

  
  
  return( 
        
            <Line 
            
            data={state}
            options={{
            title:{
              display:true,
              fontColor:'white',
              text:`CAPITAL provided: ${props.cap} by ${props.name}`,
              fontSize:20
            }
          }}  />
          
      

          
  )
}

export default Graph;




