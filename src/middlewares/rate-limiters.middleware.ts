import { rateLimit } from 'express-rate-limit';

/* 
    Limitador para registro
    POST /users/register
    Permite 3 intentos por hora por IP
*/

export const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: 'Demasiados intentos de registro. Intenta de nuevo más tarde',
    statusCode: 429,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
        return req.user?.role === 'admin';
    },
    keyGenerator: (req) => {
        return req.ip || req.socket.remoteAddress || 'unknown';
    },
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: 'Demasiados intentos de registro. Intente de nuevo en 1 hora.',
        });
    },
});

/*
    Limitador para login
    POST /auth/login
    Permite 5 intentos por 15 minutos por IP
*/

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Demasiados intentos de inicio de sesión. Intente de nuevo más tarde.',
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
        return req.user?.role === 'admin';
    },
    keyGenerator: (req) => {
        return req.ip || req.socket.remoteAddress || 'unknown';
    },
    handler: (req, res) => {
        return res.status(429).json({
            success: false,
            message: 'Demasiados intentos de inicio de sesión. Intente de nuevo en 15 minutos.'
        });
    },
});

/*
    Limitador para recuperación de contraseña
    POST /password/forgot-password
    Permite 3 intentos por 30 minutos por IP
*/

export const forgotPasswordLimiter = rateLimit({
    windowMs: 30 * 60 * 1000,
    max: 3,
    message: 'Demasiados intentos de recuperación de contraseña. Intente de nuevo más tarde.',
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
        return req.user?.role === 'admin';
    },
    keyGenerator: (req) => {
        return req.ip || req.socket.remoteAddress || 'unknown';
    },
    handler: (req, res) => {
        return res.status(429).json({
            success: false,
            message: 'Demasiados intentos de recuperación de contraseña. Intente de nuevo en 30 minutos.'
        });
    },
});