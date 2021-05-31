let express=require("express");
let bodyparser=require("body-parser");
let app=express();
var fs = require('fs');
let execquery=require('./execquery.js');
let fileupload=require('express-fileupload');
const multipart = require('connect-multiparty');

const multipartMiddleware = multipart({ maxFieldsSize: (20 * 1024 * 1024) });

const router = express.Router();
let promise=require('promise');

// Convert

let exquery=execquery.exquery;
let mysql = require('mysql');
let con = mysql.createPool({
 connectionLimit:100,
 host: "localhost",
 user: "root",
 password: "sethu",
 database: "admissions"});
 async function fetchimage(req,res)
 {
   console.log("inside fetchimage");
   console.log("refno"+req.body["data"]);
   res.sendFile(`/home/ramvignesh/admissions/images/${req.body["data"]}photo.jpeg`);
 }
 async function studentdata(req,res)
 {
   console.log("inside studentdata");
   let body=JSON.stringify(req.body),a="'";
   let response={};
   console.log("data: "+body);
   console.log("refno"+req.body["data"]);
   let query=`select name,initial,dob,sex,rank,aadharno,bloodgroup,nationality,religion,community,quota,firstgrad,email,mobile from student where referenceno=${a}${req.body["data"]}${a}`;
   console.log(query);
   let results=await exquery(query,con);
    response.student=results[0];
    query=`select institution,medium,board,year,percentage from academics where referenceno=${a}${req.body["data"]}${a} and class=${a}10${a}`;
    console.log(query);
    results=await exquery(query,con);
    response.class10=results[0];
    query=`select institution,medium,board,year,percentage from academics where referenceno=${a}${req.body["data"]}${a} and class=${a}12${a}`;
    console.log(query);
    results=await exquery(query,con);
    response.class12=results[0];
    query=`select line1,line2,district,state,pincode from address where referenceno=${a}${req.body["data"]}${a} and type=${a}perm${a}`;
    console.log(query);
    results=await exquery(query,con);
    response.address=results[0];
   console.log("Student data is"+JSON.stringify(response));
   res.json(response);
 }

 function generatePdf(req,res)
 {
   let file = fs.createWriteStream('download.xlsx');
   console.log(JSON.stringify(req.body));
   let data=req.body;
   let str='';
   console.log("the data is"+data);
   file.on('error', function(err) { console.log("error"); });
   file.on('finish', function() { console.log("finished writing"); });
   data.forEach(function(item) {
     console.log("inside foreach method");
     file.write(item.name+'\t' + item.referenceno+'\t' + item.rank+'\t'+item.dob+'\t' + item.branch+'\t' + item.quota+'\t' + item.community+'\t'+item.mobile+'\t' + item.email+'\n');
      str+=`${item.name}\t${item.referenceno}\t${item.rank}\t${item.dob}\t${item.branch}\t${item.quota}\t${item.community}\t${item.mobile}\t${item.email}\n`
      });
  console.log("the string is"+str);
  res.send(str);
   file.end();

 }
 function generateQuery(data)
 {
   let query='';
   if(data.community!==''&&data.department!==''&&data.quota!=='')
   {
     query=`select name,referenceno,rank,dob,branch,quota,community,mobile,email from student where branch="${data.department}" and quota="${data.quota}" and community="${data.community}"`
   }
   else if(data.community!==''&&data.department!=='')
   {
     query=`select name,referenceno,rank,dob,branch,quota,community,mobile,email from student where branch="${data.department}"  and community="${data.community}"`
   }
  else if(data.community!==''&&data.quota!=='')
    {
      query=`select name,referenceno,rank,dob,branch,quota,community,mobile,email from student where community="${data.community}"  and quota="${data.quota}"`
    }
  else if(data.quota!==''&&data.department!=='')
    {
      query=`select name,referenceno,rank,dob,branch,quota,community,mobile,email from student where branch="${data.department}"  and quota="${data.quota}"`
    }
  else if(data.quota!=='')
    {
      query=`select name,referenceno,rank,dob,branch,quota,community,mobile,email from student where  quota="${data.quota}"`
    }
  else if(data.department!=='')
    {
      query=`select name,referenceno,rank,dob,branch,quota,community,mobile,email from student where branch="${data.department}" `
    }
  else if(data.community!=='')
    {
      query=`select name,referenceno,rank,dob,branch,quota,community,mobile,email from student where community="${data.community}"`
    }
   return query;
 }
