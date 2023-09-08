export async function checkout(type, id) {
    const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({type: type, id: id}),
    })
    if (response.status === 200) {
        const {link} = await response.json();
        window.location.href = link;
    }
}