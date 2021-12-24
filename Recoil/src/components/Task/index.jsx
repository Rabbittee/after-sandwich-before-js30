function Task({ title, children }) {
  return (
    <section className="bg-white text-black text-opacity-70 rounded-2xl shadow-xl p-8">
      <h6 className="text-md font-black">{title}</h6>
      {children}
    </section>
  );
}

function Question({ title, children }) {
  return <Task title={title}>{children}</Task>;
}
function Answer({ title = "Answer:", children }) {
  return (
    <Task title={title}>
      <div className="w-full p-4 text-black bg-slate-100 rounded-md outline-none my-2 text-opacity-70 text-sm  h-fit">
        {children}
      </div>
    </Task>
  );
}

export default { Question, Answer };
