import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const opts = {
  points: 100,
  duration: 1,
};

const limiter = new RateLimiterMemory(opts);

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    response.status(409);
    throw new Error('Too many requests!');
  }
}
