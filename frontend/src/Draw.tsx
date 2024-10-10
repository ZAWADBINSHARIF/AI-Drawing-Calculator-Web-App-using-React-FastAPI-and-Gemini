import React, { useEffect, useRef, useState } from 'react';
import BrashColors from './constant';

const Draw = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState("#ffffff");


    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        console.log("Start Drawing ");
        if (canvas) {
            canvas.style.background = "black";
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                setIsDrawing(true);
            }
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };


    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");

            if (ctx) {
                ctx.strokeStyle = color;
                ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                ctx.stroke();
            }
        }
    };


    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            console.log("drow use effect");
            if (ctx) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight - canvas.offsetTop;
                ctx.lineCap = 'round';
                ctx.lineWidth = 3;
            }
        }
    }, []);

    return (
        <div
            className='flex flex-1'
        >

            <canvas
                ref={canvasRef}
                id='canvas'
                className=' absolute top-0 left-0 w-full h-full'
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseOut={stopDrawing}
                onMouseUp={stopDrawing}
            >

            </canvas>

        </div>
    );
};

export default Draw;