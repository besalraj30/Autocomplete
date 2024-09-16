const SuggestionsList = ({suggestions=[], highlight, dataKey, onSuggestionClick}) => {

    const getHighlightedText = (text, highlight) => {
        console.log(text, highlight);
        const parts = text.split(new RegExp(`(${highlight})`, "gi"));
        console.log(parts);
        return <span>
            {parts.map((part, index) => {
                console.log(part.toLowerCase() === highlight.toLowerCase());
                return part.toLowerCase() === highlight.toLowerCase() ? 
                 (<b style={{color: "blue"}} key={index}>{part}</b>)
                : (part)
            })}
        </span>
    }

    return (
        <>
            {suggestions.map((suggestion, index) => {
                const currSuggestion = dataKey ? suggestion[dataKey] : suggestion;
                const highlightedText = getHighlightedText(currSuggestion, highlight);

                return (
                    <li key={index} onClick={() => onSuggestionClick(suggestion)}
                    className="suggestion-item" >
                        {highlightedText}
                    </li>
                )
            })}
        </>
    )
}

export default SuggestionsList;