export const getInitials = (fullName: string): string => {
  if (!fullName) return "";

  const words = fullName.trim().split(/\s+/);

  const firstInitial = words[0]?.charAt(0).toUpperCase() || "";
  const secondInitial = words[1]?.charAt(0).toUpperCase() || "";

  return firstInitial + secondInitial;
};
