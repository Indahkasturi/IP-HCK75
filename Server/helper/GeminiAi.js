const { GoogleGenerativeAI } = require("@google/generative-ai");


const gemini = async (album1, album2)=>{
const genAI = new GoogleGenerativeAI('AIzaSyAYsy61DInnskz7W5djhX3gaCiSG1LshsU');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = `please give me name for today  popular album`

const result = await model.generateContent(prompt);
const response = await result.response
let text = response.text()

response.status(200).json(data)
}


module.exports= gemini
