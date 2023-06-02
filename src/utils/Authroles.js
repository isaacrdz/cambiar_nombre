const roles = {
  rockstar: "6144d4548fb0f13225997789",
  superAdmin: "6144d45a8fb0f1322599778a",
  admin: "6144d45f8fb0f1322599778b",
  user: "6144d47b8fb0f1322599778c",
  marketing: "6144d4818fb0f1322599778d",
  receptionist: "6144d4a28fb0f1322599778e",
  digitalMarketing: "616876627e498e7f25454f95",
  generalManager: "616da4c3f5a2169e9d924f1f",
  salesManager: "6228f9ee4062f9000d39a230",
};

//Single Roles
export const isRockstar = (role) => roles.rockstar === role;
export const isSuper = (role) => roles.superAdmin === role;
export const isAdmin = (role) => roles.admin === role;
export const isUser = (role) => roles.user === role;
export const isMarketing = (role) => roles.marketing === role;
export const isReceptionist = (role) => roles.receptionist === role;
export const isDigitalMkt = (role) => roles.digitalMarketing === role;
export const isGeneralManager = (role) => roles.generalManager === role;
export const isSalesManager = (role) => roles.salesManager === role;
