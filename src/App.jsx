import { useState, useEffect } from 'react'
import { Navigation } from './components/navigation'
import { Header } from './components/header'
import { Features } from './components/features'
import { About } from './components/about'
import { Services } from './components/services'
import { Gallery } from './components/gallery'
import { Testimonials } from './components/testimonials'
import { Team } from './components/Team'
import { Contact } from './components/contact'
import JsonData from './data/data.json'
import SmoothScroll from 'smooth-scroll'
import RegistrationForm from './components/register'
import Staff from './components/staff'
import Login from "./components/login";
import Profile from "./components/profile";
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

function Parent(props)
{
  let history = useHistory();
  const [usertype,setusertype]=useState(0);
  const changestate=(event)=>{
    console.log(event.target.value);
    setusertype(event.target.value);
    console.log("inside parent"+usertype);
  }
  let arr=[{value:1,text:'Student',onClick:changestate,className:"link1"},{value:2,text:'Staff',onClick:changestate,className:"link2"}];
  return(
    <div>
      <Navigation onClick={changestate} arr={arr}/>
      <Header data={props.Data.Header} />
      <Login type={usertype} history={history}/>
      <div style={{width:'100%',height:'10%'}}>
      </div>
    </div>
  );
}
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
})
const MainPage=() => {
  const [landingPageData, setLandingPageData] = useState({})
  useEffect(() => {
    setLandingPageData(JsonData)
  }, [])

  return (
    <div>
      <Parent Data={landingPageData}/>
    </div>
  )
}

const App = ()=>{
  return(
    <Router>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/register" component={RegistrationForm} />
        <Route exact path="/staff" component={Staff} />
        <Route exact path="/profile" component={Profile} />
      </Router>
  )
}

export default App
