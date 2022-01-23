const Modbus = require("jsmodbus");
const net = require("net");
const socket = new net.Socket();

const {
  POND_1_COLLECTION,

} = require("./models/pond");

const options = {
  host: "127.0.0.1",
  port: 502,
};
const dbConnect = require("./utils/dbConnection");

let DT100 = [],
  POND_1,
const client = new Modbus.client.TCP(socket);

socket.on("connect", function () {
  let getData = async () => {
    for (let i = 1; i < 4; i++) {
      await client
        .readHoldingRegisters(1 * i, 50)
        .then((resp) => {
          if (i === 1) {
            DT100 = resp.response._body.valuesAsArray;
            POND_1 = DT100.slice(0, 14);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log("opening Database");
    await dbConnect();
    POND_1_COLLECTION.create({
      DO: POND_1[0],
      S: POND_1[2],
      TEMP: POND_1[4],
      ORP: POND_1[6],
      PH: POND_1[8],
      WL: POND_1[10],
      IO: POND_1[12],
    });
    console.log("insert success");
  };

  setInterval(getData, 2000);
});

socket.on("error", console.error);
socket.connect(options);
