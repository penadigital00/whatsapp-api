const jwt= require('jsonwebtoken');

module.exports={
    login: async (req,res)=>{
        try {
            const user = "username"
            const pass = "password" 

            if (user !== req.body.username) {
                res.status(404).json({ msg: 'User tidak ditemukan' });
              } 

            if (pass !== req.body.password) {
                res.status(404).json({ msg: 'Password salah' });
            }

            const accessToken = jwt.sign({user,pass}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '10m'
            })

            if (user) {
                res.json({
                  msg: 'success login',
                  token: accessToken,
                });
              } else {
                res.status(401).json({
                  msg: 'username or password are incorrect',
                });
              }

        } catch (error) {
            console.log(error);
            res.status(404).json({
                msg: error.message
            })
        }
    }
}