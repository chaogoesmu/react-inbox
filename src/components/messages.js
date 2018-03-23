import React from 'react'

let IfLabel = (label) =>
(
    label.map((x)=>(<span className="label label-warning">{x}</span>))
)

let toggleSelected = (message, fn)=>
{
  console.log('toggle toggle toggle')
  message.selected = !message.selected;
  fn(message);
}

let toggledStarred = (message, fn)=>
{
  console.log('toggle toggle toggle')
  message.starred = !message.starred;
  fn(message);
}

let Messages=(props)=>{
  return (
    <div className={`row message ${props.message.read?"read":"unread"} ${props.message.selected?"selected":""}`}>
  <div className="col-xs-1">
    <div className="row">
      <div className="col-xs-2">
        <input type="checkbox"
          onClick = {()=>toggleSelected(props.message, props.update)}
          checked = {props.message.selected?"defaultChecked":""}
        />
      </div>
      <div className="col-xs-2">
        <i className={`${props.message.starred?"star fa fa-star":"star fa fa-star-o"}`}
        onClick = {()=>toggledStarred(props.message, props.update)}></i>
      </div>
    </div>
  </div>
  <div className="col-xs-11">
    {IfLabel(props.message.labels)}
    <a href="#">
      {props.message.subject}
    </a>
  </div>
</div>
  )
}

export default Messages;
