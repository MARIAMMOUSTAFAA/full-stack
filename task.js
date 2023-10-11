let userId = 1;
let usersData = [];
let postsData = [];

const fetchAndRenderUser = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
            usersData[userId] = data;
            const userResultDiv = document.getElementById('userResult');
            userResultDiv.innerHTML = `
                <p>ID: ${data.id}</p>
                <p>Name: ${data.name}</p>
                <p>Username: ${data.username}</p>
                <p>Email: ${data.email}</p>
                <p>Address: ${data.address.street}, ${data.address.suite}, ${data.address.city}, ${data.address.zipcode}</p>
            `;

            const postId = userId;

            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
                .then((response) => response.json())
                .then((data) => {
                    postsData[postId] = data;
                    renderPost(postId);
                });
        });
};

const renderPost = (postId) => {
    const postResultDiv = document.getElementById('postResult');
    postResultDiv.innerHTML = '';

    if (postsData[postId]) {
        const post = postsData[postId];
        postResultDiv.innerHTML = `
            <p>Post ID: ${post.id}</p>
            <p>Title: ${post.title}</p>
            <p>Body: ${post.body}</p>
        `;
    }
};

const nextUserButton = document.getElementById('nextUserButton');
nextUserButton.addEventListener('click', () => {
    userId++;
    fetchAndRenderUser();
});

const prevUserButton = document.getElementById('prevUserButton');
prevUserButton.addEventListener('click', () => {
    if (userId > 1) {
        userId--;
        fetchAndRenderUser();
    }
});

fetchAndRenderUser();