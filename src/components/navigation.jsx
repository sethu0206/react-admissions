//import Form from '../components/form';
import { useState, useEffect } from 'react'

export const Navigation = (props) => {
 //const [usertype,setusertype]=useState([]);
 console.log(props.arr);
 function handlemouseOver(event)
 {
   event.target.style.backgroundColor="#eff0f1";
   setTimeout(function() {
    event.target.style.backgroundColor="";
  }, 1000);
 }
 let styles={fontFamily: "'Lato', sans-serif",
textTransform: 'uppercase',
color: '#555',
fontSize: '15px',
fontWeight: '400',
padding: '8px 2px',
borderRadius: '0',
margin: '9px 20px 0 20px',
display:'block'
};
 //let user="";
  return (
    <div>
    <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
      <div className='container'>
        <div className='navbarconst [user,setuser]=useState([]);-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          <a className='navbar-brand page-scroll' href='#page-top'>
            Psg Itech
          </a>{' '}
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right' >
            {props.arr.map((item)=>{
            return(<li value={item.value} style={styles} onClick={item.onClick} onMouseEnter={handlemouseOver}>

                {item.text}

            </li>)})}

          </ul>
        </div>
      </div>
    </nav>
  </div>
  )
}
