// import logo from './logo.svg';
import './App.css';
import React, {useState,useEffect} from 'react';

function App() {

  const [data, setdata] = useState("");
  
  const [city,setcity]= useState('Delhi');
  const [temp, settemp] = useState(null);
  useEffect(() => {
    
  const fetchapi= async()=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=777bb8726ada729cd62e99ae482583f6`;
    const response = await fetch(url);
    const datatake = await response.json();
    console.log(datatake);
    settemp(datatake);
  
  
}
fetchapi();
  

  }, [city]);

  const Cityfunc=(event)=>{
    setdata(event.target.value);
  }

  const showdate=(d)=>{
  const days =["Monday","Tuesday","Wednesday","thursday","Friday","Saturday","Sunday"];
  const months=["January","February","March","April","May","June","July","August","September","October","November","December"];
  const date =d.getDate();
  const month=months[d.getMonth()];
  const year =d.getFullYear();
  const day = days[d.getDay()];

  return `${day} ${date} ${month} ${year}`;
  }

  const errorweather =(temp)=>{
    
      try{
        (temp.weather[0].description).toUpperCase()
      return <h2> {(temp.weather[0].description).toUpperCase()}</h2>
      }
      catch(error){
       return <h2> " " </h2>
      }
      }

  const errortemp =(temp)=>{
try{
  Math.round(temp.main.temp);
  return <h1>{Math.round(temp.main.temp)}<sup>o</sup>C</h1>
}
catch(error){
  return <p1> city not found </p1>
}
  }
  
  return (
    
   <>
     <div>
     <div className="heading">
        <h1 className='head'>Weather-Know</h1>
     </div>
     <div className="box-align">
     <div className="box">
       <div className="searchbar">
          <input type="text" placeholder="City Name" className="search-city" value={data} onChange={Cityfunc}
            onKeyPress={(e)=>{
              if(e.key==='Enter'){
                setcity(data);
                setdata('');
              }
            }}
          />

          <div className="search-btn" >
          <i className="fa fa-search" aria-hidden="true" onClick={()=>{setcity(data);
          setdata('');
          }}></i>
          </div>

       </div>
       {
         (!temp )   ? (<h1>Enter valid city</h1>)
       :
       (
       <div>
       <div className="weather-place">
          
          <div className="place-name">
            <h2>{city}</h2>
          </div>
          
        </div>
        <div className="datebox">
        <div className="date">{showdate(new Date())}</div>
        </div>
       <div className="tempoutbox">
       <div className="tempinbox">
        
           {
             errortemp(temp)
           }
          
          
          
          </div>
        </div>
        <div className="weather">
          
        {
         errorweather(temp)
        }
          
          
          
          
          
        </div>
       </div>
       )
       }
        
        </div>



     </div>
     </div>
     
   </>

  );
}

export default App;
