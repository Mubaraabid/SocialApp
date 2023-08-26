export const RoleCheck = (roles) => async (req, res, next) => {
    const check = roles.indexOf(req.user.role);
    if (check === -1) {
      res.status(403).json({ message: "Forbidden" });
    } else next();
  };
  