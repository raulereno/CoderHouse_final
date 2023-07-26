const { default: Stripe } = require("stripe")
const { v4: uuidv4 } = require("uuid");
const { calculateProductsStockService, createTicketService } = require("./ticket.service")

const createPaymentService = async (cid, user) => {
    try {
        const { productsTicket, sum } = await calculateProductsStockService(cid)
        console.log("🚀 ~ file: payment.service.js:8 ~ createPaymentService ~ productsTicket:", productsTicket)
        const ticket = await createTicketService({
            code: uuidv4(),
            purchase_datetime: new Date(),
            amount: sum,
            purchaser: user,
            products: productsTicket,
        })
        const formatProducts = productsTicket.map(product => {

            return {
                price_data: {
                    product_data: {
                        name: product.product.title,
                        description: product.product.description
                    },
                    currency: "usd",
                    unit_amount: product.product.price * 100
                },
                quantity: product.quantity
            }

        })

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

        const paymentIntent = await stripe.checkout.sessions.create({
            line_items: formatProducts,
            mode: 'payment',
            success_url: `${process.env.API_URL_PROD || "http://localhost"}:${process.env.PORT || 8080}/api/payment/successPayment?ticket=${ticket._id}&cid=${cid}`,
            cancel_url: `${process.env.API_URL_PROD || "http://localhost"}:${process.env.PORT || 8080}/api/payment/fail`
        })

        return paymentIntent

    } catch (error) {
        throw new Error(error)
    }




}

module.exports = { createPaymentService }