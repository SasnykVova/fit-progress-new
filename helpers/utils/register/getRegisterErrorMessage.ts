export const getRegisterErrorMessage = (error: string | undefined): string => {
  switch (error) {
    case "auth/email-already-in-use":
      return "This email address is already in use.";

    case "auth/invalid-email":
      return "The email address is badly formatted.";

    case "auth/operation-not-allowed":
      return "Registration is currently disabled. Please contact the administrator.";

    case "auth/weak-password":
      return "The password is too weak. It must be at least 6 characters long.";

    case "auth/missing-password":
      return "The password field is required.";

    case "auth/internal-error":
      return "An internal server error occurred. Please try again.";

    case "auth/network-request-failed":
      return "Failed to connect to the server. Please check your internet connection.";

    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";

    case "auth/invalid-credential":
      return "Invalid credentials. Please try again.";

    case "auth/user-disabled":
      return "This account has been disabled. Please contact the administrator.";

    case "auth/timeout":
      return "The request timed out. Please try again.";

    default:
      return "An unknown error occurred. Please try again.";
  }
};
