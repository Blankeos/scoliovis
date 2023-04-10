import Tippy from "@tippyjs/react";
import React, { useState } from "react";

// calc((124px/4)*0

interface IMultiSwitchProps {
  currentIndex: number;
  onChange?: (clickedIndex: number) => void;
}
const MultiSwitch: React.FC<IMultiSwitchProps> = ({
  currentIndex,
  onChange,
}) => {
  return (
    <div className="relative flex gap-x-1 text-gray-600 border self-start rounded-lg bg-gray-200 p-0.5 border-gray-300">
      <span
        style={{
          transform: `translate(calc(100% * ${currentIndex} + 4px * ${currentIndex}), 0)`,
        }}
        className="absolute transition ease-in-out transform h-7 w-7 bg-white rounded-md shadow"
      />
      <Tippy
        delay={[300, 0]}
        content={<span className="text-xs">no lines</span>}
      >
        <button
          onClick={() => {
            onChange && onChange(0);
          }}
          className={`relative h-7 w-7 grid place-items-center
        ${
          currentIndex === 0
            ? "opacity-70"
            : "opacity-40 hover:bg-white rounded-md transition"
        }
        `}
        >
          <span
            className="h-5 w-5"
            style={{
              backgroundImage: "url(/assets/landmark-display-1.svg)",
              backgroundSize: "contain",
            }}
          />
        </button>
      </Tippy>
      <Tippy
        delay={[300, 0]}
        content={<span className="text-xs">upper lines only</span>}
      >
        <button
          onClick={() => {
            onChange && onChange(1);
          }}
          className={`relative h-7 w-7 grid place-items-center
        ${
          currentIndex === 1
            ? "opacity-70"
            : "opacity-40 hover:bg-white rounded-md transition"
        }
        `}
        >
          <span
            className="h-5 w-5"
            style={{
              backgroundImage: "url(/assets/landmark-display-2.svg)",
              backgroundSize: "contain",
            }}
          />
        </button>
      </Tippy>
      <Tippy
        delay={[300, 0]}
        content={<span className="text-xs">Lower lines only</span>}
      >
        <button
          onClick={() => {
            onChange && onChange(2);
          }}
          className={`relative h-7 w-7 grid place-items-center
        ${
          currentIndex === 2
            ? "opacity-70"
            : "opacity-40 hover:bg-white rounded-md transition"
        }
        `}
        >
          <span
            className="h-5 w-5"
            style={{
              backgroundImage: "url(/assets/landmark-display-3.svg)",
              backgroundSize: "contain",
            }}
          />
        </button>
      </Tippy>
      <Tippy
        delay={[300, 0]}
        content={<span className="text-xs">all lines</span>}
      >
        <button
          onClick={() => {
            onChange && onChange(3);
          }}
          className={`relative h-7 w-7 grid place-items-center
        ${
          currentIndex === 3
            ? "opacity-70"
            : "opacity-40 hover:bg-white rounded-md transition"
        }
        `}
        >
          <span
            className="h-5 w-5"
            style={{
              backgroundImage: "url(/assets/landmark-display-4.svg)",
              backgroundSize: "contain",
            }}
          />
        </button>
      </Tippy>
    </div>
  );
};

export default MultiSwitch;
