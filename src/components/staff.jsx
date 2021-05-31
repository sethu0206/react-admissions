import React, { Component } from "react";
import DataTable from 'react-data-table-component';
import { Navigation } from './navigation';
import { useHistory } from "react-router-dom";
let states=require('./registerstates.js');
var fs = require('fs');
let response;
/*const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' },
{ id: 2, title: 'Conan the Barbarian', year: '1982' },
{ id: 3, title: 'Conan the Barbarian', year: '1982' } ];*/
let data=[];

async function generatePdf(data)
{
  /*let file = fs.createWriteStream('download.xlsx');
  file.on('error', function(err) { console.log("error"); });
  data.forEach(function(v) { file.write(data.name+'\t' + data.referenceno+'\t' + data.rank+'\t'+data.dob+'\t' + data.branch+'\t' + data.quota+'\t' + data.community+'\t'+data.mobile+'\t' + data.email+'\n'); });
  file.end();*/
  let prom=await fetch('/downloadfile',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(data),
    responseType:'blob'
  });
  let text=await prom.text()
  console.log("string"+text);
  console.log(prom.body);
  console.log(JSON.stringify(prom.body));
  console.log("download successful")
  //let url=window.URL.createObjectURL(new Blob([text]))
  let link=document.createElement('a');
  link.setAttribute('href','data:text/plain;charset=utf-8, '+encodeURIComponent(text));
  link.setAttribute('download','downloads.xlsx');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function DisplayData(props)
{
    let history=useHistory();
    if(props.response.length==0)
    {
      return (<div></div>)
    }
    else
    {
      let i;
      //let obj

      const columns = [
        {
          name: 'Name',
          selector: 'name',
          sortable: true,
        },
        {
          name: 'Referenceno',
          selector: 'referenceno',
          sortable: true,
        },
        {
          name: 'DOB',
          selector: 'dob',
          sortable: true
        },
        {
          name: 'Rank',
          selector: 'rank',
          sortable: true
        },
        {
          name: 'Branch',
          selector: 'branch',
          sortable: true
        },
        {
          name: 'Quota',
          selector: 'quota',
          sortable: true
        },
        {
          name: 'Community',
          selector: 'community',
          sortable: true
        },
        {
          name: 'Mobile',
          selector: 'mobile',
          sortable: true
        },
        {
          name: 'Email',
          selector: 'email',
          sortable: true
        },
        {
          name: '',
          button: true,
          cell: (row) => <button onClick={()=>{
            console.log("clicked"+row.email);
            history.push({pathname:"/profile",data:row.referenceno})
          }} type="button">View Profile</button>
        }
      ];
       let data=[];
      console.log(props.response);
      for(i=0;i<props.response.length;i++)
      {
                data.push({name:props.response[i].name,referenceno:props.response[i].referenceno,email:props.response[i].email,mobile:props.response[i].mobile,community:props.response[i].community,quota:props.response[i].quota,dob:props.response[i].dob,branch:props.response[i].branch,rank:props.response[i].rank});
      }
      console.log(data);
      return(
        <div>
        <DataTable
      title="Student Details"
      columns={columns}
      data={data}
      highlightOnHover
    />
    <button onClick={()=>{generatePdf(data)}}>DownloadPdf</button>
    </div>
      )
    }
}
export default class Staff extends React.Component{
  constructor(props){
    super(props);
    this.state = {val:0,nav:1,type:'text',response:[]};
    this.updateval = this.updateval.bind(this);
    this.updatenav  = this.updatenav.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur  = this.onBlur.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    /*<input type="number" name="npi" id="npi" placeholder="NPI number" required />
    <input type="address" name="address" id="address" placeholder="Business Address" required />
    <input type="tel" name="phone" id="phone" placeholder="Telephone Number" required />
    <input type="email" name="email" id="email" placeholder="Email Address" required />
    <input type="text" name="address" id="email" placeholder="Address" required />*/
  }
  onFocus()
  {
    this.setState({
  type:'text'
});
  }
  onBlur()
  {
    this.setState({
  type:'text'
});
  }
  updateval(event)
   {
     event.preventDefault();
     this.setState((state) => ({
   val: state.val + 1
 }));
    console.log(this.state.val);
   }
updatenav(event)
  {
    event.preventDefault();
    this.setState({
  nav:event.target.value
});
this.setState({
val:0
});
  console.log(this.state.nav);
  console.log(this.state.val);
  }
  async handleSubmit(event)
  {
    event.preventDefault();
    let data={}
    let x=document.getElementById('form');
    for (let i = 1; i < x.length-1;i++)
     {
       //z.push({name:x.elements[i].name,value:x.elements[i].value});
       data[x.elements[i].name]=x.elements[i].value
     }
     console.log(JSON.stringify(data));
     let prom;
     prom=await fetch('/senddata', {
       headers: {
         'Content-Type':'application/json'
       },
     method: 'POST',
     body: JSON.stringify(data)
   })
   response=await prom.json();
   this.setState({response:response});
   console.log("The data is"+JSON.stringify(response));
  }
  render(){
    let formtype=states.staff,formheading="Student Details",submittype="Submit",arr=[];
    let i;

    return(
        <div>
          <Navigation  arr={arr}/>
          <div id="formContainer" style={{height:'100vh'}}>
            <form id="form">
              <fieldset >
                <h1>{formheading}</h1>

                <div id="otherInputs">
                  {formtype.map((item)=>{
                    if(item.type=='date')
                        return <input type={this.type} onFocus={this.onFocus} onBlur={this.onBlur} name={item.name} id={item.name} placeholder={item.placeholder} required />
                    else
                        return <input type={item.type} name={item.name} id={item.name} placeholder={item.placeholder} required />;})}
                </div>
                <br /><br />
                <input type="submit" name="submit" id="submit" onClick={this.handleSubmit} value={submittype}/>
              </fieldset>
            </form>
          </div>

        <DisplayData response={this.state.response}/>

      </div>
    )
  }
}
