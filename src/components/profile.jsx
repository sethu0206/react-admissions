import { useHistory } from "react-router-dom";
import { useEffect,useState } from "react";
import React from 'react';
import Pdf from "react-to-pdf";
const ref = React.createRef();
function Profile(props)
{
 const [value,setValue]=useState(props.location.data);
 const [data,setData]=useState([]);
 const [name,setName]=useState('');
 const [refno,setRefno]=useState('');
 const [address,setAddress]=useState([]);
 const [class10,setClass10]=useState([]);
 const [class12,setClass12]=useState([]);
 const [image,setImage]=useState(undefined);
 let scale=0.5;
 const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [4,2]
};
 useEffect(() => {
   // Update the document title using the browser API
   async function fetchstudentdata(){
     console.log("before request");
     let imageresponse = await fetch('/fetchimage', {
           method: 'POST', // *GET, POST, PUT, DELETE, etc.
           mode: 'cors', // no-cors, *cors, same-origin
           cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
           headers: {
               'Content-Type': 'application/json'
           },
           body:JSON.stringify({"data":value})
       })
       const blob = await imageresponse.blob()
     let studentData=await fetch('/studentdata',{
       method: 'POST',
       headers: {
         'Content-Type':'application/json'
       },
       body:JSON.stringify({"data":props.location.data})
     });
     let response=await studentData.json();
     console.log("response successful");

     //console.log("response:"+Object.entries(response[0]));
     console.log("The data is"+JSON.stringify(response));
     //console.log("response:"+Object.entries(response[0]));
     console.log("The data is"+JSON.stringify(response));
     setData(Object.entries(response.student));
     setName(`${response.student["name"]} ${response.student["initial"]}`);
     setAddress(Object.entries(response.address));
     setClass10(Object.entries(response.class10));
     setClass12(Object.entries(response.class12));

     setImage(URL.createObjectURL(blob));
     //setData({...data,response});
   }
   fetchstudentdata();
 },[value]);

  return(
  <div><div ref={ref}>
  <div className="ScriptTop" >
    <div className="rt-container">
      <div className="col-rt-4" id="float-right">
        {/* Ad Here */}
      </div>

    </div>
  </div>
  <header className="ScriptHeader">
    <div className="rt-container">
      <div className="col-rt-12">
        <div className="rt-heading">
          <h1>Student Profile</h1>
        </div>
      </div>
    </div>
  </header>
  <section>
    <div className="rt-container">
      <div className="col-rt-12">
        <div className="Scriptcontent">
          {/* Student Profile */}
          <div className="student-profile py-4">
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <div className="card shadow-sm">
                    <div className="card-header bg-transparent text-center">
                      <img className="profile_img" src={image} alt="student dp" />
                      <h3>{name}</h3>
                    </div>
                    <div className="card-body">
                      <p className="mb-0"><strong className="pr-1">Student ID:</strong>{value}</p>
                      <p className="mb-0"><strong className="pr-1">Class:</strong>4</p>
                      <p className="mb-0"><strong className="pr-1">Section:</strong>A</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="card shadow-sm">
                    <div className="card-header bg-transparent border-0">
                      <h3 className="mb-0"><i className="far fa-clone pr-1" />General Information</h3>
                    </div>
                    <div className="card-body pt-0">
                      <table className="table table-bordered">
                        <tbody>
                          {
                            data.map((item)=>{
                              return(<tr>
                                <th width="30%">{item[0]}</th>
                                <td width="2%">:</td>
                                <td>{item[1]}</td>
                              </tr>)
                            })
                          }

                        </tbody></table>
                    </div>
                  </div>
                  <div className="card shadow-sm">
                    <div className="card-header bg-transparent border-0">
                      <h3 className="mb-0"><i className="far fa-clone pr-1" />Permanent Address</h3>
                    </div>
                    <div className="card-body pt-0">
                      <table className="table table-bordered">
                        <tbody>
                          {
                            address.map((item)=>{
                              return(<tr>
                                <th width="30%">{item[0]}</th>
                                <td width="2%">:</td>
                                <td>{item[1]}</td>
                              </tr>)
                            })
                          }

                        </tbody></table>
                    </div>
                  </div>
                  <div className="card shadow-sm">
                    <div className="card-header bg-transparent border-0">
                      <h3 className="mb-0"><i className="far fa-clone pr-1" />Class10 Information</h3>
                    </div>
                    <div className="card-body pt-0">
                      <table className="table table-bordered">
                        <tbody>
                          {
                            class10.map((item)=>{
                              return(<tr>
                                <th width="30%">{item[0]}</th>
                                <td width="2%">:</td>
                                <td>{item[1]}</td>
                              </tr>)
                            })
                          }

                        </tbody></table>
                    </div>
                  </div>
                  <div className="card shadow-sm">
                    <div className="card-header bg-transparent border-0">
                      <h3 className="mb-0"><i className="far fa-clone pr-1" />class12/Diploma Information</h3>
                    </div>
                    <div className="card-body pt-0">
                      <table className="table table-bordered">
                        <tbody>
                          {
                            class12.map((item)=>{
                              return(<tr>
                                <th width="30%">{item[0]}</th>
                                <td width="2%">:</td>
                                <td>{item[1]}</td>
                              </tr>)
                            })
                          }

                        </tbody></table>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          {/* partial */}
        </div>
      </div>
    </div>
  </section>
</div>
<Pdf targetRef={ref} filename="example.pdf" options={options} scale={scale}>
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf></div>
)
}
export default Profile;
