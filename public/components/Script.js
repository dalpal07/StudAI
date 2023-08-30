import {useUser} from "@auth0/nextjs-auth0/client";
import {useDispatch} from "react-redux";
import {addRequest} from "@/slices/subscriptionSlice";

export default function Script(props) {
    const {user} = useUser();

    const handleRequestComplete = async () => {
        const queryParams = new URLSearchParams({ id: user.sub });
        const response = await fetch(`/api/user/add-request?${queryParams}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: "",
        })
        if (response.status === 200) {
            const dispatch = useDispatch();
            dispatch(addRequest())
        }
    }
}
