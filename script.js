window.addEventListener('load', () => {

    main = () => {
        if (document.getElementById('input').value == ''){
            for (let i = 0; i < document.getElementById('conversation-list').getElementsByTagName('div').length; i += 1){
                document.getElementById('conversation-list').getElementsByTagName('div')[i].style.display = 'block'
            }
        } else {
            for (let i = 0; i < document.getElementById('conversation-list').getElementsByTagName('div').length; i += 1){
                if (!document.getElementById('conversation-list').getElementsByTagName('div')[i].innerText.includes(document.getElementById('input').value)){
                    document.getElementById('conversation-list').getElementsByTagName('div')[i].style.display = 'none'
                } else {
                    document.getElementById('conversation-list').getElementsByTagName('div')[i].style.display = 'block'

                }
            }
        }
        
        
    }


    document.getElementById('input').oninput = main


})

let output;
let websocket;

function WebSocketSupport() {
  if (browserSupportsWebSockets() === false) {
    document.getElementById("ws_support").innerHTML = "<h2>Sorry! Your web browser does not supports web sockets</h2>";

    let element = document.getElementById("wrapper");
    element.parentNode.removeChild(element);

    return;
  }

  output = document.getElementById("chatbox");

  websocket = new WebSocket('ws:localhost:999');

  websocket.onopen = function(e) {
    writeToScreen("You have have successfully connected to the server");
  };


  websocket.onmessage = function(e) {
    onMessage(e)
  };


}
function onMessage(e) {
    writeToScreen('<span style="color: blue;"> ' + e.data + '</span>');
  }
  
  
  
  function doSend(message) {
    let validationMsg = userInputSupplied();
    if (validationMsg !== '') {
      alert(validationMsg);
      return;
    }
    let chatname = document.getElementById('chatname').value;
  
    document.getElementById('msg').value = "";
  
    document.getElementById('msg').focus();
  
    let msg = '<b>' + chatname + '</b> ' + message;
  
    websocket.send(msg);
  
    writeToScreen(msg);
  }
  
  function writeToScreen(message) {
    let pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
  }
  
  function userInputSupplied() {
    let chatname = document.getElementById('chatname').value;
    let msg = document.getElementById('msg').value;
    if (chatname === '') {
      return 'Please enter your name';
    } else if (msg === '') {
      return 'Please enter your message';
    } else {
      return '';
    }
  }
  
  function browserSupportsWebSockets() {
    if ("WebSocket" in window) {
      return true;
    } else {
      return false;
    }
  }

  