import { useTable } from 'react-table';
import type { ArticleType } from 'sharedTypes/article.types';
import { EditArticleWidgetHookForm } from 'widgets/EditArticleWidget/EditArticleWidgetHookForm';
import { RemoveArticleWithEvent } from 'widgets/RemoveArticle/RemoveArticleWithEvent';

import { AppTable } from 'components/AppTable';

import { ViewArticleLink } from './ViewArticleLink';

interface ArticleListProps {
  articles: ArticleType[];
  isLoading?: boolean;
}

const columns = [
  {
    Header: 'Title',
    accessor: 'title',
    headerClassName: 'min-w-40 w-3/10 p-3 text-start font-bold',
    cellClassName: 'min-w-40 w-3/10 p-3 text-start',
  },
  {
    Header: 'Description',
    accessor: 'description',
    headerClassName: 'p-3 text-start font-bold',
    cellClassName: 'p-3 text-start',
  },
  {
    Header: 'Actions',
    accessor: '_id',
    headerClassName: 'min-w-70 w-1/10 p-3 text-center font-bold',
    cellClassName: 'min-w-70 w-1/10 p-3 text-end',
    Cell: ({ value }) => {
      return (
        <div className="flex gap-4 justify-end">
          <ViewArticleLink articleId={value} />
          <EditArticleWidgetHookForm articleId={value} />
          <RemoveArticleWithEvent articleId={value} />
        </div>
      );
    },
  },
];

const useArticlesTableState = (props: ArticleListProps) => {
  const { articles, isLoading } = props;

  const tableInstance = useTable({ columns, data: articles });

  return {
    isLoading,
    ...tableInstance,
  };
};

export function ArticlesTable(props: ArticleListProps) {
  const tableInstance = useArticlesTableState(props);

  return <AppTable {...tableInstance} />;
}
