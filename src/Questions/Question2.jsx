import { useState } from "react";

function GithubUserSearch() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchUser = async (e) => {
    e.preventDefault();
    setError("");
    setUser(null);
    setRepos([]);
    setLoading(true);

    try {
      const userRes = await fetch(
        `https://api.github.com/users/${username}`
      );

      if (!userRes.ok) {
        if (userRes.status === 404) {
          throw new Error("User not found");
        }
        throw new Error("Something went wrong");
      }

      const userData = await userRes.json();

      const repoRes = await fetch(
        `https://api.github.com/users/${username}/repos?sort=created&per_page=5`
      );
      const repoData = await repoRes.json();

      setUser(userData);
      setRepos(repoData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center">
      <div className="w-full max-w-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          GitHub User Search
        </h1>

        {/* Search Bar */}
        <form onSubmit={searchUser} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter GitHub username"
            className="flex-1 px-4 py-2 rounded bg-gray-800 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button className="bg-green-600 px-5 py-2 rounded hover:bg-green-700">
            Search
          </button>
        </form>

        {/* Loading */}
        {loading && <p className="text-center">Loading...</p>}

        {/* Error */}
        {error && (
          <p className="text-red-400 text-center font-semibold">
            {error}
          </p>
        )}

        {/* User Profile */}
        {user && (
          <div className="bg-gray-800 rounded-lg p-5">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar_url}
                alt="avatar"
                className="w-20 rounded-full"
              />
              <div>
                <h2 className="text-xl font-bold">
                  {user.name || user.login}
                </h2>
                <p className="text-gray-300">
                  {user.bio || "No bio available"}
                </p>
                <p className="text-sm mt-1">
                  Followers: {user.followers}
                </p>
              </div>
            </div>

            {/* Repositories */}
            <div className="mt-5">
              <h3 className="font-semibold mb-2">Latest Repositories</h3>
              {repos.length === 0 && (
                <p className="text-gray-400">No repositories found</p>
              )}

              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="block bg-gray-700 px-3 py-2 rounded mb-2 hover:bg-gray-600"
                >
                  {repo.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GithubUserSearch;
