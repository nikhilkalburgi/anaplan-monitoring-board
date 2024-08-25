
/* eslint-disable no-unused-vars */
import { createRef, useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';

let isErrorHandled = false;

const anaplanModels = {
    "dh": {
      wid: "8a868cdd7cfc09d5017d2f68024b41dd",
      mid: "CF414323D7D84333B1D40B70B45AAA96",
      pid: "118000000028",
      modelName: "PROD | DataHub | Import"
    },
    "cms": {
      wid: "8a868cd87cf708b8017d2f42e86c3b56",
      mid: "2386A475AE9444C48B1327B58E337743",
      pid: "118000000128",
      modelName: "PROD | CMS"
    },
    "inpHDEP": {
      wid: "8a868cd87cf708b8017d2f0ebc743118",
      mid: "F9541D6D22534225A4B514467117A1DC",
      pid: "118000000065",
      modelName: "PROD | INP | HDEP"
    },
    "inpMDEG": {
      wid: "8a868cd87cf708b8017d2f0ebc743118",
      mid: "639E24B10A024FC3844E662FBEE45A92",
      pid: "118000000065",
      modelName: "PROD | INP | MDEG"
    },
    "inpAXLE": {
      wid: "8a868cd87cf708b8017d2f0ebc743118",
      mid: "CD7643B8C4FB4F02A25B3693897186E0",
      pid: "118000000065",
      modelName: "PROD | INP | AXLE"
    },
    "inpTRANS": {
      wid: "8a868cd87cf708b8017d2f0ebc743118",
      mid: "BCF796F751D44912A2E82DC58C45B9EB",
      pid: "118000000065",
      modelName: "PROD | INP | TRANS"
    },
    "020": {
      wid: "8a868cd87d3fe8da017d6d2e337b50d2",
      mid: "C6BC82739C4847F1A12DC4A863FD5EEE",
      pid: "118000000040",
      modelName: "PROD | 020 FC"
    },
    "590": {
      wid: "8a868cd87d3fe8da017d6d2e337b50d2",
      mid: "8731AA6533E84E45BE729F6447F5FF26",
      pid: "118000000040",
      modelName: "PROD | 590 FC"
    },
    "034": {
      wid: "8a868cd87d3fe8da017d6d2e337b50d2",
      mid: "EFDCEB65559F4ADDB1D0EF303B892A2A",
      pid: "118000000040",
      modelName: "PROD | 034 FC"
    },
    "export": {
      wid: "8a868cd87d3fe8da017d6d2e337b50d2",
      mid: "7EDA7AFC9E8E415C8AAC5312EA72BA32",
      pid: "118000000001",
      modelName: "PROD | EXPORT LAYER"
    },
    "sand_dh": {
      wid: "8a868cdd7cfc09d5017d2f68024b41dd",
      mid: "CF414323D7D84333B1D40B70B45AAA96",
      pid: "118000000028",
      modelName: "SAND | DataHub | Import"
    },
    "sand_cms": {
      wid: "8a868cd87cf708b8017d2f42e86c3b56",
      mid: "2386A475AE9444C48B1327B58E337743",
      pid: "118000000128",
      modelName: "SAND | CMS"
    },
    "sand_inpHDEP": {
      wid: "8a868cd87cf708b8017d2f0ebc743118",
      mid: "F9541D6D22534225A4B514467117A1DC",
      pid: "118000000065",
      modelName: "SAND | INP | HDEP"
    },
    "sand_inpMDEG": {
      wid: "8a868cd87cf708b8017d2f0ebc743118",
      mid: "639E24B10A024FC3844E662FBEE45A92",
      pid: "118000000065",
      modelName: "SAND | INP | MDEG"
    },
    "sand_inpAXLE": {
      wid: "8a868cd87cf708b8017d2f0ebc743118",
      mid: "CD7643B8C4FB4F02A25B3693897186E0",
      pid: "118000000065",
      modelName: "SAND | INP | AXLE"
    },
    "sand_inpTRANS": {
      wid: "8a868cd87cf708b8017d2f0ebc743118",
      mid: "BCF796F751D44912A2E82DC58C45B9EB",
      pid: "118000000065",
      modelName: "SAND | INP | TRANS"
    },
    "sand_020": {
      wid: "8a868cd87d3fe8da017d6d2e337b50d2",
      mid: "C6BC82739C4847F1A12DC4A863FD5EEE",
      pid: "118000000040",
      modelName: "SAND | 020 FC"
    },
    "sand_590": {
      wid: "8a868cd87d3fe8da017d6d2e337b50d2",
      mid: "8731AA6533E84E45BE729F6447F5FF26",
      pid: "118000000040",
      modelName: "SAND | 590 FC"
    },
    "sand_034": {
      wid: "8a868cd87d3fe8da017d6d2e337b50d2",
      mid: "EFDCEB65559F4ADDB1D0EF303B892A2A",
      pid: "118000000040",
      modelName: "SAND | 034 FC"
    },
    "sand_export": {
      wid: "8a868cd87d3fe8da017d6d2e337b50d2",
      mid: "7EDA7AFC9E8E415C8AAC5312EA72BA32",
      pid: "118000000001",
      modelName: "SAND | EXPORT LAYER"
    }
};

function Login(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{


      let token = JSON.parse(localStorage.getItem('anaplan_token'));
      let now = Date.now();
      
      if(token &&  now <= token.expiresAt - (5 * 60 * 1000) && !isErrorHandled){
        props.setToken(token);
      }else{
        localStorage.removeItem('anaplan_token');
        isErrorHandled = false;
      }
  }, []);

  const loginToAnaplan =  ()=>{

    setLoading(true);

    if(!(username && password) || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/g).test(username)){
      setLoading(false);
      setLoginError("Invalid credentials! Please try again.");
      return;
    }

    const credentials = `${username}:${password}`;
    const base64Credentials = btoa(credentials);
    let responseToken;
    
    var config = {
      method: 'get',
      url: 'https://my-backend-kappa.vercel.app/login',
      headers: { 
        'Authorization': `Basic ${base64Credentials}`
      }
    };
    
    axios(config)
    .then(function (response) {
      responseToken = response.data;
      localStorage.setItem('anaplan_token',JSON.stringify(response.data));
      props.setToken(response.data);
      //settimer after every 20min
      setInterval(()=>{
        var config = {
          method: 'get',
          url: 'https://my-backend-kappa.vercel.app/refresh',
          headers: { 
            'Authorization': `AnaplanAuthToken ${responseToken.tokenValue}`
          }
        };
        
        axios(config)
        .then(function (resp) {
          responseToken = resp.data;
          props.setToken(resp.data);
        })
        .catch(function (error) {
          setLoading(false);
          props.setToken("");
          setLoginError("Refresh of token failed!")
        });
  
      }, 20 * 60 * 1000)
    })
    .catch(function (error) {
      setLoading(false);
      setLoginError("Login Failed! Please try again.")
    });
  }

  return (
    (loading)?  <div className="form-placeholder">
    <div className="truck">
            <div className="truck-body">
            <div className="truck-trailer"></div>
                <div className="truck-cabin"></div>
                
            </div>
            <div className="truck-wheels">
                <div className="wheel front-wheel"></div>
                <div className="wheel back-wheel"></div>
            </div>
    </div>
    <h2 className="login-loader">Please Wait ! You are almost there..</h2>
  </div>:
    <div className='form'>
      <input type="email" placeholder="Your Email" value={username} onChange={(event)=>setUsername(event.target.value)}/>
      <input type="password" placeholder="Your Password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
      <button onClick={loginToAnaplan}>Login</button>
      <p className="message" style={{color:(loginError)? "#f00": "#000"}}>{(loginError)? loginError : "Not registered? Ask your administrator"}</p>
    </div>
  );
}

