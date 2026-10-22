import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	JoinColumn,
} from "typeorm";
import { Classroom } from "./Classroom";

@Entity({ name: "cafeteria" })
export class Cafeteria {
	@PrimaryGeneratedColumn()
	id!: number;

	@OneToOne(() => Classroom, (classroom) => classroom.cafeteria)
	@JoinColumn({ name: "id_classroom" })
	classroom!: Classroom;

	@Column({ type: "int", nullable: true })
	capacity!: number | null;

	@Column({ type: "time", name: "opening_time", nullable: true })
	openingTime!: string | null;

	@Column({ type: "time", name: "closing_time", nullable: true })
	closingTime!: string | null;
}
