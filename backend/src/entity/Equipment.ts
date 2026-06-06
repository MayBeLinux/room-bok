import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ClassroomEquipment } from "./ClassroomEquipment";

@Entity({ name: "equipment" })
export class Equipment {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "text", nullable: true })
	name!: string | null;

	@OneToMany(() => ClassroomEquipment, (ce) => ce.equipment)
	classrooms!: ClassroomEquipment[];
}
