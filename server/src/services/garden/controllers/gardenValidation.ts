const validateGetGardenParams = ({
  userId,
}: { userId: string } | any): { userId: string } | undefined => {
  console.debug(userId);
  if (typeof userId !== "string") return undefined;
  return { userId };
};

export { validateGetGardenParams };
