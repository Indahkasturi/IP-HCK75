const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

class GeminiController {
  static async gemini(req, res, next) {
    try {
      const { prompt } = req.body;
      console.log(prompt);

      const result = await model.generateContent(prompt)

      res.send(result.response.text());
    } catch (error) {
      next(error);
    }
  }
}
module.exports = GeminiController;