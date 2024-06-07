import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { IuserRes } from '../../interfaces';
import { getUsers } from '../../services/adminService';
import { Socket, io } from 'socket.io-client';
import { findChats, saveChat } from '../../services/chatService';
import EmojiPicker from 'emoji-picker-react';
import MessageItem from './TimeSelector';
import VoiceRecorder from '../customUI/audio';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { updateNewMessage, updateUnRead } from '../../services/userServices';
import { showAlert } from '../../redux/slices/alertSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

console.log('admin rendering..............');

const AdminChat: React.FC = () => {
    const [count,setCount] = useState<{id:string,count:number}[]>([])
    const [showMessages, setShowMessages] = useState<{ content: string, reciever: string, sender: string, time: string,contentType:string,isRead:boolean }[]>([])
    const [users, setUsers] = useState<IuserRes[] | null>([])
    const [messages, setMessages] = useState<{ content: string, reciever: string, sender: string, time: string,contentType:string ,isRead:boolean}[]>([]);
    const [socket, setSocket] = useState<Socket | null>()
    const [show, setShow] = useState(false)
    const [text, setText] = useState('')
    const [selected, setSelected] = useState<IuserRes>()
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [online, setOnline] = useState<string[]>([])
    const [showPicker, setShowPicker] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null);
    const [start, setStart] = useState(false)

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fetch = async () => {
        try {
            const res = await getUsers()
            const data = res.data.users.map((item:IuserRes)=>({id:item._id,count:item.unRead}))
            setUsers(res.data.users)
            setCount(data)
        } catch (err:any) {
            console.log(err);
            dispatch(showAlert({color:"red",content:err.message}))

        }
    }



    const fetchData = async () => {
        try {
            await fetch();


            const newSocket = io('http://localhost:3000');
            newSocket.emit('user_connect', 'admin')
            setSocket(newSocket)
            newSocket.on('admin-onlines', (data: any) => {
                console.log(data, '//////////');
                setOnline(data)
            })
            newSocket.on('from_admin', (data) => {
                console.log("received");
                setMessages((prevMessages) => [...prevMessages, data]);
            });
            newSocket.on('admin-recive', (data: { content: string, reciever: string, sender: string, time: string,contentType:string,isRead:boolean }) => {
                console.log('recived');
                setMessages((prev) => [...prev, data])
                if (data.sender === selected?._id) {
 
                    setShowMessages((prev) => [...prev, data])
                }
            })
            newSocket.on('update_count',(data:any)=>{
                const updIndex = count.findIndex((item:any) => item.id === data.id);
                const arr = [...count]
                arr[updIndex].count+= 1
                setCount(arr)
            })
            scrollToBottom()
        } catch (err:any) {
            dispatch(showAlert({color:"red",content:err.message}))
            console.error('Error fetching data:', err);
        }
    };

    useEffect(() => {
        fetchData();
        console.log(typeof messages);
        
        document.body.style.overflowY = 'hidden'
    }, [])

    useEffect(() => {
        fetchData()
    }, [selected])


    useEffect(() => {
        scrollToBottom()

    }, [showMessages])

    const handleEmojiClick = (emojiObject: any) => {
        const { emoji } = emojiObject;
        console.log(emoji, emojiObject, '.....');

        setText((prevText) => prevText + emoji); // Append selected emoji to text
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    };




    const handleSelect = async (data: IuserRes) => {
        try {
            const res = await findChats(data._id)
            setSelected(data)
            const arr = [...count]
            const indx = arr.findIndex((item:any)=>item.id === data._id)
            arr[indx].count = 0
            setCount(arr)
            await updateUnRead({id:data._id,count:'dec'})
            // const filtered = messages.filter((item) => item.sender === data._id && item.reciever === data._id )
            setShowMessages(res.data.data)
            setShow(true)
            scrollToBottom()
        } catch (err:any) {
            console.log(err);
            dispatch(showAlert({color:"red",content:err.message}))
        }

    }
    const sendMessage = async () => {
        if (!text.trim()) {
            return
        }
        const data: any = {
            content: text,
            sender: 'admin',
            reciever: selected?._id,
            time: Date.now(),
            contentType:'string',
            isRead:false
        }
        try {
            await saveChat(data)
            await updateNewMessage({id:selected?._id,count:'inc'})
        } catch (err:any) {
            console.log(err);
            dispatch(showAlert({color:"red",content:err.message}))

        }
        setText('')
        setMessages((prev) => [...prev, data])
        setShowMessages((prev) => [...prev, data])
        socket?.emit('admin_message', data)

    }
    const sendVoice = async (voice: Blob) => {

        const base64Voice = await blobToBase64(voice);
        const data: any = {
            content: `data:audio/wav;base64,${base64Voice}`,
            sender: 'admin',
            reciever: selected?._id,
            time: Date.now(),
            contentType:'voice',
            isRead:false
        }
        try {
             await saveChat({
                content:`data:audio/wav;base64,${base64Voice}` ,
                sender: 'admin',
                reciever: selected?._id,
                time: Date.now(),
                contentType:'voice'
    
            })
        } catch (err:any) {
            console.log(err);
            dispatch(showAlert({color:"red",content:err.message}))

        }

        setMessages((prev) => [...prev, data])
        setShowMessages((prev) => [...prev, data])
        socket?.emit('admin_message', data)

    }

    const getCount = (id:string)=>{
        const Count = count.findIndex((item:any)=>item.id === id);
        
        return Count;

    }

    const blobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64String = reader.result?.toString();
                if (base64String) {
                    const base64Data = base64String.split(',')[1];
                    resolve(base64Data);
                } else {
                    reject(new Error('Failed to read Blob as base64'));
                }
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const formatDate = (lastSeen: any) => {
        if (!lastSeen) return ''; 

        const lastSeenDate = new Date(lastSeen);
        const today = new Date();

        if (
            lastSeenDate.getDate() === today.getDate() &&
            lastSeenDate.getMonth() === today.getMonth() &&
            lastSeenDate.getFullYear() === today.getFullYear()
        ) {
            const hours = lastSeenDate.getHours().toString().padStart(2, '0');
            const minutes = lastSeenDate.getMinutes().toString().padStart(2, '0');
            return `Last seen today at ${hours}:${minutes}`;
        } else {
            const day = lastSeenDate.getDate().toString().padStart(2, '0');
            const month = (lastSeenDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
            const year = lastSeenDate.getFullYear();
            return `Last seen on ${day}/${month}/${year}`;
        }
    };


    const isFirstMessageOfDay = (currentMessage: any, index: any, allMessages: any) => {
        if (index === 0) {
            return true;
        }

        const previousMessage = allMessages[index - 1];
        const currentDate = new Date(currentMessage.time);
        const previousDate = new Date(previousMessage.time);

        return (
            currentDate.getFullYear() !== previousDate.getFullYear() ||
            currentDate.getMonth() !== previousDate.getMonth() ||
            currentDate.getDate() !== previousDate.getDate()
        );
    };

    

    return (
        <div className="flex h-screen antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
                {/* Sidebar */}
                <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
                    
                <button onClick={()=>navigate('/admin/dashboard')} className=' w-fit mx-auto px-2 py-1 rounded text-white kanit-regular bg-red-500'>Back to Dashboard</button>
<div className="flex mt-5 flex-row items-center justify-center h-12 w-full">
                        <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                />
                            </svg>
                        </div>
                        <div className="ml-2 font-bold text-2xl"> Messages</div>
                    </div>
                    {/* User Profile */}

                    {/* Active Conversations */}
                    <div className="flex flex-col mt-8">
                        <div className="flex flex-row items-center justify-between text-xs">
                            <span className="font-bold">Active Users</span>
                            <span className="flex items-center justify-center bg-emerald-600 text-white h-4 w-4 rounded-full">{online.length - 1}</span>
                        </div>

                        <div className="flex scroll-hidden flex-col space-y-1 mt-4 -mx-2  max-h-[25rem] overflow-y-auto">
                            {
                                users && users.length > 0 ? (
                                    users.map((item, index) => (
                                        <button onClick={() => handleSelect(item)} key={index} className={`${selected?._id === item._id ? 'bg-custom text-white' : ''} flex flex-row items-center  rounded-xl p-2`}>
                                            {
                                                item.profile ? (
                                                    <div className="flex items-center justify-center h-8 w-10 bg-indigo-200 rounded-full bg-contain" style={{ backgroundImage: `url(${item.profile})` }}>

                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-center h-8 w-10 bg-indigo-200 rounded-full">
                                                        {item.name.slice(0, 1)}
                                                    </div>
                                                )
                                            }

                                            <div className="ml-2 text-sm flex w-full items-center justify-between font-semibold">{item.name} {count[getCount(item._id)].count >0 && selected?._id !== item._id  ?(<span className={`  w-5 h-5  justify-center items-center kanit-regular text-xs text-white rounded-full bg-green flex `}>{count[getCount(item._id)].count}</span>):('')} </div>
                                        </button>
                                    ))

                                ) : (
                                    <p className='kanit-regular text-center'>No users</p>
                                )
                            }
                        </div>
                    </div>

                </div>
                {/* Main Chat Area */}

                {
                    show ? (
                        <div className=" flex flex-col flex-auto h-full p-6">
                            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                                {/* Chat messages */}
                                <div className='h-20 grid grid-cols-2 rounded-2xl bg-custom'>
                                    <div className='p-4 flex gap-5 items-center'>
                                        <div style={{ backgroundImage: `url(${selected?.profile})` }} className="flex items-center bg-contain  justify-center h-10 w-10 rounded-full  flex-shrink-0"></div>
                                        <div>
                                            <h1 className='text-white kanit-regular text-xl'>{selected?.name}</h1>
                                            {online.includes(selected?._id) ? (
                                                <p className={`text-xs flex items-center gap-2 kanit-light text-white`}>
                                                    online <span className='w-2 h-2 inline-block rounded-full bg-green'></span>
                                                </p>
                                            ) : (<p className={`text-xs flex items-center gap-2 kanit-light text-white`}>
                                                {formatDate(selected?.lastseen)}
                                            </p>)}
                                        </div>
                                    </div>
                                </div>
                                <div ref={chatContainerRef} className="no-scroll flex mt-5 flex-col h-full overflow-x-hidden overflow-y-auto mb-4">

                                    <div className="grid  grid-cols-12 gap-y-1">
                                        {
                                            showMessages && showMessages.length > 0 ? (
                                                showMessages.map((item, index) => (

                                                    item.sender !== 'admin' ? (


                                                        <div key={index} className="col-start-1  col-end-8 p-2 rounded-lg" style={{ borderTopLeftRadius: '0' }}>
                                                            <div className="flex  flex-row items-center ">
                                                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-500 flex-shrink-0">A</div>
                                                                { item.contentType === 'voice'  ? (

                                                                    <audio controls color='' className='custom-audio-player'>
                                                                            <source src={item.content} type="audio/wav" />

                                                                            Your browser does not support the audio element.
                                                                        </audio>
                                                                ) : (
                                                                    <div className="relative ml-3  text-sm text-white kanit-regular bg-blue-600 py-2 px-4 shadow rounded-md" style={{ borderTopLeftRadius: '0' }}>

                                                                        <div className='break-words  max-w-[480px]'>{item.content}</div>
                                                                    </div>
                                                                    
                                                                )
                                                                }
                                                            </div>
                                                            <p className='kanit-light ml-14 text-xs text-white-400'>{new Date(item.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>

                                                        </div>


                                                    ) : (
                                                        <>

                                                            <div className="col-start-6   col-end-13 p-3 rounded-lg" >
                                                                <div className={` flex ${isFirstMessageOfDay(item, index, showMessages) ? 'justify-between' : 'justify-end'} `}>
                                                                    <MessageItem item={item} isFirstMessageOfDay={isFirstMessageOfDay(item, index, showMessages)} />
                                                                    {/* <p className='kanit-light mr-12 text-xs text-white-400'>{new Date(item.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p> */}
                                                                </div>
                                                                <div className="flex items-center justify-start flex-row-reverse">
                                                                    <div
                                                                        style={{ backgroundImage: `url(${selected?.profile})` }}
                                                                        className="flex bg-contain  items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                                    >

                                                                    </div>
                                                                    { item.contentType === 'voice' ? (
                                                                        
                                                                         <audio controls color='' className='custom-audio-player-1'>
                                                                         <source src={item.content} type="audio/wav" />

                                                                         Your browser does not support the audio element.
                                                                     </audio>


                                                                    ) : (
                                                                        <div className="justify-between flex items-start text-sm mr-2 break-words max-w-[500px] text-white kanit-regular  bg-purple-900  py-2 px-4 shadow rounded-md" style={{ borderTopRightRadius: 0 }}>
                                                                            <div className='break-words  max-w-[480px]'>{item.content}</div>
                                                                        </div>
                                                                       
                                                                    )
                                                                    }
                                                                </div>
                                                                <div className={` flex justify-end `}>

                                                                    <p className='kanit-light mr-12 text-xs text-white-400'>{new Date(item.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
                                                                </div>


                                                            </div>

                                                        </>
                                                    )



                                                ))
                                            ) : (
                                                <h1 className='text-center kanit-light text-xl col-span-12'>No Messages yet start chat to get messages.</h1>
                                            )

                                        }



                                        {showPicker && (
                                            <div
                                                className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 p-6 rounded-lg  w-[440px] h-auto">
                                                <EmojiPicker onEmojiClick={handleEmojiClick} className='z-[99] relative left-' />
                                            </div>
                                        )}
                                    </div>

                                </div>

                                {/* Chat input */}
                                <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">

                                    <div>
                                        
                                        {
                                        
}
                                    </div>
                                    <div className="flex-grow ml-4">
                                        <div className="relative w-full ">
                                            {
                                                start ? (
                                                    <VoiceRecorder storeAndEmitRecording={(voice: Blob) => sendVoice(voice)} stop={() => setStart(false)} start={start} />
                                                ) : (
                                                    <>
                                                        <input ref={inputRef} onKeyDown={handleKeyPress} type="text" onChange={(e) => setText(e.target.value)} value={text} className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" />

                                                        <button onClick={() => {
                                                            inputRef?.current?.focus()
                                                            setShowPicker(!showPicker)

                                                        }
                                                        }
                                                            className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                                                            <svg
                                                                className="w-6 h-6"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </button>
                                                    </>
                                                )
                                            }



                                        </div>



                                    </div>
                                    <div className="ml-4">
                                        {
                                            text ? (
                                                <button onClick={sendMessage} className="flex items-center justify-center bg-gradient-to-br from-custom to-slate-800 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                                                    <span>Send</span>
                                                    <span className="ml-2">
                                                        <svg
                                                            className="w-4 h-4 transform rotate-45 -mt-px"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            ) : (
                                                <>

                                                    {
                                                        !start && (

                                                            <button onClick={() => setStart(true)} className="flex py-2 items-center justify-center bg-gradient-to-br from-custom to-slate-800 hover:bg-indigo-600 rounded-full text-white px-4 flex-shrink-0">
                                                                <KeyboardVoiceIcon />

                                                            </button>
                                                        )
                                                    }




                                                </>
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>

                    ) : (
                        <div className=" flex flex-col flex-auto h-full p-6">
                            <div className="flex flex-col justify-center flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                                <h1 className='mx-auto kanit-regular text-2xl'>Select a user to chat</h1>
                            </div>
                        </div>
                    )
                }



            </div>
        </div>
    );
};

export default AdminChat;
