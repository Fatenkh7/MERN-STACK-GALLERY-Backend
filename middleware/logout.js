const logOut = (req, res) => {
  const username = req.cookies.username
  res.clearCookie("token-auth")
  res.clearCookie("username")
  res.send(`You are logouted ${username}!`)
}

export default logOut;
