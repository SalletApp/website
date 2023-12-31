import React from "react";

const iconMerch = ({ color }) => {
  return (
    <svg
      width="55"
      height="55"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="35" height="35" rx="17.5" fill={color} fill-opacity="0.15" />
      <g clip-path="url(#clip0_1597_1020)">
        <path
          d="M24.3074 14.0108L20.0483 11.8999C19.6086 12.508 18.6352 12.9324 17.4999 12.9324C16.3645 12.9324 15.3911 12.508 14.9514 11.8999L10.6924 14.0108C10.5195 14.0983 10.4495 14.3083 10.5349 14.4812L11.7861 16.9858C11.8736 17.1587 12.0836 17.2287 12.2564 17.1433L13.4945 16.5374C13.7264 16.4237 13.9977 16.5921 13.9977 16.8524V22.3999C13.9977 22.7871 14.3105 23.0999 14.6977 23.0999H20.2977C20.6849 23.0999 20.9977 22.7871 20.9977 22.3999V16.8502C20.9977 16.5921 21.2689 16.4215 21.5008 16.5352L22.7389 17.1412C22.9117 17.2287 23.1217 17.1587 23.2092 16.9837L24.4627 14.4812C24.5502 14.3083 24.4802 14.0962 24.3074 14.0108Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1597_1020">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="translate(10.5 10.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default iconMerch;
