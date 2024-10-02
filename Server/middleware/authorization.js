// async function authorization(req, res, next) {
//   try {
//     const { role } = req.user;
//     if (role === "admin") {
//       next();
//     } else {
//       const { id } = req.params;
//       const userId = req.user.id;
//       if(id !== userId){
//         throw { name: "Forbidden", message: "You are not authorized" };
//       }
//       next();
//     }
//   } catch (error) {
//     next(error);
//   }
// }

  async function isAdmin(req, res, next) {
    try {
      const { role } = req.user;
      if (role !== "admin") {
        throw { name: "Forbidden", message: "You are not authorized" };
    }
      next();
    } catch (error) {
      next(error);
    }
  };

module.exports = { authorization, isAdmin };