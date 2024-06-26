import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, randomMessage } from "../utils/helper";

const LiveChat: React.FC = () => {
  const dispatchFun = useDispatch();
  const [liveMessage, setLiveMessage] = useState<string>("");
  const chatMessages: any[] = useSelector(
    (store: { chat: { messages: any[] } }) => store.chat.messages
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      // API Polling
      dispatchFun(
        addMessage({
          name: generateRandomName(),
          message: randomMessage(30),
        })
      );
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatchFun]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatchFun(
      addMessage({
        name: "Sasidhar",
        message: liveMessage,
      })
    );
    setLiveMessage("");
  };

  return (
    <form className="w-1/3" onSubmit={handleSubmit}>
      <div className="ml-2 flex flex-col-reverse p-2 w-full h-[420px] border rounded-lg border-slate-300 overflow-y-auto">
        {chatMessages.map((msg, index) => (
          <ChatMessage key={index} name={msg.name} message={msg.message} />
        ))}
      </div>
      <div className="border mx-2 justify-center items-center gap-x-3 py-4 w-full flex">
        <input
          type="text"
          value={liveMessage}
          placeholder="send a message on live chat"
          onChange={(e) => setLiveMessage(e.target.value)}
          className="px-2 dark:bg-gray-600 dark:text-white border my-auto h-full border-black py-1 w-96"
        ></input>
        <button className="bg-blue-700 font-semibold py-1 px-4 h-full my-auto text-white rounded-lg">
          Send
        </button>
      </div>
    </form>
  );
};

export default LiveChat;
