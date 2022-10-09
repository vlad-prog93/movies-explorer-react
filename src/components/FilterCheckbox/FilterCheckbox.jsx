// стили
import "./FilterCheckbox.scss";

const FilterCheckbox = (props) => {

    return (
        <input type="checkbox" className="filterCheckbox" checked={props.checked} onChange={props.onChange} disabled={props.disabled} />
    )
}

export default FilterCheckbox;
