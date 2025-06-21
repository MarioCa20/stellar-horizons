export const isAuthenticated = (): boolean => {
  return localStorage.getItem("auth") === "true";
};
