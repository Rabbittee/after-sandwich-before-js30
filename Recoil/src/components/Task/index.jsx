import clsx from "clsx"
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
function Answer({ title = "Answer:", className, children }) {
  return (
    <Task title={title}>
      <div className="w-full p-4 text-black bg-slate-100 rounded-md outline-none my-2 text-opacity-70 text-sm  h-fit">
        <div className={clsx("w-full h-full bg-cover rounded-md",className)}>
          <div className="rounded-md overflow-hidden filter backdrop-blur-sm flex flex-col gap-y-2 px-4 py-2 text-slate-200 bg-slate-600 bg-opacity-40">
            {children}
          </div>
        </div>
      </div>
    </Task>
  );
}

export default { Question, Answer };
