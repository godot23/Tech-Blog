const loginFormHandler = async (event) => {
    event.preventDefault()
    const userName = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (userName && password) {
        const response = await fetch("/")
    }
}