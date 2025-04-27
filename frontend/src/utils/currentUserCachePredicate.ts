import { Query } from "@tanstack/react-query";
import { MY_BLOGS_QUERY_KEY, USER_QUERY_KEY } from "./constants.ts";

function currentUserCachePredicate(
  query: Query<unknown, Error, unknown, readonly unknown[]>,
) {
  return (
    query.queryKey.includes(USER_QUERY_KEY) ||
    query.queryKey.includes(MY_BLOGS_QUERY_KEY)
  );
}

export default currentUserCachePredicate;
