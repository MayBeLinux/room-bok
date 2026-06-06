import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	OneToMany,
} from "typeorm";
import { Floor } from "./Floor";
import { ClassroomEquipment } from "./ClassroomEquipment";
import { Booking } from "./Booking";

@Entity({ name: "classroom" })
export class Classroom {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "varchar", length: 100, name: "name_room", nullable: true })
	nameRoom!: string | null;

	@ManyToOne(() => Floor, (floor) => floor.classrooms)
	@JoinColumn({ name: "id_floor" })
	floor!: Floor;

	@Column({ type: "boolean", nullable: true })
	maintenance!: boolean | null;

	@OneToMany(() => ClassroomEquipment, (ce) => ce.classroom)
	equipments!: ClassroomEquipment[];

	@OneToMany(() => Booking, (booking) => booking.classroom)
	bookings!: Booking[];
}
