import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

import { Socket, io } from "socket.io-client"
import { getUser, updateLastseen, updateNewMessage, updateUnRead } from '../../services/userServices';
import { IuserRes } from '../../interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { jwtDecode } from 'jwt-decode';
import { findChats, saveChat } from '../../services/chatService';
import EmojiPicker from "emoji-picker-react"
import VoiceRecorder from '../customUI/audio';
import Navbar from '../homePage/navbar';
import { showAlert } from '../../redux/slices/alertSlice';
import { useDispatch } from 'react-redux';

const ChatbotComponent: React.FC = () => {
    const [messages, setMessages] = useState<{ content: string, reciever: string, sender: string, time: Date,contentType:string,isRead:boolean }[]>([])
    const [message, setMessage] = useState<string>('');
    const [socket, setSocket] = useState<Socket | null>()
    const [user, setUser] = useState<IuserRes>()
    const token = useSelector((state: RootState) => state.auth.token)
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [showPicker, setShowPicker] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null);
    const [start, setStart] = useState(false)

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            // Scroll to the bottom of the chat container
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };
    const dispatch = useDispatch()
    const fetch = async (id: any) => {
        try {
            await updateNewMessage({id:id.id,count:'dec'})
            const res = await getUser()
            const mes = await findChats(id.id)
            setUser(res.data.data)
            setMessages(mes.data.data)
            return res.data.data
        } catch (err) {
            console.log(err);

        }
    }
    const update = async () => {
        await updateLastseen()
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const decoded: any = jwtDecode(token as string);
                await fetch(decoded);

                const newSocket = io('https://higraceapi.electromania.tech');
                newSocket.emit('user_connect', decoded.id);

                newSocket.on('from_admin', (data) => {
                    console.log("received");
                    setMessages((prevMessages) => [...prevMessages, data]);
                });

                setSocket(newSocket); 
            } catch (err:any) { 
                console.error('Error fetching data:', err);
                if(err.response.data){ 
                    dispatch(showAlert({content:err.response.data.message,color:'red'}))
                    return 
                }
                dispatch(showAlert({content:err.message,color:'red'}))

            }
        };
        document.body.style.overflowY = 'hidden'
        fetchData();
        return () => {
            update()
            socket?.off('from_admin')
        };
    }, [token])

    useEffect(() => {
        scrollToBottom()

    }, [messages])

    const handleEmojiClick = (emojiObject: any) => {
        const { emoji } = emojiObject;
        console.log(emoji, emojiObject, '.....');

        setMessage((prevText) => prevText + emoji);
    };
    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    };

    const sendMessage = async () => {
        if (!message.trim()) return
        const data: any = {
            content: message,
            sender: user?._id,
            reciever: 'admin',
            time: Date.now(),
            contentType:'string',
            isRead:false
        }
        try {
             await saveChat(data)
            await updateUnRead({id:user?._id,count:'inc'})
        } catch (err:any) { 
            console.error('Error fetching data:', err);
            if(err.response.data){ 
                dispatch(showAlert({content:err.response.data.message,color:'red'}))
                return 
            }
            dispatch(showAlert({content:err.message,color:'red'}))

        }
        setMessage('')
        setMessages((prev) => [...prev, data])
        socket?.emit('message', data);

    };

    const sendVoice = async (voice: Blob) => {

        const base64Voice = await blobToBase64(voice);
        const data: any = {
            content: `data:audio/wav;base64,${base64Voice}`,
            sender: user?._id,
            reciever: 'admin',
            time: Date.now(),
            contentType: 'voice',
            isRead:false
        }
        setMessages((prev) => [...prev, data])
        try {
             await saveChat({
                content: `data:audio/wav;base64,${base64Voice}`,
                sender: user?._id,
                reciever: 'admin',
                time: Date.now(),
                contentType: 'voice',
                isRead:false
            })
            
            await updateUnRead({id:user?._id,count:'inc'})
        } catch (err:any) { 
            console.error('Error fetching data:', err);
            if(err.response.data){ 
                dispatch(showAlert({content:err.response.data.message,color:'red'}))
                return 
            }
            dispatch(showAlert({content:err.message,color:'red'}))

        }


        socket?.emit('admin_message', data)

    }
    

    const blobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64String = reader.result?.toString();
                if (base64String) {
                    // Extract base64 data (remove prefix)
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

    return (
        <>

                <Navbar/>
            <div className="right-0 mr-4 bg-gradient-to-br   w-full flex flex-col justify-between p-6     mx-auto h-[90dvh]  shadow-md" style={{ zIndex: '999' }}>
                {/* <div className="flex flex-col space-y-1.5 pb-6">
                    <h2 className="kanit-medium text-white text-lg tracking-tight">Connect With Admin</h2>
                    <p className="text-sm text-white kanit-regular">You can make enquiries on any trip details or every booking related queries</p>
                </div> */}


                <div ref={chatContainerRef} className=" no-scroll py-5  pr-4 h-fit overflow-y-auto">

                    {
                        messages && messages.length > 0 ? (

                        
                        messages.map((item, index) => (
                            item.sender !== user?._id ? (
                                <div key={index} className="col-start-1 col-end-8 p-2 rounded-lg" style={{ borderTopLeftRadius: '0' }}>
                                    <div className="flex flex-row items-center">
                                        <div className="flex items-center justify-center h-10 w-10 rounded-full text-white bg-red-500 flex-shrink-0">A</div>
                                        {item.contentType === 'voice' ? (
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
                                    <p className='kanit-light ml-14 text-xs text-black'>{new Date(item.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>

                                </div>


                            ) : (
                                <div className="col-start-6   col-end-13 p-3 rounded-lg" >
                                    <div className="flex items-center justify-start flex-row-reverse">
                                        <div
                                            style={{ backgroundImage: `url(${user?.profile})` }}
                                            className="flex bg-contain  items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                        >

                                        </div>
                                        {item.contentType === 'voice' ? (
                                            <audio controls color='' className='custom-audio-player'>
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
                                    <div className=' flex justify-end '>

                                        <p className='kanit-light mr-12 text-xs text-black'>{new Date(item.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
                                    </div>
                                </div>
                            )
                        ))
                    ):(
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

                <div className="flex flex-row items-center h-16 rounded-xl w-full px-4">

                    <div>
                        {/* <button className="flex items-center justify-center text-custom hover:text-gray-300">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                        </button> */}
                    </div>
                    <div className="flex-grow ml-4">
                                        <div className="relative w-full ">
                                            {
                                                start ? (
                                                    <VoiceRecorder storeAndEmitRecording={(voice: Blob) => sendVoice(voice)} stop={() => setStart(false)} start={start} />
                                                ) : (
                                                    <>
                                                        <input ref={inputRef} onKeyDown={handleKeyPress} type="text" onChange={(e) => setMessage(e.target.value)} value={message} className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" />

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
                            message ? (
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
                                        !start ? (
                                            
                                            <button onClick={() => setStart(true)} className="flex py-2 items-center justify-center bg-gradient-to-br from-custom to-slate-800 hover:bg-indigo-600 rounded-full text-white px-4 flex-shrink-0">
                                                <KeyboardVoiceIcon />

                                            </button>
                                        ) :('')
                                    }


                                </>
                            )
                        }

                    </div>
                </div>

                {/* <div className="flex items-center justify-between  pt-0">
                    <input
                        className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af]"
                        placeholder="Type your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <button
                        className="inline-flex ml-2 items-center justify-center h-10 px-4 py-2 text-sm font-medium text-[#f9fafb] bg-custom hover:bg-[#111827E6] rounded-md"
                        type="submit"
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div> */}
            </div>
        </>


    )
};

export default ChatbotComponent;
