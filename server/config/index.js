import * as dotenv from "dotenv";
dotenv.config();

const dev = {
  app: {
    serverPort: Number(process.env.SERVER_PORT) || 3001,
    jwtSecretKey: process.env.JWT_SECERET_KEY,
    smtpUsername: process.env.SMTP_EMAIL,
    smtpPassword: process.env.SMTP_PASSWORD,
    clientUrl: process.env.CLIENT_URL,
    jwtAccountActivationKey: process.env.JWT_ACCOUNT_ACTIVATION_KEY,
    braintreeMerchantId: process.env.BRAINTREE_MERCHANT_ID,
    braintreePublickey: process.env.BRAINTREE_PUBLIC_KEY,
    braintreePrivateKey: process.env.BRAINTREE_PRIVATE_KEY,
  },
  db: {
    url: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/ecommerceDB",
  },
};
export default dev;
