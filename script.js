document.addEventListener('DOMContentLoaded', () => {
    const avatarDisplay=document.getElementById('avatarDisplay');
    const nameDisplay=document.getElementById('nameDisplay');
    const bioDisplay=document.getElementById('bioDisplay');
    const publicReposDisplay=document.getElementById('publicReposDisplay');
    const followersDisplay=document.getElementById('followersDisplay');
    const followingDisplay=document.getElementById('followingDisplay');
    const profileLinkDisplay=document.getElementById('profileLinkDisplay');
    document.getElementById('user-form').addEventListener('submit', async function (e) {
        e.preventDefault();
    
        // Clear any previous error messages or profile data
        document.getElementById('error').textContent = '';
        const profileContainer=document.getElementById('profile')
    
        // Retrieve the username and add basic client-side validation
        const username = document.getElementById('username').value.trim();
        if (username === '') {
          document.getElementById('error').textContent = 'Please enter a username.';
          return;
        }
    
        try {
            const data= await fetchProfileData(username);
            displayProfileData(data);
        } catch (error) {
            document.getElementById('error').textContent = error.message;
        }
    
        async function fetchProfileData(username) {
            const apiUrl = `https://api.github.com/users/${username}`;
            const response= await fetch(apiUrl);
            console.log(response);
            console.log(typeof response);
            if(!response.ok){
                throw new Error('User not found or an error occurred.');
            }
            const data = await response.json();
            console.log(data);
            console.log(typeof data);
            return data;
        }
    
        function displayProfileData(data) {
            profileContainer.classList.remove("hidden");
            avatarDisplay.src=data.avatar_url;
            nameDisplay.textContent=data.name || data.login;
            bioDisplay.textContent=data.bio || 'No bio available.';
            publicReposDisplay.textContent=`Public Repositories: ${data.public_repos}`;
            followersDisplay.textContent=`Followers: ${data.followers}`;
            followingDisplay.textContent=`Following: ${data.following}`;
            profileLinkDisplay.href=data.html_url;
        };
    
    });
});