import { randomString } from "../../../utils/string";
import User from "../../../models/User";
import Lead from "../../../models/Lead";
import dbConnect from "../../../utils/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      await dbConnect();

      const { id } = req.query;

      const userDetails = await User.findOne({
        id,
      });

      if (!userDetails) {
        /**
         * When user doesn't exist in the database, create a new one
         */
        const newUser = new User();
        newUser.id = id;

        /**
         * Generate hook identifier as random string
         */
        newUser.hook_id = randomString();

        await newUser.save();
        res.status(200).json({
          hookId: newUser.hook_id,
        });
      } else {
        /**
         * Load leads generated by corresponding user
         */
        const leads = await Lead.find({ userId: id });
        res.status(200).json({
          hookId: userDetails.hook_id,
          leads,
        });
      }
      break;
    default:
      res.status(404);
  }
}
