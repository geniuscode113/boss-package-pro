window.cloudinary = window.cloudinary || {};

window.cloudinary.url = function (publicId, options = {}) {
  const baseUrl = "https://res.cloudinary.com/demo/image/upload";
  const transform = options.transform || "";
  const version = options.version || "v1";
  const params = transform ? `/${transform}` : "";
  return `${baseUrl}/${version}${params}/${publicId}`;
};

window.cloudinary.placeholder = function (width = 800, height = 600, text = "Boss Package Pro") {
  return `https://placehold.co/${width}x${height}/0c7d6c/ffffff?text=${encodeURIComponent(text)}`;
};
