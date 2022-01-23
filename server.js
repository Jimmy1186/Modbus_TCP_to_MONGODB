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
  host: "127.0.0.1",
  port: 502,
};
const dbConnect = require("./utils/dbConnection");

let DT100,
  DT200,
  DT300,
  POND_1,
  POND_2,
  POND_3,
  POND_4,
  POND_5,
  POND_6,
  POND_7,
  POND_8,
  POND_9,
  POND_10;
const client = new Modbus.client.TCP(socket);

socket.on("connect", function () {
  async function getData() {
    for (let i = 1; i < 4; i++) {
      client
        .readHoldingRegisters(100 * i, 100)
        .then((resp) => {
          DT_ARRAY = resp.response._body.valuesAsArray;
          if (i === 1) DT100 = DT_ARRAY;
          if (i === 2) DT200 = DT_ARRAY;
          if (i === 3) DT300 = DT_ARRAY;

          
        })
        .catch((err) => {
          console.log(err);
        });
    }

    //   ----DT100-----
    POND_1 = DT100.slice(0, 14);

    //   ----DT200-----
    POND_2 = DT200.slice(0, 14);
    POND_3 = DT200.slice(20, 34);
    POND_4 = DT200.slice(40, 54);
    POND_5 = DT200.slice(60, 74);
    // ----DT300-----
    POND_7 = DT300.slice(0, 14);
    POND_8 = DT300.slice(20, 34);
    POND_9 = DT300.slice(40, 54);
    POND_10 = DT300.slice(60, 74);

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
    

    POND_2_COLLECTION.create({
      DO: POND_2[0],
      S: POND_2[2],
      TEMP: POND_2[4],
      ORP: POND_2[6],
      PH: POND_2[8],
      WL: POND_2[10],
      IO: POND_2[12],
    });
    POND_3_COLLECTION.create({
      DO: POND_3[0],
      S: POND_3[2],
      TEMP: POND_3[4],
      ORP: POND_3[6],
      PH: POND_3[8],
      WL: POND_3[10],
      IO: POND_3[12],
    });
    POND_4_COLLECTION.create({
      DO: POND_4[0],
      S: POND_4[2],
      TEMP: POND_4[4],
      ORP: POND_4[6],
      PH: POND_4[8],
      WL: POND_4[10],
      IO: POND_4[12],
    });
    POND_5_COLLECTION.create({
      DO: POND_5[0],
      S: POND_5[2],
      TEMP: POND_5[4],
      ORP: POND_5[6],
      PH: POND_5[8],
      WL: POND_5[10],
      IO: POND_5[12],
    });
    POND_6_COLLECTION.create({
      DO: POND_6[0],
      S: POND_6[2],
      TEMP: POND_6[4],
      ORP: POND_6[6],
      PH: POND_6[8],
      WL: POND_6[10],
      IO: POND_6[12],
    });
    POND_7_COLLECTION.create({
      DO: POND_7[0],
      S: POND_7[2],
      TEMP: POND_7[4],
      ORP: POND_7[6],
      PH: POND_7[8],
      WL: POND_7[10],
      IO: POND_7[12],
    });
    POND_8_COLLECTION.create({
      DO: POND_8[0],
      S: POND_8[2],
      TEMP: POND_8[4],
      ORP: POND_8[6],
      PH: POND_8[8],
      WL: POND_8[10],
      IO: POND_8[12],
    });
    POND_9_COLLECTION.create({
      DO: POND_9[0],
      S: POND_9[2],
      TEMP: POND_9[4],
      ORP: POND_9[6],
      PH: POND_9[8],
      WL: POND_9[10],
      IO: POND_9[12],
    });
    POND_10_COLLECTION.create({
      DO: POND_10[0],
      S: POND_10[2],
      TEMP: POND_10[4],
      ORP: POND_10[6],
      PH: POND_10[8],
      WL: POND_10[10],
      IO: POND_10[12],
    });
  }
  console.log(`寫入完成`);
  setInterval(getData, 2000);
});

socket.on("error", console.error);
socket.connect(options);