async function sendData(req,res)
{
  console.log("inside sendata");
  console.log(JSON.stringify(req.body));
  //res.setHeader('Content-Type','application/json');
  //res.json([{username:"sethu"}]);
  let query=generateQuery(req.body);
  console.log(query)
  //if(req.body.community!=='')
  let results=await exquery(query,con);
  console.log(results);
  res.json(results);
  //res.end();
}
function imageupload(req,res)
{

  let contentLength = parseInt(req.headers['content-length'])
    if (isNaN(contentLength) || contentLength <= 0 ) {
      res.statusCode = 411;
      res.end(JSON.stringify({status: "error", description: "No File"}))
      return
    }

    // Try to use the original filename
    let filename = `${req.headers['filename']}`
    if (filename == null) {
      filename = "file." + req.headers['content-type'].split('/')[1]
    }

    const filestream = fs.createWriteStream(`${__dirname}/images/${filename}`)

    filestream.on("error", (error) => {
      console.error(error)
      res.statusCode = 400;
      res.write(JSON.stringify({status: "error", description: error}))
      res.end()
    })

    // Write data as it comes
    req.pipe(filestream)

    req.on('end', () => {
      filestream.close(() => {
        //res.send(`/images/${filename}`);
        res.end(JSON.stringify({status: "success"}))
      })
    })



}
function extractdata(data,x)
{
  console.log('inside extract');
  for(i in data)
  {
    //console.log('inside for loop');
    //console.log(JSON.stringify(req.body['student'][i]));
    x[data[i].name]=data[i].value;
  }
  console.log("x:"+JSON.stringify(x));
}
async function savedata(req,res)
{
  let i,student={},temp,query,a="'";
  let father={},mother={},permaddr={},resaddr={},cls12={},cls10={}
  const handleSuccess=(result)=>{

  console.log("queries successful");
  res.end();
}
  console.log('inside display');
  console.log(req.body);
  for(i in req.body['student'])
  {
    console.log('inside for loop');
    console.log(JSON.stringify(req.body['student'][i]));
    student[req.body['student'][i].name]=req.body['student'][i].value;
  }
  console.log(JSON.stringify(student));
  extractdata(req.body['resaddr'],resaddr);
  extractdata(req.body['permaddr'],permaddr);
  extractdata(req.body['cls10'],cls10);
  extractdata(req.body['cls12'],cls12);
  extractdata(req.body['father'],father);
  extractdata(req.body['mother'],mother);
  console.log("resaddr:"+JSON.stringify(resaddr));
  console.log("permaddr:"+JSON.stringify(permaddr));
  console.log("cls10:"+JSON.stringify(cls10));
  console.log("cls12:"+JSON.stringify(cls12));
  console.log("father:"+JSON.stringify(father));
  console.log("mother:"+JSON.stringify(mother));
  query=`insert into student values(${a}${student['fname']}${a},${a}${student['lname']}${a},${a}${student['dob']}${a},${a}${student['sex']}${a},${a}${student['bloodgroup']}${a},${a}${student['nationality']}${a},${a}${student['religion']}${a},${a}${student['comm']}${a},${a}${student['mothertongue']}${a},${a}${student['caste']}${a},${a}${student['aadharno']}${a},${a}${student['branch']}${a},${a}${student['firstgraduate']}${a},${student['rank']},${a}${student['refno']}${a},${a}${student['quota']}${a},
  ${a}${student['email']}${a},${a}${student['mobileno']}${a},${a}${student['refno']}aadhar.jpeg${a},${a}${student['refno']}sign.jpeg${a},${a}${student['refno']}photo.jpeg${a})`;

  console.log(query);
  let query1=`insert into address values(${a}${student['refno']}${a},${a}perm${a},${a}${permaddr['line1']}${a},${a}${permaddr['line2']}${a},${a}${permaddr['district']}${a},${a}${permaddr['state']}${a},${a}${permaddr['pincode']}${a})`
  let query2=`insert into address values(${a}${student['refno']}${a},${a}res${a},${a}${resaddr['line1']}${a},${a}${resaddr['line2']}${a},${a}${resaddr['district']}${a},${a}${resaddr['state']}${a},${a}${resaddr['pincode']}${a})`
  let query3=`insert into parents values(${a}${student['refno']}${a},${a}${father['fname']}${a},${a}${father['lname']}${a},${a}${father['occupation']}${a},${a}${father['mobileno']}${a},${a}${father['emailid']}${a},${a}${father['district']}${a},${a}${father['address']}${a},${a}${father['pincode']}${a},${father['income']},${a}f${a})`;
  let query4=`insert into parents values(${a}${student['refno']}${a},${a}${mother['fname']}${a},${a}${mother['lname']}${a},${a}${mother['occupation']}${a},${a}${mother['mobileno']}${a},${a}${mother['emailid']}${a},${a}${mother['district']}${a},${a}${mother['address']}${a},${a}${mother['pincode']}${a},${mother['income']},${a}m${a})`;
  let query5=`insert into academics values(${a}${student['refno']}${a},${a}10${a},${a}${cls10['institution']}${a},${a}${cls10['board']}${a},${a}${cls10['medium']}${a},${a}${cls10['year']}${a},${a}${cls10['percentage']}${a})`;
  let query6=`insert into academics values(${a}${student['refno']}${a},${a}12${a},${a}${cls12['institution']}${a},${a}${cls12['board']}${a},${a}${cls12['medium']}${a},${a}${cls12['year']}${a},${a}${cls12['percentage']}${a})`;
  console.log("query1:"+query1);
  console.log("query2:"+query2);
  console.log("query3:"+query3);
  console.log("query4:"+query4);
  console.log("query5:"+query5);
  console.log("query6:"+query6);
  //let prom=  promise.all([exquery(query,con),exquery(query1,con),exquery(query2,con),exquery(query3,con),exquery(query4,con),exquery(query5,con),exquery(query6,con)]);
  let prom;
  prom=await exquery(query,con);
  prom=await exquery(query1,con);
  prom=await exquery(query2,con);
  prom=await exquery(query3,con);
  prom=await exquery(query4,con);
  prom=await exquery(query5,con);
  prom=exquery(query6,con);
  prom.then(handleSuccess,reason=>{console.log(reason);});
}
app.use(express.static('build'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
router.use(multipartMiddleware);
app.use(fileupload());
app.post('/imageupload',imageupload);
app.post('/savedata',savedata);
app.post('/senddata',sendData);
app.post('/downloadfile',generatePdf);
app.post('/studentdata',studentdata);
app.post('/fetchimage',fetchimage);
app.listen(80,()=>console.log("listening"));
