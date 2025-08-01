import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiRsponse } from "../utils/ApiResponse.js"



const registerUser = asyncHandler(async (req, res) => {
 
//    res.status(200).json({

//         message: "Hii Lucky"
// })
  


  //get user data from frontend
//validation - not empty
// check if user already exists: username, email, phone
// check for image, check for avatar
// upload them to cloudinary, avator
// create user object - create entry in db
// remove password and refresh token field from response
// check for user creation
// return response
    

    const { fullname, email, username,password} = req.body
    console.log("email: ", email);

    if(
        [fullname, email, username, password].some((field) => field?.trim() === "")

    ){
         throw new ApiError(400, "All fields are required")
    }

    User.findOne({
       $or: [{username}, {email}]
      })

      if (existedUser)  {
        throw new ApiError(400, "User with email or Username already exists")
      }

      const avatarLocalPath = req.files?.avatar[0]?.path;
      const coverImageLocalPath = req.files?.coverImage[0]?.path;


      if(avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
      }

    const avatar =  await uploadOnCloudinary(avatarLocalPath)
    const coverImage =  await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar) {
      throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
      fullname,
      avatar: avatar.url,
      coverImage:coverImage?.url || "",
      email,
      password,
      username:username.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"))
    
})


export {
    registerUser
}

//     const { fullname, email, username,password} = req.body
//     console.log("fullname: ", fullname);
// })

//get user data from frontend
//validation - not empty
// check if user already exists: username, email, phone
// check for image, check for avatar
// upload them to cloudinary, avator
// create user object - create entry in db
// remove password and refresh token field from response
// check for user creation
// return response

