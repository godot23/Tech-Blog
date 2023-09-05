const title = document.querySelector('#title');

async function starter() {
    const response = await fetch('/api/post/', {
        method: "GET",
        body: JSON.stringify({title}),
        
    })
}