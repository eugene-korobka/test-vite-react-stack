import { useParams } from "react-router-dom";
import type { ArticleIdType } from "sharedTypes/article.types";

export function useArticleId(articleId?: ArticleIdType): ArticleIdType {
  const { articleId: routeArticleId } = useParams();

  return articleId || routeArticleId || '';
};
