import '../css/InputFields.css'
import {useState} from "react"

function InputFields() {
    let [state, changeState] = useState({
        xAxis: "",
        yAxis: "",
        DataX: "",
        DataY: "",
        markerColor: ""
    })
    let canvas, c
    function plot(e) {
        e.preventDefault()
        canvas = document.getElementById("plottingCanvas")
        c = canvas.getContext("2d")
        c.fillStyle = "white"
        c.fillRect(0, 0, canvas.width, canvas.height)
        let DataX = state.DataX.split(", ")
        let DataY = state.DataY.split(", ")
        DataX = DataX.map(data => +data)
        DataY = DataY.map(data => +data)
        let scaleX = canvas.width / Math.max(...DataX)
        let scaleY = canvas.height / Math.max(...DataY)
        
        for(let i=0; i<DataX.length; i++) {
            c.fillStyle = state.markerColor
            if(DataX[i] == 0) c.fillRect((DataX[i] * scaleX), canvas.height - (DataY[i] * scaleY) - 5, 5, 5)
            if(DataX[i] * scaleX == canvas.width) c.fillRect((DataX[i] * scaleX) - 5, canvas.height - (DataY[i] * scaleY) - 5, 5, 5)
            if(canvas.height - (DataY[i]*scaleY) == canvas.height) c.fillRect((DataX[i] * scaleX) - 5, canvas.height - (DataY[i] * scaleY) - 5, 5, 5)
            if(canvas.height - (DataY[i]*scaleY) == 0) c.fillRect((DataX[i] * scaleX) - 5, canvas.height - (DataY[i] * scaleY), 5, 5)
            else {
                c.fillRect((DataX[i] * scaleX) - 5, canvas.height - (DataY[i] * scaleY) - 5, 5, 5)
            }
        }
    }
   
    return (
        <form id="inputFields" >
            <div className="inputWrapper">
                <label htmlFor="xAxis">X-axis:</label>
                <input type="text" name="xAxis" id="xAxis" onChange={(e) => changeState((prevState) => {return {...prevState, xAxis: e.target.value}})} />
            </div>

            <div className="inputWrapper">
                <label htmlFor="yAxis">Y-axis:</label>
                <input type="text" name="yAxis" id="yAxis" onChange={(e) => changeState((prevState) => {return {...prevState, yAxis: e.target.value}})} />
            </div>

            <div className="inputWrapper">
                <label htmlFor="dataX">DataX:</label>
                <input type="text" name="DataX" id="dataX" onChange={(e) => changeState((prevState) => {return {...prevState, DataX: e.target.value}})} />
            </div>

            <div className="inputWrapper">
                <label htmlFor="dataY">DataY:</label>
                <input type="text" name="dataY" id="dataY" onChange={(e) => changeState((prevState) => {return {...prevState, DataY: e.target.value}})} />
            </div>

            <div className="inputWrapper">
                <label htmlFor="markerColor">Marker Color:</label>
                <input type="text" name="markerColor" id="markerColor" onChange={(e) => changeState((prevState) => {return {...prevState, markerColor: e.target.value}})} />
            </div>

            <button onClick={plot}>Plot</button>
        </form>
    )
}

export default InputFields