import React, { Component } from 'react';
import Toolbar from './components/toolbar-inbox.js';
import MessageList from './components/messageList.js';
import Compose from './components/compose.js';
import './App.css';

class App extends Component {
  state={inbox:[], composing: true}
  // constructor(){
  //   super()
  // }
  async componentDidMount() {
    if(this.state.inbox.length===0)
    {
      const inbox = await fetch('http://localhost:8082/api/messages')
      const json = await inbox.json()
      this.setState({inbox: json._embedded.messages})
    }
  }

  newMail=()=>{
    this.state.composing=!this.state.composing;
    this.setState(this.state);
    return this.state.composing;
  }


  updateState=(message, del=false)=>
  {
    //this is the single worst implementation of this I could think of but doesn't require me to rewrite this function or be intelligent... TODO if performance becomes an issue, find the changes before telling the server to update.
    //get the index of the message in question.
    let ind = this.state.inbox.findIndex(x=>(x.id===message.id));
    //set the message in qestion to the message passed
    if(del)
    {
      fetch('http://localhost:8082/api/messages', {
        method: 'PATCH',
        body: JSON.stringify({
          'messageIds': [this.state.inbox[ind].id],
          'command': 'delete'
        } ),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then()
      this.state.inbox.splice(ind,1);
    }
    else {
      //starred
      fetch('http://localhost:8082/api/messages', {
        method: 'PATCH',
        body: JSON.stringify({
          'messageIds': [this.state.inbox[ind].id],
          'command': 'star',
          'star': message.starred
        } ),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then()
      //read
      fetch('http://localhost:8082/api/messages', {
        method: 'PATCH',
        body: JSON.stringify({
          'messageIds': [this.state.inbox[ind].id],
          'command': 'read',
          'read': message.read
        } ),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then()
      //add/remove label
      if(message.labels.length >this.state.inbox[ind].labels.length)
      {
        fetch('http://localhost:8082/api/messages', {
          method: 'PATCH',
          body: JSON.stringify({
            'messageIds': [this.state.inbox[ind].id],
            'command': 'addLabel',
            'label': message.labels.filter(x=>this.state.inbox[ind].labels.indexOf(x)<0)[0].toString()
          } ),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }).then()
      }
      if(message.labels.length <this.state.inbox[ind].labels.length)
      {
        fetch('http://localhost:8082/api/messages', {
          method: 'PATCH',
          body: JSON.stringify({
            'messageIds': [this.state.inbox[ind].id],
            'command': 'removeLabel',
            'label': this.state.inbox[ind].labels.filter(x=>message.labels.indexOf(x)<0)[0].toString()
          } ),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }).then()
      }

      this.state.inbox[ind] = message;
    }
    this.setState(this.state);
  }


  render() {
    return (
      <div className="App">
      <Toolbar
      updateState = {this.updateState}
      inbox={this.state.inbox}
      compose={this.newMail}
      />
      {this.state.composing?<Compose />:''  }
      <MessageList
      updateState = {this.updateState}
      inbox={this.state.inbox}
      />
      </div>
    );
  }
}

export default App;
