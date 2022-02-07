const Modbus = require("jsmodbus");
const net = require("net");
const socket = new net.Socket();

const {
  POND_1_COLLECTION,
  POND_2_COLLECTION,
  POND_3_COLLECTION,
  POND_4_COLLECTION,
  POND_5_COLLECTION,
  POND_6_COLLECTION,
  POND_7_COLLECTION,
  POND_8_COLLECTION,
  POND_9_COLLECTION,
  POND_10_COLLECTION,
} = require("./models/pond");

const options = {
  host: "192.168.50.30",
  port: "513",
};
const dbConnect = require("./utils/dbConnection");

let DT100,
  DT200,
  DT300;

const client = new Modbus.client.TCP(socket);



socket.on("connect", function () {
  async function getData() {
    for (let i = 1; i < 4; i++) {
      await client
        .readHoldingRegisters(100 * i, 100)
        .then((resp) => {
          if (i === 1) {
            DT100 = resp.response._body.valuesAsBuffer;
          
          }
          if (i === 2) {
            DT200 = resp.response._body.valuesAsBuffer;
           
          }
          if (i === 3) {
            DT300 = resp.response._body.valuesAsBuffer;
        
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    await dbConnect();

    POND_1_COLLECTION.create({
      DO: DT100.readInt16BE(0),
      S: DT100.readFloatBE(6),
      TEMP: DT100.readFloatBE(10),
      ORP: DT100.readFloatBE(14),
      PH: DT100.readFloatBE(18),
      WL: DT100.readFloatBE(22),
      IO: DT100.readInt16BE(24),
    });

    POND_2_COLLECTION.create({
      DO: DT200.readInt16BE(0),
      S: DT200.readFloatBE(6),
      TEMP: DT200.readFloatBE(10),
      ORP: DT200.readFloatBE(14),
      PH: DT200.readFloatBE(18),
      WL: DT200.readFloatBE(22),
      IO: DT200.readInt16BE(24),
    });
    POND_3_COLLECTION.create({
      DO: DT200.readInt16BE(40),
      S: DT200.readFloatBE(46),
      TEMP: DT200.readFloatBE(50),
      ORP: DT200.readFloatBE(54),
      PH: DT200.readFloatBE(58),
      WL: DT200.readFloatBE(62),
      IO: DT200.readInt16BE(64),
    });
    POND_4_COLLECTION.create({
      DO: DT200.readInt16BE(80),
      S: DT200.readFloatBE(86),
      TEMP: DT200.readFloatBE(90),
      ORP: DT200.readFloatBE(94),
      PH: DT200.readFloatBE(98),
      WL: DT200.readFloatBE(102),
      IO: DT200.readInt16BE(104),
    });
    POND_5_COLLECTION.create({
      DO: DT200.readInt16BE(120),
      S: DT200.readFloatBE(126),
      TEMP: DT200.readFloatBE(130),
      ORP: DT200.readFloatBE(134),
      PH: DT200.readFloatBE(138),
      WL: DT200.readFloatBE(142),
      IO: DT200.readInt16BE(144),
    });
    POND_6_COLLECTION.create({
      DO: DT200.readInt16BE(160),
      S: DT200.readFloatBE(166),
      TEMP: DT200.readFloatBE(170),
      ORP: DT200.readFloatBE(174),
      PH: DT200.readFloatBE(178),
      WL: DT200.readFloatBE(182),
      IO: DT200.readInt16BE(184),
    });
    POND_7_COLLECTION.create({
      DO: DT300.readInt16BE(0),
      S: DT300.readFloatBE(6),
      TEMP: DT300.readFloatBE(10),
      ORP: DT300.readFloatBE(14),
      PH: DT300.readFloatBE(18),
      WL: DT300.readFloatBE(22),
      IO: DT300.readInt16BE(24),
    });
    POND_8_COLLECTION.create({
      DO: DT300.readInt16BE(40),
      S: DT300.readFloatBE(46),
      TEMP: DT300.readFloatBE(50),
      ORP: DT300.readFloatBE(54),
      PH: DT300.readFloatBE(58),
      WL: DT300.readFloatBE(62),
      IO: DT300.readInt16BE(64),
    });
    POND_9_COLLECTION.create({
      DO: DT300.readInt16BE(80),
      S: DT300.readFloatBE(86),
      TEMP: DT300.readFloatBE(90),
      ORP: DT300.readFloatBE(94),
      PH: DT300.readFloatBE(98),
      WL: DT300.readFloatBE(102),
      IO: DT300.readInt16BE(104),
    });
    POND_10_COLLECTION.create({
      DO: DT300.readInt16BE(120),
      S: DT300.readFloatBE(126),
      TEMP: DT300.readFloatBE(130),
      ORP: DT300.readFloatBE(134),
      PH: DT300.readFloatBE(138),
      WL: DT300.readFloatBE(142),
      IO: DT300.readInt16BE(144),
    });
    console.log(`Data success inert at ${Date(Date.now())}`)
  }
  console.log("-------------------------- START INSERT TO DATABASE ... ... ---------------------------------");

  setInterval(getData, 2000);
});

socket.on("error", console.error);
socket.connect(options);
