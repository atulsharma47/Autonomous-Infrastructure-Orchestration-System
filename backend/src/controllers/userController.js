export const getProfile = async (
  req,
  res
) => {

  res.json({

    message:
      "Protected profile route",

    user: req.user,

  });

};