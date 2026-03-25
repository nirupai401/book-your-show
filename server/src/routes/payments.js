const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const ApiResponse = require('../core/ApiResponse');
const crypto=require('crypto');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { amount, bookingId, method } = req.body;

    console.log("Incoming:", req.body);

    // ✅ VALIDATION (VERY IMPORTANT)
    if (!amount || isNaN(amount)) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "bookingId is required",
      });
    }

    const numericAmount = Number(amount);

    const payment = await Payment.create({
      txnId: crypto.randomUUID(),
      amount: Number(amount),
      bookingId,
      method,
      status: 'PENDING',
    });

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Movie Ticket',
            },
            unit_amount: numericAmount * 100, // ✅ FIXED
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        bookingId,
        paymentId: payment._id.toString(),
      },
      return_url: `http://localhost:5173/payments/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.json({
      success: true,
      payload: {
        payment,
        sessionId: session.id,
        clientSecret: session.client_secret,
      },
    });

  } catch (err) {
    console.error("❌ PAYMENT ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get('/verify', async (req, res) => {
   
  try {
    const sessionId = req.query.session_id || req.query.sessionId;
     
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'sessionId is required',
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    console.log("FULL SESSION:", session);
console.log("payment_status:", session.payment_status);
console.log("status:", session.status);

    const { bookingId, paymentId } = session.metadata || {};

    if (!bookingId || !paymentId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid session metadata',
      });
    }

    const isPaid = session.payment_status === 'paid';

    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      { status: isPaid ? 'PAID' : 'CANCELLED' },
      { returnDocument: 'after' }
    );

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: isPaid ? 'CONFIRMED' : 'CANCELLED' },
      { returnDocument: 'after' }
    );

    res.json({
      success: true,
      payload: { payment, booking },
      message: isPaid ? 'Payment successful' : 'Payment cancelled',
    });

  } catch (err) {
    console.error("VERIFY ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
module.exports = router;