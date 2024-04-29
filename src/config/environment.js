module.exports = {
    port: process.env.PORT || 5000,
    mongoDbUrl: process.env.MONGO_DB_URL || '',
    cookiesSecret: process.env.COOKIES_SECRET || '',
    sessionSecret: process.env.SESSION_SECRET || '',
    JWTSecret: process.env.JWT_SECRET || '',
    salt: process.env.SALT || 0,
}