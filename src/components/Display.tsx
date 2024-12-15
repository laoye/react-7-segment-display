import { Digit } from "./Digit";
import React, { useEffect, useState } from "react";
import { Dot } from "./Dot";

type DisplayType = {
    count: number;
    height: number;
    value: any;
    color: string;
    backgroundColor?: string;
    skew: boolean;
};

export const Display = ({
    count = 2,
    height = 250,
    value = null,
    color = "red",
    backgroundColor,
    skew = false,
}: DisplayType) => {
    const [digits, setDigits] = useState([]);
    const [dotIndex, setDotIndex] = useState(-1);

    const style = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "fit-content",
        width: "fit-content",
        padding: "20px",
    } as React.CSSProperties;

    const displayStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "fit-content",
        width: "fit-content",
        backgroundColor: backgroundColor ? backgroundColor : "transparent",
        padding: "20px",
        color: "white",
    } as React.CSSProperties;

    useEffect(() => {
        let dotIndex = value ? value.toString().indexOf(".") - 1 : -1;
        const newValue =
            dotIndex > -1 ? value.toString().replace(".", "") : value;

        let newDigits = newValue && newValue.toString().split("");

        if (!newValue || count < newValue.toString().length) {
            newDigits = null;
        }

        if (newValue && count > newValue.toString().length) {
            for (let i = 0; i < count - newValue.toString().length; i++) {
                newDigits.unshift("0");
            }
        }

        setDigits(newDigits);
        setDotIndex(dotIndex > -1 ? dotIndex + count - newValue.toString().length : -1);
    }, [count, value]);

    return (
        <div className="display" style={displayStyle}>
            <div className="display-digits" style={style}>
                {digits
                    ? digits.map((digit, index) => {
                          return (
                              <>
                                  <Digit
                                      key={`digit-${index}`}
                                      char={digit}
                                      height={height}
                                      color={color}
                                      skew={skew}
                                  />
                                  <Dot
                                      key={`dot-${index}`}
                                      active={index === dotIndex}
                                      color={color}
                                      height={height}
                                      skew={skew}
                                  />
                              </>
                          );
                      })
                    : Array.from(Array(count).keys()).map((index) => {
                          return (
                              <>
                                  <Digit
                                      key={`digit-${index}`}
                                      char="-"
                                      height={height}
                                      color={color}
                                      skew={skew}
                                  />
                                  <Dot
                                      key={`dot-${index}`}
                                      active={false}
                                      color={color}
                                      height={height}
                                      skew={skew}
                                  />
                              </>
                          );
                      })}
            </div>
        </div>
    );
};
