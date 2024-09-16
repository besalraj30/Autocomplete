import { useEffect, useRef, useState } from "react";

const SuggestionsList = ({suggestions=[], highlight, dataKey, onSuggestionClick}) => {

    const [activeIndex, setActiveIndex] = useState(-1);
    const listRefs = useRef([]);

    const getHighlightedText = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, "gi"));
        return <span>
            {parts.map((part, index) => {
                return part.toLowerCase() === highlight.toLowerCase() ? 
                 (<b style={{color: "blue"}} key={index}>{part}</b>)
                : (part)
            })}
        </span>
    }

    const handleKeyDown = (e) => {
        if(e.key === 'ArrowDown') {
            setActiveIndex((prevIndex) => prevIndex < suggestions.length -1 ? prevIndex +1 : 0);
        } else if(e.key === 'ArrowUp')
        {
            setActiveIndex((prevIndex) => prevIndex > 0 ? prevIndex-1 : suggestions.length -1);
        } else if(e.key === 'Enter')
        {
            if(activeIndex>=0)
            {
                onSuggestionClick(suggestions[activeIndex]);
            }
        }
    }

    useEffect(() => {   
        document.addEventListener('keydown', handleKeyDown);

        //Scroll active element into view
        if(activeIndex >=0 && listRefs.current[activeIndex]) {
            listRefs.current[activeIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })
        }

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex, suggestions]);



    return (
        <>
            {suggestions.map((suggestion, index) => {
                const currSuggestion = dataKey ? suggestion[dataKey] : suggestion;
                const highlightedText = getHighlightedText(currSuggestion, highlight);

                return (
                    <li key={index} onClick={() => onSuggestionClick(suggestion)} ref={el => listRefs.current[index] = el}
                    className={`suggestion-item ${index===activeIndex ? 'active' : ''}`} style={{
                        backgroundColor: index === activeIndex ? '#e0e0e0' : 'transparent'
                    }}
>
                        {highlightedText}
                    </li>
                )
            })}
        </>
    )
}

export default SuggestionsList;