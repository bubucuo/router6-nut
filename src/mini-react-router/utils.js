// 1. 删除结尾的多个/
// 2. 删除开头的多少/
// 如 ///product/detail/// -> /product/detail
export const normalizePathname = (pathname) =>
  pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
