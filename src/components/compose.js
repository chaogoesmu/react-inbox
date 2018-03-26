import React, { Component } from 'react';

class Compose extends Component{

  state={body:'',title:''}

  sendMail = ()=>{
    console.log('sending the mail?');
    console.log(this.state.title);
    console.log(this.state.body);


    fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify({
        'subject': this.state.title,
        'body': this.state.body
      } ),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(x=>console.log(x))
    .catch(x=>console.log(x))
  }

  handleEmailChange = (e)=>{
     this.setState({body: e.target.value});
  }
  handleSubjectChange = (e)=>{
     this.setState({title: e.target.value});
  }

  render(){
    return(
      <form className="form-horizontal well">
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="subject" placeholder="Enter a subject" value={this.state.title} onChange={this.handleSubjectChange}>
            </input>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
            <textarea name="body" id="body" className="form-control" value={this.state.body} onChange={this.handleEmailChange}></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input value="Send" className="btn btn-primary" onClick={this.sendMail}></input>
          </div>
        </div>
      </form>
    )
  }
}




export default Compose;
