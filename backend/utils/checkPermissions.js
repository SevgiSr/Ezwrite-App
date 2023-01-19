import { UnauthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUserId, resourceUserId) => {
  //if(requestUser.role === "admin") return
  if (requestUserId === resourceUserId.toString()) return; //return - move on, error - quit
  throw new UnauthenticatedError("Not authorized to access this route");
};

export default checkPermissions;
