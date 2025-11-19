import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, description }) => (
  <motion.div
    className="rounded-2xl bg-white/90 p-5 shadow-sm ring-1 ring-slate-100 transition-all hover:-translate-y-1 hover:shadow-glow"
    whileHover={{ scale: 1.02 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      </div>
      <div className="text-3xl text-primary">{icon}</div>
    </div>
    {description && <p className="mt-3 text-sm text-slate-500">{description}</p>}
  </motion.div>
);

export default StatCard;

