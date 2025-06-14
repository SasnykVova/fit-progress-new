export const getLoginErrorMessage = (error: string | undefined): string => {
  switch (error) {
    case "auth/invalid-credential":
      return "Invalid login credentials provided.";
    case "auth/user-not-found":
      return "No user found with this email address.";
    case "auth/wrong-password":
      return "The password is incorrect.";
    case "auth/invalid-email":
      return "The email address is badly formatted.";
    case "auth/user-disabled":
      return "The user account has been disabled by an administrator.";
    case "auth/too-many-requests":
      return "Too many unsuccessful login attempts. Please try again later.";
    case "auth/network-request-failed":
      return "A network error occurred. Please check your internet connection.";
    case "auth/internal-error":
      return "An internal error has occurred. Please try again.";
    case "auth/operation-not-allowed":
      return "Email/password accounts are not enabled. Contact support.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with the same email address but different sign-in credentials.";
    case "auth/invalid-login-credentials":
      return "The email or password is incorrect.";
    default:
      return "An unknown error occurred. Please try again later.";
  }
};
