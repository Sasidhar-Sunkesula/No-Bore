import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, randomMessage } from "../utils/helper";

const LiveChat = () => {
  const dispatchFun = useDispatch();

  const [liveMessage, setliveMessage] = useState("");
  const chatMessages = useSelector((store) => store.chat.messages);
  useEffect(() => {
    const i = setInterval(() => {
      // API Polling
      dispatchFun(
        addMessage({
          name: generateRandomName(),
          message: randomMessage(30),
        })
      );
    }, 2000);

    return () => {
      clearInterval(i);
    };
  }, []);

  return (
    <form
      className="w-1/3"
      onSubmit={(e) => {
        e.preventDefault();
        dispatchFun(
          addMessage({
            name: "Sasidhar",
            message: liveMessage,
          })
        );
        setliveMessage("");
      }}
    >
      <div className="ml-2 flex flex-col-reverse p-2 w-full h-[500px] border rounded-lg bg-gray-100 border-slate-300 overflow-y-auto">
        {chatMessages.map((msg, index) => (
          <ChatMessage key={index} name={msg.name} message={msg.message} />
        ))}
      </div>
      <div className="ml-2 border px-4 py-2 w-full flex  items-center">
        <input
          type="text"
          value={liveMessage}
          onChange={(e) => setliveMessage(e.target.value)}
          className="px-2 border border-black py-1 w-96"
        ></input>
        <button className="border px-4 py-1 ml-2 bg-blue-700 font-semibold text-white rounded-lg">
          Send
        </button>
      </div>
    </form>
  );
};
export default LiveChat;
