import express from "express";

const router = express.Router();

// We'll have list of user routes

router.get("/login", (req, res) => {
  res.send({
    message: "Login Successfully",
  });
});

export default router;
