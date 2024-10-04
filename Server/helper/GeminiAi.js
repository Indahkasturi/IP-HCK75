const { GoogleGenerativeAI } = require("@google/generative-ai");

const gemini = async (album1, album2)=>{
const genAI = new GoogleGenerativeAI('AIzaSyAYsy61DInnskz7W5djhX3gaCiSG1LshsU');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Write a story about a magic backpack.";

const result = await model.generateContent(prompt);
console.log(result.response.text());
}


module.exports= gemini
