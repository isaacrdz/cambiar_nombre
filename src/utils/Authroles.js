const roles = {
    rockstar: "6144d4548fb0f13225997789",
    superAdmin: "6144d45a8fb0f1322599778a",
    admin: "6144d45f8fb0f1322599778b",
    user: "6144d47b8fb0f1322599778c",
    marketing: "6144d4818fb0f1322599778d",
    receptionist: "6144d4a28fb0f1322599778e",
}

//Single Roles
export const isRockstar = (role) => roles.rockstar === role;
export const isSuper = (role) => roles.superAdmin === role;
export const isAdmin = (role) => roles.admin === role;
export const isUser = (role) => roles.user === role;
export const isMarketing = (role) => roles.marketing === role;
export const isReceptionist = (role) => roles.receptionist === role;