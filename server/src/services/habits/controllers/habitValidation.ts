export interface addHabitParams {
  userId: string;
  name: string;
  description: string;
}

export interface completeHabitParams {
  userId: string;
  habitId: string;
}

const validateAddHabitParams = ({
  userId,
  name,
  description,
}: addHabitParams | any): addHabitParams | undefined => {
  if (
    typeof userId !== "string" ||
    typeof name !== "string" ||
    typeof description !== "string"
  ) {
    return undefined;
  }
  return { userId, name, description };
};

const validateCompleteHabitParams = ({
  userId,
  habitId,
}: completeHabitParams | any): completeHabitParams | undefined => {
  console.log(habitId, userId);
  if (typeof userId !== "string" || typeof habitId !== "string") {
    return undefined;
  }
  return { userId, habitId };
};

export { validateAddHabitParams, validateCompleteHabitParams };
