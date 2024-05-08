import React, { useState, useRef, useEffect } from 'react';
// import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import LottieAnimation from '../customUI/lottie';

interface VoiceRecorderProps {
    start: boolean;
    stop: () => void;
    storeAndEmitRecording: (audioBlob: Blob) => void; 
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ start, stop,storeAndEmitRecording }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (start) {
            startRecording();
        } else {
            stopRecording();
        }
    }, [start]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setAudioStream(stream);

            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);
            mediaRecorderRef.current = recorder;

            const chunks: Blob[] = [];
            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            recorder.onstop = () => {
                const recordedBlob = new Blob(chunks, { type: 'audio/wav' });
                console.log('record stopped ',recordedBlob);
                                    storeAndEmitRecording(recordedBlob); 
                    clearRecording(); 
                    setRecordedChunks(chunks);
                
            };

            recorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            audioStream?.getTracks().forEach((track) => track.stop());
        }
    };

    
    const clearRecording = () => {
        setRecordedChunks([]);
    };
    
    const cancelRecording = () => {
        stopRecording(); 
        clearRecording(); 
    };
    const handleSendRecording = () => {
        mediaRecorder?.stop()
        stop()
        console.log('logginggg',recordedChunks);
        
        
    };
    // const handlePlayRecording = () => {
        
    //     if (recordedChunks.length > 0) {
    //         const recordedBlob = new Blob(recordedChunks, { type: 'audio/wav' });
    //         const audioUrl = URL.createObjectURL(recordedBlob);
    //         if (audioPlayerRef.current) {
    //             audioPlayerRef.current.src = audioUrl;
    //             audioPlayerRef.current.play();
    //         }
    //     }
    // };

    return (
        <div>
            {start && (
                <div className='p-5 h-8 w-fit ml-auto rounded-lg flex justify-between gap-6 items-center bg-white'>
                    <StopCircleIcon fontSize={'large'} onClick={()=>{
                        cancelRecording() 
                        stop()
                        }} className='text-red-600 cursor-pointer' />
                    <LottieAnimation />
                    <button onClick={handleSendRecording} className="flex py-2 items-center justify-center bg-gradient-to-br from-custom to-slate-800 hover:bg-indigo-600 rounded-full text-white px-4 flex-shrink-0">
                        <span className="">
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
                </div>
            )}
                        <audio ref={audioPlayerRef} controls style={{ display: 'none' }} />

        </div>
    );
};

export default VoiceRecorder;
