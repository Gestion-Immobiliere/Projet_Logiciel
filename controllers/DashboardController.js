import Bien from "../models/Bien.js"
import User from "../models/User.js"
// import Reservation from "../models/Reservation.js" ← à activer plus tard quand on l’aura

export const getDashboard = async (req, res) => {
  try {
    const role = req.user.role
    const userId = req.user.id

    if (role === "admin") {
      const totalBiens = await Bien.countDocuments()
      const totalAgents = await User.countDocuments({ role: "agent" })
      const totalClients = await User.countDocuments({ role: "client" })
      // const totalReservations = await Reservation.countDocuments()

      return res.status(200).json({
        role: "admin",
        totalBiens,
        totalAgents,
        totalClients,
        // totalReservations
      })
    }

    if (role === "agent") {
      const biens = await Bien.find({ postedBy: userId })

      // const reservations = await Reservation.find({ bien: { $in: biens.map(b => b._id) } })

      return res.status(200).json({
        role: "agent",
        totalBiens: biens.length,
        // totalReservations: reservations.length,
        biens
      })
    }

    return res.status(403).json({ message: "Accès non autorisé à ce tableau de bord" })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
