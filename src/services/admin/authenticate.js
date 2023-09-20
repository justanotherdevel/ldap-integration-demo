import connectDB from "@/app/middleware/mongodb";
import Admin from "../../app/model/admins";

const adminLoginHandler = async (req, _res) => {
  try {
    const { username, password } = req;
    const user = await Admin.findOne({ username: username });
    if (user) {
      const isAuth = await user.matchPassword(password);
      if (isAuth) {
        return user;
      } else {
        return { msg: "Invalid username or password" };
      }
    }
    return null;
  } catch (error) {
    console.log("adminLoginHandler", error.message.toString());
  }
};

// const registerAdminHandler = async (req, res) => {
//   try {
//     const { username, name, password } = req;
//     console.log(password);
//     const user = new Admin({
//       username: username,
//       password: password,
//       name: name,
//     });
//     const newuser = await user.save();
//     console.log("Entering registerAdminHandler");
//     return newuser;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

export const adminLogin = connectDB(adminLoginHandler);
// export const registerAdmin = connectDB(registerAdminHandler);
