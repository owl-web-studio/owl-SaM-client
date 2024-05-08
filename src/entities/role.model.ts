export interface Role {
  id: number;
  name: string;
  description: string;

  isAdmin?: boolean;
  displayColor?: string;
}
