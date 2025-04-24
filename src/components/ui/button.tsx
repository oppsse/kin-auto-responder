export const Button = ({ children, ...props }: any) => {
  return <button {...props} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
    {children}
  </button>;
};