import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../redux/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch()
  const connections = useSelector(store => store.connection)
  const handleConnections = async() => {
     try {
       const res = await axios.get(import.meta.env.VITE_BASE_URL + "/user/connection" , {withCredentials:true})
       if(res.status === 200){
        dispatch(addConnection(res.data.data))
       }
     } catch (error) {
       console.log(error)
     }
  }
  
  useEffect(()=>{
    if(!connections){
      handleConnections()
    }
  },[])
 
  return (
    <div className="grid gap-4 ">
      {
        connections ? connections.map((item , index) => (
          <div key={index} className="card h-52 card-side bg-base-200 shadow-sm">
            <figure className="w-1-/2">
              <img
                src={item.photoUrl}
                alt="photoUrl"
              />
            </figure>
            <div className="card-body w-1/2">
              <h2 className="card-title">{item.firstName + " " + item.lastName}</h2>
              <p className="h-16 overflow-hidden text-ellipsis">{item.desc}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">CHAT</button>
              </div>
            </div>
          </div>
        )):<div className=" flex text-2xl items-center justify-center ">No Connections to show !</div>
      }
    </div>
  );
};

export default Connections;
