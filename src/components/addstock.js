import React, { Component } from 'react';
import axios from 'axios';

export default class CreateStock extends Component {
  constructor(props) {
    super(props);

    this.onChangeStock = this.onChangeStock.bind(this);
    this.onRETURN = this.onRETURN.bind(this);
    this.onChangePic = this.onChangePic.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      stock: '',
      RETURN:0,
      pic:''
    }
  }

  onChangeStock(e) {
    this.setState({
      stock: e.target.value
    })
  }

  onRETURN(e) {
    this.setState({
      RETURN: e.target.value
    })
  }

  onChangePic(e) {
    this.setState({
      pic: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const trade = {
      stock: this.state.stock,
      RETURN: this.state.RETURN,
      pic: this.state.pic,
    }

    console.log(trade);

    axios.post('http://localhost:4000/return/addlist', trade)
      .then(res => console.log(res.data));

    this.setState({
      stock: '',
      RETURN:0.0,
      pic:''
    });
  }





  render() {
    return (
      <div className="container">
        <h3>Create New Stock</h3>
        <form onSubmit={this.onSubmit}>
          
          <div className="form-group"> 
            <label>Stock Name </label>
            <input  type="text"
                
                className="form-control"
                value={this.state.stock}
                onChange={this.onChangeStock}
                />
          </div>

          <div className="form-group"> 
            <label>Return % provided </label>
            <input  type="text"
                
                className="form-control"
                value={this.state.RETURN}
                onChange={this.onRETURN}
                />
          </div>

          <div className="form-group"> 
            <label>data link </label>
            <input  type="text"
                
                className="form-control"
                value={this.state.pic}
                onChange={this.onChangePic}
                />
          </div>

          
          <div className="form-group">
            <input type="submit" value="Create Stock Data" className="btn btn-primary" />
          </div>
        
        </form>
      </div>
    )
  }
}