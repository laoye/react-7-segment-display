import React from "react";

type DotType = {
    active: boolean;
    color: string;
    height: number;
    skew: boolean;
};

export const Dot = ({
    active = false,
    color = "red",
    height = 250,
    skew = false,
}: DotType) => {
    const style = {
        height: `${height / 12.5}px`,
        width: `${height / 12.5}px`,
        backgroundColor: color,
        filter: active
            ? "opacity(1) grayscale(0)"
            : "opacity(0.3) grayscale(0.7)",
        borderRadius: "50%",
        margin: "2px",
        transform: skew ? "rotate(45deg)" : "none",
    } as React.CSSProperties;

    const dotStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "end",
        height: `${height}px`,
        width: "fit-content",
        marginBottom: `${height / 12.5}px`,
    } as React.CSSProperties;

    return (
        <div style={dotStyle}>
            <div style={style}></div>
        </div>
    );
};
