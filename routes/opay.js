const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.post("/initiate", async (req, res) => {
  const { amount, email, name, reference, phoneNumber, address } = req.body;

  const payload = {
    amount,
    reference,
    currency: "NGN",
    country: "NG",
    returnUrl: "http://localhost:5173/order-success",
    callbackUrl: "http://localhost:5000/api/opay/callback",
    customer: {
      name,
      email,
      phoneNumber,
    },
    paymentMethod: ["account"],

    description: `Payment by ${name}`,
  };

  if (!process.env.OPAY_SECRET_KEY) {
    console.error("❌ OPAY_SECRET_KEY is missing");
    return res.status(500).json({ error: "Opay key not configured" });
  }

  try {
    const response = await axios.post(
      "https://sandboxapi.opaycheckout.com/api/v3/transaction/initialize",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPAY_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const checkoutUrl = response.data?.data?.redirectUrl;

    if (checkoutUrl) {
      res.json({ checkoutUrl });
    } else {
      console.log("Missing redirectUrl:", response.data);
      res.status(500).json({ error: "No redirectUrl received from Opay" });
    }
  } catch (error) {
    console.error("Opay API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Opay payment initiation failed" });
  }
});

module.exports = router;
