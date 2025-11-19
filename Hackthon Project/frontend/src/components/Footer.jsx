const Footer = () => {
  return (
    <footer className="mt-8 border-t border-white/40 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} SmartFarm AI · Empowering smallholder farmers with intelligent insights.
      </div>
    </footer>
  );
};

export default Footer;

