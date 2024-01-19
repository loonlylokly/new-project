import { HTMLAttributes } from 'react';
import { TList } from 'types/list';

type Props<TItem> = {
  listNode: TList;
  items: TItem[];
  renderItem: (item: TItem) => React.ReactNode;
} & HTMLAttributes<HTMLElement>;

export function List<TItem>({
  items,
  listNode,
  renderItem,
  ...rest
}: Props<TItem>) {
  const Comp = listNode;
  return <Comp {...rest}>{items.map(renderItem)}</Comp>;
}
