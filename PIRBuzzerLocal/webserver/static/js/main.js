var aliveSecond = 0;
var heartbeatRate = 5000;

function keepAlive()
{
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(this.readyState === 4){
			if(this.status === 200){

				if(this.responseText !== null){
					var date = new Date();
					aliveSecond = date.getTime();
					var keepAliveData = this.responseText;
					//convert string to JSON
					var json_data = this.responseText;
					var json_obj = JSON.parse(json_data);
					if(json_obj.motion == 1){
						document.getElementById("Motion_id").innerHTML = "Yes";
					}
					else{
						document.getElementById("Motion_id").innerHTML ="No";
					}
					console.log(keepAliveData);
				}
			}
		}
	};
	request.open("GET", "keep_alive", true);
	request.send(null);
	setTimeout('keepAlive()', heartbeatRate);
}

function time()
{
	var d = new Date();
	var currentSec = d.getTime();
	if(currentSec - aliveSecond > heartbeatRate + 1000)
	{
		document.getElementById("Connection_id").innerHTML = "DEAD";
	}
	else
	{
		document.getElementById("Connection_id").innerHTML = "ALIVE";
	}
	setTimeout('time()', 1000);
}

function sendEvent(value)
{
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(this.readystate === 4){
			if(this.status === 200){
				if(this.responseText !== null){
				}
			}
		}
	};
	request.open("POST", "status="+value, true);
	request.send(null);
}

function handleClick(cb)
{
	if(cb.checked)
	{
		value = "ON";
	}
	else
	{
		value = "OFF";
	}
	sendEvent(cb.id+"-"+value);
}
	
