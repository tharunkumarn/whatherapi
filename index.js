import express from "express";
import ejs from "ejs";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port =3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
var search_value = "Bangalore"
app.use("/",async(req,res)=>{
   const city = req.body.city || "Anantapur";


   try {
     const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=97ed86b99fdcf738c7a080e0fa9fde20&units=metric`);
     const result = response.data;
     console.log(result);

     res.render("index.ejs", { result: result });
   } catch (error) {
     console.log(error.response.data);
     res.status(500).send("Error fetching weather data");
   }

});
// Handle form submission and fetch weather for the entered city
// app.post("/", async(req, res) => {
//    const city = req.body.city || "Anantapur";
  
//    try {
//      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=97ed86b99fdcf738c7a080e0fa9fde20&units=metric`);
//      const result = response.data;
   
//      res.render("index", { result: results });
//    } catch (error) {
//      console.log(error.response.data);
//      res.status(500).send("Error fetching weather data");
//    }
//  });

app.listen(port,()=>{
   console.log(`The server port Number Running on ${port}`);
});