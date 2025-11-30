// This is a mock payment service. In a real app, integrate Stripe or PayPal here.

const processPayment = async (amount, currency, source) => {
    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate success
    return {
        success: true,
        transactionId: 'txn_' + Math.random().toString(36).substr(2, 9),
        amount,
        currency,
        status: 'succeeded',
    };
};

module.exports = {
    processPayment,
};
