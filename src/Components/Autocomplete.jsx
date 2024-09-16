import { useEffect, useState, useCallback } from "react";
import './styles.css';
import SuggestionsList from "./SuggestionsList";
import useDebounce from "../hooks/useDebounce";

const Autocomplete = ({
    placeholder,
    staticData,
    fetchSuggestions,
    dataKey,
    customLoading,
    onSelect,
    onChange,
    onBlur,
    onFocus,
    customStyles
}) => {

    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        onChange(e.target.value);
    }

    const getSuggestions =  async(query) => {
        setError(null);
        setLoading(true);
        try {
            let result;
            if(staticData) {
                result = staticData.filter((item) => {
                    return item.toLowerCase().includes(query.toLowerCase());
                })
            } else if(fetchSuggestions) {
                result = await fetchSuggestions(query);
            }
            setSuggestions(result);
        } catch(e){
            setError("Failer to fetch suggestions");
            setSuggestions([]);
        } finally{
            setLoading(false);
        }
    }

    const debouncedInputvalue = useDebounce(inputValue, 300);

    useEffect(() => {
        if(inputValue.length > 1) {``
        getSuggestions(debouncedInputvalue);
        } else {
            setSuggestions([]);
        }
    }, [inputValue]);

    const handleSuggestionClick = (suggestion) => {
        setInputValue(dataKey ? suggestion[dataKey] : suggestion);
        onSelect(suggestion); 
        setSuggestions([]);
    }

    return (
        <div className="container">
            <input type="text" value={inputValue} placeholder={placeholder} style={customStyles}
            onBlur={onBlur} onFocus={onFocus} onChange={handleInputChange} />
            {
                (suggestions.length > 0 || loading || error) && (
                    <ul className="suggestions-list">
                        {error && <div className="error">{error}</div>}
                        {loading && <div className="loading">{customLoading}</div>}
                        <SuggestionsList dataKey={dataKey} highlight={debouncedInputvalue} suggestions={suggestions} onSuggestionClick={handleSuggestionClick}/>
                    </ul>
                )
            }
        </div>
    )
}

export default Autocomplete;