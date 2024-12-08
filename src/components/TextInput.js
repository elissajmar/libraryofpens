export default function TextInput(props){
    return ( 
    <>
        <label htmlFor={props.id} className="form-label">
            {props.label}
        </label>
        <input 
            type="text" 
            className="form-control" 
            id={props.id}
            value={props.value}
            onChange={(event) => {
                const value=event.target.value; 
                props.onChange(value);
              }}
        />
    </> // create empty document fragment with <> and </> 
    ); 
}