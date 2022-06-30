import React, {useContext, useState, useEffect} from 'react';
import { AppContext } from '../../Context/AppContext';
import userPhoto from '../../assets/user.png';
import bell from '../../assets/bell.svg';
import searchIcon from '../../assets/search-icon.svg';
import Message from '../Main/SubMain/Chat/Message/Message';
import { Link } from 'react-router-dom';
import './TopBar.css';

export default function TopBar({socket}){

    const {user, chats, unReadNum, setRoom} = useContext(AppContext);
    const [unreadList, setUnreadList] = useState([]);
    const [showList, setShowList] = useState(false);

    const UnRead = ()=>{
        const num = unReadNum.map(chat=> chat.unRead.length)
        
        if(num > 0){
            const total = num.reduce((a,b)=> a+b)
            return<span className='dot'>{ total}</span>
        }
    }
    const handleSetRoom = (id, chatId)=>{
        console.log('setRoom')
        if(id !== user._id){
            setRoom(chats.find(chat=> chat._id === chatId))
            socket.emit("read_msg", {_id:user._id, room_id:chatId})
        }
    }
    useEffect(() => {
        const msj = unReadNum.map(chat=> chat.unRead)
        const totalMsj = msj.flat(1)
        setUnreadList(totalMsj)
    }, [unReadNum]);
    
    return(
        <div className='top-bar'>
            <div className='user-search'>
                <div className='sub-user-search'>
                    <img src={searchIcon} alt=''  />
                    <input type='text' placeholder='User search' />
                </div>
            </div>
            <div className='user'>
                <div>
                    {user ? (
                            user.img ? (
                                <img src={user.img} className='img' alt='' />
                            ):(
                                <img src={userPhoto} className='img' alt='' />
                            )
                        ):(
                            <img src={userPhoto} className='img' alt='' />
                        )
                    }
                    <p>{user ? (`${user.firstName + ' ' + user.lastName}`):('no user')}</p>
                </div>
                <button onClick={()=>setShowList(unReadNum.length > 0 ? !showList:showList)}>
                    <img src={bell} alt='' />
                    <UnRead />
                    {showList && unreadList.length > 0 ? (
                        <div className='unRead-msg'>
                            <div className='sub-unRead-msg'>
                                {unreadList.map(msj=>{
                                    return msj._id ? (
                                        <Link to='/chatapp' className='link' key={msj._id} onClick={()=>handleSetRoom(msj.user, msj.room)}>
                                            <Message  user={user} id={msj._id} date={msj.time} content={msj.message} postedBy={msj.user} socket={socket} />
                                        </Link>
                                    ):('')
                                })}
                            </div>
                            
                        </div>
                    ):('')}
                    
                </button>
                
            </div>
        </div>
    )
}