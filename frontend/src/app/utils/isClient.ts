export const isClient = () => {
  console.log(typeof window !== "undefined");
  console.log("hello");
  return typeof window !== "undefined";
};
