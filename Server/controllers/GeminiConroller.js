const gemini = require("../helper/GeminiAi");


const API_KEY = 'AIzaSyAYsy61DInnskz7W5djhX3gaCiSG1LshsU';


module.exports = class GeminiController {
static async generateContent(req, res, next) {
  try {
      const {album1, album2} = req.body
      let data = await gemini(album1, album2)
   
    res.status(200).json(response.data);

  } catch (error) {
   next(error)
  }
};
}
