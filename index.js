const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to my application." });
// });

const tutorialRoutes = require("./routes/tutorial_routes.js");
const tingkatan = require("./routes/tingkatan_routes.js");
const admin = require("./routes/admin_routes.js");
const guru = require("./routes/guru_routes.js");
const kelas = require("./routes/kelas_routes.js");
const jadwal_pembelajaran = require("./routes/jadwal_pembelajaran_routes.js");
const murid = require("./routes/murid_routes.js");
const kelas_foto = require("./routes/kelas_foto_routes.js");
const pendaftaran = require("./routes/pendaftaran_routes.js");
const ruangan = require("./routes/ruangan_routes.js");
const ujian = require("./routes/ujian_routes.js");

app.use("/assets", express.static("public/images"));
app.use("/tutorial", tutorialRoutes);
app.use("/tingkatan", tingkatan);
app.use("/admin", admin);
app.use("/guru", guru);
app.use("/jadwal_pembelajaran", jadwal_pembelajaran);
app.use("/kelas", kelas);
app.use("/murid", murid);
app.use("/kelas_foto", kelas_foto);
app.use("/ujian", ujian);
app.use("/pendaftaran", pendaftaran);
app.use("/ruangan", ruangan);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
