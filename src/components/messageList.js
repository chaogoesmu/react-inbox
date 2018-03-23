import React, {Component} from 'react';
import Messages from './messages.js';

const MessageList =(props)=>
(
  props.inbox.map((x,i)=>{
    return <Messages key={i} message={x} update={props.updateState}/>
  })
)

export default MessageList;
