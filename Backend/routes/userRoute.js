import express from "express";
import {
  approveGuideRequest,
  becomeAGuideRequest,
  bookedUserAndBookedGuide,
  bookGuide,
  findUserAndGuide,
  getAllUser,
  getGuideVerificationRequest,
  getSingleDetailsControllor,
  getUserProfile,
  loginUser,
  registerUser,
  updateGuideDetailsController,
  uploadProfilePicture,
  uploadUserDocuments,
  verifiedGuide,
} from "../controllers/userController.js";
import { authGuard, isAdmin, isNormal } from "../middlewares/authMiddleware.js";
import { AIRecommendationController } from "../controllers/AIRecommendation.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authGuard, getUserProfile);
router.post("/upload-profile", authGuard, uploadProfilePicture);
router.post("/guide-request", authGuard, isNormal, becomeAGuideRequest);
router.post("/upload-user-documents", authGuard, isNormal, uploadUserDocuments);
router.get(
  "/get-guide-verification",
  authGuard,
  isAdmin,
  getGuideVerificationRequest
);
router.put(
  "/approve-guide-request/:id",
  authGuard,
  isAdmin,
  approveGuideRequest
);
router.put(
  "/revoke-guide-permission/:id",
  authGuard,
  isAdmin,
  approveGuideRequest
);
router.get("/get-verified-guides", authGuard, verifiedGuide);
router.post("/book-guide", authGuard, isNormal, bookGuide);
router.get("/get-all-users", getAllUser);
router.get("/get-single-guide/:guideId", authGuard, getSingleDetailsControllor);

router.post("/update-guide-details", authGuard, isNormal,updateGuideDetailsController);

router.get("/get-booked-user-guide",bookedUserAndBookedGuide );
router.post("/chat-with-ai", AIRecommendationController);
router.post("/get-guide-or-tourist", findUserAndGuide);

export default router;
