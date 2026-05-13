const USER_INFO_KEY = "madison-hiking-guide-userinfo";
const DEFAULT_USER_INFO = {
  username: "Anonymous",
  likedTrails: []
};

function normalizeUserInfo(userinfo) {
  return {
    username:
      typeof userinfo?.username === "string" && userinfo.username.trim()
        ? userinfo.username
        : DEFAULT_USER_INFO.username,
    likedTrails: Array.isArray(userinfo?.likedTrails)
      ? userinfo.likedTrails
      : []
  };
}

export function getUserInfo() {
  const storedUserInfo = localStorage.getItem(USER_INFO_KEY);

  if (!storedUserInfo) {
    return null;
  }

  try {
    return normalizeUserInfo(JSON.parse(storedUserInfo));
  } catch {
    return null;
  }
}

export function saveUserInfo(userinfo) {
  const normalizedUserInfo = normalizeUserInfo(userinfo);
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(normalizedUserInfo));
  return normalizedUserInfo;
}

export function ensureUserInfo() {
  const userInfo = getUserInfo();

  if (userInfo) {
    return saveUserInfo(userInfo);
  }

  return saveUserInfo(DEFAULT_USER_INFO);
}
