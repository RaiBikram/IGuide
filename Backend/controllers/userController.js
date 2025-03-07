import { UserModel } from "./../models/UserMode.js";
import { uploadPicture } from "./../middlewares/uploadPictures.js";
// import { fileRemover } from "../utils/fileRemover.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { json } from "stream/consumers";

// @des user login
// @access all
// @route api/users/register
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    let user = await UserModel.findOne({ email });
    // if (email) {
    //   user = await UserModel.findOne({ email });
    // } else if (phoneNo) {
    //   user = await UserModel.findOne({ phoneNo });
    // }

    if (user) {
      return res.status(400).json({
        message: "User already exists with the provided email!",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS || 10)
    );

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = JWT.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // console.log("signup")
    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      token,
    });
  } catch (error) {
    next(error);
  }
};

// @desc login registered user
// @access all
// @router api/users/login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required to login.",
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Password is required to login.",
      });
    }

    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Invalid credentials. Please try again.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials. Please try again.",
      });
    }

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "User logged in successfully!",
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        id:user._id,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc user profile
// @access loggedUser,
// @route api/users/profile
export const getUserProfile = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    const user = await UserModel.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      _id: user?._id.toString(),
      name: user?.name,
      email: user?.email,
      phoneNo: user.phone,
      profile: user?.profilePicture,
      verified: user?.verified,
      role: user?.role,
      success: true,
      // user
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// @desc upload profile picture
// @access loggedUser
// @route api/users/upload-profile
export const uploadProfilePicture = async (req, res, next) => {
  try {
    const upload = uploadPicture.single("profilePicture");
    upload(req, res, async function (err) {
      if (err) {
        throw new Error(
          "An unknown error occurred when uploading " + err.message
        );
      } else {
        if (req.file) {
          let filename;
          let updatedUser = await UserModel.findById(req.user._id);
          filename = updatedUser.profilePicture;
          if (filename) {
            fileRemover(filename);
          }
          updatedUser.profilePicture = req.file.filename;
          await updatedUser.save();
          return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully!",
          });
        } else {
          let filename;
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.profilePicture;
          updatedUser.profilePicture = "";
          await updatedUser.save();
          fileRemover(filename);
          res.json({
            success: true,
            _id: updatedUser._id,
            avatar: updatedUser.profilePicture,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc become a guide request
// @access normal user
// @route api/users/guide-request
export const becomeAGuideRequest = async (req, res, next) => {
  try {
    // check if user exist or not
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found!", success: false });
    }

    // check if user is verified or not
    if (!user.verified) {
      return res.status(400).json({
        message:
          "You are not verified, please upload your documents to be verified!",
      });
    }

    //check if user is already a guide?
    if (user.role === "guide") {
      return res
        .status(400)
        .json({ message: "You make this request. You are already a guide!" });
    }

    //check if user has already request to become guide
    if (user.becomeAGuide) {
      return res
        .status(400)
        .json({ message: "You have already requested to become a guide!" });
    }
    user.becomeAGuide = true;
    await user.save();

    return res.status(200).json({
      message: "Guide request submitted successfully!",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// @desc approve guide request
// @access admins only
// @route api/users/approve-guide-request/:id
export const approveGuideRequest = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found!", success: false });
    }

    if (!user.verified) {
      return res.status(400).json({
        message: "User is not verified! User must be verified!",
        success: false,
      });
    }

    //check if user has uploaded any documents
    if (!user.documents) {
      return res.status(400).json({
        message: "Requested user has not uploaded any documents!",
        success: false,
      });
    }

    //check if user has requested to become a guide or not
    if (!user.becomeAGuide) {
      return res.status(400).json({
        message: "User has not requested to become a guide!",
        success: false,
      });
    }
    // alter roles
    user.role = "guide";
    user.becomeAGuide = false;
    await user.save();

    return res
      .status(200)
      .json({ message: "Guide approved successfully!", success: true });
  } catch (error) {
    next(error);
  }
};

// @desc revoke guide permission
// @access admins only
// @route api/users/revoke-guide-permission
export const revokeGuidePermission = async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    return res.status(400).json({ message: "User not found!" });
  }
  user.becomeAGuide = false;
  user.verified = false;
  user.role = "normal";

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Guide permission revoked successfully!",
  });
};

//@desc get guide verification request
// @access admins only
// @route api/users/get-guide-verification

export const getGuideVerificationRequest = async (req, res, next) => {
  const user = await UserModel.find({ becomeAGuide: true }).select("-password");
  if (!user) {
    return res.status(400).json({ message: "No user found!", success: false });
  }
  return res
    .status(200)
    .json({ user, message: "Guide requests!", success: true });
};

// @desc getVerifiedGuides
// @access all
// @route api/users/get-verified-guides
export const verifiedGuide = async (req, res, next) => {
  try {
    const verifiedGuides = await UserModel.find({
      verified: true,
      role: "guide",
    }).select("-password");
    return res.status(200).json({ message: "Verified guides", verifiedGuides });
  } catch (error) {
    next(error);
  }
};

// @desc upload user documents
// @access logged users
// @ api/users/upload-user-documents

export const uploadUserDocuments = async (req, res, next) => {
  try {
    const upload = uploadPicture.array("userDocuments", 3);

    upload(req, res, async function (err) {
      if (err) {
        throw new Error("An unknown error occurred when uploading" + err);
      } else {
        if (req.files && req.files.length > 0) {
          let updatedUser = await UserModel.findById(req.user._id);

          //delete old documents
          if (updatedUser.documents && updatedUser.documents.length > 0) {
            updatedUser.documents.forEach((filename) => {
              fileRemover(filename);
            });
          }

          //upload new documents
          updatedUser.documents = req.files.map((file) => file.filename);
          updatedUser.verified = true;
          updatedUser.becomeAGuide = true;
          await updatedUser.save();

          // json web token
          const token = JWT.sign(
            {
              id: updatedUser._id,
              name: updatedUser.name,
              email: updatedUser.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );

          res.status(200).json({
            userId: updatedUser._id,
            email: updatedUser.email,
            name: updatedUser.name,
            phoneNo: updatedUser.phoneNo,
            verified: updatedUser.verified,
            role: updatedUser.role,
            token,
          });
        } else {
          return res.status(400).json({ message: "No files were uploaded!" });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc release guide
// @access users who booked guide
// @route api/users/release-guide

export const releaseGuide = async (req, res, next) => {
  try {
    const { guideId } = req.body;
    const user = await UserModel.findById(req.user._id);
    const guide = await UserModel.findById(guideId);

    if (!guide) {
      return res.status(404).json({ message: "Guide does not exist" });
    }

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Ensure the user actually reserved this guide before resetting
    const userReservedThisGuide = user.reservations.some(
      (reservation) => reservation.guide.toString() === guideId
    );

    if (!userReservedThisGuide) {
      return res
        .status(400)
        .json({ message: "You have not reserved this guide" });
    }

    // Reset reservation status and clear reservations
    guide.reservationStatus = false;
    guide.reservations = [];
    user.reservations = [];

    await guide.save();
    await user.save();

    return res.status(200).json({
      message: "Guide reservation status updated to available",
    });
  } catch (error) {
    next(error);
  }
};

// @desc shows users who booked guide
// @access admin
// @route api/users/booked-users
export const bookedUsers = async (req, res, next) => {
  try {
    // Find the user based on the ID in the request (ensure this user is a guide)
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    // Check if the user is a guide
    if (user.role !== "guide") {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this resource." });
    }
    // Fetch the user's reservations (booked customers)
    const customers = user.reservation;
    // If the user has no reservations
    if (customers.length === 0) {
      return res.status(200).json({ message: "No customers booked yet." });
    }
    // Return the booked customers (reservations)
    return res.status(200).json({ message: "Your customers!", customers });
  } catch (error) {
    // Handle any errors and pass them to the error handling middleware
    next(error);
  }
};

// @desc book guide, it calculates cost for the trip, profit for the company, tds reduction,
// @access verified users
// @route api/users/book-guide
export const bookGuide = async (req, res, next) => {
  try {
    const {
      tds,
      profitMargin,
      guideId,
      location,
      timePeriod,
      people,
      perHourRate,
    } = req.body;

    // Validate input fields
    if (
      !profitMargin ||
      !tds ||
      !guideId ||
      !location ||
      !timePeriod ||
      !people ||
      !perHourRate
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [startDate, endDate] = timePeriod
      .split(" to ")
      .map((date) => new Date(date));

    if (isNaN(startDate) || isNaN(endDate)) {
      return res.status(400).json({ message: "Invalid time period format" });
    }

    // Find the requesting user
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (user.role !== "normal") {
      return res
        .status(400)
        .json({ message: "Only normal users can book a guide!" });
    }

    // Find the guide
    const guide = await UserModel.findById(guideId);
    if (!guide) {
      return res.status(404).json({ message: "Guide does not exist" });
    }

    if (guide.role !== "guide" || !guide.verified) {
      return res
        .status(400)
        .json({ message: "You can only book verified guides!" });
    }

    // Ensure `reservation` is an array
    if (!Array.isArray(guide.reservation)) {
      guide.reservation = [];
    }

    // Check for overlapping reservations
    const overlappingReservation = guide.reservation.some((reservation) => {
      const resStart = new Date(reservation.timePeriod.split(" to ")[0]);
      const resEnd = new Date(reservation.timePeriod.split(" to ")[1]);
      return (
        (startDate >= resStart && startDate <= resEnd) ||
        (endDate >= resStart && endDate <= resEnd) ||
        (startDate <= resStart && endDate >= resEnd)
      );
    });

    if (overlappingReservation) {
      return res.status(400).json({
        message: "The guide is already reserved for the requested time period",
      });
    }

    // Calculate costs
    const durationInMilliseconds = endDate - startDate;
    const durationInHours = durationInMilliseconds / (1000 * 60 * 60);

    if (durationInHours <= 0) {
      return res.status(400).json({ message: "Invalid time period" });
    }

    let   totalCost = perHourRate * durationInHours * people ;
    

    const tdsAmount = totalCost * (tds / 100); // TDS amount (tax deduction)
    const profitMarginAmount = totalCost * (profitMargin / 100);
    const finalCost = totalCost + tdsAmount + profitMarginAmount; // Total amount customer pays
    const guideReceives = totalCost - tdsAmount; // Amount guide receives after TDS
    const companyReceives = profitMarginAmount; // Amount company receives from the profit margin

    // Create a new reservation
    const reservation = {
      location,
      timePeriod,
      people,
      reservedBy: user._id,
      guide: guideId,
      cost: {
        beforeTdsProfitAmount: totalCost,
        tdsAmount: tdsAmount,
        profitMargin: profitMarginAmount,
        TotalConst: finalCost,
        afterTdsAndProfit: guideReceives,
        companyReceives: companyReceives,
      },
    };

    // Update the guide and user records
    guide.reservationStatus = true;
    guide.reservation.push(reservation);
    user.reservation.push(reservation);

    await guide.save();
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Guide booked successfully",
      reservation,
    });
  } catch (error) {
    next(error);
  }
};

//get all useers

export const getAllUser = async (req, res, next) => {
  try {
    const users = await UserModel.find().select("-password"); // Get all users from the database
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found!" });
    }

    return res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    next(error);
  }
};

// get single guide
export const getSingleDetailsControllor = async (req, res) => {
  const { guideId } = req.params;
  try {
    // Fetch guide details
    const guide = await UserModel.findById(guideId).select("-password");
    // console.log("guide",guide)
    if (!guide) {
      return res.status(404).json({
        success: false,
        message: "Guide not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Single guide details fetched successfully",
      guide,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//@update guide details
//@access authGuard, isNormal,
//@route api/users/update-guide-details

export const updateGuideDetailsController = async (req, res) => {
  try {
    const { guideId, contact, address, about, language, perHourRate } =
      req.body;

    if (!contact) {
      return res.status(400).json({
        success: false,
        message: "contact number is required",
      });
    }
    if (!guideId) {
      return res.status(400).json({
        success: false,
        message: "Guide id is not getting",
      });
    }

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }

    if (!about) {
      return res.status(400).json({
        success: false,
        message: "About section is required",
      });
    }
    if (language.length < 0) {
      return res.status(400).json({
        success: false,
        message: "Language section is required",
      });
    }

    if (!perHourRate) {
      return res.status(400).json({
        success: false,
        message: "Set your perday Rate",
      });
    }
    const guide = await UserModel.findByIdAndUpdate(guideId);
    if (!guide) {
      return res.status(200).json({
        success: false,
        message: "Guide not found",
      });
    }

    guide.about = about;
    guide.language = language;
    guide.contact = contact;
    guide.address = address;
    guide.perHourRate = perHourRate;

    await guide.save();

    return res.status(200).json({
      success: true,
      message: "Guide details updated successfully ",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error while trying to update guide details ",
    });
  }
};

//@show booked guide and tourist
//@access tourist, authGuard, isNormal
//@rooute api/users//get-booked-user-guide
export const bookedUserAndBookedGuide = async (req, res) => {
  try {
    const users = await UserModel.find({});

    if (!users || users.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No users found",
      });
    }

    // Assuming reservationStatus is a boolean
    const bookedUsersAndGuides = users.filter(
      (u) => u.reservationStatus === true
    );

    if (!bookedUsersAndGuides || bookedUsersAndGuides.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Error while getting booked users",
      });
    }

    // find booked guid and booke user

    if (!bookedUsers || bookedUsers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Error while getting booked users",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Booked user and guides",
      bookedUsersAndGuides,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get-guide-or-tourist
export const findUserAndGuide = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Provide userId",
      });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let guide = null;
    let tourist = null;

    // Case 1: If the user is a normal tourist
    if (user.role === "normal") {
      const guideReservation = user.reservation.find((r) => r.guide && r.guide.toString() !== userId);

      if (guideReservation) {
        guide = await UserModel.findById(guideReservation.guide).select("-password -__v");
      }

      return res.status(200).json({
        success: true,
        message: guide ? "Successfully retrieved guide data" : "No guide found",
        guide, // Related guide (if available)
      });
    }

    // Case 2: If the user is a guide
    if (user.role === "guide") {
      const tourists = await UserModel.find({
        "reservation.guide": userId,
      }).select("-password -__v");

      return res.status(200).json({
        success: true,
        message: tourists.length ? "Successfully retrieved tourists data" : "No tourists found",
        tourists, // Tourists who booked this guide
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid role detected",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error: " + error.message,
    });
  }
};



