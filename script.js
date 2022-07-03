function App () {
    const [breakTime, setbreakTime] = React.useState(5)
    const [sessionTime, setSessionTime] = React.useState(25)
    
    const [seconds, setSeconds] = React.useState("00")
    const [minutes , setMinutes] = React.useState("25")

    const [playPause, setPlayPause] = React.useState(false)
    const [symbol, setSymbol] = React.useState({__html:"&#9654;"})
    const [timeSBLeft, setTimeSBLeft] = React.useState(1500)
    const [intervalId, setIntervalId] = React.useState()
    const [labelName, setLabelName] = React.useState("Session")



    function hanldeClick (e) {
        const name = e.target.name
        const value = Number(e.target.value) 
        let breakT = breakTime
        let sessionT = sessionTime

        if(sessionTime == 1){setSessionTime(t => t + 1)}
        if(sessionTime == 60){setSessionTime(t => t -1)}

        if (name === "break"){
            breakT += value
            if(breakT == 0){breakT = 1}
            if(breakT == 61){breakT = 60}
            setbreakTime(breakT)
        } 
        else{
            sessionT += value
            if(sessionT == 0){sessionT = 1}
            if(sessionT == 61){sessionT = 60}
            setSessionTime(sessionT)
            timeFunc(sessionT*60)
        }

        setTimeSBLeft(sessionTime * 60)
    }
    function resetTime(){
        setbreakTime(5)
        setSessionTime(25)
        playPause ? clockTimer() : null
        setTimeSBLeft(1500)
        document.getElementById("beep").pause()
    }

    
    function clockTimer(){
    
        playPause ? setSymbol({__html:"&#9654;"}) : setSymbol({__html:"| |"})
        playPause ? setPlayPause(false):setPlayPause(true)

        if(playPause != true){
         try {
            setIntervalId ( setInterval(() => {
                setTimeSBLeft(t => t -1)
            }, 1000))
            ("on")
         } catch (error) {
            
         }
          
        }
        else {
            try {
                clearInterval(intervalId)   
            } catch (error) {
                
            }
            ("off")
        }
        
    }

    /* function timer(){
            setTimeSBLeft(t => t -1)
            timeFunc(timeSBLeft-1)
            (timeSBLeft)
            
    } */

    const timeFunc = (curVal) =>{
     
        
        let minutesT = Math.floor((curVal /  (60)))
        let secondsT = Math.floor((curVal % 60))
        
        if(secondsT > 9){
            setSeconds(secondsT)
        }   else {
            setSeconds("0" + secondsT)
        }
        
        if(minutesT > 9) {
            setMinutes(minutesT)
        }   else {
            setMinutes("0" + minutesT)
        }
        
        
    }

    React.useEffect(() => {
       
        (timeSBLeft)
        timeFunc(timeSBLeft)

        if(timeSBLeft == 0 && labelName == "Session"){
            setLabelName("Break")
            setTimeSBLeft(breakTime*60)
            document.getElementById("beep").play()
        }
        if(timeSBLeft == 0 && labelName == "Break"){
            setLabelName("Session")
            setTimeSBLeft(sessionTime*60)
            document.getElementById("beep").play()
        }
        
    })

    return(
    <div className="App">
        <h1 className="title">𝓟𝓸𝓶𝓸 𝓒𝓵𝓸𝓬𝓴</h1>

        
        <div id="break-label" className="label">
                <button id="break-increment"  onClick={hanldeClick} name="break" value= "1" >&#9650;</button>
                <h1    id="break-length"  >{breakTime}</h1>
                <button  id="break-decrement"   onClick={hanldeClick} name="break" value= "-1">&#9660;</button>
            </div>



        <div id="session-label" className="label" >
                <button id="session-increment" onClick={hanldeClick} name="session" value= "1" >&#9650;</button>
                <h1 id="session-length" >{sessionTime}</h1>
                <button  id="session-decrement" onClick={hanldeClick} name="session" value= "-1" >&#9660;</button>                
            </div>

        <div id="timer-label">
            <h1>{labelName}</h1>
            <h1  id="time-left" >{minutes + ":" + seconds}</h1>
        </div>

        <div className="controls">
            <audio id="beep" tpye="audio/wav"  src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
            <button id="start_stop" dangerouslySetInnerHTML={symbol}  onClick={clockTimer} />
            <button  id="reset" onClick={resetTime}>&#8634;</button>
        </div>

    </div>
    )
    
}

 
   


ReactDOM.render(< App />, document.getElementById("root"))