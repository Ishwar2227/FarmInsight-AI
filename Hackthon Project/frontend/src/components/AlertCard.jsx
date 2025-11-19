import { motion } from 'framer-motion';

const AlertCard = ({ title, message, date }) => (
  <motion.div
    className="rounded-xl border border-yellow-200/70 bg-yellow-50/80 p-4 shadow-sm backdrop-blur"
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
  >
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-yellow-900">{title}</h3>
      <span className="text-xs text-yellow-700">{new Date(date).toLocaleString()}</span>
    </div>
    <p className="mt-2 text-sm text-yellow-800">{message}</p>
  </motion.div>
);

export default AlertCard;

