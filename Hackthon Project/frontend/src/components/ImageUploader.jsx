const ImageUploader = ({ onChange, fileName }) => (
  <label className="group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-white/80 p-6 text-center transition hover:border-primary hover:bg-white">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition group-hover:opacity-100" />
    <span className="relative text-4xl animate-float">📷</span>
    <p className="relative mt-2 text-sm text-slate-600">Upload crop image for pest detection</p>
    <p className="relative text-xs text-slate-400">PNG, JPG up to 5MB</p>
    <input type="file" accept="image/*" className="hidden" onChange={onChange} />
    {fileName && <p className="relative mt-2 text-xs font-medium text-primary">{fileName}</p>}
  </label>
);

export default ImageUploader;

