import React, { useState, useEffect, useContext } from "react";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";
import { UserContext } from "../UserContext";
import { Link, useLocation, useHistory } from "react-router-dom";
import Chart from 'chart.js/auto';
import { FailedataloadAlert } from "../Alerts";
import Navbar from "../Navbar/Navbar";
import './Statement.scss'
// import { CategoryScale, Chart, ArcElement, LinearScale, BarElement, defaults, Interaction } from "chart.js";

// Chart.register(CategoryScale);
// Chart.register(ArcElement) 
// Chart.register(LinearScale)
// // Chart.register(Interaction)
// Chart.register(BarElement)

// formater from stackoverflow
const formatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  currency: "KES",
});


const Statement = (props) => {
  const history = useHistory();
  const rtnclick = () => {
    window.location.reload()
  };
  const [sttdata, setSttdata] = useState([]);
  const [piedata, setPiedata] = useState([]);
  const [getdatafailed, setGetdatafailed] = useState(false);
  const [getdetsarr, setGetdetsarr] = useState([]);
  const [amountarr, setAmountarr] = useState([]);
  const [biggestReceivers, setBiggestReceivers] = useState([]);
  const [biggestReceiversdets, setBiggestReceiversdets] = useState([]);
  const [piechartamnt, setPiechartamnt] = useState([]);
  const [piechartdets, setPiechartdets] = useState([]);
  const [total, setTotal] = useState([]);
  const [tranccostAmount, setTranccostAmount] = useState([]);
  const [lpcharges, setLpcharges] = useState([]);
  const [pblist, setPblist] = useState([]);
  const [pbamnt, setPbamnt] = useState([]);
  const [tseries, settseries] = useState([]);
  const [monthnam, setmonthnam] = useState([]);
  const [monthnam2, setmonthnam2] = useState([]);
  const [tseries2, settseries2] = useState([]);
  const [avgfuliza2, setavgfuliza2] = useState([]);
  const [paidinname, setpaidinname] = useState([]);
  const [bizpaidin, setbizpaidin] = useState([]);
  const [bizpaidinnam, setbizpaidinnam] = useState([]);
  const [twoyearline, settwoyearline] = useState(false);
  const [avgfuliza, setavgfuliza] = useState([]);
  const [fulizaperc, setfulizaperc] = useState([]);
  const [brokenstt, setbrokenstt] = useState(false);
  const [miakambili, setmiakambili] = useState([]);
  const [screenWidth, setScreenWidth] = useState(false);
  const [airtimebought, SetAirtimebought] = useState(0);
  const [onemonth, setonemonth] = useState(true);
  const [loadstate, setloadstate] = useState(true);
  const [loaddone, setloaddone] = useState(false);
  const { user, setUser } = useContext(UserContext)


  useEffect(() => {
    setSttdata(props.data);
    setPiedata(props.pdata);
    // csv cleanup remove first 9 rows
    // d3.text(tstatement).then(function (data) {
    //   data = d3.csvParse(data.split("\n").slice(9).join("\n"));
    //   setSttdata(data);
    // });
    // // csv get first 7 columns (9 columns for total and others)
    // d3.text(tstatement)
    //   .then(function (data) {
    //     data = d3.csvParse(data.split("\n").slice(0, 9).join("\n"));
    //     setPiedata(data);
    //   })

    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  React.useEffect(() => {
    if (window.innerWidth < 760) {
      setScreenWidth(true);
      // defaults.font.size = 8; // remember to add this
    }
  }, []);
  useEffect(() => {
    // get transcation type
    let detsarr = [];
    let amount = [];
    let total = [];
    try {

      piedata.map((o, i) => {
        detsarr.push(o["TRANSACTION TYPE"]);
        var paidin = o["PAID IN"].replace(/,/g, "").replace(/-/g, "");
        var paidout = o["PAID OUT"].replace(/,/g, "").replace(/-/g, "");

        if (o["PAID IN"] == "0.00") {
          amount.push(parseInt(paidout));
        } else if (o["PAID OUT"] === "0.00") {
          amount.push(parseInt(paidin));
          console.log(amount);
        } else if (o["PAID OUT"] === "0.00" && o["PAID IN"] === "0.00") {
          amount.push(0);
        } else if (o["TRANSACTION TYPE"] === "TOTAL:") {
          total.push(parseInt(paidin), parseInt(paidout));
        }
      });
      setTotal(total);
      setPiechartamnt(amount);
      setPiechartdets(detsarr);
    } catch (error) {
      rtnclick()
      alert("Something went wrong on our end. Please try again.")
      window.location.reload()

    }
  }, [piedata]);

  useEffect(() => {
    try {
      // max value
      var maxwithdraw = Math.max.apply(
        Math,
        sttdata.map(function (o) {
          var trueval = o.Withdrawn.replace(/,/g, "").replace(/-/g, "");
          if (trueval === "" || trueval === "Withdrawn") {
            trueval = 0;
          }
          return Math.abs(parseInt(trueval));
        })
      );
      var maxwithdrawobj = sttdata.find(function (o) {
        var trueval = o.Withdrawn.replace(/,/g, "").replace(/-/g, "");
        return Math.abs(parseInt(trueval)) === maxwithdraw;
      });

      //max 10 values

      let getmaxarr = [];
      const getmax = sttdata.map((obj, i) => {
        var trueval = obj.Withdrawn.replace(/,/g, "").replace(/-/g, "");
        if (trueval === "" || trueval === "Withdrawn") {
          trueval = 0;
        }
        var arrnum = Math.abs(parseInt(trueval));
        getmaxarr.push(arrnum);
      });
      var newarr = getmaxarr
        .sort(function (a, b) {
          return a - b;
        })
        .slice(-10);
      // max 10 values find objects
      let maxtenarr = [];
      const maxten = newarr.map((obj, i) => {
        var check = sttdata.filter(function (o) {
          var trueval = o.Withdrawn.replace(/,/g, "").replace(/-/g, "");
          if (trueval === "" || trueval === "Withdrawn") {
            trueval = 0;
          }
          return obj === Math.abs(parseInt(trueval));
        });
        maxtenarr.push(check);
      });
      const flatennedarr = maxtenarr.flat(1);

      // Get Transaction details in array
      let arr1 = [];
      let arr2 = [];
      const getDetails = flatennedarr.map((obj, i) => {
        arr1.push(obj.Details);
        var trueval = obj.Withdrawn.replace(/,/g, "").replace(/-/g, "");
        if (trueval === "" || trueval === "Withdrawn") {
          trueval = 0;
        }
        arr2.push(trueval);
      });
      // set states for top ten transcation details and amount

      // find total spent on fuliza and trancation costs, fuliza cost and wtihdrawal charges
      let fulizaarr = [];
      let trancarr = [];
      let fulizacost = [];
      let fulizatrans = [];
      let wcost = [];
      let pbchargearr = [];
      let tillchargearr = [];
      let airtimeCost = [];
      let totalbal = 0;
      let rej = 0;
      let avgbal = [];
      let months = [];
      let twoyears = [];
      let year = [];
      let avgmonthbal = [];
      let avgful = [];
      let avgmonthbal2 = [];
      let avgful2 = [];
      let totaltrans = 0;
      let totalfultrans = 0;
      const month = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];
      let date = [];
      let brknstatement = [];
      const monthsName = [];
      const monthsName2 = [];

      // for other below

      let sndmoneydets = [];
      let arr4 = [];
      let phonenum = [];
      let pbillnamearr = []; // for till
      let pbamnt = []; // for till
      let paybillnam = [];
      let paidinnam = [];
      let paidinamnt = [];
      let thisdamnthing = [];
      let ac = [];
      let ac2 = [];
      let onearr = [];
      let twoarr = [];
      let threearr = [];
      const forbiz = []

      let anotherarr = [];
      let anotherarr2 = [];
      let anotherarr3 = [];


      const fuliza = sttdata.map((o, i) => {
        if (o.Details === "OverDraft of Credit Party") {
          totalfultrans++;
          var trueval = o["Paid In"].replace(/,/g, "").replace(/-/g, "");
          if (trueval === "" || trueval === "Paid In") {
            trueval = 0;
          }
          fulizaarr.push(parseInt(trueval));
        }
        if (o.Details === "Customer Transfer of Funds\rCharge") {
          var trueva2 = o.Withdrawn.replace(/,/g, "").replace(/-/g, "");
          if (trueva2 === "" || trueva2 === "Withdrawn") {
            trueva2 = 0;
          }
          trancarr.push(parseInt(trueva2));
        }
        if (o.Details === "OD Loan Repayment to 232323 -\rM-PESA Overdraw") {
          var trueva3 = o.Withdrawn.replace(/,/g, "").replace(/-/g, "");
          if (trueva3 === "" || trueva3 === "Withdrawn") {
            trueva3 = 0;
          }
          fulizacost.push(parseInt(trueva3));
        }
        if (o.Details === "Withdrawal Charge") {
          var trueva4 = o.Withdrawn.replace(/,/g, "").replace(/-/g, "");
          if (trueva4 === "" || trueva4 === "Withdrawn") {
            trueva4 = 0;
          }
          wcost.push(parseInt(trueva4));
        }
        if (o.Details === "Pay Bill Charge") {
          var trueva5 = o.Withdrawn.replace(/,/g, "").replace(/-/g, "");
          if (trueva5 === "" || trueva5 === "Withdrawn") {
            trueva5 = 0;
          }
          pbchargearr.push(parseInt(trueva5));
        }
        if (o.Details === "Pay Merchant Charge") {
          var trueva6 = o.Withdrawn.replace(/,/g, "").replace(/-/g, "");
          if (trueva6 === "" || trueva6 === "Withdrawn") {
            trueva6 = 0;
          }
          tillchargearr.push(parseInt(trueva6));
        }
        if (o.Details === "Airtime Purchase") {
          var trueva7 = o.Withdrawn.replace(/,/g, "").replace(/-/g, "");
          if (trueva7 === "" || trueva6 === "Withdrawn") {
            trueva7 = 0;
          }
          airtimeCost.push(parseInt(trueva7));
        }
        if (o.Balance === "Balance") {
          rej++;
        } else {
          let bal = o.Balance.replace(/,/g, "");
          totalbal = totalbal + parseInt(bal);
        }
        if (o.Details.startsWith('Business')) {
          paidinnam.push(o)
        }

        if (
          o.Details.includes("Merchant Payment to") ||
          o.Details.includes("Customer Transfer to") ||
          o.Details.includes("Pay Bill Online to") ||
          o.Details.includes("Pay Bill to")
        ) {
          totaltrans++;
        }

        let f = o["Completion Time"].split("-");
        if (f[0] !== "Completion Time") {
          if (!months.includes(f[1])) {
            if (f[1]) {
              months.push(f[1]);
            }
          }
          if (!year.includes(f[0])) {
            year.push(f[0]);
          }
          // check total number of months by checking first index in sttdata and minus from last index
          //  const count = months.filter(x => x === f[1]).length;
          //  if (count < 2) {

          //     months.push(f[1])
          //  }
          // if (months.includes(f[1]) && year.includes(f[0])) {
          //   console.log('somthing')
          // }
        }
        var q = o["Completion Time"];
        if (i === 0) {
          if (q !== "Completion Time") {
            date.push(new Date(q));
          }
        }
        if (i === sttdata.length - 1) {
          setloadstate(false)
          setloaddone(true)
          let divide = sttdata.length - rej;
          var final = totalbal / divide;
          avgbal.push(parseInt(final));
          if (q !== "Completion Time") {
            date.push(new Date(q));
          }
          const diffTime = Math.abs(date[1] - date[0]);
          const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));
          if (diffMonths < 1) {
            date[2] = '<1'
            setonemonth(false)

          } else if (diffMonths <= 2) {
            setonemonth(false)
          }
          else {
            date[2] = diffMonths;
          }

          if (diffMonths >= 22 && diffMonths < 25) {
            // set state true when this is true
            settwoyearline(true);
            let miaka = diffTime / 2;
            date.push(miaka);
            // itakuwa the same ukichukua months za two years, max 12 for arr
            months.map((o, n) => {
              if (n !== 0) {
                twoyears.push(o);
              }
              if (n === months.length - 1) {
                twoyears[11] = "0" + (parseInt(o) - 1);
              }
            });
          }
          if (diffMonths < 22 && diffMonths > 12) {
            // two year statement is not 24 months, data shown is for the past year
            // set state true for this case
            brknstatement.push(Math.abs(date[1]) - 31557600000);
            setbrokenstt(true);
          }
          // trying the for paidin biz here

          for (const o of paidinnam) {
            if (o.Details.startsWith("Business")) {
              let getnam = o.Details.replace(/\r/g, " ")
                .split(" ")
                .slice(5)
                .slice(0, 2)
                .join(" ");
              let pbillnam = getnam.toUpperCase();
              // if (!paidinnam.includes(pbillnam)) {
              //   paidinnam.push(pbillnam);
              // }
              var truev = o["Paid In"].replace(/,/g, "").replace(/-/g, "");
              if (truev === "" || truev === "Paid In") {
                truev = 0;
              }
              let existing = forbiz.find((a) => a.name === pbillnam);
              if (existing) {
                existing.amount += parseInt(truev);
              } else {
                forbiz.push({ name: pbillnam, amount: parseInt(truev) });
              }
            }
          }
          threearr.push(forbiz)
        }
      });

      // get similar transcations
      const gettranc = sttdata.reduce((a, o) => {
        const key = o.Details.replace(/\r/g, " ");
        if (!a[key]) {
          a[key] = [];
        }
        a[key].push(o);
        return a;
      }, {});

      // sort the arrays by length and get biggest 20
      const sortedArrays = Object.values(gettranc).sort(
        (a, b) => b.length - a.length
      );

      const largestTwentyArrays = sortedArrays.slice(0, 100); // change this to get more arrays

      // set if conditions for the different arrays

      // take arrays add all the withdrawn sums push into array then push array of details to new array


      const withdrawsums = largestTwentyArrays.map((obj, i) => {
        let arr5 = [];
        let paybillsum = [];
        let filteredObj = obj.filter(
          (o) =>
            o.Details.startsWith("Customer Transfer") ||
            o.Details.startsWith("Customer Transfer Fuliza")
        );
        let h = filteredObj.length;
        // for pa
        let tillfiltered = obj.filter(
          (o) =>
            o.Details.startsWith("Merchant Payment") ||
            o.Details.startsWith("Merchant Payment Fuliza")
        );
        let j = tillfiltered.length;

        let forpbill = obj.filter((o) => o.Details.startsWith("Pay Bill"));
        let n = forpbill.length;

        // paid in shit

        let paidarr = obj.filter(
          (o) =>
            o.Details.startsWith("Funds received") ||
            o.Details.startsWith("Business") ||
            o.Details.includes('Business Payment from')
        );
        let p = paidarr.length;
        paidinnam.push(paidarr)
        let twonums = false; // to check if the numbers appears twice, dont add the second to the array

        const filteredArray = filteredObj.filter(
          (o) => !o.Details.includes("Customer Transfer of Funds\rCharge")
        );
        const result = filteredArray.reduce((acc, obj) => {
          ac.push(acc);
          let lastTwoWords = obj.Details.replace(/\r/g, " ")
            .split(" ")
            .slice(-2)
            .join(" ");
          let chknum = obj.Details.replace(/\r/g, " ")
            .split(" ")
            .slice(-3, -2)
            .join(" ");
          var truenam = lastTwoWords.toUpperCase();
          let trueval = obj.Withdrawn.replace(/,/g, "").replace(/-/g, "");
          if (trueval === "" || trueval === "Withdrawn") {
            trueval = 0;
          }
          let existing = acc.find((a) => a.name === truenam);
          if (existing) {
            existing.amount += parseInt(trueval);
          } else {
            acc.push({ name: truenam, amount: parseInt(trueval) });
          }
          return acc;
        }, []);

        onearr.push(result);

        // arr4.push(arr5.reduce((a, o) => a + o, 0));

        // get the data for till receivers

        let sum = 0;
        tillfiltered.forEach((o, i) => {
          let getnam = o.Details.replace(/\r/g, " ")
            .split(" ")
            .slice(5)
            .join(" ");
          let pbillnam = getnam.toUpperCase();
          if (!pbillnamearr.includes(pbillnam)) {
            pbillnamearr.push(pbillnam);
          }
          var trueval = o.Withdrawn.replace(/,/g, "").replace(/-/g, "");
          if (trueval === "" || trueval === "Withdrawn") {
            trueval = 0;
          }
          sum = sum + parseInt(trueval);
          if (i === j - 1) {
            pbamnt.push(sum);
          }
        });

        // get the paybill payment data

        forpbill.forEach((o, i) => {
          if (!o.Details.includes("Pay Bill Charge")) {
            let getnam = o.Details.replace(/\r/g, " ")
              .replace(/-/g, "")
              .replace(/'Online'/g, "")
              .split(" ")
              .slice(5)
              .join(" ");
            let chknum = o.Details.replace(/\r/g, " ")
              .split(" ")
              .slice(-3, -2)
              .join(" "); // check phone number diff
            // can add condtiion to check if it is paybill online
            let nameofpb = getnam.toUpperCase();
            if (!paybillnam.includes(nameofpb)) {
              paybillnam.push(nameofpb);
            }
            var trueval = o.Withdrawn.replace(/,/g, "").replace(/-/g, "");
            if (trueval === "" || trueval === "Withdrawn") {
              trueval = 0;
            }
            paybillsum.push(parseInt(trueval));
            if (i === n - 1) {
              let sth = paybillsum.reduce((acc, val) => acc + val, 0);
              thisdamnthing.push(sth);
            }
          }
        });

        const forpaid = [];
        for (const o of paidarr) {
          if (o.Details.includes("Funds received")) {
            let lastTwoWords = o.Details.replace(/\r/g, " ")
              .split(" ")
              .slice(-2)
              .join(" ");
            let thisnam = lastTwoWords.toUpperCase();
            let trueval = o["Paid In"].replace(/,/g, "").replace(/-/g, "");
            if (trueval === "" || trueval === "Paid In") {
              trueval = 0;
            }
            let existing = forpaid.find((a) => a.name === thisnam);

            if (existing) {
              existing.amount += parseInt(trueval);
            } else {
              forpaid.push({ name: thisnam, amount: parseInt(trueval) });
            }
          }
        }

        twoarr.push(forpaid);


      });

      // this shit isn't working - its working now mf

      var resul = onearr.filter((e) => e.length);
      var finalres = resul.flat(1);

      finalres.map((o, i) => {
        let exist = anotherarr.find((b) => {
          return b.name === o.name;
        });
        if (exist) {
          exist.amount += o.amount;
          anotherarr.splice(i, 4);
        } else {
          anotherarr.push(o);
        }
      });

      // double number checker for paid in

      var yetanother = twoarr.filter((e) => e.length);
      var finalres2 = yetanother.flat(1);

      finalres2.map((o, i) => {
        let exist = anotherarr2.find((b) => {
          return b.name === o.name;
        });
        if (exist) {
          exist.amount += o.amount;
          anotherarr2.splice(i, 4);
        } else {
          anotherarr2.push(o);
        }
      });
      // checker for business paid in
      var forbizpaid = threearr.filter((e) => e.length);
      var finalres3 = forbizpaid.flat(1);

      finalres3.map((o, i) => {
        let exist = anotherarr3.find((b) => {
          return b.name === o.name;
        });
        if (exist) {
          exist.amount += o.amount;
          anotherarr3.splice(i, 4);
        } else {
          anotherarr3.push(o);
        }
      });
      setpaidinname(anotherarr2);
      setbizpaidinnam(anotherarr3);
      // set bar graph data for send money and sort array

      const setarr = sndmoneydets.map((o, i) => {
        return {
          label: o,
          data: arr4[i] || 0,
        };
      });

      const sortedarr = anotherarr.sort(function (a, b) {
        return b.amount > a.amount;
      });

      let sendmoneyarr = [];
      let sendmoneyamnt = [];

      sortedarr.forEach(function (o) {
        sendmoneyarr.push(o.name);
        sendmoneyamnt.push(o.amount);
      });

      if (screenWidth) {
        setGetdetsarr(sendmoneyarr.slice(0, 10));
        setAmountarr(sendmoneyamnt.slice(0, 10));
      } else {
        setGetdetsarr(sendmoneyarr);
        setAmountarr(sendmoneyamnt);
      }

      // sort bar graph for till and set array

      const narr = pbillnamearr.map((o, i) => {
        return {
          label: o,
          data: pbamnt[i] || 0,
        };
      });

      const sarr = narr.sort(function (a, b) {
        return b.data > a.data;
      });

      let sortpbilllname = [];
      let sortpbillamnt = [];

      sarr.forEach(function (o) {
        sortpbilllname.push(o.label);
        sortpbillamnt.push(o.data);
      });

      if (screenWidth) {
        setBiggestReceivers(sortpbillamnt.slice(0, 10));
        setBiggestReceiversdets(sortpbilllname.slice(0, 10));
      } else {
        setBiggestReceivers(sortpbillamnt);
        setBiggestReceiversdets(sortpbilllname);
      }

      // sort bar graph for paybill and set array

      const anarr = paybillnam.map((o, i) => {
        return {
          label: o,
          data: thisdamnthing[i] || 0,
        };
      });

      const yarr = anarr.sort(function (a, b) {
        return b.data > a.data;
      });

      let sortlist = [];
      let sortamnt = [];

      yarr.forEach(function (o) {
        sortlist.push(o.label);
        sortamnt.push(o.data);
      });
      if (screenWidth) {
        setPblist(sortlist.slice(0, 10));
        setPbamnt(sortamnt.slice(0, 10));
      } else {
        setPblist(sortlist);
        setPbamnt(sortamnt);
      }


      const sum = fulizaarr.reduce((total, value) => total + value, 0);
      const fulizacostsum = fulizacost.reduce((total, value) => total + value, 0);
      const trans = trancarr.reduce((total, value) => total + value, 0);
      const wcharges = wcost.reduce((total, value) => total + value, 0);
      const pcharge = pbchargearr.reduce((total, value) => total + value, 0);
      const tcharge = tillchargearr.reduce((total, value) => total + value, 0);
      const airtime = airtimeCost.reduce((total, value) => total + value, 0);
      var diff = fulizacostsum - sum;
      fulizatrans.push(sum, Math.abs(diff), trans, wcharges);

      setLpcharges([pcharge, tcharge, avgbal[0]]);

      SetAirtimebought(airtime);

      setTranccostAmount(fulizatrans);

      if (months.length !== 0) {
        if (twoyears.length !== 0) {
          var twoyearfinal = twoyears.reverse();
          let ingine = twoyearfinal.map((t, y) => {
            let ar = [];
            let fularr = [];
            let num = 0;
            let ar2 = [];
            let fularr2 = [];
            let nump = 0;
            const quik = sttdata.map((a, b) => {
              let f = a["Completion Time"];
              if (f !== "Completion Time") {
                let finaldate = new Date(f);
                let datesplit = a["Completion Time"].split("-");

                if (Math.abs(date[0] - finaldate) < date[3]) {
                  if (t === datesplit[1]) {
                    let bal = a.Balance.replace(/,/g, "").replace(/-/g, "");

                    ar.push(parseInt(bal));
                    num++;
                    if (a.Details === "OverDraft of Credit Party") {
                      var trueva3 = a["Paid In"]
                        .replace(/,/g, "")
                        .replace(/-/g, "");
                      if (trueva3 === "" || trueva3 === "Paid In") {
                        trueva3 = 0;
                      }
                      fularr.push(parseInt(trueva3));
                    }
                  }
                }
                if (Math.abs(date[0] - finaldate) > date[3]) {
                  if (t === datesplit[1]) {
                    let bal = a.Balance.replace(/,/g, "").replace(/-/g, "");
                    ar2.push(parseInt(bal));
                    nump++;
                    if (a.Details === "OverDraft of Credit Party") {
                      var trueva4 = a["Paid In"]
                        .replace(/,/g, "")
                        .replace(/-/g, "");
                      if (trueva4 === "" || trueva4 === "Paid In") {
                        trueva4 = 0;
                      }
                      fularr2.push(parseInt(trueva4));
                    }
                  }
                }
              }
              // date[0].setMonth(date[0].getMonth() - 12)
            });
            const msum = ar.reduce((total, value) => total + value, 0);
            const fsum = fularr.reduce((total, value) => total + value, 0);
            avgful.push(fsum);
            let finale = msum / num;
            avgmonthbal.push(parseInt(finale));
            month.map((d, y) => {
              if (parseInt(t) === y + 1) {
                monthsName.push(d);
              }
            });

            if (ar2.length !== 0) {
              const msum2 = ar2.reduce((total, value) => total + value, 0);
              const fsum2 = fularr2.reduce((total, value) => total + value, 0);
              avgful2.push(fsum2);
              let finale = msum2 / nump;
              avgmonthbal2.push(parseInt(finale));
              month.map((d, y) => {
                if (parseInt(t) === y + 1) {
                  monthsName2.push(d);
                }
              });
            }
          });
        } else if (brknstatement.length !== 0) {
          let monthsfinal = months.reverse();
          let func = monthsfinal.map((s, l) => {
            let ar = [];
            let fularr = [];
            let num = 0;
            const quik = sttdata.map((a, b) => {
              let f = a["Completion Time"];
              if (f !== "Completion Time") {
                let finaldate = new Date(f);
                let datesplit = a["Completion Time"].split("-");
                if (finaldate >= brknstatement[0]) {
                  if (s === datesplit[1]) {
                    let bal = a.Balance.replace(/,/g, "").replace(/-/g, "");
                    ar.push(parseInt(bal));
                    num++;
                    if (a.Details === "OverDraft of Credit Party") {
                      var trueva3 = a["Paid In"]
                        .replace(/,/g, "")
                        .replace(/-/g, "");
                      if (trueva3 === "" || trueva3 === "Paid In") {
                        trueva3 = 0;
                      }
                      fularr.push(parseInt(trueva3));
                    }
                  }
                }
              }
            });

            const msum = ar.reduce((total, value) => total + value, 0);
            const fsum = fularr.reduce((total, value) => total + value, 0);
            avgful.push(fsum);
            let finale = msum / num;
            avgmonthbal.push(parseInt(finale));
            month.map((t, y) => {
              if (parseInt(s) === y + 1) {
                monthsName.push(t);
              }
            });
          });
        } else {
          let monthsfinal = months.reverse();
          let func = monthsfinal.map((s, l) => {
            let ar = [];
            let fularr = [];
            let num = 0;
            const quik = sttdata.map((a, b) => {
              let f = a["Completion Time"].split("-");

              if (s === f[1]) {
                let bal = a.Balance.replace(/,/g, "").replace(/-/g, "");
                ar.push(parseInt(bal));
                num++;
                if (a.Details === "OverDraft of Credit Party") {
                  var trueva3 = a["Paid In"].replace(/,/g, "").replace(/-/g, "");
                  if (trueva3 === "" || trueva3 === "Paid In") {
                    trueva3 = 0;
                  }
                  fularr.push(parseInt(trueva3));
                }
              }
            });
            const msum = ar.reduce((total, value) => total + value, 0);
            const fsum = fularr.reduce((total, value) => total + value, 0);
            avgful.push(fsum);
            let finale = msum / num;
            avgmonthbal.push(parseInt(finale));

            month.map((t, y) => {
              if (parseInt(s) === y + 1) {
                monthsName.push(t);
              }
            });
          });
        }
      }
      settseries(avgmonthbal);
      setavgfuliza(avgful);
      settseries2(avgmonthbal2);
      setavgfuliza2(avgful2);
      setmonthnam(monthsName);
      setmonthnam2(monthsName2);
      setfulizaperc([totaltrans, totalfultrans]);
      setmiakambili([date[2], year[0], year[1], year[2]]);

    } catch (error) {
      console.log(error);
      rtnclick()
    }
  }, [sttdata]);

  // bar chart 1

  const dataset = {
    labels: getdetsarr.map((o) => o),
    datasets: [
      {
        data: amountarr.map((o) => o),
        backgroundColor: ["rgb(28, 231, 129)"],
        borderWidth: 1,
      },
    ],
  };

  //bar chart 2
  const dataset2 = {
    labels: biggestReceiversdets.map((o) => o),
    datasets: [
      {
        data: biggestReceivers.map((o) => o),
        backgroundColor: ["rgb(231, 102, 28)"],
        borderWidth: 1,
      },
    ],
  };

  // needless to say
  const dataset3 = {
    labels: pblist.map((o) => o),
    datasets: [
      {
        data: pbamnt.map((o) => o),
        backgroundColor: ["rgb(217, 231, 28)"],
        pointBackgroundColor: "aqua",
        borderWidth: 1,
      },
    ],
  };
  const linedata = {
    labels: monthnam.map((o) => o),
    datasets: [
      {
        label: "Average Monthly Balance",
        data: tseries.map((o) => o),
        borderColor: "rgb(45, 236, 39)",
        backgroundColor: "rgb(45, 236, 39)",
      },
      {
        label: "Monthly Fuliza Taken",
        data: avgfuliza.map((o) => o),
        borderColor: "rgb(39, 197, 236)",
        backgroundColor: "rgb(39, 197, 236)",
      },
    ],
  };
  const linedata2 = {
    labels: monthnam2.map((o) => o),
    datasets: [
      {
        label: "Average Monthly Balance",
        data: tseries2.map((o) => o),
        borderColor: "rgb(45, 236, 39)",
        backgroundColor: "rgb(45, 236, 39)",
      },
      {
        label: "Monthly Fuliza Taken",
        data: avgfuliza2.map((o) => o),
        borderColor: "rgb(39, 197, 236)",
        backgroundColor: "rgb(39, 197, 236)",
      },
    ],
  };

  // pie chart
  const piedataset = {
    labels: piechartdets.map((o) => o),
    datasets: [
      {
        data: piechartamnt.map((o) => o),
        backgroundColor: [
          "rgb(7, 109, 101)",
          "rgb(177, 214, 42)",
          "rgb(202, 42, 214)",
          "rgb(1, 238, 20)",
          "rgb(230, 134, 17)",
          "rgb(246, 23, 23)",
          "rgb(230, 134, 17)",
          "rgb(202, 42, 214)",
        ],
        pointBackgroundColor: "aqua",
        borderWidth: 1,
        borderColor: [
          "rgb(7, 109, 101)",
          "rgb(177, 214, 42)",
          "rgb(202, 42, 214)",
          "rgb(1, 238, 20)",
          "rgb(230, 134, 17)",
          "rgb(246, 23, 23)",
          "rgb(18, 22, 127)",
          "rgb(202, 42, 214)",
        ],
      },
    ],
  };

  // pie chart 2

  const pie2dataset = {
    labels: ["Transcations without Fuliza", "Fuliza Transcations"],
    datasets: [
      {
        data: fulizaperc.map((o) => o),
        backgroundColor: ["rgb(7, 109, 101)", "rgba(172, 38, 38, 0.603)"],
        pointBackgroundColor: "aqua",
        borderWidth: 1,
        borderColor: ["rgb(7, 109, 101)", "rgba(172, 38, 38, 0.603)"],
      },
    ],
  };

  // backup colors
  // backgroundColor: [
  //   "rgb(0, 99, 180)",
  //   "rgb(177, 214, 42)",
  //   "rgb(3, 113, 156)",
  //   "rgb(246, 23, 23)",
  //   "rgb(202, 42, 214)",
  //   "rgb(3, 156, 36)",
  //   "rgb(230, 134, 17)",
  //   "rgb(236, 134, 0)",
  // ],
  const pie3dataset = {
    labels: paidinname.map((o) => o.name),
    datasets: [
      {
        data: paidinname.map((o) => o.amount),
        backgroundColor: [
          "rgb(38, 194, 128)",
          "rgb(236, 113, 149)",
          "rgb(252, 166, 2)",
          "rgb(245, 245, 245)",
          "rgb(229, 130, 212)",
          "rgb(16, 168, 133)",
          "rgb(142, 218, 191)",
          "rgb(35, 154, 197)",
          "rgb(243, 114, 44)",
          "rgb(155, 89, 182)",
          "rgb(50, 197, 250)",
          "rgb(227, 119, 194)",
          "rgb(244, 208, 63)",
          "rgb(210, 82, 127)"

        ],
        pointBackgroundColor: "aqua",
        borderWidth: 1,
        borderColor: [
          "rgb(38, 194, 128)",
          "rgb(236, 113, 149)",
          "rgb(252, 166, 2)",
          "rgb(245, 245, 245)",
          "rgb(229, 130, 212)",
          "rgb(16, 168, 133)",
          "rgb(142, 218, 191)",
          "rgb(35, 154, 197)",
          "rgb(243, 114, 44)",
          "rgb(155, 89, 182)",
          "rgb(50, 197, 250)",
          "rgb(227, 119, 194)",
          "rgb(244, 208, 63)",
          "rgb(210, 82, 127)"

        ],
      },
    ],
    legend: {
      display: false
    }
  };

  const pie4dataset = {
    labels: bizpaidinnam.map((o) => o.name),
    datasets: [
      {
        data: bizpaidinnam.map((o) => o.amount),
        backgroundColor: [
          "rgb(38, 194, 128)",
          "rgb(236, 113, 149)",
          "rgb(252, 166, 2)",
          "rgb(245, 245, 245)",
          "rgb(229, 130, 212)",
          "rgb(16, 168, 133)",
          "rgb(142, 218, 191)",
          "rgb(35, 154, 197)",
          "rgb(243, 114, 44)",
          "rgb(155, 89, 182)",
          "rgb(50, 197, 250)",
          "rgb(227, 119, 194)",
          "rgb(244, 208, 63)",
          "rgb(210, 82, 127)"

        ],
        pointBackgroundColor: "aqua",
        borderWidth: 1,
        borderColor: [
          "rgb(38, 194, 128)",
          "rgb(236, 113, 149)",
          "rgb(252, 166, 2)",
          "rgb(245, 245, 245)",
          "rgb(229, 130, 212)",
          "rgb(16, 168, 133)",
          "rgb(142, 218, 191)",
          "rgb(35, 154, 197)",
          "rgb(243, 114, 44)",
          "rgb(155, 89, 182)",
          "rgb(50, 197, 250)",
          "rgb(227, 119, 194)",
          "rgb(244, 208, 63)",
          "rgb(210, 82, 127)"

        ],
      },
    ],
  };

  // line options

  const lineoptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {},
      title: {
        display: true,
        fontSize: 50,
      },
    },
  };

  const pieoptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      title: {
        display: true,
        fontSize: 30,
      },
    },
    elements: {
      arc: {
        borderWidth: 1,
        borderColor: "#333",
      },
    },
  };

  const pie2options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      title: {
        display: true,
        fontSize: 30,
      },
    },
    elements: {
      arc: {
        borderWidth: 1,
        borderColor: "#333",
      },
    },
  };

  const pie3options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
      title: {
        display: true,
        fontSize: 30,
      },
    },
    elements: {
      arc: {
        borderWidth: 1,
        borderColor: "#333",
      },
    },
  };

  const options = {
    barThickness: 20,
    barPercentage: 0.8,
    categoryPercentage: 0.8,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
      },
      legend: {
        display: false,
        labels: {
          font: {
            size: 6,
          },
        },
      },
    },
  };

  const bar2options = {
    barThickness: () => {
      if (screenWidth) {
        return 15;
      } else {
        return 25;
      }
    },
    barPercentage: 0.8,
    categoryPercentage: 0.8,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
      },
      legend: {
        display: false,
      },
    },
  };

  const bar3options = {
    indexAxis: "y",
    barThickness: 20,
    barPercentage: 0.8,
    categoryPercentage: 0.8,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="simu">
      {
        getdatafailed &&
        <div className="d-flex flex-row position-absolute top-50 start-50 translate-middle">
          <FailedataloadAlert />
        </div>
      }
      {loadstate &&
        <div className="d-flex flex-row position-absolute top-50 start-50 translate-middle">
          <h4 className="load m-1 text-info">Adding data to charts...</h4>

          <div class="spinner-grow spinner-grow-sm text-info m-1" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>

        </div>
      }
      {loaddone &&
        <div className="Statement">
          <Navbar />
          <h3>
            Statement Period: <span>{miakambili[0]} months</span>
          </h3>
          {/* {user ?
            <div className="alaa d-flex flex-row-reverse bg-info bg-opacity-50 p-4 justify-content-center">
              <button
                type="button"
                className="btn btn-warning me-0"
                onClick={rtnclick}
              >
                Back to dashboard
                <Link to='/Upload'></Link>
              </button>
              <h3 className="text-center w-75 ms-5 ">
                Statement Period: {miakambili[0]} months
              </h3>
            </div>

            :
            <div className="alaa d-flex flex-row-reverse bg-info bg-opacity-50 p-4 justify-content-center">
              <button
                type="button"
                className="btn btn-warning me-0"
                onClick={rtnclick}
              >
                Try With Another PDF
                <Link to='/Upload'></Link>
              </button>
              <h3 className="text-center w-75 ms-5 ">
                Statement Period: {miakambili[0]} months
              </h3>
            </div>

          } */}

          <div className="top-section">
            <div className="insights">
              <h4>Insights</h4>

              <div className="insights-holder">
                <div className="insight-item">
                  <h5 className="">Total Paid In</h5>
                  <p className="">KES: <span>{formatter.format(total[0])}</span></p>
                </div>
                <div className="insight-item">
                  <h5 className="">Total Paid Out</h5>
                  <p className="">KES: <span>{formatter.format(total[1])}</span></p>
                </div>
                <div className="insight-item">
                  <h5 className="">Total Fuliza Taken</h5>
                  <p className="">
                    KES: <span>{formatter.format(tranccostAmount[0])}</span>
                  </p>
                </div>
                <div className="insight-item">
                  <h5 className="">Fuliza Charges</h5>
                  <p className="">
                    KES: <span>{formatter.format(tranccostAmount[1])}</span>
                  </p>
                </div>
                <div className="insight-item">
                  <h5 className="">Send Money Costs</h5>
                  <p className="">
                    KES: <span>{formatter.format(tranccostAmount[2])}</span>
                  </p>
                </div>
                <div className="insight-item">
                  <h5 className="">Withdrawal Charges</h5>
                  <p className="">
                    KES: <span>{formatter.format(tranccostAmount[3])}</span>
                  </p>
                </div>
                <div className="insight-item">
                  <h5 className="">Paybill Charges</h5>
                  <p className="">
                    KES: <span>{formatter.format(lpcharges[0])}</span>
                  </p>
                </div>
                <div className="insight-item">
                  <h5 className="">Till Charges</h5>
                  <p className="">
                    KES: <span>{formatter.format(lpcharges[1])}</span>
                  </p>
                </div>
                <div className="insight-item">
                  <h5 className="">Airtime Bought</h5>
                  <p className="">
                    KES: <span>{formatter.format(airtimebought)}</span>
                  </p>
                </div>
                <div className="insight-item">
                  <h5 className="">Avg. Balance</h5>
                  <p className="">
                    KES: <span>{formatter.format(lpcharges[2])}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="outflow-graph">
              <h4 className="text-center text-info">Transaction Summary</h4>
              <div className="donut">

                <Doughnut
                  data={piedataset}
                  width={100}
                  height={100}
                  options={pieoptions}
                />
              </div>
            </div>
          </div>
          <div className="mid-section-one">
            <div className="balance-outlook">
              {onemonth &&
                <div className="outlook-container">
                  <h4 className="">Balance Outlook</h4>
                  {brokenstt && (
                    <h6 className="">
                      Your statement is less than 24 months, last 12 months are
                      considered for the chart below
                    </h6>
                  )}
                  {twoyearline && (
                    <h6 className="">
                      Looks like you have uploaded a two year statement, the graphs
                      will compare balance outlook for the two years
                    </h6>
                  )}
                  <h6 className="text-center text-warning mt-3">
                    {monthnam[0]} {miakambili[3]} - {monthnam[monthnam.length - 1]}{" "}
                    {miakambili[2]}
                  </h6>
                  <Line
                    data={linedata}
                    width={100}
                    height={50}
                    options={lineoptions}
                  />
                  {twoyearline && (
                    <>
                      <h6 className="text-center text-warning mt-3">
                        {monthnam2[0]} {miakambili[2]} -{" "}
                        {monthnam2[monthnam2.length - 1]} {miakambili[1]}
                      </h6>
                      <Line
                        data={linedata2}
                        width={100}
                        height={50}
                        options={lineoptions}
                      />
                    </>
                  )}
                </div>
              }
            </div>
            <div className="without-fuliza">
              <h5 className="">
                Transactions done without Fuliza vs Fuliza Transactions
              </h5>

              <div className="fuliza-donut">
                <Doughnut
                  data={pie2dataset}
                  width={100}
                  height={50}
                  options={pie2options}
                />
              </div>
            </div>
          </div>
          <div className="mid-section-two">
            <h4>
              Who Have You Sent Money to?
            </h4>
            <div className="sent-section">
              <div className="sent-bar-graph">
                {screenWidth &&
                  <div>
                    <h6 className="text-warning text-center text-opacity-50">⚠This chart has more data on desktop⚠</h6>
                  </div>
                }
                <Bar data={dataset} width={100} height={50} options={options} />
              </div>
            </div>
          </div>
          <div className="mid-section-three">
            <div className="till-number">
              <div className="till-section">
                <h4>
                  Which Till Number Have you paid the most?
                </h4>
                {screenWidth &&
                  <div>
                    <h6 className="text-warning text-center text-opacity-50">⚠This chart has more data on desktop⚠</h6>
                  </div>
                }
                <div className="till-bar">
                  <Bar
                    data={dataset2}
                    width={10}
                    height={50}
                    options={bar2options}
                  />
                </div>
              </div>
            </div>
            <div className="paybill-number">
              <div className="paybill-section">
                <h4>
                  Which Pay Bill Number Have you paid the most?
                </h4>
                {screenWidth &&
                  <div>
                    <h6 className="text-warning text-center text-opacity-50">⚠This chart has more data on desktop⚠</h6>
                  </div>
                }
                <div className="paybill-bar">
                  <Bar
                    data={dataset3}
                    width={60}
                    height={50}
                    options={bar3options}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-section">
            <h4>Who has sent you money</h4>
            <div className="transfer-donuts">

              <div className="personal-accounts">
                <h4>Mobile Transfer</h4>
                <div className="personal-donut">
                  <Doughnut
                    data={pie3dataset}
                    options={pie3options}
                    width={100}
                    height={50}
                  />
                </div>
              </div>
              <div className="bank-accounts">
                <h4>Bank Transfer</h4>
                <div className="bank-donut">
                  <Doughnut
                    data={pie4dataset}
                    width={100}
                    height={50}
                    options={pie3options}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="nkt col-12 col-sm-8 col-md-8 p-5">
            <div className="mawe">
              <div className="wolan mb-4">
                <h4 className="text-center text-info">
                  Who Have You Sent Money to?
                </h4>
                {screenWidth &&
                  <div>
                    <h6 className="text-warning text-center text-opacity-50">⚠This chart has more data on desktop⚠</h6>
                  </div>
                }
                <Bar data={dataset} width={100} height={50} options={options} />
              </div>
              <div className="wolan mb-4">
                <h4 className="text-center text-info">
                  Which Till Number Have you paid the most?
                </h4>
                {screenWidth &&
                  <div>
                    <h6 className="text-warning text-center text-opacity-50">⚠This chart has more data on desktop⚠</h6>
                  </div>
                }
                <Bar
                  data={dataset2}
                  width={100}
                  height={50}
                  options={bar2options}
                />
              </div>
              <div className="wolani mb-5">
                <h4 className="text-center text-info">
                  Which Pay Bill Number Have you paid the most?
                </h4>
                {screenWidth &&
                  <div>
                    <h6 className="text-warning text-center text-opacity-50">⚠This chart has more data on desktop⚠</h6>
                  </div>
                }
                <Bar
                  data={dataset3}
                  width={100}
                  height={50}
                  options={bar3options}
                />
              </div>
              <h4 className="text-center text-info">Who has sent you money</h4>
              <div className="sasa">

                <Doughnut
                  data={pie3dataset}
                  options={pie3options}
                  width={100}
                  height={50}
                />
                <Doughnut
                  data={pie4dataset}
                  width={100}
                  height={50}
                  options={pie3options}
                />
              </div>
            </div>
            {onemonth && <div className="manze mt-4">
              <h4 className="text-center text-info">Balance Outlook</h4>
              {brokenstt && (
                <h6 className="text-center">
                  Your statement is less than 24 months, last 12 months are
                  considered for the chart below
                </h6>
              )}
              {twoyearline && (
                <h6 className="text-center">
                  Looks like you have uploaded a two year statement, the graphs
                  will compare balance outlook for the two years
                </h6>
              )}
              <h6 className="text-center text-warning mt-3">
                {monthnam[0]} {miakambili[3]} - {monthnam[monthnam.length - 1]}{" "}
                {miakambili[2]}
              </h6>
              <Line
                data={linedata}
                width={100}
                height={50}
                options={lineoptions}
              />
              {twoyearline && (
                <>
                  <h6 className="text-center text-warning mt-3">
                    {monthnam2[0]} {miakambili[2]} -{" "}
                    {monthnam2[monthnam2.length - 1]} {miakambili[1]}
                  </h6>
                  <Line
                    data={linedata2}
                    width={100}
                    height={50}
                    options={lineoptions}
                  />
                </>
              )}
            </div>}
          </div> */}

          {/* <div className="mavitu container col-5 col-md-4"> */}
          {/* <h4 className="text-center text-info mt-3">Insights</h4>

            <div className="row d-flex flex-wrap justify-content-evenly">
              <div className="card text-white bg-dark mb-3 me-3 mt-3 p-1 col-5 rounded-pill">
                <div className="card-body">
                  <h5 className="card-title">Total Paid In</h5>
                  <p className="card-text-st">KES: {formatter.format(total[0])}</p>
                </div>
              </div>
              <div className="card text-white bg-dark mb-3 me-3 mt-3 p-1 col-5 rounded-pill">
                <div className="card-body">
                  <h5 className="card-title">Total Paid Out</h5>
                  <p className="card-text-st">KES: {formatter.format(total[1])}</p>
                </div>
              </div>
              <div className="card text-white bg-dark mb-3 me-3 mt-3 p-1 col-5 rounded-pill">
                <div className="card-body">
                  <h5 className="card-title">Total Fuliza Taken</h5>
                  <p className="card-text-st">
                    KES: {formatter.format(tranccostAmount[0])}
                  </p>
                </div>
              </div>
              <div className="card text-white bg-dark mb-3 me-3 mt-3 p-1 col-5 rounded-pill">
                <div className="card-body">
                  <h5 className="card-title">Fuliza Charges</h5>
                  <p className="card-text-st">
                    KES: {formatter.format(tranccostAmount[1])}
                  </p>
                </div>
              </div>
              <div className="card text-white bg-dark mb-3 me-3 mt-3 p-1 col-5 rounded-pill">
                <div className="card-body">
                  <h5 className="card-title">Send Money Costs</h5>
                  <p className="card-text-st">
                    KES: {formatter.format(tranccostAmount[2])}
                  </p>
                </div>
              </div>
              <div className="card text-white bg-dark mb-3 me-3 mt-3 p-1 col-5 rounded-pill">
                <div className="card-body">
                  <h5 className="card-title">Withdrawal Charges</h5>
                  <p className="card-text-st">
                    KES: {formatter.format(tranccostAmount[3])}
                  </p>
                </div>
              </div>
              <div className="card text-white bg-dark mb-3 me-3 mt-3 p-1 col-5 rounded-pill">
                <div className="card-body">
                  <h5 className="card-title">Paybill Charges</h5>
                  <p className="card-text-st">
                    KES: {formatter.format(lpcharges[0])}
                  </p>
                </div>
              </div>
              <div className="card text-white bg-dark mb-3 me-3 mt-3 p-1 col-5 rounded-pill">
                <div className="card-body">
                  <h5 className="card-title">Till Charges</h5>
                  <p className="card-text-st">
                    KES: {formatter.format(lpcharges[1])}
                  </p>
                </div>
              </div>
              <div className="card text-white bg-dark mb-3 me-3 mt-3 p-1 col-5 rounded-pill">
                <div className="card-body">
                  <h5 className="card-title">Airtime Bought</h5>
                  <p className="card-text-st">
                    KES: {formatter.format(airtimebought)}
                  </p>
                </div>
              </div>
              <div className="card text-white bg-dark mb-3 me-3 mt-3 p-1 col-5 rounded-pill">
                <div className="card-body">
                  <h5 className="card-title">Avg. Balance</h5>
                  <p className="card-text-st">
                    KES: {formatter.format(lpcharges[2])}
                  </p>
                </div>
              </div>
            </div> */}

          {/* <div className="donut h-25 mt-3 mb-5">
              <h4 className="text-center text-info">Transaction Summary</h4>

              <Doughnut
                data={piedataset}
                width={100}
                height={50}
                options={pieoptions}
              />
            </div> */}
          {/* <div className="donut h-25 mt-3">
              <h5 className="text-center text-info">
                Transactions done without Fuliza vs Fuliza Transactions
              </h5>

              <Doughnut
                data={pie2dataset}
                width={100}
                height={50}
                options={pie2options}
              />
            </div> */}
        </div>
        // </div>
      }
    </div>
  );
};

export default Statement;
