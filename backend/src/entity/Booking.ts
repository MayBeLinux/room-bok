import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Classroom } from "./Classroom";

@Entity({ name: "booking" })
export class Booking {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => User, (user) => user.bookings)
	@JoinColumn({ name: "user_id" })
	user!: User;

	@ManyToOne(() => Classroom, (classroom) => classroom.bookings)
	@JoinColumn({ name: "classroom_id" })
	classroom!: Classroom;

	@Column({ type: "timestamp", name: "started_at", nullable: true })
	startedAt!: Date | null;

	@Column({ type: "timestamp", name: "ended_at", nullable: true })
	endedAt!: Date | null;
}
