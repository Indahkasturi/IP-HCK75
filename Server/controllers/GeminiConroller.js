const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

class GeminiController {

  static async gemini(req, res, next) {
      try {
      const { prompt } = req.body;
      console.log(prompt);

      const checkPrompt = await model.generateContent(
        `Apakah pertanyaan berikut hanya tentang musik/lagu? Jawab "YA" atau "TIDAK": ${prompt}`
      );
      const answer = (await checkPrompt.response.text()).trim().toUpperCase();

      if (answer !== "YA") {
        return res.json({ result: "Maaf, saya hanya bisa menjawab pertanyaan tentang musik atau lagu." });
      }

      const result = await model.generateContent(prompt)
      let text = await result.response.text();
      text = text.replace(/\* /g, '- ');
      text = text.replace(/\. /g, '.\n');
      // console.log(text, "ini <<<<<<<<<<<<<<");
      res.json({ result: text });

    } catch (error) {
      next(error);
    }
  }
}
module.exports = GeminiController;