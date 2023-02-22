// This code is for personal site ignore, will remove from github


// import Hero from "./Hero";
// import TypeIt from "typeit-react";
// import React, { useState, useCallback, useEffect } from "react";
// // import logo from "../js.png";
// // import tslogo from "../ts.png";
// // import nlogo from "../node.png";
// // import blogo from "../bstrap.png";
// // import tlogo from "../twind.png";
// import lottie from "lottie-web";
// import { Link } from "react-router-dom";
// import "animate.css/animate.min.css";
// import {AnimationOnScroll} from 'react-animation-on-scroll';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import animationData from './82793-a-skeletal-hand-taps-his-fingers-on-the-table.json';


// AOS.init();


// const hello = [
//   "Hello,",
//   "Bonjour,",
//   "Hujambo,",
//   "Namaste,",
//   "Nǐ hǎo,",
//   "Hola,",
//   "Konnichiwa,",
//   "Guten tag,",
//   "Marhaba,",
//   "Shalom,",
// ];

// const Home = () => {

//   React.useEffect(()=>{
//     lottie.loadAnimation({
//       container: document.querySelector('.anim'),
//       animationData: animationData
//     })
//   }, [])
//   // const instance = new TypeIt('.salut', {loop: true});

//   // for (const sth of hello) {
//   //   instance.type(sth).pause(1000).delete(0 - sth.length)
//   // }
//   // instance.go()

//   const [helloname, Sethelloname] = useState("Hello");

//   const random = useCallback(() => {
//     const i = Math.floor(Math.random() * hello.length);
//     Sethelloname(hello[i]);
//   }, []);

//   useEffect(() => {
//     const inter = setInterval(random, 3000);

//     return () => {
//       clearInterval(inter);
//     };
//   }, [random]);

//   const TheName = ({ children }) => {
//     return <p style={{ fontSize: "5rem" }}>{children}</p>;
//   };

//   const TheSalute = ({ children }) => {
//     return <p style={{ fontSize: "4rem" }}>{children}</p>;
//   };

//   // setInterval(()=>{
//   //   var k = Math.floor(Math.random() * hello.length);

//   // }, 500)

//   return (
//     <div className="kitu">
//       <div className="bg"></div>
//       <div className="kwanza">
//         {/* <Hero text="For Homepage" /> */}
//         <div className="d-flex flex-row h-100" style={{}}>
//           <div className="bata col-12 ms-5 w-50">
//             <p className="salut"></p>
//             <TypeIt
//               className="salut"
//               options={{
//                 speed: 125,
//                 waitUntilVisible: true,
//                 loopDelay: [500, 700],
//                 cursor: false,
//                 startDelay: 500,
//                 loop: true,
//                 lifeLike: true,
//                 deleteSpeed: 80,
//               }}
//               getBeforeInit={(instance) => {
//                 for (let val of hello) {
//                   instance.type(val).pause(10500).delete(val.length);
//                 }
//                 return instance;
//               }}
//             />
//             {/* <TheSalute>{helloname},</TheSalute>
//             </TypeIt> */}
//             <br />
//             <TypeIt
//               className="name"
//               options={{
//                 speed: 200,
//                 waitUntilVisible: true,
//                 lifeLike: true,

//                 startDelay: 1500,
//                 afterComplete: function (instance) {
//                   instance.destroy();
//                 },
//               }}
//               getBeforeInit={(instance) => {
//                 instance
//                   .type("I'm Mattin")
//                   .pause(700)
//                   .move(-3)
//                   .delete(1)
//                   .type("r")
//                   .move(3)
//                   .type(" N.");

//                 return instance;
//               }}
//               // getAfterInit={(instance)=>{
//               //   instance
//               //   .destroy();
//               //   return instance
//               // }}
//             />
//             <br />
//             <TypeIt
//               className="ms-2"
//               options={{
//                 speed: 200,
//                 waitUntilVisible: true,
//                 lifeLike: true,
//                 cursor: false,
//                 startDelay: 8000,
//               }}
//             >
//               <h5>I do stuff...</h5>
//             </TypeIt>
//           </div>
//           <div className="kadi col-6 col-md-4" style={{}}>
//             <div className="anim h-50">
//             </div>
      
//           </div>
//         </div>
//       </div>
//       <div className="scndrow col-6 d-flex flex-column align-items-center text-center ">
//       <div className="row  justify-content-evenly">
//       <h2 className="projo m-5 ">Projects</h2>

