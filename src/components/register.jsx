import React, { Component } from "react";
import { Navigation } from './navigation'
import Dropzone from 'react-dropzone'
import $ from 'jquery';
let states=require('./registerstates.js');
let promise=require('promise');
let routeDetails={
  "varadharajapuram":{"time":'6',"fee":10000,"routeno":'1',"location":"sulur"},
  "singanallur":{"time":'6.30',"fee":8000,"routeno":'2',"location":"sulur"},
  'default':{"time":'',"fee":null,"routeno":'',"location":""}
}
//import { useHistory } from "react-router-dom";

let y=(<div></div>);

export default class RegistrationForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {val:0,history:this.props.location.history,nav:0,type:'text',aadhar: '',aadharPreviewUrl: '',sign: '',signPreviewUrl: '',photo: '',photoPreviewUrl: '',student:[],permaddr:[],resaddr:[],father:[],mother:[],cls10:[],cls12:[],formtype:states.student,formprefix:'',
    "fname":'',
    'lname':'',
    'bloodgroup':'',
    'nationality':'',
    'mothertongue':'',
    'branch':'',
    'sex':'',
    'rank':null,
    'email':'',
    'mobileno':'',
    'aadharno':null,
    'comm':'',
    'caste':'',
    'religion':'',
    'dob':'',
    'quota':'',
    'firstgraduate':'',
    "rline1":'',
    'rline2':'',
    'rcity':'',
    'rstate':'',
    'rpincode':'',
    "pline1":'',
    'pline2':'',
    'pcity':'',
    'pstate':'',
    'ppincode':'',
    'ffname':'',
    'flname':'',
    'foccupation':'',
    'fmobileno':'',
    'femail':'',
    'fincome':'',
    'faddress':'',
    'fdistrict':'',
    'fpincode':'',
    'mfname':'',
    'mlname':'',
    'moccupation':'',
    'mmobileno':'',
    'memail':'',
    'mincome':'',
    'maddress':'',
    'mdistrict':'',
    'mpincode':'',
    'jinstitution':'',
    'jboard':'',
    'jmedium':'',
    'jyear':'',
    'jpercentage':'',
    'sinstitution':'',
    'sboard':'',
    'smedium':'',
    'syear':'',
    'spercentage':'',
    'refno':this.props.location.data,
    'bpoint':'',
    'time':'',
    'fee':null,
    'routeno':'',
    'location':''
    };
    this.updateval = this.updateval.bind(this);
    this.updatenav  = this.updatenav.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur  = this.onBlur.bind(this);
    this.handleImageChange  = this.handleImageChange.bind(this);
    this.handleInputChange  = this.handleInputChange.bind(this);
    console.log('refno'+this.state['refno']);

  }

  handleInputChange(event)
  {
    console.log(event.target.name);
    let x=event.target.name;
    let fprefix=this.state.formprefix;
    //if(x==='fname')
    this.setState(({[fprefix.concat(event.target.name)]: event.target.value}),()=>{console.log(this.state[event.target.name]+"updated input")});
  }
  handleImageChange(e) {
    e.preventDefault();
    let name=e.target.name;
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      if(name==='aadhar')
      this.setState({
        aadhar: file,
        aadharPreviewUrl: reader.result
      });
      if(name==='photo')
      this.setState({
        photo: file,
        photoPreviewUrl: reader.result
      });
      if(name==='sign')
      this.setState({
        sign: file,
        signPreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
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
  componentDidUpdate(prevProps,prevState)
  {

    if(this.state['bpoint']!==prevState['bpoint'])
    {
      let route=routeDetails[this.state['bpoint']]
      if(this.state["bpoint"]==='varadharajapuram'||this.state["bpoint"]==='singanallur')
      {

        console.log(JSON.stringify(route));
        this.setState({"routeno":route["routeno"]});
        this.setState({"location":route["location"]});
        this.setState({"fee":route["fee"]});
        this.setState({"time":route["time"]});
      }
      else
      {
        let defaultval=routeDetails["default"];
        this.setState({"routeno":defaultval["routeno"]});
        this.setState({"location":defaultval["location"]});
        this.setState({"fee":defaultval["fee"]});
        this.setState({"time":defaultval["time"]});
      }


    }

  }

   async updateval(event)
   {
      event.preventDefault();
      let bool=false;
     let x=document.getElementById('form');
     let y={name:'',value:null};
     console.log(y);
     let z=[];
     for (let i = 1; i < x.length-1;i++)
      {
        z.push({name:x.elements[i].name,value:x.elements[i].value});
      }
     console.log("z: ");
     console.log(this.state.val);
     console.log(this.state.nav);
    if(this.state.val===0&&this.state.nav===1)
      {
        console.log('inside if');
        z.push({name:'refno',value:this.state['refno']})
        for(let i=0;i<z.length;i++)
        {
          console.log(z[i].name+': '+z[i].value+'\n');
        }
        this.setState((state)=>({student:[...this.state.student,...z]}),  ()=>{console.log(JSON.stringify(this.state.student)+'\n')});
        this.setState(()=>({formtype:states.address}),()=>{console.log("state updated");})
        this.setState(()=>({formprefix:'p'}));

      }
    if(this.state.val===1&&this.state.nav===1)
    {
      console.log('inside if');
      for(let i=0;i<z.length;i++)
      {
        console.log(z[i].name+': '+z[i].value+'\n');
      }
      this.setState((state)=>({permaddr:[...this.state.permaddr,...z]}),  ()=>{console.log(JSON.stringify(this.state.permaddr)+'\n')});
      this.setState(()=>({formtype:states.address}),()=>{console.log("state updated");})
      this.setState(()=>({formprefix:'r'}));
    }
    if(this.state.val===2&&this.state.nav===1)
    {
      console.log('inside if');
      for(let i=0;i<z.length;i++)
      {
        console.log(z[i].name+': '+z[i].value+'\n');
      }
      this.setState((state)=>({resaddr:[...this.state.resaddr,...z]}),  ()=>{console.log(JSON.stringify(this.state.resaddr))});
      this.setState(()=>({formtype:states.parents}),()=>{console.log("state updated");})
      this.setState(()=>({formprefix:'f'}));
    }
    if(this.state.val===3&&this.state.nav===1)
    {
      console.log('inside if');
      for(let i=0;i<z.length;i++)
      {
        console.log(z[i].name+': '+z[i].value+'\n');
      }
      this.setState((state)=>({father:[...this.state.father,...z]}),  ()=>{console.log(JSON.stringify(this.state.father))});
      this.setState(()=>({formtype:states.parents}),()=>{console.log("state updated");})
      this.setState(()=>({formprefix:'m'}));
    }
    if(this.state.val===4&&this.state.nav===1)
    {
      console.log('inside if');
      for(let i=0;i<z.length;i++)
      {
        console.log(z[i].name+': '+z[i].value+'\n');
      }
      this.setState((state)=>({mother:[...this.state.mother,...z]}),  ()=>{console.log(JSON.stringify(this.state.mother))});
      this.setState(()=>({formtype:states.academics}),()=>{console.log("state updated");})
      this.setState(()=>({formprefix:'j'}));
    }
    if(this.state.val===5&&this.state.nav===1)
    {
      console.log('inside if');
      for(let i=0;i<z.length;i++)
      {
        console.log(z[i].name+': '+z[i].value+'\n');
      }
      this.setState((state)=>({cls10:[...this.state.cls10,...z]}),  ()=>{console.log(JSON.stringify(this.state.cls10))});
      this.setState(()=>({formprefix:'s'}));

    }
    if(this.state.val===6&&this.state.nav===1)
    {
      console.log('inside if');
      //bool=true
      for(let i=0;i<z.length;i++)
      {
        console.log(z[i].name+': '+z[i].value+'\n');
      }
      //this.setState((state)=>({cls10:[...this.state.cls10,...z]}),  ()=>{console.log(JSON.stringify(this.state.cls10))});
    this.setState((state)=>({cls12:[...this.state.cls12,...z]}),  ()=>{console.log(JSON.stringify(this.state.cls12))});

        let Data={student:this.state.student,permaddr:this.state.permaddr,resaddr:this.state.resaddr,cls10:this.state.cls10,cls12:this.state.cls12,father:this.state.father,mother:this.state.mother};
      console.log(JSON.stringify(Data));
      let formData = new FormData();
      formData.append("aadhar", this.state.aadhar);
      let request={method:'POST',body:formData,files:this.state.aadhar,headers:{'Content-Type':'multipart/formdata'}};
      console.log("request:"+JSON.stringify(request));
      console.log("files:"+JSON.stringify(request.files));
      console.log("aadhar:"+JSON.stringify(this.state.aadhar));
      let promise1=fetch('/imageupload', {
      headers: {
        'filename': `${this.state['refno']}aadhar.jpeg`
      },
      method: 'POST',
      body: this.state.aadhar
    })

    let promise2=fetch('/imageupload', {
      headers: {
        'filename': `${this.state['refno']}photo.jpeg`
      },
      method: 'POST',
      body: this.state.photo
    })

    let promise3=fetch('/imageupload', {
      headers: {
        'filename': `${this.state['refno']}sign.jpeg`
      },
      method: 'POST',
      body: this.state.sign
    })

    let prom=await promise.all([promise1,promise2,promise3]).then((results)=>{console.log("all uploads successful"+results);})
    prom=await fetch('/savedata', {
      headers: {
        'Content-Type':'application/json'
      },
    method: 'POST',
    body: JSON.stringify(Data)
  })

    //})
    //console.log(prom);
    return;

  }
    if(this.state.val===0&&this.state.nav===2)
    {
      this.setState(()=>({formtype:states.address}),()=>{console.log("state updated");})
      this.setState(()=>({formprefix:'p'}));
    }
    if(this.state.val===1&&this.state.nav===2)
    {
      this.setState(()=>({formtype:states.address}),()=>{console.log("state updated");})
      this.setState(()=>({formprefix:'r'}));
    }
    if(this.state.val===2&&this.state.nav===2)
    {
      this.setState(()=>({formtype:states.parents}),()=>{console.log("state updated");})
      this.setState(()=>({formprefix:'f'}));
      //bool=true
    }
    if(this.state.val===3&&this.state.nav===2)
    {
      return;
    }

    if(this.state.val===0&&this.state.nav===3)
    {
      this.setState(()=>({formtype:states.address}),()=>{console.log("state updated");})
      this.setState(()=>({formprefix:'p'}));
    }
    if(this.state.val===1&&this.state.nav===3)
    {
      this.setState(()=>({formtype:states.address}),()=>{console.log("state updated");})
      this.setState(()=>({formprefix:'r'}));
    }
    if(this.state.val===2&&this.state.nav===3)
    {
      this.setState(()=>({formtype:states.transport}),()=>{console.log("state updated");})
      this.setState(()=>({formprefix:''}));
      //bool=true
    }
    if(this.state.val===3&&this.state.nav===3)
    {
      return;
      //bool=true
    }

     this.setState((state) => ({
   val: state.val + 1
 }));
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
this.setState({
formprefix:''
  });
  if(event.target.value===1)
  {
    $(".link3").addClass("color");
   $(".link4").removeClass("color1");
   $(".link5").removeClass("color1");
    this.setState({
  formtype:states.student
});
  }
  else if(event.target.value===2)
  {
    $(".link3").removeClass("color");
   $(".link4").addClass("color1");
   $(".link5").removeClass("color1");
    this.setState({
  formtype:states.personal
});
  }
  else if(event.target.value===3)
  {
    $(".link3").removeClass("color");
   $(".link4").removeClass("color1");
   $(".link5").addClass("color1");
    this.setState({
  formtype:states.personal
});
  }
  else if(event.target.value===4)
  {
    this.state.history.push({pathname:"/profile",data:this.state.refno});
  }
  console.log(this.state.nav);
  console.log(this.state.val);
}
  render(){
    //let history=useHistory();
    let arr=[{value:4,text:"View Profile",onClick:this.updatenav},{value:1,text:'Admission Form',onClick:this.updatenav,className:"link3"},{value:2,text:'Hostel Form',onClick:this.updatenav,className:"link4"},{value:3,text:'Transport',onClick:this.updatenav,className:"link5"}];
    let x=<div></div>;
    let formtype,formheading,submittype="Next",formprefix='';

 if(this.state.nav===1)
{
  if(this.state.val===0)
  {
    formtype=states.address;
    let {aadharPreviewUrl} = this.state;
    let {signPreviewUrl} = this.state;
    let {photoPreviewUrl} = this.state;
    states.images[0].url=aadharPreviewUrl;
    states.images[1].url=signPreviewUrl;
    states.images[2].url=photoPreviewUrl;
    states.images[0].preview=null;
    states.images[1].preview=null;
    states.images[2].preview=null;
    formheading="Student Details" ;
    x=states.images.map((item)=>{
          if (item.url) {
            item.Preview = (<img src={item.url} />);
          } else {
            item.Preview = (<div className="previewText"><h1>{item.name}</h1></div>);
          }
          return(
            <div>
          <div className="imgPreview">
              {item.Preview}
            </div>
              <input className="fileInput"
                type="file"
                name={item.name}
                onChange={(e)=>this.handleImageChange(e)} style={{opacity:'100%'}} />
          </div>);
        })

  }
  else if(this.state.val===1)
  {
    formtype=states.address;
    formheading="Permanent Address";
    formprefix='p';
  }
  else if(this.state.val===2)
  {
    formtype=states.address;
    formheading="Residential Address";
    formprefix='r'
  }

  else if(this.state.val===3)
  {
    formtype=states.parents;
    formheading="Father's Details";
    formprefix='f'
  }

  else if(this.state.val===4)
  {
  formtype=states.parents;
  formheading="Mother's Details";
  formprefix='m'
  }
  else if(this.state.val===5)
  {
  formtype=states.academics;
  formheading="Sslc/10th Details";
  formprefix='j'
  }
  else if(this.state.val===6)
  {
  formtype=states.academics;
  formheading="Hsc/12th/Junior college Details";
  formprefix='s'
  submittype="Submit";
  }
}
else if(this.state.nav===2){
  if(this.state.val===0)
  {

    formheading="Student Details" ;
  }
  else if(this.state.val===1)
  {
    formtype=states.address;
    formheading="Permanent Address";

  }
  else if(this.state.val===2)
  {
    formtype=states.address;
    formheading="Residential Address";

  }

  else if(this.state.val===3)
  {
    formtype=states.parents;
    formheading="Parent Details";
    submittype="Submit";
  }

}
else if(this.state.nav===3){
  if(this.state.val===0)
  {
    formheading="Student Details" ;
  }
  else if(this.state.val===1)
  {
    formtype=states.address;
    formheading="Permanent Address";

  }
  else if(this.state.val===2)
  {
    formtype=states.address;
    formheading="Residential Address";

  }

  else if(this.state.val===3)
  {
    formtype=states.parents;
    formheading="Route Details";
    submittype="Submit";
  }
  /*else if(this.state.val===4)
  {
  formtype=states.parents;
  formheading="Mother's Details";

}*/
}
  else if(this.state.nav===4){
    formtype=states.staff;
    formheading='Student Details'
}
console.log(JSON.stringify(this.state.formtype));
  if(this.state.nav!==0)
  {
    y=(
      <div id="formContainer" style={{height:'250vh'}}>
      <form id="form" action="#" method="POST" >
        <fieldset>
          <h1>{formheading}</h1>

          <div id="otherInputs">
            {this.state.formtype.map((item)=>{
                console.log(item.name+":"+this.state[formprefix.concat(item.name)]+'\n')
                console.log(formprefix.concat(item.name));
                if(item.type=='date')
                    return <input type={this.type} onFocus={this.onFocus} onBlur={this.onBlur} name={item.name} id={item.name} placeholder={item.placeholder}  value={this.state[this.state.formprefix.concat(item.name)]} onChange={this.handleInputChange} required />
                else
                    return <input type={item.type} name={item.name} placeholder={item.placeholder}  value={this.state[this.state.formprefix.concat(item.name)]} onChange={this.handleInputChange} required/>})
            }

          </div>
          {x}
          <input type="submit" name="submit" id="submit" onClick={this.updateval} value={submittype}/>
        </fieldset>
      </form></div>
    );
  }

    return(
        <div>
          <Navigation  arr={arr}/>
          {y}

      </div>
    )
  }
}