function Dialog(props) {
  const [taskInfo, setTaskInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  

  console.log(props.taskList);

  const refreshTask = ()=>{
    setLoading(true);
    var config = {
      method: 'get',
      url: `https://my-backend-kappa.vercel.app/workspaces/${props.wid}/models/${props.mid}/processes/${props.pid}/tasks/${taskInfo.taskId}`,
      headers: { 
        'Authorization': `AnaplanAuthToken ${props.tokenValue}`,
      }
    };

    setTaskInfo(null);
    
    axios(config)
    .then(function (response) {
      setTaskInfo(response.data.task);   
      
    })
    .catch(function (error) {
      console.log(error)
      if(!isErrorHandled){  
        isErrorHandled = true;
        alert(`Error: ${error.code}`);
        props.setToken("");
      }
      
    });
  }

  const openTask = (taskId)=>{
    setLoading(true);
    var config = {
      method: 'get',
      url: `https://my-backend-kappa.vercel.app/workspaces/${props.wid}/models/${props.mid}/processes/${props.pid}/tasks/${taskId}`,
      headers: { 
        'Authorization': `AnaplanAuthToken ${props.tokenValue}`,
      }
    };
    console.log(`https://my-backend-kappa.vercel.app/workspaces/${props.wid}/models/${props.mid}/processes/${props.pid}/tasks/${taskId}`);
    axios(config)
    .then(function (response) {
      setTaskInfo(response.data.task);  
      if(progress < response.data.task.progress) 
        setProgress(response.data.task.progress)
    })
    .catch(function (error) {
      console.log(error)
      if(!isErrorHandled){  
        isErrorHandled = true;
        alert(`Error: ${error.code}`);
        props.setToken("");
      }
    });
  }
  
  return (
    <div className="dialog-box">
      <div className="close-btn" onClick={props.closeDialog}>❌</div>
      { (taskInfo)?  <div className="task-bar">
        <h4> <span className="task-bar-fieldkeys"> Workspace ID :</span> {props.wid} </h4>
        <h4> <span className="task-bar-fieldkeys"> Model ID :</span> {props.mid} </h4>
        <h4> <span className="task-bar-fieldkeys"> Process ID :</span> {props.pid} </h4>
        <h4> <span className="task-bar-fieldkeys"> Task ID :</span> {taskInfo.taskId} </h4>
        <h4> <span className="task-bar-fieldkeys"> current Step :</span> {taskInfo.currentStep}</h4>
        <div onClick={refreshTask} className='refresh-btn' style={{left: "20px", width: "10%", position: "relative", margin: 0, textAlign: "centre", top: "50px"}}>Refresh</div>
        <p className="task-bar-status"> {progress * 100} %</p>
        <div className="action-container">
          {(taskInfo.result?.nestedResults?.length)? taskInfo.result?.nestedResults.map((value, index)=>{
              return (<div key={index} className="action-bar" style={{  border: (value.successful)? "4px solid #04bf26" : "4px solid #dc0505"}}>
              <h4> <span className="task-bar-fieldkeys"> Object ID :</span> {value.objectId} </h4>
              <h5> <span className="task-bar-fieldkeys"> Failure Dump Available :</span> {String(value.failureDumpAvailable)}</h5>
              <h5> <span className="task-bar-fieldkeys"> Action Number :</span> {index}</h5>
              <button className="dump-copy" onClick={async ()=>{
                try {
                  await navigator.clipboard.writeText(JSON.stringify(value.details));
                } catch (error) {
                  console.error(error.message);
                  alert('Failed to Copy.');
                }
              }}>COPY Details</button>
          </div>);
          }) : "No Action Available."}
            
        </div>
   </div> : (loading)? <div className="task-bar" style={{animation: "animate 2s infinite linear", position: "absolute",top: "50%",left: "50%",width: "75%",transform: "translate(-50%, -50%)"}}>
      <h4 className="task-bar-fieldkeys-placeholder"> <span> ....... </span></h4>
      <h5 className="task-bar-fieldkeys-placeholder"> <span> .............</span> </h5>
      <h4 className="task-bar-fieldkeys-placeholder"> <span> .... </span> </h4>
      <h5 className="task-bar-fieldkeys-placeholder" style={{height: "30vh"}}> <span> </span> </h5>
    </div> : (props.taskList?.map((value, index)=>{
          const date = new Date(value.creationTime);
          return (
              <div key={index} className="task-bar" onDoubleClick={()=>openTask(value.taskId)}>
                <h4> <span className="task-bar-fieldkeys"> Task ID :</span> {value.taskId} </h4>
                <h5> <span className="task-bar-fieldkeys"> Start Time :</span> {date.toUTCString()}</h5>
                <p className="task-bar-status">{value.taskState}</p>
              </div>
            )
        })) 
      }
    </div>
  );
}

let taskInfoHistory = createRef({current:null});
let taskList = {};

function Card(props) {
  const [taskInfo, setTaskInfo] = useState(null);
  const [opacity, setOpacity] = useState(0);
  const [progress, setProgress] = useState(0);
  
  useEffect(()=>{
    // 2 requests
    var config = {
      method: 'get',
      url: `https://my-backend-kappa.vercel.app/workspaces/${props.wid}/models/${props.mid}/processes/${props.pid}/tasks/`,
      headers: { 
        'Authorization': `AnaplanAuthToken ${props.tokenValue}`,
      }
    };

    setOpacity(1);
    console.log(props.refreshRef);
    if(!props.refreshRef){
      setTaskInfo(taskInfoHistory.current);
      setProgress(taskInfoHistory.current?.task.progress); 
    } else
    axios(config)
    .then(function (response) {
          console.log(response.data, taskList);
          if(!(response.data?.tasks?.length)) throw new Error("Response for card is undefined.")
          taskList[props.mid] = response.data.tasks;
          var config = {
            method: 'get',
            url: `https://my-backend-kappa.vercel.app/workspaces/${props.wid}/models/${props.mid}/processes/${props.pid}/tasks/${response.data.tasks[response.data.tasks.length-1].taskId}`,
            headers: { 
              'Authorization': `AnaplanAuthToken ${props.tokenValue}`,
            }
          };
          
          axios(config)
          .then(function (response) {
            console.log(response.data);
            taskInfoHistory.current = response.data;
            setTaskInfo(response.data);   
            if(progress < response.data.task.progress) 
              setProgress(response.data.task.progress)
          })
          .catch(function (error) {
            console.log(error)
            if(!isErrorHandled){  
              isErrorHandled = true;
              alert(`Error: ${error.code}`);
              props.setToken("");
            }
          });
      
    })
    .catch(function (error) {
      console.log(error)
      if(!isErrorHandled){  
        isErrorHandled = true;
        alert(`Error: ${error.code}`);
        props.setToken("");
      }
    });

  },[]);

  const handleClick = ()=>{
    if(taskInfo)
    props.openDialog(taskList, {
      wid: props.wid,
      mid: props.mid,
      pid: props.pid
    });
  }

  return (
       
    <div className="card" style={{aspectRatio:"1/1", transition: "0.5s all", opacity: opacity}} onDoubleClick={handleClick}>

    {(taskInfo)?
      <>
      <h2 className="title">{props.modelName}</h2>
      <div className="progress-circle">
        <div className="progress-circle-inner">
          <div className="progress-number">{progress * 100}%</div>
        </div>
        <svg className="progress-ring" width="120" height="120">
          <circle
            className="progress-ring__circle"
            stroke={(taskInfo.task?.taskState === "IN_PROGRESS")? "#1d47f0" : (taskInfo.task.currentStep === "Complete.")? "#0acb07" : "#cf2c07"}
            strokeWidth="6"
            fill="transparent"
            r="54"
            cx="60"
            cy="60"
            style={{ strokeDasharray: `${progress * 100 * 3.39}, 339` }}
          />
        </svg>
      </div>
      <div className="text-fields">
        <p>{props.wid}</p>
        <p>{props.mid}</p>
        <p>{props.pid}</p>
      </div>
    </> : <div className="card-placeholder">
      <h2 className="title-placeholder"> ... </h2>
      <div className="progress-circle-placeholder">
      </div>
      <div className="text-fields-placeholder">
        <p>...</p>
        <p>...</p>
        <p>...</p>
      </div>
    </div>}
    </div>
  );
}


function Dashboard(props) {

  const [refresh, setRefresh] = useState(true);
  const [openDialog, setOpenDialog] = useState(null);
  const refreshRef = useRef(true);

  const openDialogFunc = (tasklist, cardData)=>{
    taskList.current = tasklist;
    setOpenDialog(cardData);
  }

  const closeDialogFunc = ()=>{
    refreshRef.current = false;
    setOpenDialog(null);
  }

  return (
    (openDialog)? <Dialog wid={openDialog.wid} mid={openDialog.mid} pid={openDialog.pid} taskList={taskList[openDialog.mid]} tokenValue={props.token.tokenValue} closeDialog={closeDialogFunc} setToken={props.setToken} /> :
    <div style={{display: "grid", gap: "10px", gridTemplateColumns: "repeat(auto-fit, minmax(390px, 20px))", width: "100%"}}>
      <div onClick={()=>{refreshRef.current = true; setRefresh(false); setTimeout(()=>setRefresh(true), 20)}} className='refresh-btn'>Refresh</div>
      {(refresh)?
        Object.values(anaplanModels).map((value, index)=>{
          return (
            <Card key={index} wid={value.wid} mid={value.mid} pid={value.pid} modelName={value.modelName} tokenValue={props.token.tokenValue} openDialog={openDialogFunc} refreshRef={refreshRef.current} setToken={props.setToken}/>
          );
        })
      : null}

    </div>
  );
}

function App() {

  const [token, setToken] = useState("");

  return (
    <div className="App">
      <h1 className="App-header">
        Anaplan Monitoring Board
      </h1>
      <section style={{display: "flex", justifyContent: "center", width:"100%"}}>
        {(token)? <Dashboard token={token} setToken={setToken} /> : <Login setToken={setToken} />}
      </section>
    </div>
  );
}

export default App;
