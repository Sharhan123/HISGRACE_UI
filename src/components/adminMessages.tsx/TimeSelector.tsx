import React from 'react';

const MessageItem:React.FC<{item:{sender:string,reciever:string,content:string,time:string},isFirstMessageOfDay:any}> = ({ item ,isFirstMessageOfDay}) => {
  const messageDate = new Date(item.time);
  const currentDate = new Date();

  const getMessageDateLabel = (messageDate:any) => {
    if (isFirstMessageOfDay) {
        const currentDate = new Date();
        const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
  
        if (isSameDate(messageDate, today)) {
          return 'Today';
        } else if (isSameDate(messageDate, yesterday)) {
          return 'Yesterday';
        } else {
          return messageDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
        }
      } else {
        return ''; 
      }
  };

  const isSameDate = (date1:any, date2:any) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  return (
    
        isFirstMessageOfDay && (
            <div className="text-center my-5">
            <span className="text-xs text-custom font-medium px-3 -mt-3">
              {getMessageDateLabel(messageDate)}
            </span>
          </div>
        )
    
    
  );
};

export default MessageItem;
