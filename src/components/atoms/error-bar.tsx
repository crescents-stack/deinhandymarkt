const ErrorBar = ({ errors, name }: { errors: any; name: string }) => {
  const message = errors[`${name}`];
  return message ? (
    <div className="flex-inline text-secondary pt-[4px] pb-[8px]">{message}</div>
  ) : null;
};

export default ErrorBar;
