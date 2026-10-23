import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Classroom } from "./Classroom";

@Entity({ name: "room_type" })
export class RoomType {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "varchar", length: 50, unique: true, nullable: true })
	name!: string | null;

	@OneToMany(() => Classroom, (classroom) => classroom.roomType)
	classrooms!: Classroom[];
}
