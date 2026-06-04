import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";

@Entity({ name: "role" })
export class Role {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "varchar", length: 50, unique: true, nullable: true })
	name!: string | null;

	@OneToMany(() => User, (user) => user.role)
	users!: User[];
}
