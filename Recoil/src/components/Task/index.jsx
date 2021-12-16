

function Question({title,task}){
    return(
        <section
            id="article"
            className="bg-white text-black text-opacity-70 rounded-2xl shadow-xl p-8"
        >
            <h6 className="text-md font-black">{title}</h6>
            {task()}
        </section>
    )
}
function Anwser({title="Answer:",children}){
    return(
        <section
            id="article"
            className="bg-white text-black text-opacity-70 rounded-2xl shadow-xl p-8"
        >
            <h6 className="text-md font-black">{title}</h6>
            <div
                className="w-full p-4 text-black bg-slate-100 rounded-md outline-none my-2 text-opacity-70 text-sm  h-fit"
                disabled
            >{children}</div>
        </section>
    )
}
export default {Question,Anwser}