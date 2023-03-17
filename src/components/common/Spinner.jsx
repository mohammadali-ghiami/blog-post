const Spinner = ({ text = "", size = "5em" }) => {
    const header = text ? <h4>{text}</h4> : null
    return (
        <div className="spinner">
            {header}
            <div className="loader" style={{
                width: size,
                height: size
            }} />
        </div>
    );
}

export default Spinner;