//       <div data-aos="fade-right" data-aos-duration="800" className="card text-white bg-transparent border-opacity-50 border-danger t-shadow m-5 mb-2 me-3 mt-3 p-1 col-5 rounded  shadow-intensity-lg">
//               <Link class="nav-link" to='/Upload'>
              
//                 <div className="card-body">
//                   <h2 className="card-title">M-Pesa Insights🚀</h2>
//                 </div>
//               </Link>
//               </div>
//               <div data-aos="fade-right" data-aos-delay="400" data-aos-duration="800" className="card text-white bg-transparent border-opacity-50 border-danger t-shadow m-5 mb-2 me-3 mt-3 p-1 col-5 rounded  shadow-intensity-lg">
//               <Link class="nav-link" to='/whackmole'>
//                 <div className="card-body">
//                   <h2 className="card-title mt-3">Whackmole🔨🔨</h2>
//                 </div>
//                 </Link>
//               </div>

//               <h3 className="mt-5">Web Development</h3>
//               <div className="card text-white bg-transparent border-opacity-50 border-info m-5 mb-2 me-3 mt-3 p-1 col-5 rounded shadow shadow-intensity-lg">
//                 <img
//                   src="../logo512.png"
//                   class="card-img-top img-fluid w-25 mt-1"
//                   alt="..."
//                 />
//                 <div className="card-body">
//                   <h2 className="card-title">React</h2>
//                 </div>
//               </div>
//               <div className="card text-white bg-transparent border-opacity-50 border-info m-5 mb-2 me-3 mt-3 p-1 col-5 rounded shadow shadow-intensity-lg">
//                 <img src={logo} class="card-img-top w-25 mt-1" alt="" />
//                 <div className="card-body">
//                   <h2 className="card-title">Javascript</h2>
//                 </div>
//               </div>
//               <div className="card text-white bg-transparent border-opacity-50 border-info m-5 mb-2 me-3 mt-3 p-1 col-5 rounded shadow shadow-intensity-lg">
//                 <img src={tslogo} class="card-img-top w-25 mt-2" alt="" />

//                 <div className="card-body">
//                   <h2 className="card-title">Typescript</h2>
//                 </div>
//               </div>
//               <div className="card text-white bg-transparent border-opacity-50 border-info m-5 mb-2 me-3 mt-3 p-1 col-5 rounded shadow shadow-intensity-lg">
//                 <img
//                   src={nlogo}
//                   class="card-img-top w-75 mb-2 mt-2"
//                   alt=""
//                   style={{ left: "2rem" }}
//                 />
//                 <div className="card-body">
//                   <h2 className="card-title">Node</h2>
//                 </div>
//               </div>
//               <div className="card text-white bg-transparent border-opacity-50 border-info m-5 mb-2 me-3 mt-3 p-1 col-5 rounded shadow shadow-intensity-lg">
//                 <img src={tlogo} class="card-img-top w-25 mt-4 ms-2" alt="" />
//                 <div className="card-body">
//                   <h2 className="card-title mt-3">Tailwind</h2>
//                 </div>
//               </div>
//               <div className="card text-white bg-transparent border-opacity-50 border-info m-5 mb-2 me-3 mt-3 p-1 col-5 rounded shadow shadow-intensity-lg">
//                 <img src={blogo} class="card-img-top w-25 mt-2" alt="" />
//                 <div className="card-body">
//                   <h2 className="card-title">Bootstrap</h2>
//                 </div>
//               </div>
//               <h3 className="mt-5">Performance Marketing</h3>
//               <div className="card text-white bg-transparent border-opacity-50 border-warning mb-3 me-3 mt-3 p-1 col-5 rounded">
//                 <div className="card-body">
//                   <h2 className="market card-title">
//                     Search Engine Optimization
//                   </h2>
//                 </div>
//               </div>
//               <div className="card text-white bg-transparent border-opacity-50 border-warning mb-3 me-3 mt-3 p-1 col-5 rounded">
//                 <div className="card-body">
//                   <h2 className="market card-title">Google Analytics</h2>
//                 </div>
//               </div>
//               <div className="card text-white bg-transparent border-opacity-50 border-warning mb-3 me-3 mt-3 p-1 col-5 rounded">
//                 <div className="card-body">
//                   <h2 className="market card-title">Wordpress Management</h2>
//                 </div>
//               </div>
//               <div className="card text-white bg-transparent border-opacity-50 border-warning mb-3 me-3 mt-3 p-1 col-5 rounded">
//                 <div className="card-body">
//                   <h2 className="market card-title">Google Looker Studio</h2>
//                 </div>
//               </div>
//             </div>
//         Dive 2 cards go here
//       </div>
//     </div>
//   );
// };

// export default Home;
