export interface IExercise {
  groupId: any;
  id: string;
  name: string;
  sets: ISet[];
}

export interface ISet {
  setNumber: string;
  weight: string;
  reps: string;
  id: string;
}

export interface IEditExercise {
  userId: string;
  exerciseId: string;
  setId: string;
  updatedFields: { weight: string; reps: string };
}
