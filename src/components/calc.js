import React, { Component } from 'react'

import axios from 'axios';

export default class Calculation extends Component {

         constructor(props) {
            super(props);
            this.state = {
              
              selectedOption:'',
              RETURN:0,
              AMOUNT:0,
              invest:0,
              CAPITAL:10000,
              isSellButton: false,
              isInvestButton: false,
              flag:false,
              stock_array:[],
              pic:'',
    
            };
            
           // this.formSubmit = this.formSubmit.bind(this);
            this.onValueCAPITAL = this.onValueCAPITAL.bind(this);
            this.onChangeInvest = this.onChangeInvest.bind(this);
            this.onLaunchClicked = this.onLaunchClicked.bind(this);
           // this.onChangeOption = this.onChangeOption.bind(this);
        }

    
        componentDidMount()
        {
            axios.get('http://localhost:4000/return/'+this.props.match.params.id)
            .then(response => {
              this.setState({
                selectedOption: response.data.stock,
                RETURN: response.data.RETURN,
                pic: response.data.pic,
              
              })   
            })
            .catch(function (error) {
              console.log(error);
            })
        }
        

        
      // returns the value after sell is click - return amout and total amount
      onValueCAPITAL(event)
      {
        this.setState({
          AMOUNT : (this.state.RETURN)*(this.state.invest),
          CAPITAL: (this.state.CAPITAL)+(this.state.AMOUNT),
          isSellButton: true,
          
        })
      }

      // to inistialise investment on input
      onChangeInvest(event)
      {
        this.setState({
          
          invest:event.target.value
          });
      }


    

    



     // submits to disble the sell amount for specific time - submits after fix investment
     onLaunchClicked (event) 
     {
       event.preventDefault();

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
                     setTimeout(() => this.setState({ isSellButton: false ,flag:false}), 5000);
                   }
                 }

                 // alert for invalid input
                 else{
                   window.alert("Amount cannot be 0 or greater than the CAPITAL provided")
                   this.setState({invest:0});
                 }
     }


    render() {
        return (
            <div>
                 <form >
                    <div className="history" >
                        <h4 className="text-white m-2">STOCK HISTORY</h4>
                            <div className="container">
                                <div className="history-img">
                                    <div className="card-img">
                                    
                                    <img className="img" src={this.state.pic}></img> 
                                    
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
                    <div className="container">
                          <form >
                          <input className="input1 ml-1 mt-2" type="text" placeholder="Enter the investment amount" onChange={this.onChangeInvest} ></input>
                            <button disabled={this.state.isInvestButton} className="btn btn-danger  m-2" type="submit" onClick={this.onLaunchClicked} >
                            Fix investment
                            </button>
                          </form>

                                <p  className="card-head font-weight-bold">SELL YOUR STOCK TO GET RETURNS</p>
                                <form onSubmit={this.onValueCAPITAL}>
                                <div className="card-calc ml-1">
                                  <p>Selected STOCK is : <b>{this.state.selectedOption} </b> </p>
                                  <p>CAPITAL by {this.state.selectedOption}: 10000/-</p>
                                  <p>Active Amount: {this.state.CAPITAL}</p>
                                  <button disabled={this.state.isSellButton} className="btn bg-success  m-2" type="submit">
                                    Sell
                                  </button>
                                <div>
                                  {(this.state.flag)? "Sell will be enabled after : 5 secs": ""}
                                </div>
                                </div>
                                </form>
                    </div>
              </div>
            </div>
        )
    }
}

