import {
	Entity,
	PrimaryColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { Classroom } from "./Classroom";
import { Equipment } from "./Equipment";

@Entity({ name: "classroom_equipment" })
export class ClassroomEquipment {
	@PrimaryColumn({ type: "int", name: "id_classroom" })
	idClassroom!: number;

	@PrimaryColumn({ type: "int", name: "id_equipment" })
	idEquipment!: number;

	@ManyToOne(() => Classroom, (c) => c.equipments)
	@JoinColumn({ name: "id_classroom" })
	classroom!: Classroom;

	@ManyToOne(() => Equipment, (e) => e.classrooms)
	@JoinColumn({ name: "id_equipment" })
	equipment!: Equipment;

	@Column({ type: "timestamp", name: "started_at", nullable: true })
	startedAt!: Date | null;

	@Column({ type: "timestamp", name: "ended_at", nullable: true })
	endedAt!: Date | null;

	@Column({ type: "int", nullable: true })
	quantity!: number | null;
}
