


function slopeAngle(s1,s2) {
    if (arguments.length !== 2) {
      throw new TypeError('Need 2 arrays with x,y');
    }
    var result = Math.atan((s2[1] - s1[1]) / (s2[0] - s1[0])) * 180/Math.PI;
    if (result < 0) {
      return 180 - Math.abs(result);
    }
    return result;
  }
const data = []
for (let i = 0; i < 1000; i++) {
    const start = performance.now()
    //this so the js cant optimize the code webkit eat ass
    var result = Math.atan((Math.random()-Math.random())/(Math.random()-Math.random()))*180/3.1459
    if (result<0) {180-Math.abs(result);}
    //end code 
    console.log(performance.now() - start)
}