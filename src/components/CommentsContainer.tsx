import { formatCount } from "../utils/helper";
import React from "react";

const commentsList: any[] = [
  {
    name: "Sasidhar",
    text: "Props (short for properties) are a way to pass data from one component to another in React.",
    replies: [
      {
        name: "Sasidhar",
        text: "Props (short for properties) are a way to pass data from one component to another in React.",
        replies: [
          {
            name: "Sasidhar",
            text: "Props (short for properties) are a way to pass data from one component to another in React.",
            replies: [],
          },
          {
            name: "Sasidhar",
            text: "Props (short for properties) are a way to pass data from one component to another in React.",
            replies: [],
          },
        ],
      },
      {
        name: "Sasidhar",
        text: "Props (short for properties) are a way to pass data from one component to another in React.",
        replies: [
          {
            name: "Sasidhar",
            text: "Props (short for properties) are a way to pass data from one component to another in React.",
            replies: [],
          },
        ],
      },
      {
        name: "Sasidhar",
        text: "Props (short for properties) are a way to pass data from one component to another in React.",
        replies: [
          {
            name: "Sasidhar",
            text: "Props (short for properties) are a way to pass data from one component to another in React.",
            replies: [],
          },
          {
            name: "Sasidhar",
            text: "Props (short for properties) are a way to pass data from one component to another in React.",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "Sasidhar",
    text: "Props (short for properties) are a way to pass data from one component to another in React.",
    replies: [
      {
        name: "Sasidhar",
        text: "Props (short for properties) are a way to pass data from one component to another in React.",
        replies: [],
      },
      {
        name: "Sasidhar",
        text: "Props (short for properties) are a way to pass data from one component to another in React.",
        replies: [
          {
            name: "Sasidhar",
            text: "Props (short for properties) are a way to pass data from one component to another in React.",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "Sasidhar",
    text: "Props (short for properties) are a way to pass data from one component to another in React.",
    replies: [],
  },
  {
    name: "Sasidhar",
    text: "Props (short for properties) are a way to pass data from one component to another in React.",
    replies: [],
  },
  {
    name: "Sasidhar",
    text: "Props (short for properties) are a way to pass data from one component to another in React.",
    replies: [],
  },
  {
    name: "Sasidhar",
    text: "Props (short for properties) are a way to pass data from one component to another in React.",
    replies: [],
  },
  {
    name: "Sasidhar",
    text: "Props (short for properties) are a way to pass data from one component to another in React.",
    replies: [
      {
        name: "Sasidhar",
        text: "Props (short for properties) are a way to pass data from one component to another in React.",
        replies: [],
      },
    ],
  },
  {
    name: "Sasidhar",
    text: "Props (short for properties) are a way to pass data from one component to another in React.",
    replies: [],
  },
  {
    name: "Sasidhar",
    text: "Props (short for properties) are a way to pass data from one component to another in React.",
    replies: [],
  },
  {
    name: "Sasidhar",
    text: "Props (short for properties) are a way to pass data from one component to another in React.",
    replies: [
      {
        name: "Sasidhar",
        text: "Props (short for properties) are a way to pass data from one component to another in React.",
        replies: [],
      },
    ],
  },
  {
    name: "Sasidhar",
    text: "Props (short for properties) are a way to pass data from one component to another in React.",
    replies: [],
  },
  {
    name: "Sasidhar",
    text: "Props (short for properties) are a way to pass data from one component to another in React.",
    replies: [
      {
        name: "Sasidhar",
        text: "Props (short for properties) are a way to pass data from one component to another in React.",
        replies: [],
      },
      {
        name: "Sasidhar",
        text: "Props (short for properties) are a way to pass data from one component to another in React.",
        replies: [],
      },
      {
        name: "Sasidhar",
        text: "Props (short for properties) are a way to pass data from one component to another in React.",
        replies: [],
      },
    ],
  },
];


interface CommentProps {
  data: {
    name: string;
    replies: any[];
    text: string;
  };
}

const Comment: React.FC<CommentProps> = ({ data }) => {
  const { name, replies, text } = data;
  return (
    <div className=" p-1 ml-10 border-l-2 dark:border-gray-400 border-black my-4">
      <div className="flex gap-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          color="#1111111"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <h1 className="font-bold">{name}</h1>
      </div>
      <h4 className="ml-12">{text}</h4>
      {replies && replies.length > 0 && (
        <div>
          {replies.map((reply, index) => (
            <Comment key={index} data={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

interface CommentsContainerProps {
  count: number;
}

const CommentsContainer: React.FC<CommentsContainerProps> = ({
  count,
}) => {
  return (
    <div>
      <div className="font-bold mt-2 ml-4 text-xl">
        Comments ({formatCount(count)})
      </div>
      <div className="my-4">
        {commentsList.map((commentObj, index) => (
          <Comment key={index} data={commentObj} />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;

