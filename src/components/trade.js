

import React, { Component } from 'react'
import axios from 'axios';
import Timer from './timer';
import Stockdetails from './Stockdetails'
import {Link} from 'react-router-dom';
import './layout.css';


const Stock = props =>(

<th>
<Link className="text-white font-size-small"  onClick={() => {props.getStock(props.stockname._id) }} >{props.stockname.stock}</Link>
</th>

)


export class trade extends Component {

  
    constructor() {
        super();
        this.state = {
            
          selectedOption:'',
          RETURN:0,
          AMOUNT:0,
          invest:0,
          CAPITAL:10000,
          isSellButton: false,
          isInvestButton: false,
          check:1,
          flag:false,
          stock_array:[],
         

          
         }

         this.onSell = this.onSell.bind(this);
         this.onChangeInvest = this.onChangeInvest.bind(this);
         this.onLaunchClicked = this.onLaunchClicked.bind(this);
         this.formSubmit=this.formSubmit.bind(this);
         this.getStock = this.getStock.bind(this);
         this.graph = this.graph.bind(this);

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
      axios.get('http://localhost:4000/return/'+id)
        .then(response => {
          this.setState({
            selectedOption: response.data.stock,
            RETURN: response.data.RETURN,
            })   
        })
        .catch(function (error) {
          console.log(error);
        })
        
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

    graph(event)
    {
      return <Stockdetails/>
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
      if(this.state.selectedOption=="")
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
                  flag:true   
                });
              // timer 
              setTimeout(() => this.setState({ isSellButton: false ,flag:false}), 90*1000);
            }
          }

          // alert for invalid input
          else{
            window.alert("Amount cannot be 0 or greater than the CAPITAL provided")
            this.setState({invest:0});
          }
      }
   }


    
      render() {
        return (
       
                <form>
                  
                <div className="stocklist mx-auto">
                    
                <h4 className="m-2">STOCK LIST</h4>
                    <div className="container mx-auto">
                    <table className="table ">
                    
                        <tr>
                        
                        {this.stockList()}
                        
                        </tr>
                    </table>
                    </div>
                </div>

                <form >
                    <div className="history" >
                        <h4 className="text-white m-2">STOCK HISTORY</h4>
                            <div className="container mx-auto">
                                <div className="history-img">
                                    <div className="card-img">
                                      {this.graph()}
                                    </div>
                                </div>
                                
                                <div className="history-info">
                                        <textarea
                                          type="text" 
                                          className="form-control"
                                          placeholder="NOTES..."
                                          />
                                </div>
                            
                            </div>
                    </div>
                </form>

                <div className="data1">
                  <h4 className ="text-white m-2">STOCK INVESTMENT</h4>
                    <div className="container mx-auto">
                          <form >
                          <input className="input1 ml-1 mt-2" type="text" placeholder="Enter the investment amount" onChange={this.onChangeInvest} ></input>
                            <button disabled={this.state.isInvestButton} className="btn btn-danger  m-2" type="submit" onClick={this.onLaunchClicked} >
                            Fix investment
                            </button>
                          </form>

                                <p  className="card-head font-weight-bold">SELL YOUR STOCK TO GET RETURNS</p>
                                <form onSubmit={this.onSell}>
                                <div className="card-calc ml-1">
                                  <p>Selected STOCK is : <b>{this.state.selectedOption} </b> </p>
                                  <p>Capital by {this.state.selectedOption}: 10000/-</p>
                                  <p>Active Amount: {this.state.CAPITAL}</p>
                                  <button disabled={this.state.isSellButton} className="btn bg-success  m-2" type="submit">
                                    Sell
                                  </button>
                                <div>
                                  {(this.state.flag)?
                                  <div>
                                   Sell will be enabled after :<Timer/>
                                   </div>: 
                                   ""}
                                </div>
                                </div>
                                </form>
                    </div>
                    </div>
                
                </form>
  
        );
    }
    
    
}

export default trade
