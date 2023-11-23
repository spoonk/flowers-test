export interface Habit {
  userId: string;
  name: string;
  description: string;
  type: string;
  reward: string; // id of flower
  difficulty: string;
  completedToday: boolean;
  streak: number;
  daysCompleted: string[];
  health: number;
  _id: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
  accountCreated: string;
  lastLoginTime: string;
  timeZone: string;
  _id: string;
}

export interface Garden {
  user: string;
  flowers: {
    flowerId: string;
    position: {
      x: number;
      y: number;
      z: number;
    };
  }[];
}
