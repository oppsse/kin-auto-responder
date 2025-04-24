export const Card = ({ children }: any) => {
  return <div className="border rounded shadow p-4 bg-white">{children}</div>;
};

export const CardContent = ({ children, ...props }: any) => {
  return <div {...props}>{children}</div>;
};