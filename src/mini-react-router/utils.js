// 如 ///product/detail/// -> /product/detail
export const normalizePathname = (pathname) =>
  pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
