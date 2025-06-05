import React from "react";
import { useState, useRef } from "react";
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

function TicTacToe() {
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    const [data, setData] = useState(["","","","","","","","",""]);

    let titleRef = useRef(null);
    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null);

    let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

    const validateToggle = (num) => {
        if (lock) {
            if (window.confirm("Game is over! Do you want to play it again?")) {
                reset();
            } else {
                //Do nothing!!
            }
            return false;
        }            
        if (data[num] != "") {
            alert("Already taken!");             
            return false;
        }            
        return true;
    }

    const toggle = (e, num) => {
        if(!validateToggle(num)) return;

        const nextSymbol = count % 2 === 0 ? "X" :"O";
        const nextIcon = count % 2 === 0 ? cross_icon : circle_icon;

        e.target.innerHTML = `<img src='${nextIcon}'/>`;

        const newData = [...data];
        newData[num] = nextSymbol;

        setData(newData);
        setCount(count + 1);
        checkWin(newData);
    }    

    const checkWin = (board) => {
        const winPatterns =[
            [0,1,2], //row1
            [3,4,5], //row2
            [6,7,8], //row3
            [0,3,6], //col1
            [1,4,7], //col2
            [2,5,8], //col3
            [0,4,8], //diagonal
            [2,4,6], //diagonal
        ];

        for (let pattern of winPatterns) {
            const [a,b,c] = pattern;
            if (board[a] && board[a] === board[b] && board[b] === board[c]) {
                won(board[a]);
                return;
            }
        }        

        if (!board.includes("")) {
            setLock(true);
            titleRef.current.innerHTML = "It's a Draw!";
        }

    }

    const won = (winner) => {
        //alert("Winner is " + winner);        
        setLock(true);
        if (winner.toLowerCase() === "x") 
            titleRef.current.innerHTML = `Congratulations: <img src=${cross_icon} /> Wins`;
        if (winner.toLowerCase() === "o") 
            titleRef.current.innerHTML = `Congratulations: <img src=${circle_icon} /> Wins`;        
    }

    const reset = () => {
        setLock(false);
        setCount(0); 
        setData(["","","","","","","","",""]);
        titleRef.current.innerHTML = 'Tic Tac Toe Game In <span>React</span>';
        box_array.forEach((e) => (e.current.innerHTML = ""));
    }

    return (      
        <div className="container">
              <title>Test</title>
            <h1 className="title" ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>        
            <div className="board"> 
                <div className="row1">
                    <div className="boxes" ref={box1} onClick= {(e) => {toggle(e, 0)}}></div>
                    <div className="boxes" ref={box2} onClick= {(e) => {toggle(e, 1)}}></div>
                    <div className="boxes" ref={box3} onClick= {(e) => {toggle(e, 2)}}></div>                    
                </div>
                <div className="row2">
                    <div className="boxes" ref={box4} onClick= {(e) => {toggle(e, 3)}}></div>
                    <div className="boxes" ref={box5} onClick= {(e) => {toggle(e, 4)}}></div>
                    <div className="boxes" ref={box6} onClick= {(e) => {toggle(e, 5)}}></div>     
                </div>
                <div className="row3">
                    <div className="boxes" ref={box7} onClick= {(e) => {toggle(e, 6)}}></div>
                    <div className="boxes" ref={box8} onClick= {(e) => {toggle(e, 7)}}></div>
                    <div className="boxes" ref={box9} onClick= {(e) => {toggle(e, 8)}}></div>     
                </div>                         
            </div>
            {/* <button className="reset" onClick={() => window.location.reload()}>Reset</button>   */}
            <button className="reset" onClick={() => reset()}>Reset</button>  
        </div>
    );
}

export default TicTacToe;
