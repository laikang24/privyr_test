import User from "../../../models/User";
import Lead from "../../../models/Lead";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "POST":
      const { id } = req.query;

      const userDetails = await User.findOne({ hook_id: id });
      if (!userDetails) {
        /**
         * Throw bad request exception when webhook identifier doesn't exist in our database
         */
        res.status(400).json({ message: "Bad hook" });
        return;
      } else {
        const { name, email, phone } = req.body;

        /**
         * We can add more strict validations here for email and phone number formats.
         * For now, I just validated existence
         */

        if (!name || !email || !phone) {
          res.status(400).json({ message: "Missing fields" });
          return;
        }

        const lead = new Lead();
        lead.userId = userDetails.id;
        lead.name = name;
        lead.email = email;
        lead.phone = phone;

        lead.save();
        res.status(201).json({ message: "Lead created" });
      }
      break;
    default:
  }
}
