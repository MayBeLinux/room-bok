import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	OneToMany,
} from "typeorm";
import { Building } from "./Building";
import { Classroom } from "./Classroom";

@Entity({ name: "floor" })
export class Floor {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "int", nullable: true })
	level!: number | null;

	@ManyToOne(() => Building, (building) => building.floors)
	@JoinColumn({ name: "id_building" })
	building!: Building;

	@OneToMany(() => Classroom, (classroom) => classroom.floor)
	classrooms!: Classroom[];
}
