import React, {Component} from 'react';

const selectAll=(bulk, list, update)=>
{
  if(bulk>0)
  {
    list.forEach(x=>{
      x.selected=true;
      update(x);
    });
  }
  else {
    list.forEach(x=>{
      x.selected=false;
      update(x);
    });
  }
}

const readOrUnread=(change, list, update)=>
{
    list.forEach(x=>{
      if(x.selected===true)
      {
        x.read=change;
        update(x);
      }
    });
}

const addLabel=(label, list, update)=>
{
    list.forEach(x=>{
      if(x.selected===true)
      {
        if(x.labels.findIndex(x=>x===label)===-1)
        {
          x.labels.push(label);
          update(x);
        }
      }
    });
}
const removeLabel=(label, list, update)=>
{
    list.forEach(x=>{
      if(x.selected===true)
      {
        let ind=x.labels.findIndex(x=>x===label)
        if(ind!==-1)
        {
          x.labels.splice(label,1);
          update(x);
        }
      }
    });
}

const del=(list, update)=>
{
  let stuffToDelete=[]
    list.forEach(x=>{
      if(x.selected===true)
      {
        stuffToDelete.push(x)
      }
    });
  stuffToDelete.forEach( x=>{
    update(x, true);
  });
}

const Toolbar =(props)=>
{
  let unread=props.inbox.filter(x=>x.read===false).length;
  let amtSelected = props.inbox.filter(x=>x.selected===true).length;
  let bulk = props.inbox.length-amtSelected;

  return (<div className="row toolbar">
    <div className="col-md-12">
      <p className="pull-right">
        <span className="badge badge">{unread}</span>
        unread message{unread===1?'':'s'}
      </p>

      <button className="btn btn-default"
      onClick={()=>selectAll(bulk, props.inbox, props.updateState)}
      >{/*nested ternary says if theres zero selected, some selected or all selected*/}
        <i className={bulk?(bulk===props.inbox.length)?"fa fa-square-o":"fa fa-minus-square-o":"fa fa-check-square-o"}></i>
      </button>

      <button className="btn btn-default"
        onClick = {()=>readOrUnread(true, props.inbox, props.updateState)}
      >
        Mark As Read
      </button>

      <button className="btn btn-default"
        onClick = {()=>readOrUnread(false, props.inbox, props.updateState)}
      >
        Mark As Unread
      </button>

      <select className="form-control label-select">
        <option>Apply label</option>
        <option value="dev"
          onClick = {()=>addLabel("dev", props.inbox, props.updateState)}
        >dev</option>
        <option value="personal"
          onClick = {()=>addLabel("personal", props.inbox, props.updateState)}
        >personal</option>
        <option value="gschool"
          onClick = {()=>addLabel("gschool", props.inbox, props.updateState)}
        >gschool</option>
      </select>

      <select className="form-control label-select">
        <option>Remove label</option>
        <option value="dev"
          onClick = {()=>removeLabel("dev", props.inbox, props.updateState)}
        >dev</option>
        <option value="personal"
          onClick = {()=>removeLabel("personal", props.inbox, props.updateState)}
        >personal</option>
        <option value="gschool"
          onClick = {()=>removeLabel("gschool", props.inbox, props.updateState)}
        >gschool</option>
      </select>

      <button className="btn btn-default"
          onClick = {()=>del(props.inbox, props.updateState)}
      >
        <i className="fa fa-trash-o"

        ></i>
      </button>
    </div>
  </div>)
}


export default Toolbar;
