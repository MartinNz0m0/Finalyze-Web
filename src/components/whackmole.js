import React from "react";
import { useRef, useEffect, useState } from "react";

// squares.forEach(element => {
//   console.log('div')
// });

const Whackmole = () => {
  var Setcolor = "white";
  var squareSize = 150;

  var arr = [];

  React.useEffect(() => {
    var hitsSquare = false
    var container = document.getElementById("parent"),
      squares = container.getElementsByClassName("rounded-circle");
    var arrsquares = Array.from(squares);
    const squar = arrsquares.map((obj, i) => {
      var square = obj;
      console.log(square)
      var nxtcircle = arrsquares[i + 1];
      if (nxtcircle === undefined) {
        nxtcircle = arrsquares[i - 1]
      }
      var nxtleft = nxtcircle.style.left
      var nxttop = nxtcircle.style.top

      var left = parseInt(square.style.left);
      var top = parseInt(square.style.top);
      // var left = parseInt(square.css('left'));
      // var top = parseInt(square.css('top'));
      //     // Generate random X and Y
      var randX = Math.floor(Math.random() * (1000 - 150));
      var randY = Math.floor(Math.random() * (800 - 150));
          // Check boundaries
    var hitsSquareX = Math.abs(left - nxtleft) < 150;
    var hitsSquareY = Math.abs(top - nxttop) < 150;

    // Will overlap a square
    if (hitsSquareX && hitsSquareY) {
      hitsSquare = true
      if (hitsSquareX === true){
       square.style.left = left + 150
       square.style.backgroundColor = 'aqua'
  
      } else if (hitsSquareY === true) {
        square.style.top = top + 150
        square.style.backgroundColor = 'aqua'
  
      }
    }
    else if (!hitsSquare) {
      square.style.backgroundColor = 'orange'
      return (
        <div><p>this works!</p></div>
      )
    }

      console.log(left, top);

      return (
        <div style={{ borderRadius: 50, backgroundColor: "orange" }}>
          <p>this is working</p>
        </div>
      );
    });
    console.log(squar);
  }, []);

  while (arr.length < 6) {
    var r = Math.floor(Math.random() * 700) + 100;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  var arr2 = [];
  while (arr2.length < 6) {
    var r2 = Math.floor(Math.random() * 600) + 20;
    if (arr2.indexOf(r2) === -1) arr2.push(r2);
  }

  // var randNum = Math.floor(Math.random() * 800) + 100;
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] < 125 && arr[i] - arr[i - 1] >= 0) {
      try {
        arr[i] = arr[i] + 125;
        console.log(arr[i]);
      } catch (err) {
        console.log(err);
      }
    } else if (arr[i] - arr[i - 1] > -125 && arr[i] - arr[i - 1] <= 0) {
      arr[i - 1] = arr[i - 1] - 125;
      console.log(arr[i], "1st array neg");
    }
  }

  for (var j = 1; j < arr2.length; j++) {
    if (arr2[i] - arr2[i - 1] < 125 && arr2[i] - arr2[i - 1] >= 0) {
      arr2[i] = arr2[i] + 125;
      console.log(arr2[i]);
    } else if (arr2[i] - arr2[i - 1] > -125 && arr2[i] - arr2[i - 1] <= 0) {
      arr2[i - 1] = arr2[i - 1] + 125;
      console.log(arr2[i], "2nd arr");
    }
  }

  // var squareSize = 50;
  // var containerSize = 500;

  // // for (var i = 0; i < 20; i++) {
  // //   var foundSpace = false;

  // //   while (!foundSpace) {
  // //     // Generate random X and Y
  // var randX = Math.floor(Math.random() * (containerSize - squareSize));
  // var randY = Math.floor(Math.random() * (containerSize - squareSize));
  // var hitsSquare = false;

  // const ids = squares.map(element => {
  //   return element.id;
  //   console.log(element)
  // });

  // squares.each(function(index, square) {
  //   var square = $(square);

  //   // parseInt() because .css() returns a string
  //   var left = parseInt(square.css('left'));
  //   var top = parseInt(square.css('top'));

  //   // Check boundaries
  //   var hitsSquareX = Math.abs(left - randX) < squareSize;
  //   var hitsSquareY = Math.abs(top - randY) < squareSize;

  //   // Will overlap a square
  //   if (hitsSquareX && hitsSquareY) {
  //     hitsSquare = true;

  //     // jQuery break .each()
  //     return false;
  //   }
  // });

  // If doesn't overlap any square
  //     if (!hitsSquare) {
  //       foundSpace = true;

  //       var newSquare = $('<div class="square">');

  //       newSquare.offset({
  //         left: randX,
  //         top: randY
  //       });

  //       container.append(newSquare);
  //     }
  //   }
  // }

  console.log(arr, arr2);

  const ImageStyle = useRef({
    position: "absolute",
    top: arr[0],
    left: arr2[0],
    width: 125,
    height: 125,
    background: Setcolor,
  });

  const ImageStyle1 = useRef({
    position: "absolute",
    top: arr[1],
    left: arr2[2],
    width: 125,
    height: 125,
    background: Setcolor,
  });
  const ImageStyle2 = useRef({
    position: "absolute",
    top: arr[2],
    left: arr2[1],
    width: 125,
    height: 125,
    background: Setcolor,
  });
  const ImageStyle3 = useRef({
    position: "absolute",
    top: arr[3],
    left: arr2[3],
    width: 125,
    height: 125,
    background: Setcolor,
  });
  const ImageStyle4 = useRef({
    position: "absolute",
    top: arr[4],
    left: arr2[5],
    width: 125,
    height: 125,
    background: Setcolor,
  });
  // const ImageStyle5 = useRef({
  //   position: "absolute",
  //   top: Math.floor(Math.random() * 600) + 100,
  //   left: Math.floor(Math.random() * 600) + 100,
  //   width: 125,
  //   height: 125,
  //   background: Setcolor,
  // });
  // const ImageStyle6 = useRef({
  //   position: "absolute",
  //   top: Math.floor(Math.random() * 600) + 100,
  //   left: Math.floor(Math.random() * 600) + 100,
  //   width: 125,
  //   height: 125,
  //   background: Setcolor,
  // });
  const ImageStyle7 = useRef({
    position: "absolute",
    top: arr[5],
    left: arr2[4],
    width: 125,
    height: 125,
    background: Setcolor,
  });

  const trying = () => {
    console.log("this is working");
  };

  return (
    <div className="container">
      <div className="row" id="parent">
        <div className="rounded-circle" style={ImageStyle.current} />
        <div className="rounded-circle" style={ImageStyle1.current} />
        <div className="rounded-circle" style={ImageStyle2.current} />
        <div className="rounded-circle" style={ImageStyle3.current} />
        <div className="rounded-circle" style={ImageStyle4.current} />
        {/* <div className='rounded-circle' style={ImageStyle5.current} /> 
        <div className='rounded-circle' style={ImageStyle6.current} />  */}
        <div className="rounded-circle" style={ImageStyle7.current} />
      </div>
    </div>
  );
};

// import React, { useRef } from 'react';

// const Image = () => {
//    const ChipStyles = useRef({
//        position: 'absolute',
//        bottom: Math.floor(Math.random()*50),
//        left: '50%',
//        transform: 'translate(-50%, -50%)'
//    });

//    return (
//      <img src={myImg} style={ChipStyles.current} alt=""}/>
//    )
// }

// export default Image

export default Whackmole;
