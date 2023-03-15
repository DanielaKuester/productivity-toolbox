export default function Task({ text }) {
    return(
        <div>
            <li
                className="p-1"
                text={text}
            >
                {text}
            </li>
        </div>
    )
}