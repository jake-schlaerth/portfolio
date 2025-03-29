import { Link } from "react-router-dom";

export const Portfolio = () => {
    return (
        <div>
            <p>hi i'm jake</p>
            <p>i write <Link to="/code">code</Link> and make <Link to="/music">music</Link></p>
        </div>
    )
}