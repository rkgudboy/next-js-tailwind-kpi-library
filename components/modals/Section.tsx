const Section = ({
  title,
  items,
  content,
}: {
  title: string;
  items?: string[];
  content?: string;
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {items ? (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item} className="p-3 bg-gray-50 rounded-lg text-gray-600">
              {item}
            </div>
          ))}
        </div>
      ) : content ? (
        <p className="text-gray-600">{content}</p>
      ) : null}
    </div>
  );
};
export default Section;
