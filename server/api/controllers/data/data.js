const User = require("../../../models/user/user");
module.exports = {
    async dataofusers(req, res) {
      try {
        const userId = req.userId;
  
        // Retrieve user details from the database based on the userId
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        // Return the specific user details
        return res.json({ success: true, user });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
      }
    }
  };
  