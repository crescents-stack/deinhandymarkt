export type ReactChildren = {children: React.ReactNode};
export type FormSubmit = React.FormEvent<HTMLFormElement>;
export type FetchReturnType = {success: boolean, message: string, data: any, statusCode: number}