import express from "express";

import {
  getDomains,
  createDomain,
  updateDomain,
  deleteDomain,
  joinDomain,
  getDomainById,
} from "../controllers/domain.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getDomains);
router.get("/:id", getDomainById);
router.post("/", auth, createDomain);
router.put("/join/:id", auth, joinDomain);
router.patch("/:id", auth, updateDomain);
router.delete("/", deleteDomain);

export default router;
