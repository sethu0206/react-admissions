 let student=[{type:'text',name:'fname',placeholder:'First Name ',value:''},
 {type:'text',name:'lname',placeholder:'Last Name',value:''},
   {type:'text',name:'bloodgroup',placeholder:'Bloodgroup',value:''},
{type:'text',name:'nationality',placeholder:'Nationality',value:''},
{type:'text',name:'branch',placeholder:'Branch',value:''},
{type:'text',name:'sex',placeholder:'Sex(male/female/others)',value:''},
{type:'number',name:'rank',placeholder:'Rank',value:''},
{type:'email',name:'email',placeholder:'Email',value:''},
{type:'tel',name:'mobileno',placeholder:'Mobile',value:''},
{type:'text',name:'aadharno',placeholder:'Aadhaarno',value:''},
{type:'text',name:'comm',placeholder:'Community',value:''},
{type:'text',name:'caste',placeholder:'Caste',value:''},
{type:'text',name:'religion',placeholder:'Religion',value:''},
{type:'text',name:'mothertongue',placeholder:'Mother Tongue',value:''},
{type:'date',name:'dob',placeholder:'DOB',value:''},
{type:'text',name:'quota',placeholder:'Quota(management/govt)',value:''},
{type:'text',name:'firstgraduate',placeholder:'First Graduate(yes/no)',value:''}
];
 let address=[
{type:'address',name:'line1',placeholder:'Address Line 1',value:''},
{type:'address',name:'line2',placeholder:'Address Line 2',value:''},
{type:'text',name:'city',placeholder:'City',value:''},
{type:'text',name:'state',placeholder:'State',value:''},
{type:'text',name:'pincode',placeholder:'Pincode',value:''}]
let parents=[
{type:'text',name:'fname',placeholder:'First Name '},
{type:'text',name:'lname',placeholder:'Last Name'},
{type:'text',name:'occupation',placeholder:'Occupation'},
{type:'tel',name:'mobileno',placeholder:'Mobile'},
{type:'email',name:'email',placeholder:'Email'},
{type:'number',name:'income',placeholder:'Annual Income'},
{type:'address',name:'address',placeholder:'Address'},
{type:'text',name:'district',placeholder:'District'},
{type:'text',name:'pincode',placeholder:'Pincode'}]
let personal=[{type:'text',name:'refno',placeholder:'Referenceno'},
  {type:'text',name:'fname',placeholder:'First Name'},
{type:'text',name:'lname',placeholder:'Last Name'},
{type:'email',name:'email',placeholder:'Email'},
{type:'tel',name:'mobileno',placeholder:'Mobile'},
{type:'text',name:'aadharno',placeholder:'Aadhaarno'},
{type:'text',name:'branch',placeholder:'Branch'},
{type:'text',name:'sex',placeholder:'Sex(male/female/others)'},
{type:'date',name:'dob',placeholder:'DOB'}
]
let images=[{name:'aadhar'},
{name:'sign'},
{name:'photo'}
]
let staff=[{type:'date',name:'doj',placeholder:'Date of joining'},
  {type:'text',name:'community',placeholder:'Community'},
{type:'text',name:'department',placeholder:'Department'},
{type:'text',name:'quota',placeholder:'Quota(management/government)'},
{type:'text',name:'state',placeholder:'State(tamilnadu/others)'}
]
let academics=[{type:'text',name:'institution',placeholder:'School/College Name'},
  {type:'text',name:'board',placeholder:'Board/University'},
{type:'text',name:'medium',placeholder:'Medium'},
{type:'text',name:'year',placeholder:'Year'},
{type:'text',name:'percentage',placeholder:'Percentage'}
]
let transport=[{type:'text',name:'bpoint',placeholder:'Boarding point'},
  {type:'text',name:'time',placeholder:'Boarding time'},
{type:'number',name:'fee',placeholder:'Fee'},
{type:'text',name:'routeno',placeholder:'Route no'},
{type:'text',name:'location',placeholder:'Route name'}
]
module.exports={
  student:student,
  address:address,
  parents:parents,
  personal:personal,
  images:images,
  staff:staff,
  academics:academics,
  transport:transport
};
