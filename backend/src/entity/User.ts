import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	OneToMany,
} from "typeorm";
import { Role } from "./Role";
import { Booking } from "./Booking";

@Entity({ name: "user" })
export class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "varchar", length: 100, name: "first_name", nullable: true })
	firstName!: string | null;

	@Column({ type: "varchar", length: 100, name: "last_name", nullable: true })
	lastName!: string | null;

	@Column({ type: "varchar", length: 255, unique: true, nullable: true })
	email!: string | null;

	@Column({ type: "varchar", length: 255, nullable: true })
	password!: string | null;

	@ManyToOne(() => Role, (role) => role.users)
	@JoinColumn({ name: "role_id" })
	role!: Role;

	@OneToMany(() => Booking, (booking) => booking.user)
	bookings!: Booking[];
}
