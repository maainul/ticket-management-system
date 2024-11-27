import busRoutes from "./routes/busRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const setupRoutes = (app) => {
  app.use("/", busRoutes);
  app.use("/", ticketRoutes);
  app.use("/auth/", authRoutes);
};

export default setupRoutes;
