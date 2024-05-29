import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../context/SocketProvider';
import { useNavigate } from 'react-router-dom';

const Lobby = () => {

  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();
  console.log(socket);

  const handleEmail =(e) =>{
    setEmail(e.target.value)
  }

  const handleroom = (e) =>{
    setRoom(e.target.value);
  }

  const submitForm = useCallback((e) =>{
    e.preventDefault();
    console.log(room, email);
    socket.emit("room:join", {email, room})
  }, [email, room, socket]
)

const handleJoinRoom = useCallback((data) =>{
  const {email, room} = data;
  console.log(email, room, "pgl");
  navigate(`/room/${room}`);
}, [navigate])

useEffect(()=>{
  socket.on("room:join", handleJoinRoom)


  return ()=>{
    socket.off("room:join", handleJoinRoom);
  }
}, [socket, handleJoinRoom])

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={submitForm} >
        <label htmlFor='email'>Email Id</label>
        <input type="email" id="email" value ={email} onChange={handleEmail} />
        <br/>
        <br/>

        <label htmlFor='room'>Room Number</label>
        <input type="text" id="room" value={room} onChange={handleroom} />

        <br/>
        <br/>

        <button type="submit" >Join</button>

      </form>
    </div>
  )
}

export default Lobby
