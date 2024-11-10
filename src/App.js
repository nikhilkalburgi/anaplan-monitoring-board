
/* eslint-disable no-unused-vars */
import { createRef, useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';

let taskInfoHistory = {};
let taskList = {};
let isErrorHandled = false;

const anaplanModels = {
    "dh": {
      wid: "8a868cdd7cfc09d5017d2f68024b41dd",
      mid: "CF414323D7D84333B1D40B70B45AAA96",
      pid: "118000000028",
      modelName: "DataHub | Import"
    },
    "cms": {
      wid: "8a868cd87cf708b8017d2f42e86c3b56",
      mid: "2386A475AE9444C48B1327B58E337743",
      pid: "118000000128",
      modelName: "CMS"
    },
    "inpHDEP": {
      wid: "8a868cd87cf708b8017d2f0ebc743118",
      mid: "F9541D6D22534225A4B514467117A1DC",
      pid: "118000000065",
      modelName: "INP | HDEP"
    },
    "inpMDEG": {
      wid: "8a868cd87cf708b8017d2f0ebc743118",
      mid: "639E24B10A024FC3844E662FBEE45A92",
      pid: "118000000065",
      modelName: "INP | MDEG"
    },
    "inpAXLE": {
      wid: "8a868cd87cf708b8017d2f0ebc743118",
      mid: "CD7643B8C4FB4F02A25B3693897186E0",
      pid: "118000000065",
      modelName: "INP | AXLE"
    },
    "inpTRANS": {
      wid: "8a868cd87cf708b8017d2f0ebc743118",
      mid: "BCF796F751D44912A2E82DC58C45B9EB",
      pid: "118000000065",
      modelName: "INP | TRANS"
    },
    "020": {
      wid: "8a868cd87d3fe8da017d6d2e337b50d2",
      mid: "C6BC82739C4847F1A12DC4A863FD5EEE",
      pid: "118000000040",
      modelName: "020 FC"
    },
    "590": {
      wid: "8a868cd87d3fe8da017d6d2e337b50d2",
      mid: "8731AA6533E84E45BE729F6447F5FF26",
      pid: "118000000040",
      modelName: "590 FC"
    },
    "034": {
      wid: "8a868cd87d3fe8da017d6d2e337b50d2",
      mid: "EFDCEB65559F4ADDB1D0EF303B892A2A",
      pid: "118000000040",
      modelName: "034 FC"
    },
    "export": {
      wid: "8a868cd87d3fe8da017d6d2e337b50d2",
      mid: "7EDA7AFC9E8E415C8AAC5312EA72BA32",
      pid: "118000000001",
      modelName: "EXPORT LAYER"
    },
};

const anaplanModels_sand = {
  "sand_dh": {
      wid: "8a868cdb794dcdad0179b4761275391e",
      mid: "39807785E2E34F4BBB62991C8E89B44C",
      pid: "118000000028",
      modelName: "DataHub | Import"
    },
    "sand_cms": {
      wid: "8a868cd97cf70a1b017d2f18b3d94241",
      mid: "BDD2CE14F8BE45E18BB73DB3C332DD83",
      pid: "118000000128",
      modelName: "CMS"
    },
    "sand_inpHDEP": {
      wid: "8a868cd8794dc8380179b47904494098",
      mid: "2EB568E052B24056A09DB9B0BCA1D3B6",
      pid: "118000000065",
      modelName: "INP | HDEP"
    },
    "sand_inpMDEG": {
      wid: "8a868cd8794dc8380179b47904494098",
      mid: "09300CCC92ED46A78F7DB76A52587AC8",
      pid: "118000000065",
      modelName: "INP | MDEG"
    },
    "sand_inpAXLE": {
      wid: "8a868cd8794dc8380179b47904494098",
      mid: "39DDA72E55414F6D9113039E252CD2C9",
      pid: "118000000065",
      modelName: "INP | AXLE"
    },
    "sand_inpTRANS": {
      wid: "8a868cd8794dc8380179b47904494098",
      mid: "F9A818D9C868413CB4998B083B68C79A",
      pid: "118000000065",
      modelName: "INP | TRANS"
    },
    "sand_020": {
      wid: "8a868cdc83dd7cf80183f13740b578b4",
      mid: "E98A05B5C0A3489E836BB948FD32ACF7",
      pid: "118000000040",
      modelName: "020 FC"
    },
    "sand_590": {
      wid: "8a868cdc83dd7cf80183f13740b578b4",
      mid: "F117BD0AA1CA4462B6F08A41A5157377",
      pid: "118000000040",
      modelName: "590 FC"
    },
    "sand_034": {
      wid: "8a868cdc83dd7cf80183f13740b578b4",
      mid: "D3AF38D05BCB4D37A364A31D17295255",
      pid: "118000000040",
      modelName: "034 FC"
    },
    "sand_069": {
      wid: "8a868cdc83dd7cf80183f13740b578b4",
      mid: "9687CFFFC63E44BFA557654508B535B0",
      pid: "118000000040",
      modelName: "069 FC"
    },
    "sand_export": {
      wid: "8a868cdc83dd7cf80183f13740b578b4",
      mid: "B32D3CACA6FA4C0F8374199B36CC78C2",
      pid: "118000000001",
      modelName: "EXPORT LAYER"
    },
}

const anaplanModels_test = {
    "test_dh": {
      wid: "8a868cdb794dcdad0179b4761275391e",
      mid: "7837D3F72F91422A93AA3B6CF13D81B5",
      pid: "118000000028",
      modelName: "DataHub | Import"
    },
    "test_cms": {
      wid: "8a868cd97cf70a1b017d2f18b3d94241",
      mid: "CCA364D913334EDD8595EE8A641C39F3",
      pid: "118000000128",
      modelName: "CMS"
    },
    "test_020": {
      wid: "8a868c7091de9261019259151b194a98",
      mid: "0E8B4B453242460C85AEAC01C5BF0FA3",
      pid: "118000000040",
      modelName: "020 FC"
    },
    "test_590": {
      wid: "8a868c7091de9261019259151b194a98",
      mid: "86D44140FD3744C6ACC492C6FE09A9BC",
      pid: "118000000040",
      modelName: "590 FC"
    },
    "test_069": {
      wid: "8a868c7091de9261019259151b194a98",
      mid: "BF6639670A2A44D295084D31AEE53507",
      pid: "118000000040",
      modelName: "069 FC"
    },
    "test_034": {
      wid: "8a868c7091de9261019259151b194a98",
      mid: "97C98D47D70E4A69A061C0BB7B46A00E",
      pid: "118000000040",
      modelName: "034 FC"
    },
    "test_export": {
      wid: "8a868c7091de9261019259151b194a98",
      mid: "C764E9F456004F2692063BBFAB78696C",
      pid: "118000000001",
      modelName: "EXPORT LAYER"
    }
}

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

  document.onkeydown = (event)=>{
      console.log(event.key)
        if(event.key === 'Enter') {
          loginToAnaplan()
        }
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
        <h6> <span className="task-bar-fieldkeys"> Workspace ID :</span> {props.wid} </h6>
        <h6> <span className="task-bar-fieldkeys"> Model ID :</span> {props.mid} </h6>
        <h6> <span className="task-bar-fieldkeys"> Process ID :</span> {props.pid} </h6>
        <h6> <span className="task-bar-fieldkeys"> Task ID :</span> {taskInfo.taskId} </h6>
        <h6> <span className="task-bar-fieldkeys"> current Step :</span> {taskInfo.currentStep}</h6>
        <div onClick={refreshTask} className='refresh-btn' style={{right: "20px", width: "10%", position: "absolute", margin: 0, textAlign: "centre"}}>Refresh</div>
        <p className="task-bar-status"> {parseFloat(progress * 100).toFixed(2)} %</p>
        <div className="action-container">
          {(taskInfo.result?.nestedResults?.length)? taskInfo.result?.nestedResults.map((value, index)=>{
              return (<div key={index} className="action-bar" style={{  border: (value.successful)? "4px solid #04bf26" : "4px solid #dc0505"}}>
              <h6> <span className="task-bar-fieldkeys"> Object ID :</span> {value.objectId} </h6>
              <h6> <span className="task-bar-fieldkeys"> Failure Dump Available :</span> {String(value.failureDumpAvailable)}</h6>
              <h6> <span className="task-bar-fieldkeys"> Action Number :</span> {index}</h6>
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
      <h6 className="task-bar-fieldkeys-placeholder"> <span> ....... </span></h6>
      <h6 className="task-bar-fieldkeys-placeholder"> <span> .............</span> </h6>
      <h6 className="task-bar-fieldkeys-placeholder"> <span> .... </span> </h6>
      <h6 className="task-bar-fieldkeys-placeholder" style={{height: "30vh"}}> <span> </span> </h6>
    </div> : (props.taskList?.map((value, index)=>{
          const date = new Date(value.creationTime);
          return (
              <div key={index} className="task-bar" onDoubleClick={()=>openTask(value.taskId)}>
                <h6> <span className="task-bar-fieldkeys"> Task ID :</span> {value.taskId} </h6>
                <h6> <span className="task-bar-fieldkeys"> Start Time :</span> {date.toUTCString()}</h6>
                <p className="task-bar-status">{value.taskState}</p>
              </div>
            )
        }) ?? <h2 style={{position: 'absolute', top:'50%', left: '50%', transform:'translate(-50%, -50%)'}}>No Tasks Available</h2>) 
      }
    </div>
  );
}


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
      setTaskInfo(taskInfoHistory[props.mid]);
      setProgress(taskInfoHistory[props.mid]?.task?.progress ?? 0); 
    } else {
        axios(config)
        .then(function (response) {
              console.log(response.data, taskList);
              if(response.data?.tasks?.length > 0){
                taskList[props.mid] = response.data.tasks;
                var config = {
                  method: 'get',
                  url: `https://my-backend-kappa.vercel.app/workspaces/${props.wid}/models/${props.mid}/processes/${props.pid}/tasks/${response.data.tasks[response.data.tasks.length-1].taskId}`,
                  headers: { 
                    'Authorization': `AnaplanAuthToken ${props.tokenValue}`,
                  }
                };
                
                if(new Date(response.data.tasks[response.data.tasks.length-1].creationTime).getDate() === new Date().getDate()) {
                  axios(config)
                  .then(function (response) {
                    console.log(response.data);
                    taskInfoHistory[props.mid] = response.data;
                    setTaskInfo(response.data);   
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

              }else{
                taskInfoHistory[props.mid] = {task:{taskState:"IN_PROGRESS", currentStep: ""}};
                setTaskInfo({task:{taskState:"IN_PROGRESS", currentStep: ""}}); 
              }
              
              }else {
                  taskInfoHistory[props.mid] = {task:{taskState:"IN_PROGRESS", currentStep: ""}};
                  setTaskInfo({task:{taskState:"IN_PROGRESS", currentStep: ""}});   
              }
          
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

  },[]);

  const handleClick = ()=>{
    if(taskInfo)
    props.openDialog(taskList, {
      wid: props.wid,
      mid: props.mid,
      pid: props.pid
    });
  }

  const handleCopy = (text, event, name)=>{
    navigator.clipboard.writeText(text);
    event.target.style.backgroundColor = "#62df10";
    event.target.innerHTML = "✔️";
    setTimeout(()=> {
      event.target.innerHTML = name;
      event.target.style.backgroundColor = "#d4d4d4"
    }, 2000);
  }

  return (
       
    <div className="card" style={{aspectRatio:"1/1", transition: "0.5s all", opacity: opacity}} onDoubleClick={handleClick}>

    {(taskInfo)?
      <>
      <h5 className="title">{props.modelName}</h5>
      <div className="details">
        <div className="progress-circle">
          <div className="progress-circle-inner">
            <div className="progress-number">{parseInt(progress * 100)}%</div>
          </div>
          <svg className="progress-ring" width="80" height="80">
            <circle
              className="progress-ring__circle"
              stroke="#ddd"
              strokeWidth="7"
              fill="transparent"
              r="30"
              cx="40"
              cy="40"
              style={{ strokeDasharray: `189.24, 189.24` }}
            />
            <circle
              className="progress-ring__circle"
              stroke={(taskInfo.task?.taskState === "IN_PROGRESS")? "#1d47f0" : (taskInfo.task?.currentStep === "Complete.")? "#0acb07" : "#cf2c07"}
              strokeWidth="7"
              fill="transparent"
              r="30"
              cx="40"
              cy="40"
              style={{ strokeDasharray: `${progress * 100 * 1.8924}, 189.24` }}
            />
          </svg>
        </div>
        <div className="text-fields">
          <button onClick={(event)=> handleCopy(props.wid, event, "WID")}>WID</button>
          <button onClick={(event)=> handleCopy(props.mid, event, "MID")}>MID</button>
          <button onClick={(event)=> handleCopy(props.pid, event, "PID")}>PID</button>
        </div>
      </div>
    </> : <div className="card-placeholder">
      <h2 className="title-placeholder"> ... </h2>
      <div className='details'>
        <div className="progress-circle-placeholder">
        </div>
        <div className="text-fields-placeholder">
        <button>...</button>
        <button>...</button>
        <button>...</button>
        </div>
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
    (openDialog)? <Dialog wid={openDialog.wid} mid={openDialog.mid} pid={openDialog.pid} taskList={taskList[openDialog.mid]} tokenValue={props.token.tokenValue} closeDialog={closeDialogFunc} setToken={props.setToken} /> : <div className="env">

    <div onClick={()=>{refreshRef.current = true; setRefresh(false); setTimeout(()=>setRefresh(true), 20)}} className='refresh-btn'>Refresh</div>
    <div style={{display: "grid", position: 'relative', gridTemplateColumns: "repeat(auto-fit, minmax(150px, 20px))", width: "100%", height: "fit-content", alignItems: "center", justifyContent: "center", borderRight: "0.5px solid #00f", marginTop: 15}}>
    <h4 style={{width: "100%", position: 'absolute', top: -45}}>SAND</h4>
      {(refresh)?
        Object.values(anaplanModels).map((value, index)=>{
          return (
            <Card key={index} wid={value.wid} mid={value.mid} pid={value.pid} modelName={value.modelName} tokenValue={props.token.tokenValue} openDialog={openDialogFunc} refreshRef={refreshRef.current} setToken={props.setToken}/>
          );
        })
        : null}

    </div>
    <div style={{display: "grid", position: 'relative', gridTemplateColumns: "repeat(auto-fit, minmax(150px, 20px))", width: "100%", height: "fit-content", alignItems: "center", justifyContent: "center", marginTop: 15}}>
        <h4 style={{width: "100%", position: 'absolute', top: -45}}>PROD</h4>
      {(refresh)?
        Object.values(anaplanModels_sand).map((value, index)=>{
          return (
            <Card key={index} wid={value.wid} mid={value.mid} pid={value.pid} modelName={value.modelName} tokenValue={props.token.tokenValue} openDialog={openDialogFunc} refreshRef={refreshRef.current} setToken={props.setToken}/>
          );
        })
        : null}

    </div>
    <div style={{display: "grid", position: 'relative', gridTemplateColumns: "repeat(auto-fit, minmax(150px, 20px))", width: "100%", height: "fit-content", alignItems: "center", justifyContent: "center", borderLeft: "0.5px solid #00f", marginTop: 15}}>
        <h4 style={{width: "100%", position: 'absolute', top: -45}}>TEST</h4>
      {(refresh)?
        Object.values(anaplanModels_test).map((value, index)=>{
          return (
            <Card key={index} wid={value.wid} mid={value.mid} pid={value.pid} modelName={value.modelName} tokenValue={props.token.tokenValue} openDialog={openDialogFunc} refreshRef={refreshRef.current} setToken={props.setToken}/>
          );
        })
      : null}

    </div>
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
