import React, { Component } from 'react'
import axios from 'axios';
import Timer from './timer';
import Graph from './graph'
import "bootstrap/dist/css/bootstrap.min.css";
import ResponsiveContainer from "react-responsive-widget";
import {Link} from 'react-router-dom';
import './layout.css';


const Stock = props =>(


<Link className="app-col-6 app-col-lg-2 stock-card text-white"  onClick={() => {props.getStock(props.stockname._id) }} >{props.stockname.stock}</Link>


)


export default class trade extends Component {

  
    constructor() {
        super();
        this.state = {
            
          selectedOption:'none',
          RETURN:0,
          AMOUNT:0,
          invest:0,
          CAPITAL:10000,
          isSellButton: false,
          isInvestButton: false,
          check:1,
          ch:true,
          flag:false,
          graph:true,
          stock_array:[],
         

          
         }

         this.onSell = this.onSell.bind(this);
         this.onChangeInvest = this.onChangeInvest.bind(this);
         this.onLaunchClicked = this.onLaunchClicked.bind(this);
         this.formSubmit=this.formSubmit.bind(this);
         this.getStock = this.getStock.bind(this);
         this.graph = this.graph.bind(this);
         this.onCheck = this.onCheck.bind(this);

      }
       

    

      componentDidMount() {

      axios.get('http://localhost:4000/return/')
        .then(response => {
          this.setState({ stock_array: response.data })
        })
        .catch((error) => {
          console.log(error);
        })
      }


    getStock(id)
    {
      if(this.state.ch)
      {
        this.setState({graph:true})
      }
      axios.get('http://localhost:4000/return/'+id)
        .then(response => {
          this.setState({
            selectedOption: response.data.stock,
            RETURN: response.data.RETURN,
            graph:true,
            })   
        })
        .catch(function (error) {
          console.log(error);
        })
        
    }

    graph()
    {
      this.setState({graph:false})
    }

    onCheck()
    {
      this.setState({graph:true})
    }


    stockList() {
        return this.state.stock_array.map(currentstock => {
          return <Stock stockname={currentstock} key={currentstock._id} getStock={this.getStock}/>
          })
      }

  
      
    // returns the value after sell is click - return amout and total amount
    async onSell(event)
    {
      if((this.state.selectedOption)=="" || (this.state.invest)==0)
      {
        window.alert("Select a stock and invest to sell")
      }
      else {
      
            if(this.state.check==1)
            {
            await this.setState({
              AMOUNT:(this.state.RETURN)*(this.state.invest),
              CAPITAL: (this.state.CAPITAL)+(this.state.AMOUNT),
              check:2
            })
            }
            if(window.confirm('you are about to sell'))
              {
              await this.setState({
              AMOUNT:(this.state.RETURN)*(this.state.invest),
              CAPITAL: (this.state.CAPITAL)+(this.state.AMOUNT),
              isSellButton:true,
              
            })
            console.log('hell',(this.state.AMOUNT),(this.state.invest),(this.state.RETURN))
            }
          }
     }


    // to inistialise investment on inputnnn
    onChangeInvest(event)
    {
      this.setState({
        invest:event.target.value
        });
    }

   

    formSubmit(event)
    {
      event.preventDefault();
      console.log(this.state.selectedOption)
    }
    
    
    
    // submits to disble the sell amount for specific time - submits after fix investment
   onLaunchClicked (event) 
   {
    
     event.preventDefault();
      if(this.state.selectedOption=="none")
      {
        window.alert("Select a stock to invest")
      }

      else {
          //to check the investment amount
          if((this.state.invest)>1 && (this.state.invest)<=(this.state.CAPITAL))
          {
            //to confirm investemnt
            if(window.confirm('Investment can be made only once, click OK to proceed'))
            {
              this.setState({
                  isSellButton: true,
                  CAPITAL:(this.state.CAPITAL)-(this.state.invest),
                  isInvestButton:true ,
                  ch:false,
                  flag:true   
                });
              // timer 
              setTimeout(() => this.setState({ isSellButton: false ,flag:false}), 90000);
            }
          }

          // alert for invalid input
          else{
            window.alert("Amount cannot be 0 or greater than the CAPITAL provided")
            this.setState({invest:0});
          }
      }
   }



   render()
   {
       return(
        <ResponsiveContainer sm="600" md="900" lg="900" xl="1300">
            <form onSubmit={this.formSubmit}>
            <div className="app-row ">
              {(this.state.graph) ?
              
                <div >
            <div className="app-row">
                <div className="stocklist">
                  <div className="container">
                    <h3>STOCK LIST</h3>
                    {this.stockList()}
                    </div>
                </div>
            </div>
          
                  <div className="container-md">
                <button disabled={this.state.isInvestButton} className="search-button" type="submit" onClick={this.graph} >
                      SELECT STOCK
                      </button>
                    <Graph cap={this.state.CAPITAL} name={this.state.selectedOption}/>
                </div>
                
                </div>:

                        <div className=" ">
                       
                            <div className="container">
                            <h4 className ="text-white m-2">STOCK INVESTMENT</h4>
                            <input className="input1 ml-1 mt-2" type="text" placeholder="Enter the investment amount" onChange={this.onChangeInvest} ></input>
                              <button disabled={this.state.isInvestButton} className="btn btn-danger  m-2" type="submit" onClick={this.onLaunchClicked} >
                              Fix investment
                              </button>
                              <button disabled={this.state.isInvestButton} className="btn btn-primary m-2" type="submit" onClick={this.onCheck} >
                              Select Stock
                              </button>
                            

                                <p  className="card-head font-weight-bold">SELL YOUR STOCK TO GET RETURNS</p>
                                <form onSubmit={this.onSell}>
                                <div className="card-calc ml-1">
                                  <p>Selected STOCK is : <b>{this.state.selectedOption} </b> </p>
                                  <p>Capital by {this.state.selectedOption}: 10000/-</p>
                                  <p>Active Amount: {this.state.CAPITAL}</p>
                                
                                  <div className="time-card">
                                  {(this.state.flag)?
                                  <div className="m-2">
                                    Sell will be enabled after :<Timer/>
                                    </div>:<div></div>}
                                  </div>
                                  <button disabled={this.state.isSellButton} className=" float-left btn bg-success  m-2" type="submit">
                                    Sell
                                  </button>
                                </div>
                                </form>
                            </div>
                        </div>

                

                    }
            </div>
            </form>
        </ResponsiveContainer>
          
       )
   }
}
