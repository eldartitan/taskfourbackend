const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://myadmin:root@cluster0.rikqx0b.mongodb.net/taskfour?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("error in connection");
    } else {
      console.log("mongodb is connected");
    }
  }
);