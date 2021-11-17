type Item = {
    content: string;
    className: string;
  }

type TableHeadProps = {
    items: Item[];
};

export function TableHead({ items }: TableHeadProps) {
  return (
    <thead>
      <tr>
        {items.map(({ content, className }) => (
          <th key={content} scope="col" className={className}>
            {content}
          </th>
        ))}
      </tr>
    </thead>
  );
}
