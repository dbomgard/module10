const sendBtn = document.querySelector('.send-btn')
const container = document.querySelector(".container")
const geoBtn = document.querySelector('.geo-btn')
const chatbox = document.querySelector('.chatbox')
const input = document.querySelector("input")
const startBtn = document.querySelector(".start-btn")

const url = "wss://echo-ws-service.herokuapp.com";
let websocket;

function openConection() {
  websocket = new WebSocket(url);
  
  websocket.onmessage = function(evt) {
    addServerMessage(evt.data)
  }
}

function addServerMessage(message) {
  let answer = document.createElement('div');
  answer.classList.add("server-message");
  answer.textContent = message;
  chatbox.append(answer)
}

startBtn.addEventListener('click', () => {
  openConection();
  startBtn.style.display = "none";
  container.style.display = "flex"
})


sendBtn.addEventListener('click', () => {
  const newMessage = document.createElement('div');
  newMessage.classList.add("client-message")
  newMessage.textContent = input.value;
  chatbox.append(newMessage);
  input.value = null;
  websocket.send(newMessage.textContent)
})

const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(longitude)
  mapLink = document.createElement("a")
  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
  mapLink.textContent = "Геопозиция"
  mapLink.classList.add("client-message")
  chatbox.append(mapLink)
}

const error = () => {
  alert("Ошибка при определении геолокации")
}

geoBtn.addEventListener('click', () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(success, error)
  } else {
    alert('Геолокация не поддерживается')
  }
})

