const Modbus = require("jsmodbus");
const net = require("net");
const socket = new net.Socket();
const {POND_1_COLLECTION} = require("./models/pond");

const options = {
  host: "127.0.0.1",
  port: 502,
};
const dbConnect = require("./utils/dbConnection");

let DT= []
const client = new Modbus.client.TCP(socket);

socket.on("connect", function () {
  let getData = async () => {
    
      await client
        .readHoldingRegisters(0 , 50)  //DT0 TO DT50 , MORE information go to read jsmodbus
        .then((resp) => {
            DT = resp.response._body.valuesAsArray;
        })
        .catch((err) => {
          console.log(err);
        });
    
    console.log("opening Database");
    await dbConnect();
    POND_1_COLLECTION.create({
      DO: DT[0],
      S: DT[2],
      TEMP: DT[4],
      ORP: DT[6],
      PH: DT[8],
      WL: DT[10],
      IO: DT[12],
    });
   
    console.log(`Data success inert at ${Date(Date.now())}`)
  };
  console.log("-------------------------- START INSERT TO DATABASE ... ... ---------------------------------");
  setInterval(getData, 2000);//insert data every 2sec
});

socket.on("error", console.error);
socket.connect(options);