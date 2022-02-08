const Modbus = require("jsmodbus");
const net = require("net");
const socket = new net.Socket();

const { POND_8_COLLECTION,POND_9_COLLECTION ,POND_10_COLLECTION } = require("./models/pond");

const options = {
  host: "127.0.0.1",
  port: 502,
};
const dbConnect = require("./utils/dbConnection");

let DT100;

const client = new Modbus.client.TCP(socket);

socket.on("connect", function () {
  let getData = async () => {
    for (let i = 1; i < 4; i++) {
      await client
        .readHoldingRegisters(1 * i, 14)
        .then((resp) => {
          if (i === 1) {
            DT100 = resp.response._body.valuesAsBuffer;
            // POND_1 = DT100.slice(0, 14);
            // POND_1 = DT100.readInt16BE(0)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // console.log(
    //   DT100.readInt16BE(0),
    //   DT100.readFloatBE(6),
    //   DT100.readFloatBE(10),
    //   DT100.readFloatBE(14),
    //   DT100.readFloatBE(18),
    //   DT100.readFloatBE(22),
    //   DT100.readInt16BE(24),
    // );


    await dbConnect();
    POND_8_COLLECTION.create({
      DO: DT100.readInt16BE(0),
      S: DT100.readInt16BE(1),
      TEMP: DT100.readInt16BE(2),
      ORP: DT100.readInt16BE(3),
      PH: DT100.readInt16BE(4),
      WL: DT100.readInt16BE(5),
      IO: DT100.readInt16BE(6),
    });
    POND_9_COLLECTION.create({
      DO: DT100.readInt16BE(0),
      S: DT100.readInt16BE(1),
      TEMP: DT100.readInt16BE(2),
      ORP: DT100.readInt16BE(3),
      PH: DT100.readInt16BE(4),
      WL: DT100.readInt16BE(5),
      IO: DT100.readInt16BE(6),
    });
    POND_10_COLLECTION.create({
      DO: DT100.readInt16BE(0),
      S: DT100.readInt16BE(1),
      TEMP: DT100.readInt16BE(2),
      ORP: DT100.readInt16BE(3),
      PH: DT100.readInt16BE(4),
      WL: DT100.readInt16BE(5),
      IO: DT100.readInt16BE(6),
    });
  };

  setInterval(getData, 5000);
});

socket.on("error", console.error);
socket.connect(options);
