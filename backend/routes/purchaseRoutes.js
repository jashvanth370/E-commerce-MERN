import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import Purchase from "../models/purchase.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Auth0 middleware
const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

// POST /api/purchases — create new purchase
router.post("/", 
  requireAuth,
  body("date").isISO8601().toDate(),
  body("deliveryTime").isIn(["10AM", "11AM", "12PM"]),
  body("deliveryLocation").isString().trim().escape(),
  body("productName").isString().trim().escape(),
  body("quantity").isInt({ min: 1 }),
  body("message").optional().isString().trim().escape(),
  async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { date, deliveryTime, deliveryLocation, productName, quantity, message } = req.body;

    // Prevent past dates & Sundays
    const today = new Date();
    if (date < today) return res.status(400).json({ error: "Cannot select past dates" });
    if (date.getDay() === 0) return res.status(400).json({ error: "Cannot select Sunday" });

    try {
      const purchase = await Purchase.create({
        username: req.auth.payload.sub,
        date, deliveryTime, deliveryLocation, productName, quantity, message
      });
      res.status(201).json(purchase);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

// GET /api/purchases — get all purchases of logged-in user
router.get("/", requireAuth, async (req, res) => {
  try {
    const purchases = await Purchase.find({ username: req.auth.payload.sub }).sort({ date: -1 });
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
