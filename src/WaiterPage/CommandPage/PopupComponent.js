import { useEffect, useState } from "react";
import PropTypes from "prop-types";
const CustomPopup = (props) => {
    const [show, setShow] = useState(false);

    const closeHandler = (e) => {
        setShow(false);
        props.onClose(false);
    };

    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    return (
        <div
            style={{
                visibility: show ? "visible" : "hidden",
                opacity: show ? "1" : "0"
            }}
            className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3"
        >
            <div className="m-10 p-4 bg-gray-50 rounded-lg w-80 relative transition-all duration-500 ease-in-out">
                <h2 className="text-black">{props.title}</h2>
                <span
                    className="absolute top-4 right-6 transition-all duration-200 text-2xl font-bold cursor-pointer text-black hover:text-black"
                    onClick={closeHandler}
                >
      &times;
    </span>
                <div className="max-h-30vh overflow-auto">{props.children}</div>
            </div>
        </div>
    );
};

CustomPopup.propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default CustomPopup;
