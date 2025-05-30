// DOM 요소 선택
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const profileContainer = document.getElementById('profile-container');
const errorContainer = document.getElementById('error-container');
const avatar = document.getElementById('avatar');
const nameElement = document.getElementById('name');
const usernameElement = document.getElementById('username');
const bioElement = document.getElementById('bio');
const locationElement = document.getElementById('location');
const jointDateElement = document.getElementById('joint-date');
const profileLink = document.getElementById('profile-link');
const followersElement = document.getElementById('followers');
const followingElement = document.getElementById('following');
const reposElement = document.getElementById('repos');
const companyElement = document.getElementById('company');
const blogElement = document.getElementById('blog');
const twitterElement = document.getElementById('twitter');
const reposContainer = document.getElementById('repos-container');

// 이벤트 등록
searchBtn.addEventListener('click', searchUser);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchUser();
});

// 검색 함수
async function searchUser() {
  const username = searchInput.value.trim();
  if (!username) {
    alert('Please enter a username');
    return;
  }

  profileContainer.classList.add('hidden');
  errorContainer.classList.add('hidden');

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error('User not found');
    const userData = await res.json();
    displayUser(userData);
    fetchRepos(userData.repos_url);
  } catch (err) {
    errorContainer.classList.remove('hidden');
    profileContainer.classList.add('hidden');
  }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function displayUser(user) {
  avatar.src = user.avatar_url;
  nameElement.textContent = user.name || user.login;
  usernameElement.textContent = `@${user.login}`;
  bioElement.textContent = user.bio || 'No bio available';
  locationElement.textContent = user.location || 'Not specified';
  jointDateElement.textContent = formatDate(user.created_at);
  profileLink.href = user.html_url;
  followersElement.textContent = user.followers;
  followingElement.textContent = user.following;
  reposElement.textContent = user.public_repos;
  companyElement.textContent = user.company || 'Not specified';
  blogElement.href = user.blog || '#';
  blogElement.textContent = user.blog ? user.blog : 'No website';
  twitterElement.href = user.twitter_username ? `https://twitter.com/${user.twitter_username}` : '#';
  twitterElement.textContent = user.twitter_username ? `@${user.twitter_username}` : 'No Twitter';
  profileContainer.classList.remove('hidden');
}

async function fetchRepos(reposUrl) {
  reposContainer.innerHTML = '<div class="loading-repos">Loading repositories...</div>';
  try {
    const res = await fetch(`${reposUrl}?per_page=6`);
    const repos = await res.json();
    displayRepos(repos);
  } catch {
    reposContainer.innerHTML = '<div class="loading-repos">Failed to fetch repositories</div>';
  }
}

function displayRepos(repos) {
  if (repos.length === 0) {
    reposContainer.innerHTML = '<div class="loading-repos">No repositories found</div>';
    return;
  }

  reposContainer.innerHTML = '';
  repos.forEach(repo => {
    const div = document.createElement('div');
    div.className = 'repo-card';
    const updatedDate = formatDate(repo.updated_at);
    div.innerHTML = `
      <a href="${repo.html_url}" class="repo-name" target="_blank">${repo.name}</a>
      <p class="repo-description">${repo.description || 'No description'}</p>
      <div class="repo-meta">
        <span class="repo-meta-item"><i class="fas fa-code"></i> ${repo.language || 'N/A'}</span>
        <span class="repo-meta-item"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
        <span class="repo-meta-item"><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
        <span class="repo-meta-item">Updated: ${updatedDate}</span>
      </div>
    `;
    reposContainer.appendChild(div);
  });
}

// 기본값으로 본인 GitHub 사용자명 미리 설정
searchInput.value = 'octocat';
searchUser();
