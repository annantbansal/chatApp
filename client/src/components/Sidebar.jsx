import React, { useContext, useEffect,useState } from 'react'
import assets from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';
import logonew from '../assets/logonew.png';
import { AuthContext } from '../context/AuthContext.jsx';
import { ChatContext } from '../context/ChatContext.jsx';
const Sidebar = () => {
    const {selectedUser,setSelectedUser,users,getUsers,unseenMessages,setUnseenMessages}=useContext(ChatContext);
    const {logout,onlineUsers}=useContext(AuthContext);
    const [input,setInput]=useState(false);
    const filteredUsers=input?users.filter((user)=>user.fullName.toLowerCase().includes(input.toLowerCase())):users;
    useEffect(()=>{
        getUsers();
    },[onlineUsers]);
    const navigate =useNavigate();
  return (
    <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser?'max-md:hidden':''}`}>
      <div className='pb-5'>

        <div className='flex justify-between items-center'>
            
            <div className='flex items-center text-2xl gap-0'><img src={logonew} alt='logo' className='max-w-10'></img>TalkTime</div>

            <div className='relative py-2 group'>
                <img src={assets.menu_icon} className='max-h-5 cursor-pointer'></img>
                <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'> 
                    <p onClick={()=>navigate('/profile')} className='text-sm cursor-pointer'>Edit Profile</p>
                    <hr className='my-2 border-2 border-gray-500'></hr>
                    <p onClick={()=>logout()} className='cursor-pointer text-sm'>Log Out</p>
                </div>
            </div>
        </div>

        <div className='bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5'>
            <img src={assets.search_icon} alt='search' className='w-3'></img>
            <input type='text' onChange={(e)=>setInput(e.target.value)} className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1' placeholder='Search User...'></input>
        </div>

      </div>



    <div className='flex flex-col'>
        {filteredUsers.map((user,index)=>(
            <div key={index} onClick={()=>{setSelectedUser(user);setUnseenMessages((prev)=>({...prev,[user._id]:0}))}} className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id===user._id && 'bg-[#282142]/50'}`}>
                <img src={user?.profilePic || assets.avatar_icon} className='w-[35px] aspect-[1/1] rounded-full' alt="" />
                <div className='flex flex-col leading-5 pr-6 truncate w-full'>
                    <p className='truncate'>{user.fullName}</p>
                    {
                        onlineUsers.includes(user._id)
                        ?<span className='text-green-400 text-xs'>Online</span>
                        :<span className='text-neutral-400 text-xs'>Offline</span>
                    }
                </div>
                {unseenMessages[user._id]>0 && <p className='absolute top-1/2 -translate-y-1/2 right-3 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>{unseenMessages[user._id]}</p>}
            </div>
        ))}
    </div>
    </div>
  )
}

export default Sidebar;
