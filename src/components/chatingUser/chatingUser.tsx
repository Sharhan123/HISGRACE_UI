import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Socket, io } from "socket.io-client"
import { getUser } from '../../services/userServices';
import { IuserRes, Iuser } from '../../interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { jwtDecode } from 'jwt-decode';
import { findChats, saveChat } from '../../services/chatService';


const ChatbotComponent: React.FC = () => {
    const [messages, setMessages] = useState<{ content: string, reciever: string, sender: string ,time:Date}[]>([])
    const [message, setMessage] = useState<string>('');
    const [socket,setSocket] = useState<Socket | null>()
    const [user, setUser] = useState<IuserRes>()
    const token = useSelector((state: RootState) => state.auth.token)
    const chatContainerRef = useRef<HTMLDivElement>(null);

    

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            // Scroll to the bottom of the chat container
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    const fetch = async (id:any) => {
        try {
            const res = await getUser()
            const mes = await findChats(id.id)
            setUser(res.data.data)
            setMessages(mes.data.data)
            return res.data.data
        } catch (err) {
            console.log(err);

        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const decoded: any = jwtDecode(token as string);
                await fetch(decoded);
                
                const newSocket = io('http://localhost:3000');
                newSocket.emit('user_connect', decoded.id);
    
                newSocket.on('from_admin', (data) => {
                    console.log("received");
                    setMessages((prevMessages) => [...prevMessages, data]);
                });
    
                setSocket(newSocket); // If you need to set the socket in state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    
        return () => {
           socket?.off('from_admin')
        };
    }, [token])   

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
                        sendMessage();
        }
    };

    const sendMessage = async () => {
        const data:any = {
            content: message,
            sender: user?._id,
            reciever: 'admin',
            time:Date.now()
        }
        try{
            const res = await saveChat(data)
        }catch(err){
            console.log(err);
            
        }
        setMessage('')
        setMessages((prev)=>[...prev,data]) 
        socket?.emit('message', data);

    };



    return (
        <>

            <div className="right-0 mr-4 bg-white flex flex-col justify-between p-6 rounded-lg border border-[#e5e7eb] w-full h-screen  shadow-md" style={{ zIndex: '999' }}>
                <div className="flex flex-col space-y-1.5 pb-6">
                    <h2 className="kanit-medium text-custom text-lg tracking-tight">Connect With Admin</h2>
                    <p className="text-sm text-[#6b7280] kanit-regular">You can make enquiries on any trip details or every booking related queries</p>
                </div>


                <div className="scroll-hidden py-5  pr-4 h-fit overflow-y-auto">
                    {
                        messages.map((item, index) => (
                            item.sender !== user?._id ? (
                                <div key={index} className="col-start-1 col-end-8 p-2 rounded-lg" style={{ borderTopLeftRadius: '0' }}>
                                <div className="flex flex-row items-center">
                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-500 flex-shrink-0">A</div>
                                    <div className="relative ml-3 text-sm text-white kanit-regular bg-gradient-to-br from-blue-700 to-sky-300 py-2 px-4 shadow rounded-md" style={{ borderTopLeftRadius: '0' }}>
                                        <div>{item.content}</div>
                                    </div>
                                </div>
                                <p className='kanit-light ml-14 text-xs text-white-400'>{new Date(item.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>

                            </div>


                            ) : (
                                <div className="col-start-6   col-end-13 p-3 rounded-lg" >
                                                        <div className="flex items-center justify-start flex-row-reverse">
                                                            <div
                                                            style={{backgroundImage:`url(${user?.profile})`}}
                                                                className="flex bg-contain  items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                            >
                                                                
                                                            </div>
                                                            <div className="justify-between flex items-start text-sm mr-2 text-white kanit-regular bg-gradient-to-br from-orange-700 to-yellow-300 py-2 px-4 shadow rounded-md" style={{borderTopRightRadius:0}}>
                                                                <div>{item.content}</div>
                                                            </div>
                                                        </div>
                                                        <div className=' flex justify-end '>

                                                        <p className='kanit-light mr-12 text-xs text-white-400'>{new Date(item.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
                                                        </div>
                                                    </div>
                            )
                        ))
                    }
                </div>



                <div className="flex items-center justify-between  pt-0">
                    {/* <form className="flex bg-black justify-between w-full "> */}
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
                    {/* </form> */}
                </div>
            </div>
        </>


    )
};

export default ChatbotComponent;
