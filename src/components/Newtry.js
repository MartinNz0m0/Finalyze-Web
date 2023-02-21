import React, { useRef, useState, useEffect } from "react";
import "../App.css";
import { Button, Modal } from 'antd';




var circles = [];
var tries = 0
var seconds = 0
var myDate = new Date ();
var avgTime = 0





// const WinModal = ({score}) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <Button type="primary" onClick={showModal}>
//         Show Results
//       </Button>
//       <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
//         <p>Your Score is {score}</p>
//       </Modal>
//     </>
//   );
// };


const Newtry = () => {
  const [clicks, setClicks] = useState(0)
  // const [seconds, setSeconds] = useState(0)
  // const [score, setScore] = useState(0)

  

  useEffect(() => {
    if (tries < 3) {
    var dott = document.querySelectorAll('.rounded-circle')
  var dots = Array.from(dott)
  console.log(dots)
   dots.map((sth, i) => {
    dots[i].addEventListener('click', (event) => {
      
            dots[i].style.pointerEvents = 'none'
            dots[i].style.backgroundColor = 'aqua'
  
    });
   });
  }
  
    }, [])

  const letstry = () => {
    console.log(clicks)
    if (clicks === 6 || clicks === 12) {
      circles = []
      tries++
      var goo = document.querySelectorAll('.rounded-circle')
      var go = Array.from(goo)
      console.log(go)
      go.map((thc, j) => { 
        go[j].style.pointerEvents = 'auto'
         go[j].style.backgroundColor = 'orange'
        });
        console.log(tries)
    }
	  
	  // if (clicks === 18) {
    //   var newDate = new Date();
	  //   var timeSpent = newDate.getSeconds() - myDate.getSeconds()
	  //   avgTime = (timeSpent / 3) 
    //   var score = Math.abs(avgTime).toFixed(2)
    //   var tag = document.querySelector('.score')
    //   tag.innerHTML = 'Your score is ' + score
    //   tag.style.backgroundColor = 'aqua'
	  //   // setScore(avgTime)
    //   // setFinished(true)
    // }
    
    // if (clicks === 1) {
    //   myDate = new Date()
    //   var tag = document.querySelector('.score')
    //   tag.innerHTML = clicks

    // }
    //  if (!avgTime === undefined) {
    //   setScore(avgTime)
    //  }
    //  console.log(score)


const timerr = setInterval(() => {
  if (clicks <= 1 && clicks >= 18) {
    seconds = seconds +1
    console.log(seconds)
  } 
}, 1000)
if (clicks === 18) {
  clearInterval(timerr)
  var score = document.querySelector('.score')
  score.innerHTML = seconds
  }
   

    while (circles.length < 6) {
      var circle = {
        left: Math.floor(Math.random() * 1700) + 20,
        top: Math.floor(Math.random() * 700) + 150,
      };
      var overlap = false;
      for (var j = 0; j < circles.length; j++) {
        var other = circles[j];
        var hitsSquareX = Math.abs(circle.left - other.left) < 150;
        var hitsSquareY = Math.abs(circle.top - other.top) < 150;
        // Will overlap a square
        if (hitsSquareX && hitsSquareY) {
          overlap = true;
        }
      }
    
      if (!overlap) {
        circles.push(circle);
      }
      console.log('while working..') 
    }
  }

letstry()

  return (
  <div style={{position:'fixed'}}>
  
    <div className="containter" style={{ color: "grey" }}>
      <div>

      <h1 className="score">Welcome to the Game: How fast can you click the circles?</h1>
      </div>

      <div className="row">
       {circles.map((cir, i) => (
 
         <div
           className="rounded-circle"
           style={{
             position: "absolute",
             height: 100,
             width: 100,
             top: circles[i].top,
             left: circles[i].left,
             backgroundColor: "orange",
           }} key={i} onClick={() => {setClicks(clicks + 1); }} clicks={clicks}
         ></div>
       )) 
          }

      </div>
    </div>
  </div>
  );
};

export default Newtry;
