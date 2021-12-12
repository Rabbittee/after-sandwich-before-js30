

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
function Anwser({children}){
    return(
        <section
        id="article"
        className="bg-white text-black text-opacity-70 rounded-2xl shadow-xl p-8"
    >
        <h6 className="text-md font-black">Answer:</h6>
        <textarea
        className="w-full p-4 text-black text-opacity-70 text-sm"
        disabled
        >{children}</textarea>
    </section>
    )
}
export default {Question,Anwser}