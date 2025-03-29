import { Link } from "react-router-dom";
import { Page } from "../Page";

export const Portfolio = () => {
    return (
        <Page>
            <p>hi i'm jake</p>
            <p>i write <Link to="/code">code</Link> and make <Link to="/music">music</Link></p>
        </Page>
    )
}