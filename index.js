const express = require("express");
const app = express();
const getRoutes = require("./routes/getRoutes");
// const ngrok = require("ngrok");

// (async function () {   
//     const url = await ngrok.connect({
//         proto: "http",
//         addr: PORT,
//         authtoken: "1t2y3u4i5o6p7a8s9d0f",
//     });
//     console.log(url);
// })();

const PORT = 3001;

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", getRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
