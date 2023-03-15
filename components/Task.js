export default function Task({ key, text }) {
    return(
        <div>
            <li
                className="p-1"
                key={key}
                text={text}
            >
                {text}
            </li>
        </div>
    )
}