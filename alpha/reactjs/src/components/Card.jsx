export function Card({ children }) {
  return (
    <section className="bg-white text-black text-opacity-75 rounded-2xl shadow-xl p-8">
      {children}
    </section>
  );
}
