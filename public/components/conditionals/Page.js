import Product from "../../../pages/Product";
import Intro from "../../../pages/Intro";

export default function Page(props) {
    if (props.user) return (
        <Product/>
    )
    return (
        <Intro/>
    )
}