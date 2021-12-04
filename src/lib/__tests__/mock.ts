export const mock = <T>(methods?: Partial<{ [key in keyof T]: unknown }>) => {
  const Mock = jest.fn<T, unknown[]>(() => methods as unknown as T);
  return new Mock();
};
