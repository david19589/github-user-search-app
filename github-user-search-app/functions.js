const Body = document.getElementById("body");
const Theme = document.getElementById("theme");
const SearchDiv = document.getElementById("searchDiv");
const Container = document.getElementById("container");
const Input = document.getElementById("input");
const Box2 = document.getElementById("box2");
const DarkLight = document.getElementById("dark-light");
const MoonSun = document.getElementById("moon-sun");
const SearchButton = document.getElementById("search");
const ProfileLink = document.getElementById("profileLink");
const JoinDate = document.getElementById("joinDate");
const Bio = document.getElementById("bio");
const Reposts = document.getElementById("reposts");
const Followers = document.getElementById("followers");
const Following = document.getElementById("following");
const UserLocation = document.getElementById("location");
const GithubBlogLink = document.getElementById("githubBlogLink");
const TwitterLink = document.getElementById("twitterLink");
const CompanyLink = document.getElementById("companyLink");
const H1 = document.getElementsByTagName("h1");
const SearchError = document.getElementById("searchError");
const UserAvatar = document.getElementById("avatar");
const UserName = document.getElementById("userName");
const Wall = document.getElementById("wall")

const octocat = {
    avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
    bio: null,
    blog: "https://github.blog",
    company: "@github",
    created_at: "2011-01-25T18:44:36Z",
    email: null,
    events_url: "https://api.github.com/users/octocat/events{/privacy}",
    followers: 11817,
    followers_url: "https://api.github.com/users/octocat/followers",
    following: 9,
    following_url: "https://api.github.com/users/octocat/following{/other_user}",
    gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
    gravatar_id: "",
    hireable: null,
    html_url: "https://github.com/octocat",
    id: 583231,
    location: "San Francisco",
    login: "octocat",
    name: "The Octocat",
    node_id: "MDQ6VXNlcjU4MzIzMQ==",
    organizations_url: "https://api.github.com/users/octocat/orgs",
    public_gists: 8,
    public_repos: 8,
    received_events_url: "https://api.github.com/users/octocat/received_events",
    repos_url: "https://api.github.com/users/octocat/repos",
    site_admin: false,
    starred_url: "https://api.github.com/users/octocat/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
    twitter_username: null,
    type: "User",
    updated_at: "2023-12-22T12:29:36Z",
    url: "https://api.github.com/users/octocat",
}
const dateTransformer = (date) => {
    const dateObj = new Date(date);
    const dateString = dateObj.toDateString();
    const [weekday, month, day, year] = dateString.split(" ");
    return `${day} ${month} ${year}`;
}

const displayInfo = (user) => {
    UserAvatar.src = user.avatar_url;
    UserName.textContent = user.name || "No Username";
    ProfileLink.textContent = "@" + user.login;
    const date = dateTransformer(user.created_at);
    JoinDate.textContent = "joined " + date;
    Bio.textContent = user.bio || "This profile has no bio";
    Reposts.textContent = user.public_repos;
    Followers.textContent = user.followers;
    Following.textContent = user.following;
    if (user.location) {
        UserLocation.textContent = user.location;
        UserLocation.parentElement.style.opacity = 1;
    } else {
        UserLocation.textContent = "Not Available";
        UserLocation.parentElement.style.opacity = 0.5;
        UserLocation.style.cursor = "default";
    }
    if (user.twitter_username) {
        TwitterLink.textContent = user.twitter_username;
        TwitterLink.parentElement.style.opacity = 1;
    } else {
        TwitterLink.textContent = "Not Available";
        TwitterLink.parentElement.style.opacity = 0.5;
        TwitterLink.style.cursor = "default"
    }
    if (user.blog) {
        GithubBlogLink.textContent = user.blog;
        GithubBlogLink.parentElement.style.opacity = 1;
        GithubBlogLink.style.cursor = "pointer";
        GithubBlogLink.addEventListener("click", (e) => {
            window.open(GithubBlogLink.innerHTML);
        });
    } else {
        GithubBlogLink.textContent = "Not Available";
        GithubBlogLink.style.cursor = "default";
        GithubBlogLink.parentElement.style.opacity = 0.5;
        Wall.style.display = "flex";
    }
    if (user.company) {
        CompanyLink.textContent = user.company;
        CompanyLink.parentElement.style.opacity = 1;
        CompanyLink.style.cursor = "pointer";
    } else {
        CompanyLink.textContent = "Not Available";
        CompanyLink.parentElement.style.opacity = 0.5;
        CompanyLink.style.cursor = "default";
    }
    ProfileLink.addEventListener("click", (e) => {
        window.open("https://github.com/" + ProfileLink.innerHTML.slice(1));
    });
};
displayInfo(octocat);

Theme.addEventListener("click", (e) => {
    if (Body.classList != ("themeSelected")) {
        Body.classList.remove("themeSelected");
        Body.classList.add("themeSelected");
        SearchDiv.style.background = "#1E2A47";
        Container.style.background = "#1E2A47";
        Input.style.background = "#1E2A47";
        Input.style.color = "FFF";
        Box2.style.background = "#141D2F";
        MoonSun.src = "assets/assets/icon-sun.svg";
        DarkLight.textContent = "LIGHT";
        for (let i = 0; i < H1.length; i++) {
            H1[i].style.color = "FFF";
        }
    } else {
        Body.classList.remove("themeSelected");
        SearchDiv.style.background = "";
        Container.style.background = "";
        Input.style.background = "";
        Input.style.color = "";
        Box2.style.background = "";
        MoonSun.src = "assets/assets/icon-moon.svg";
        DarkLight.textContent = "DARK";
        for (let i = 0; i < H1.length; i++) {
            H1[i].style.color = "";
        }

    }
});

Input.addEventListener("input", (e) => {
    SearchError.style.display = "none";
    SearchError.textContent = "";
})

SearchButton.addEventListener("click", async (e) => {
    try {
        const response = await axios.get("https://api.github.com/users/" + Input.value);
        const user = response.data;
        displayInfo(user)
        Input.value = "";
    } catch (error) {
        SearchError.style.display = "flex";
        SearchError.textContent = "No results";
    }
});