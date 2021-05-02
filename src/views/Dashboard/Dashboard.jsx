import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <div>
            <div style={style.item}>
                <h1>Dashboard</h1>
                
                <Link to="/"><button style={style.btn}>Okay</button></Link>
            </div>
        </div>
    );
}

const style = {
    item: {
        position: 'absolute',
        left: '50%',
        top: '40%',
        transform: 'translate(-50%, -50%)',
        fontSize: 20
    },
    btn: {
        backgroundColor: "#9c27b0",
        color: "#FFFFFF",
        padding: 10
    }
}
