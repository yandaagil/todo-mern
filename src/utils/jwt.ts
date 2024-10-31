import jwt from "jsonwebtoken";

// Define the structure of your JWT payload
interface JWTPayload {
  id: string;
}

// Define the return type for verify function
interface VerifyResult {
  valid: boolean;
  expired: boolean;
  decoded: JWTPayload | null;
}

export const signJWT = (
  payload: JWTPayload,
  options?: jwt.SignOptions | undefined
): string => {
  return jwt.sign(payload, process.env.JWT_PRIVATE || "", {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJWT = (token: string): VerifyResult => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_PUBLIC || ""
    ) as JWTPayload;
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        valid: false,
        expired: error.message === "jwt expired",
        decoded: null,
      };
    }
    // Handle non-Error objects just in case
    return {
      valid: false,
      expired: false,
      decoded: null,
    };
  }
};
