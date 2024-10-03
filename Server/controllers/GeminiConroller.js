const axios = require('axios');


const API_KEY = 'AIzaSyAYsy61DInnskz7W5djhX3gaCiSG1LshsU';

module.exports = class GeminiController {
static async generateContent(req, res, next) {
  try {

    const inputText = req.body.text;
    
    const data = {
      contents: [
        {
          parts: [
            { text: inputText }
          ]
        }
      ]
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    res.status(200).json(response.data);

  } catch (error) {
   next(error)
  }
};
}
